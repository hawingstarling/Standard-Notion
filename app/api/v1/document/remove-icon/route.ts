import { NextRequest } from "next/server";
import { RemoveIcon } from "prisma/Controllers/Documents/update";

export async function PUT(req: NextRequest) {
    return RemoveIcon(req);
};