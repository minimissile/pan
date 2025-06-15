import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';
import { ResourceQuery } from '@/types/resource';

// GET /api/resources - 获取资源列表或查询资源
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // 构建查询参数
    const query: ResourceQuery = {};
    
    if (searchParams.get('category')) {
      query.category = searchParams.get('category')!;
    }
    
    if (searchParams.get('search')) {
      query.search = searchParams.get('search')!;
    }
    
    if (searchParams.get('year')) {
      query.year = parseInt(searchParams.get('year')!);
    }
    
    if (searchParams.get('rating')) {
      query.rating = parseFloat(searchParams.get('rating')!);
    }
    
    if (searchParams.get('status')) {
      query.status = searchParams.get('status') as any;
    }
    
    if (searchParams.get('featured')) {
      query.featured = searchParams.get('featured') === 'true';
    }
    
    if (searchParams.get('page')) {
      query.page = parseInt(searchParams.get('page')!);
    }
    
    if (searchParams.get('limit')) {
      query.limit = parseInt(searchParams.get('limit')!);
    }
    
    if (searchParams.get('sortBy')) {
      query.sortBy = searchParams.get('sortBy') as any;
    }
    
    if (searchParams.get('sortOrder')) {
      query.sortOrder = searchParams.get('sortOrder') as any;
    }
    
    // 处理标签数组
    const tags = searchParams.getAll('tags');
    if (tags.length > 0) {
      query.tags = tags;
    }
    
    const result = await db.queryResources(query);
    
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `获取资源失败: ${error}`
      },
      { status: 500 }
    );
  }
}

// POST /api/resources - 创建新资源
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 设置默认值
    const resourceData = {
      status: 'active',
      featured: false,
      views: '0',
      downloads: '0',
      uploadDate: new Date().toISOString().split('T')[0],
      ...body
    };
    
    const result = await db.createResource(resourceData);
    
    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `创建资源失败: ${error}`
      },
      { status: 500 }
    );
  }
}