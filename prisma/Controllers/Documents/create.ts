import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseError } from "../../../src/Utils/constants";
import prisma from "../../prismaClient";
import { getAuth } from '@clerk/nextjs/server';

export type CreateResponse = null | ResponseError

interface NextApiRequestExtended extends NextApiRequest {
    body: Prisma.DocumentCreateInput
}

export const CreateDocument = async (req: NextApiRequestExtended, res: NextApiResponse<CreateResponse>) => {
    try {
        const { userId } = getAuth(req);
        const {
            title,
            parentDocumentId,
        } = req.body;

        if (!userId) {
            return res.status(401).json({
                message: "Not authenticated"
            })
        }

        await prisma.document.create({
            data: {
                title,
                userId,
                isArchived: false,
                isPublished: false,
                parentDocumentId: parentDocumentId ?? null,
            }
        })

        return res.status(201).json(null)
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred while creating the user'})
    }
}
