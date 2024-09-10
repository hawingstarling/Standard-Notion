import { GetTrash } from "prisma/Controllers/Documents/list";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest, 
) {
    return GetTrash(req)
}
