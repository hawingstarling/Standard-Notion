import { NextRequest, NextResponse } from 'next/server';
import { CreateDocument } from 'prisma/Controllers/Documents/create';
import { GetSidebar } from 'prisma/Controllers/Documents/list';


export async function GET(
    req: NextRequest, 
    res: NextResponse
) {
    return GetSidebar(req, res)
}

export async function POST(
    req: NextRequest, 
) {
    return CreateDocument(req);
}
