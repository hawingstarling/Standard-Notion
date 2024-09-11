import { NextRequest, NextResponse } from 'next/server';
import { CreateDocument } from 'prisma/Controllers/Documents/create';
import { GetSidebar } from 'prisma/Controllers/Documents/list';
import { UpdateDocument } from 'prisma/Controllers/Documents/update';

export async function GET(req: NextRequest,) {
  return GetSidebar(req);
}

export async function POST(req: NextRequest) {
  return CreateDocument(req);
}

export async function PUT(req: NextRequest) {
    return UpdateDocument(req);
};
