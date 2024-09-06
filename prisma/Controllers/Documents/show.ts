import { Document } from "@prisma/client"
import { ResponseError } from "../../../src/Utils/constants"
import { NextApiResponse, NextApiRequest } from "next"
import { getAuth } from '@clerk/nextjs/server'

export interface NextApiRequestExtended extends NextApiRequest {
    query: { parentDocument: string };
}

export type ShowResponse = Document | ResponseError

export const ShowDocument = async (req: NextApiRequestExtended, res: NextApiResponse<ShowResponse>) => {
    const { userId } = getAuth(req)
    
    try {
        const queryParamParentDocument = req.query.parentDocument;

        const document = await prisma?.document.findMany({
            where: {
                userId: userId as string,
                parentDocumentId: queryParamParentDocument,
                AND: {
                    isArchived: false
                },
            },
        })

        if (document === null) {
            return res.status(404).json({ message: `ParentDocumentId ${queryParamParentDocument} can't be found` })

        }
        return res.status(200).json(document as unknown as Document)
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred while retrieving the document' })
    }
}