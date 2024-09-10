import { getAuth } from '@clerk/nextjs/server';
import prisma from '../../prismaClient';
import { BadRequestResponse, ForbiddenResponse, SuccessResponseWithMsg, UnauthorizedResponse } from '@/core/ApiResponse';
import { NextRequest } from 'next/server';

export const Remove = async (
  req: NextRequest,
  documentId: string
) => {
  try {
    const { userId } = getAuth(req);

    if (!documentId) {
      return new BadRequestResponse([
        {
          key: 'id',
          value: 'DocumentId Is Required',
        },
      ]).send();
    }

    if (!userId) {
      return new UnauthorizedResponse([
        {
          key: 'authentication',
          value: 'Not Authentication',
        },
      ]).send();
    }

    const existingDocument = await prisma.document.findUnique({
      where: {
        id: documentId,
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
            value: 'Unauthorized'
        }
      ]).send();
    }

    const document = await prisma.document.delete({
      where: { 
        id: documentId 
      },
    });

    return new SuccessResponseWithMsg('200 Deleted', document).send();
  } catch (error) {
    return new BadRequestResponse([
			{
				key: 'delete',
				value: 'An Error Occurred While Deleting The Document'
			}
		]).send();
  }
};
