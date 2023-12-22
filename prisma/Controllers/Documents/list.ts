import { NextApiRequest, NextApiResponse } from "next";
import { ResponseError } from "../../../src/Utils/constants";
import prisma from "../../prismaClient";

export type ListReponse = ReadonlyArray<Document> | ResponseError

export const ListDocuments = async (_req: NextApiRequest, res: NextApiResponse<ListReponse>) => {
    try {
        const documents = await prisma.document.findMany()

        return res.status(200).json(documents)
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred while retrieving the documents'})
    }
}