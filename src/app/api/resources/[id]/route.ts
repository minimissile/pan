import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

// GET /api/resources/[id] - 根据ID获取资源
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const result = await db.getResourceById(id);
    
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 404 });
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

// PUT /api/resources/[id] - 更新资源
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const result = await db.updateResource(id, body);
    
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `更新资源失败: ${error}`
      },
      { status: 500 }
    );
  }
}

// DELETE /api/resources/[id] - 删除资源
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const result = await db.deleteResource(id);
    
    if (result.success) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `删除资源失败: ${error}`
      },
      { status: 500 }
    );
  }
}