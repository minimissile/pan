import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

// GET /api/resources/stats - 获取资源统计信息
export async function GET(request: NextRequest) {
  try {
    const stats = await db.getStats();
    
    return NextResponse.json({
      success: true,
      data: stats
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `获取统计信息失败: ${error}`
      },
      { status: 500 }
    );
  }
}

// PUT /api/resources/stats - 更新统计信息
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    await db.updateStats();
    const result = db.getStats();
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `更新统计信息失败: ${error}`
      },
      { status: 500 }
    );
  }
}