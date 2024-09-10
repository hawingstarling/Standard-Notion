import { NextRequest } from "next/server";
import { Archive } from "prisma/Controllers/Documents/update";

export async function PUT(
    req: NextRequest, 
) {
    return Archive(req)
}
