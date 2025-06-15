import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

// GET /api/resources/search - 搜索资源
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sortBy = searchParams.get('sortBy') || 'uploadDate';
    const sortOrder = searchParams.get('sortOrder') || 'desc';
    
    if (!query.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: '搜索关键词不能为空'
        },
        { status: 400 }
      );
    }
    
    const searchQuery = {
      search: query,
      category: category || undefined,
      tags: tags.length > 0 ? tags : undefined,
      page,
      limit,
      sortBy: sortBy as any,
      sortOrder: sortOrder as 'asc' | 'desc'
    };
    
    const result = await db.queryResources(searchQuery);
    
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `搜索失败: ${error}`
      },
      { status: 500 }
    );
  }
}