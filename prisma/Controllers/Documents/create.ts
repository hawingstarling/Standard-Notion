import { Prisma, Document as PrismaDocument } from '@prisma/client';
import prisma from '../../prismaClient';
import { getAuth } from '@clerk/nextjs/server';
import { BadRequestResponse, CreatedResponse, SuccessResponseWithMsg, UnauthorizedResponse } from '@/core/ApiResponse';
import { NextRequest } from 'next/server';

export const CreateDocument = async (
  req: NextRequest,
) => {
  const { userId } = getAuth(req);
  const { 
    title, 
    parentDocumentId 
  }: Prisma.DocumentCreateInput = await req.json();

  try {
    if (!userId) {
			return new UnauthorizedResponse([
				{
					key: 'authentication',
					value: 'Not Authentication'
				}
			]).send();
    }

    const document: PrismaDocument = await prisma.document.create({
      data: {
        title,
        userId,
        isArchived: false,
        isPublished: false,
        parentDocumentId: parentDocumentId ?? null,
      },
    });

    return new SuccessResponseWithMsg(
      '201 Created', 
      document
    ).send();
  } catch (error) {
		return new BadRequestResponse([
			{
				key: 'create',
				value: 'An Error Occurred While Creating The Document'
			}
		]).send();
  }
};
