import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

// POST /api/resources/[id]/downloads - 增加下载量
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
    
    // 解析当前下载量
    const currentDownloads = parseInt(resource.downloads.replace(/[^0-9]/g, '')) || 0;
    const newDownloads = currentDownloads + 1;
    
    // 格式化新的下载量
    let formattedDownloads: string;
    if (newDownloads >= 1000000) {
      formattedDownloads = `${(newDownloads / 1000000).toFixed(1)}M`;
    } else if (newDownloads >= 1000) {
      formattedDownloads = `${(newDownloads / 1000).toFixed(1)}k`;
    } else {
      formattedDownloads = newDownloads.toString();
    }
    
    // 更新资源
    const updateResult = await db.updateResource(id, {
      downloads: formattedDownloads
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
        error: `更新下载量失败: ${error}`
      },
      { status: 500 }
    );
  }
}