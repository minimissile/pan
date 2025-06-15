import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

// POST /api/resources/[id]/views - 增加浏览量
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // 获取当前资源
    const resourceResult = await db.getResourceById(id);
    if (!resourceResult.success || !resourceResult.data) {
      return NextResponse.json(
        {
          success: false,
          error: '资源不存在'
        },
        { status: 404 }
      );
    }
    
    const resource = resourceResult.data;
    
    // 解析当前浏览量
    const currentViews = parseInt(resource.views.replace(/[^0-9]/g, '')) || 0;
    const newViews = currentViews + 1;
    
    // 格式化新的浏览量
    let formattedViews: string;
    if (newViews >= 1000000) {
      formattedViews = `${(newViews / 1000000).toFixed(1)}M`;
    } else if (newViews >= 1000) {
      formattedViews = `${(newViews / 1000).toFixed(1)}k`;
    } else {
      formattedViews = newViews.toString();
    }
    
    // 更新资源
    const updateResult = await db.updateResource(id, {
      views: formattedViews
    });
    
    if (updateResult.success) {
      return NextResponse.json(updateResult);
    } else {
      return NextResponse.json(updateResult, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `更新浏览量失败: ${error}`
      },
      { status: 500 }
    );
  }
}