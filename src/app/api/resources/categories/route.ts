import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

// GET /api/resources/categories - 获取所有分类
export async function GET(request: NextRequest) {
  try {
    const categories = db.getCategories();
    
    // 按order字段排序
    const sortedCategories = categories.sort((a, b) => a.order - b.order);
    
    return NextResponse.json({
      success: true,
      data: sortedCategories
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `获取分类失败: ${error}`
      },
      { status: 500 }
    );
  }
}

// POST /api/resources/categories - 创建新分类
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // 设置默认值
    const categoryData = {
      isActive: true,
      order: 999,
      ...body
    };
    
    const result = await db.createCategory(categoryData);
    
    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `创建分类失败: ${error}`
      },
      { status: 500 }
    );
  }
}