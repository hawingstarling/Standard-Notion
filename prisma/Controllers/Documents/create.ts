import { Prisma } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseError } from "../../../src/Utils/constants";
import prisma from "../../prismaClient";

export type CreateResponse = null | ResponseError

interface NextApiRequestExtended extends NextApiRequest {
    body: Prisma.DocumentCreateInput
}

export const CreateDocument = async (req: NextApiRequestExtended, res: NextApiResponse<CreateResponse>) => {
    try {
        await prisma.document.create({
            data: req.body
        })

        return res.status(201).json(null)
    } catch (error) {
        return res.status(400).json({ message: 'An error occurred while creating the user'})
    }
}