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
    
    const results = [];
    for (const operation of operations) {
      const result = await db.batchOperation(operation);
      results.push(result);
    }
    
    const overallResult = {
      success: results.every(r => r.success),
      results: results.map(r => r.data || { success: r.success, error: r.error })
    };

    return NextResponse.json(overallResult);
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