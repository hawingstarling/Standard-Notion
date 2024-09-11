import { Document } from '@prisma/client';
import { NextApiResponse, NextApiRequest } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import {
  ApiResponse,
  BadRequestResponse,
  ForbiddenResponse,
  InternalErrorResponse,
  SuccessResponseWithMsg,
  UnauthorizedResponse,
} from '@/core/ApiResponse';
import { NextRequest } from 'next/server';


export const ShowDocument = async (
  req: NextRequest,
  documentId: string
) => {
  const { userId } = getAuth(req);

  try {
    if (!userId) {
      return new UnauthorizedResponse([
        {
          key: 'authentication',
          value: 'Not Authentication',
        },
      ]);
    }

    if (!documentId) {
      return new BadRequestResponse([
        {
          key: 'id',
          value: 'Document ID is required',
        },
      ]).send();
    }

    const document = await prisma?.document.findUnique({
      where: {
        userId: userId as string,
        id: documentId,
      },
    });

    if (document?.isPublished && !document.isArchived) {
      return new SuccessResponseWithMsg(
        '200 OK',
        document as unknown as ReadonlyArray<Document>,
      ).send();
    }

    if (document?.userId !== userId) {
      return new ForbiddenResponse([
        {
          key: 'forbidden',
          value: 'Unauthorized',
        },
      ]).send();
    }

    return new SuccessResponseWithMsg(
      '200 OK',
      document as unknown as ReadonlyArray<Document>,
    ).send();
  } catch (error) {
    return new InternalErrorResponse([
      {
        key: 'internal',
        value: 'An Error Occurred While Retrieving The Document',
      },
    ]);
  }
};
