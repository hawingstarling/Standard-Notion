import { CreateResponse, CreateDocument } from './../../../../prisma/Controllers/Documents/create';
import { ListReponse, ListDocuments } from './../../../../prisma/Controllers/Documents/list';
import { NextApiRequest, NextApiResponse } from "next";

type DocumentResponse = ListReponse | CreateResponse

export default async function handler(req: NextApiRequest, res: NextApiResponse<DocumentResponse>) {
    switch (req.method) {
        case 'GET': 
            return ListDocuments(req, res)
        case 'POST':
            return CreateDocument(req, res)
        default:
            return res.status(405).json({ message: `HTTP method ${req.method ?? 'unknown'} not allowed` })
    }
}