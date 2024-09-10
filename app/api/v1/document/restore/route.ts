import { NextApiResponse } from "next";
import { NextRequest } from "next/server";
import { Restore } from "prisma/Controllers/Documents/update";


export async function PUT(
    req: NextRequest, 
) {
    return Restore(req)
}
