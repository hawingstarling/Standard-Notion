import { GetSearch } from "prisma/Controllers/Documents/list";
import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export async function GET(
    req: NextRequest, 
) {
    return GetSearch(req)
}
