import { getAuth } from '@clerk/nextjs/server';
import { ResponseError } from "@/Utils/constants";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prismaClient";

export type UpdateResponse = null | ResponseError;

export interface NextApiRequestExtended extends NextApiRequest {
    query: { id: string };
}

export const archive = async (req: NextApiRequestExtended, res: NextApiResponse<UpdateResponse>) => {
    try {
        const { userId } = getAuth(req);

        if (!userId) {
            return res.status(401).json({
                message: "Not authenticated"
            })
        }

        const { id } = req.query;
        const existingDocument = await prisma.document.findUnique({
            where: {
                id
            }
        })

        if (!existingDocument) {
            return res.status(404).json({
                message: 'Document Not Found'
            })
        }

        if (existingDocument.userId !== userId) {
            return res.status(403).json({ message: 'Unauthorized' });
          }

        const recursiveArchive = async (documentId: string) => {
            const children = await prisma.document.findMany({
                where: {
                    parentDocumentId: documentId
                }
            });

            await prisma.document.update({
                where: { id: documentId },
                data: { isArchived: true }
            })

            for (const child of children) {
                await recursiveArchive(child.id)
            }
        }
        await recursiveArchive(id as string);

        return res.status(200).json({
            message: 'Document and its children archived successfully'
        })
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred while archiving the document' });
    }
}