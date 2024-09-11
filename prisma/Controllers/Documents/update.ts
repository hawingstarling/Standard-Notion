import { getAuth } from '@clerk/nextjs/server';
import { z } from 'zod';
import prisma from '../../prismaClient';
import { Prisma } from '@prisma/client';
import {
  ApiResponse,
  BadRequestResponse,
  ForbiddenResponse,
  InternalErrorResponse,
  NotFoundResponse,
  SuccessMsgResponse,
  SuccessResponse,
  SuccessResponseWithMsg,
  UnauthorizedResponse,
} from '@/core/ApiResponse';
import { NextRequest } from 'next/server';

export const Archive = async (
  req: NextRequest,
) => {
  const { userId } = getAuth(req);
  const { searchParams } = new URL(req.url);

  const id = searchParams.get('id');

  try {
    if (!userId) {
      // return new UnauthorizedResponse([
      //   {
      //     key: 'authentication',
      //     value: 'Not Authentication',
      //   },
      // ]).send();
      return new Response(
        'Unauthorzied',
        { status: 401 }
      )
    }

    if (!id) {
      return new BadRequestResponse([
        {
          key: 'id',
          value: 'Document ID is required',
        },
      ]).send();
    }

    const existingDocument = await prisma.document.findUnique({
      where: {
        id,
      },
    });

    if (!existingDocument) {
      return new BadRequestResponse([
        {
          key: 'document',
          value: 'Document Not Found',
        },
      ]).send();
    }

    if (existingDocument.userId !== userId) {
      return new ForbiddenResponse([
        {
          key: 'forbidden',
          value: 'Unauthorized',
        },
      ]).send();
    }

    const recursiveArchive = async (documentId: string) => {
      const children = await prisma.document.findMany({
        where: {
          parentDocumentId: documentId,
        },
      });

      for (const child of children) {
        await prisma.document.update({
          where: {
            id: child.id
          },
          data: {
            isArchived: true
          }
        })
        await recursiveArchive(child.id);
      }
    };

    const document = await prisma.document.update({
      where: { 
        id 
      },
      data: { 
        isArchived: true 
      },
    });

    await recursiveArchive(id as string);

    return new SuccessResponseWithMsg('200 Updated', document).send();
  } catch (error) {
    // return new InternalErrorResponse([
    //   {
    //     key: 'internal',
    //     value: 'An Error Occurred While Archiving The Document',
    //   },
    // ]).send();
    return new Response(
      'Internal Server Error',
      { status: 500 }
    )
  }
};

export const Restore = async (
  req: NextRequest,
) => {
  const { userId } = getAuth(req);
  const { searchParams } = new URL(req.url);

  const id = searchParams.get('id');
  try {
    if (!userId) {
      // return new UnauthorizedResponse([
      //   {
      //     key: 'authentication',
      //     value: 'Not Authentication',
      //   },
      // ]).send();
      return new Response(
        'Unauthorzied',
        { status: 401 }
      )
    }

    if (!id) {
      return new BadRequestResponse([
        {
          key: 'id',
          value: 'Document ID is required',
        },
      ]).send();
    }

    const existingDocument = await prisma.document.findUnique({
      where: {
        id,
      },
    });

    if (!existingDocument) {
      return new BadRequestResponse([
        {
          key: 'document',
          value: 'Document Not Found',
        },
      ]).send();
    }

    if (existingDocument.userId !== userId) {
      return new ForbiddenResponse([
        {
          key: 'forbidden',
          value: 'Unauthorized',
        },
      ]).send();
    }

    const recursiveRestore = async (documentId: string) => {
      const children = await prisma.document.findMany({
        where: {
          parentDocumentId: documentId,
        },
      });

      for (const child of children) {
        await prisma.document.update({
          where: {
            id: child.id,
          },
          data: { isArchived: false },
        });

        await recursiveRestore(child.id);
      }
    };

    const options: Partial<Prisma.DocumentUpdateInput> = {
      isArchived: false,
    };

    if (existingDocument.parentDocumentId) {
      const parent = await prisma.document.findUnique({
        where: {
          id: existingDocument.parentDocumentId,
        },
      });

      if (parent?.isArchived) {
        options.parentDocumentId = null;
      }
    }

    const document = await prisma.document.update({
      where: { id },
      data: options,
    });

    await recursiveRestore(id);

    return new SuccessResponseWithMsg('200 Updated', document).send();
  } catch (error) {
    // return new InternalErrorResponse([
    //   {
    //     key: 'internal',
    //     value: 'An Error Occurred While Restoring Archived Documents',
    //   },
    // ]).send();
    return new Response(
      'Internal Server Error',
      { status: 500 }
    )
  }
};


const updateDocumentSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  coverImage: z.string().optional(),
  icon: z.string().optional(),
  isPublished: z.boolean().optional(),
});

export const UpdateDocument = async (
  req: NextRequest,
) => {
  const { userId } = getAuth(req);
  const body = await req.json()
  const validate = updateDocumentSchema.parse(body);

  const {
    id,
    ...rest
  } = validate

  try {
    if (!userId) {
      // return new UnauthorizedResponse([
      //   {
      //     key: 'authentication',
      //     value: 'Not Authentication',
      //   },
      // ]).send();
      return new Response(
        'Unauthorzied',
        { status: 401 }
      )
    }

    const existingDocument = await prisma.document.findUnique({
      where: {
        id
      }
    })    

    if (!existingDocument) {
      return new NotFoundResponse([
        {
          key: 'document',
          value: 'Document Not Found'
        }
      ]).send()
    }

    if (existingDocument.userId !== userId) {
      return new ForbiddenResponse([
        {
          key: 'forbidden',
          value: 'Unauthorized',
        },
      ]).send();
    }

    const updateDocument = await prisma.document.update({
      where: {
        id
      },
      data: {
        ...rest
      }
    })

    return new SuccessResponseWithMsg(
      '200 Updated',
      updateDocument
    ).send()

  } catch (error) {
    // return new InternalErrorResponse([
    //   {
    //     key: 'internal',
    //     value: 'An Error Occurred While Fetching Updated Documents',
    //   },
    // ]).send();
    return new Response(
      'Internal Server Error',
      { status: 500 }
    )
  }
}

export const RemoveIcon = async (
  req: NextRequest,
) => {
  const { userId } = getAuth(req);
  const { searchParams } = new URL(req.url);

  const id = searchParams.get('id');

  try {
    if (!userId) {
      // return new UnauthorizedResponse([
      //   {
      //     key: 'authentication',
      //     value: 'Not Authentication',
      //   },
      // ]).send();
      return new Response(
        'Unauthorzied',
        { status: 401 }
      )
    }

    if (!id) {
      return new BadRequestResponse([
        {
          key: 'id',
          value: 'DocumentId Is Required',
        },
      ]).send();
    }

    const existingDocument = await prisma.document.findUnique({
      where: {
        id
      }
    })    

    if (!existingDocument) {
      return new NotFoundResponse([
        {
          key: 'document',
          value: 'Document Not Found'
        }
      ]).send()
    }

    if (existingDocument.userId !== userId) {
      return new ForbiddenResponse([
        {
          key: 'forbidden',
          value: 'Unauthorized',
        },
      ]).send();
    }

    const updateDocument = await prisma.document.update({
      where: {
        id
      },
      data: {
        icon: null
      }
    })

    return new SuccessResponseWithMsg(
      '200 Updated',
      updateDocument
    ).send()

  } catch (error) {
    // return new InternalErrorResponse([
    //   {
    //     key: 'internal',
    //     value: 'An Error Occurred While Fetching Updated Documents',
    //   },
    // ]).send();
    return new Response(
      'Internal Server Error',
      { status: 500 }
    )
  }
}

export const RemoveCoverImage = async (
  req: NextRequest,
) => {
  const { userId } = getAuth(req);
  const { searchParams } = new URL(req.url);

  const id = searchParams.get('id');

  try {
    if (!userId) {
      // return new UnauthorizedResponse([
      //   {
      //     key: 'authentication',
      //     value: 'Not Authentication',
      //   },
      // ]).send();
      return new Response(
        'Unauthorzied',
        { status: 401 }
      )
    }

    if (!id) {
      return new BadRequestResponse([
        {
          key: 'id',
          value: 'DocumentId Is Required',
        },
      ]).send();
    }

    const existingDocument = await prisma.document.findUnique({
      where: {
        id
      }
    })    

    if (!existingDocument) {
      return new NotFoundResponse([
        {
          key: 'document',
          value: 'Document Not Found'
        }
      ]).send()
    }

    if (existingDocument.userId !== userId) {
      return new ForbiddenResponse([
        {
          key: 'forbidden',
          value: 'Unauthorized',
        },
      ]).send();
    }

    const updateDocument = await prisma.document.update({
      where: {
        id
      },
      data: {
        coverImage: null
      }
    })

    return new SuccessResponseWithMsg(
      '200 Updated',
      updateDocument
    ).send()

  } catch (error) {
    // return new InternalErrorResponse([
    //   {
    //     key: 'internal',
    //     value: 'An Error Occurred While Fetching Updated Documents',
    //   },
    // ]).send();
    return new Response(
      'Internal Server Error',
      { status: 500 }
    )
  }
}