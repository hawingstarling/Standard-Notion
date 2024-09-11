import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prismaClient';
import {
  ApiResponse,
  BadRequestResponse,
  InternalErrorResponse,
  SuccessResponseWithMsg,
  UnauthorizedResponse,
} from '@/core/ApiResponse';
import { NextRequest } from 'next/server';

export const GetSidebar = async (_req: NextRequest) => {
  const { userId } = getAuth(_req);
  const { searchParams } = new URL(_req.url);

  const parentDocumentId = searchParams.get('parentDocumentId');

  try {
    if (!userId) {
      return new UnauthorizedResponse([
        {
          key: 'authentication',
          value: 'Not Authentication',
        },
      ]).send();
    }


    const documents = await prisma.document.findMany({
      where: {
        userId,
        parentDocumentId: parentDocumentId ? (parentDocumentId as string) : null,
        isArchived: false,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return new SuccessResponseWithMsg(
      '200 OK',
      documents,
    ).send();

  } catch (error) {
    return new InternalErrorResponse([
      {
        key: 'internal',
        value: 'An Error Occurred While Retrieving The Documents',
      },
    ]).send();
  }
};

export const GetTrash = async (_req: NextRequest) => {
  try {
    const { userId } = getAuth(_req);

    if (!userId) {
      return new UnauthorizedResponse([
        {
          key: 'authentication',
          value: 'Not Authentication',
        },
      ]).send();
    }

    const documents = await prisma.document.findMany({
      where: {
        userId,
        isArchived: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return new SuccessResponseWithMsg(
      '200 OK',
      documents as unknown as ReadonlyArray<Document>,
    ).send();
  } catch (error) {
    return new InternalErrorResponse([
      {
        key: 'internal',
        value: 'An Error Occurred While Fetching Archived Documents',
      },
    ]).send();
  }
};

export const GetSearch = async (_req: NextRequest) => {
  try {
    const { userId } = getAuth(_req);

    if (!userId) {
      return new UnauthorizedResponse([
        {
          key: 'authentication',
          value: 'Not Authentication',
        },
      ]).send();
    }

    const documents = await prisma.document.findMany({
      where: {
        userId: userId,
        isArchived: false,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return new SuccessResponseWithMsg(
      '200 OK',
      documents as unknown as ReadonlyArray<Document>,
    ).send();
  } catch (error) {
    return new InternalErrorResponse([
      {
        key: 'internal',
        value: 'An Error Occurred While Retrieving The Documents',
      },
    ]).send();
  }
};

export const ListDocuments = async (_req: NextRequest) => {
  try {
    const { userId } = getAuth(_req);

    if (!userId) {
      return new UnauthorizedResponse([
        {
          key: 'authentication',
          value: 'Not Authentication',
        },
      ]).send();
    }

    const documents = await prisma.document.findMany({
      where: {
        userId,
      },
    });

    return new SuccessResponseWithMsg(
      '200 OK',
      documents as unknown as ReadonlyArray<Document>,
    ).send();
  } catch (error) {
    return new BadRequestResponse([
      {
        key: 'get',
        value: 'An Error Occurred While Retrieving The Documents',
      },
    ]).send();
  }
};
