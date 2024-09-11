import { NextRequest, NextResponse } from "next/server";
import { Remove } from "prisma/Controllers/Documents/destroy";
import { ShowDocument } from "prisma/Controllers/Documents/show";

export async function GET(
    req: NextRequest, 
    { params }: { params: { documentId: string } }
) {
    const documentId = params.documentId;
    
    return ShowDocument(req, documentId)
}

export async function DELETE(
    req: NextRequest, 
    { params }: { params: { documentId: string } }
) {
    const documentId = params.documentId;

    return Remove(req, documentId);
}