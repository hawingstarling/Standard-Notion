import { Document } from '@prisma/client';
import { NextApiResponse, NextApiRequest } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import {
  ApiResponse,
  BadRequestResponse,
  SuccessResponseWithMsg,
  UnauthorizedResponse,
} from '@/core/ApiResponse';
import { NextRequest } from 'next/server';


export const ShowDocument = async (
  req: NextRequest,
) => {
  const { userId } = getAuth(req);
  const { searchParams } = new URL(req.url);

  const parentDocumentId = searchParams.get('parentDocumentId');
  try {
    if (!userId) {
      return new UnauthorizedResponse([
        {
          key: 'authentication',
          value: 'Not Authentication',
        },
      ]);
    }

    const document = await prisma?.document.findMany({
      where: {
        userId: userId as string,
        parentDocumentId,
        AND: {
          isArchived: false,
        },
      },
    });

    if (document === null) {
      return new BadRequestResponse([
        {
          key: 'parentDocument',
          value: `ParentDocumentId ${parentDocumentId} not found`,
        },
      ]);
    }
    return new SuccessResponseWithMsg(
      '200 OK',
      document as unknown as ReadonlyArray<Document>,
    ).send();
  } catch (error) {
    return new BadRequestResponse([
      {
        key: 'get',
        value: 'An Error Occurred While Retrieving The Document',
      },
    ]);
  }
};
