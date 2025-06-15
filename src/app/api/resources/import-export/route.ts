import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

// GET /api/resources/import-export - 导出数据
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    const includeCategories = searchParams.get('includeCategories') === 'true';
    const includeStats = searchParams.get('includeStats') === 'true';
    
    const result = await db.exportData({
      format: format as 'json' | 'csv',
      includeCategories,
      includeStats
    });
    
    if (result.success) {
      const headers: Record<string, string> = {
        'Content-Type': format === 'csv' ? 'text/csv' : 'application/json',
        'Content-Disposition': `attachment; filename="resources_export_${new Date().toISOString().split('T')[0]}.${format}"`
      };
      
      return new NextResponse(result.data, {
        status: 200,
        headers
      });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `导出数据失败: ${error}`
      },
      { status: 500 }
    );
  }
}

// POST /api/resources/import-export - 导入数据
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, options } = body;
    
    if (!data) {
      return NextResponse.json(
        {
          success: false,
          error: '无效的导入数据'
        },
        { status: 400 }
      );
    }
    
    const result = await db.importData(data, options);
    
    if (result.success) {
      return NextResponse.json(result, { status: 201 });
    } else {
      return NextResponse.json(result, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: `导入数据失败: ${error}`
      },
      { status: 500 }
    );
  }
}