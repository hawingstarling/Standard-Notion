import { NextRequest } from "next/server";
import { RemoveCoverImage } from "prisma/Controllers/Documents/update";

export async function PUT(req: NextRequest) {
    return RemoveCoverImage(req);
};
