import { getTrendList } from '@/utils/request';
import { NextRequest, NextResponse } from 'next/server';

interface iParams {
  code: string;
}

export async function GET(request: NextRequest, context: {params: iParams}) {
  if (!context || !context.params || !context.params.code) {
    return NextResponse.json(null);
  }
  
  const data = await getTrendList(context.params.code);
  return NextResponse.json(data.default);
}
