import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

// POST /api/resources/batch - 执行批量操作
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { operations } = body;
    
    if (!operations || !Array.isArray(operations)) {
      return NextResponse.json(
        {
          success: false,
          error: '无效的批量操作数据'
        },
        { status: 400 }
      );
    }
    
    const result = await db.batchOperation(operations);
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `批量操作失败: ${error}`
      },
      { status: 500 }
    );
  }
}