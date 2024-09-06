import { Document } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from "next";
import { ShowDocument, ShowResponse } from '../../../../prisma/Controllers/Documents/show';

type DocumentResponse = ShowResponse

export interface NextApiRequestExtended extends NextApiRequest {
    query: { parentDocument: string, id: string };
}

export default async function handler(req: NextApiRequestExtended, res: NextApiResponse<DocumentResponse>) {
    switch (req.method) {
        case 'GET':
            return ShowDocument(req, res)
        default:
            return res.status(405).json({ message: `HTTP method ${req.method ?? 'unknown'} not allowed` })
    }
}