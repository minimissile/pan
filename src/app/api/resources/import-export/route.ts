import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/database';

// GET /api/resources/import-export - 导出数据
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'json';
    const includeCategories = searchParams.get('includeCategories') === 'true';
    const includeStats = searchParams.get('includeStats') === 'true';
    
    const result = await db.exportData();
    
    if (result.success && result.data) {
      const headers: Record<string, string> = {
        'Content-Type': format === 'csv' ? 'text/csv' : 'application/json',
        'Content-Disposition': `attachment; filename="resources_export_${new Date().toISOString().split('T')[0]}.${format}"`
      };
      
      let exportData: any = result.data;

      if (format === 'csv') {
        // 转换为CSV格式
        const resources = result.data.resources;
        if (!resources || resources.length === 0) {
          return new NextResponse('No resources to export', { status: 200, headers });
        }
        const csvHeader = 'id,title,category,description,image,rating,year,episodes,views,downloads,uploadDate,tags,fileSize,fileFormat,downloadUrl,previewUrl,status,featured,createdAt,updatedAt';
        const csvBody = resources.map(row => {
          const values = Object.values(row).map(value => {
            const str = String(value);
            // 处理包含逗号或引号的字段
            if (str.includes(',') || str.includes('"')) {
              return `"${str.replace(/"/g, '""')}"`;
            }
            return str;
          });
          return values.join(',');
        }).join('\n');
        exportData = `${csvHeader}\n${csvBody}`;
      } else {
        exportData = JSON.stringify(result.data, null, 2);
      }

      return new NextResponse(exportData, {
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
    const { resources, categories, options } = body;
    
    if (!resources && !categories) {
      return NextResponse.json(
        {
          success: false,
          error: '无效的导入数据'
        },
        { status: 400 }
      );
    }
    
    const result = await db.importData({ resources, categories });
    
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