import { Archive } from '../../../../prisma/Controllers/Documents/update';
import { CreateResponse, CreateDocument } from './../../../../prisma/Controllers/Documents/create';
import { ListResponse, GetSidebar } from './../../../../prisma/Controllers/Documents/list';
import { NextApiRequest, NextApiResponse } from "next";

type DocumentResponse = ListResponse | CreateResponse

export default async function handler(req: NextApiRequest, res: NextApiResponse<DocumentResponse>) {
    switch (req.method) {
        case 'GET': 
            return GetSidebar(req, res)
        case 'POST':
            return CreateDocument(req, res)
        case 'PUT': 
            // return Archive(req, res);
        default:
            return res.status(405).json({ message: `HTTP method ${req.method ?? 'unknown'} not allowed` })
    }
}