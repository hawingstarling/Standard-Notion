import { getAuth } from '@clerk/nextjs/server';
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseError } from "../../../src/Utils/constants";
import prisma from "../../prismaClient";

export type ListResponse = ReadonlyArray<Document> | ResponseError

export const GetSidebar = async (_req: NextApiRequest, res: NextApiResponse<ListResponse>) => {
    try {
        const { userId } = getAuth(_req);

        if (!userId) {
            return res.status(401).json({
                message: "Not authenticated"
            })
        }

        const { parentDocumentId } = _req.query;

        const documents = await prisma.document.findMany(
            {
            where: {
                userId,
                parentDocumentId: parentDocumentId as string,
                isArchived: false
            },
        }
    )
        return res.status(200).json(documents as unknown as ReadonlyArray<Document>)
    } catch (error) {
        return res.status(400).json({ message: `An error occurred while retrieving the documents ${error}`})
    }
}

export const ListDocuments = async (_req: NextApiRequest, res: NextApiResponse<ListResponse>) => {
    try {
        const { userId } = getAuth(_req);

        if (!userId) {
            return res.status(401).json({
                message: "Not authenticated"
            })
        }

        const documents = await prisma.document.findMany({
            where: { userId }
        })

        return res.status(200).json(documents as unknown as ReadonlyArray<Document>)
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred while retrieving the documents'})
    }
}