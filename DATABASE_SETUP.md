# 资源数据库系统设置指南

本项目实现了一个基于JSON文件的资源数据库系统，支持资源管理、分类配置和统计功能。

## 📁 文件结构

```
src/
├── types/
│   └── resource.ts              # 资源相关类型定义
├── lib/
│   ├── database.ts              # 数据库核心类
│   └── resourceService.ts       # 客户端服务类
├── hooks/
│   └── useResourceDatabase.ts   # React Hook
├── app/api/resources/
│   ├── route.ts                 # 资源API路由
│   ├── [id]/route.ts           # 单个资源操作
│   ├── [id]/views/route.ts     # 浏览量统计
│   ├── [id]/downloads/route.ts # 下载量统计
│   ├── categories/route.ts     # 分类管理
│   ├── categories/[id]/route.ts # 单个分类操作
│   ├── stats/route.ts          # 统计信息
│   ├── batch/route.ts          # 批量操作
│   ├── import-export/route.ts  # 数据导入导出
│   └── search/route.ts         # 搜索功能
data/
├── resources.json              # 资源数据文件
├── categories.json             # 分类配置文件
└── stats.json                  # 统计信息文件
```

## 🚀 快速开始

### 1. 数据文件初始化

项目已自动创建以下JSON数据文件：

- `data/resources.json` - 存储所有资源数据
- `data/categories.json` - 存储分类配置
- `data/stats.json` - 存储统计信息

### 2. 基本使用

#### 在React组件中使用Hook

```tsx
import { useResourceDatabase } from '@/hooks/useResourceDatabase';

function MyComponent() {
  const {
    resources,
    categories,
    loading,
    error,
    createResource,
    updateResource,
    deleteResource,
    searchResources
  } = useResourceDatabase();

  // 创建新资源
  const handleCreateResource = async () => {
    const newResource = {
      title: '新资源',
      category: 'movie',
      description: '资源描述',
      image: '/images/placeholder.jpg',
      rating: 8.5,
      year: 2024,
      episodes: null,
      views: '0',
      downloads: '0',
      uploadDate: new Date().toISOString().split('T')[0],
      tags: ['标签1', '标签2'],
      status: 'active',
      featured: false
    };
    
    await createResource(newResource);
  };

  return (
    <div>
      {loading && <p>加载中...</p>}
      {error && <p>错误: {error}</p>}
      {resources.map(resource => (
        <div key={resource.id}>{resource.title}</div>
      ))}
    </div>
  );
}
```

#### 直接使用API

```tsx
// 获取所有资源
const response = await fetch('/api/resources');
const result = await response.json();

// 创建新资源
const response = await fetch('/api/resources', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(resourceData)
});

// 搜索资源
const response = await fetch('/api/resources/search?q=关键词&category=movie');
const result = await response.json();
```

## 📊 数据结构

### 资源 (Resource)

```typescript
interface Resource {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  rating: number;
  year: number;
  episodes?: number | null;
  views: string;
  downloads: string;
  uploadDate: string;
  tags: string[];
  status: 'active' | 'inactive' | 'pending';
  featured: boolean;
}
```

### 分类 (ResourceCategory)

```typescript
interface ResourceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  isActive: boolean;
  order: number;
}
```

## 🔧 API 端点

### 资源管理

- `GET /api/resources` - 获取资源列表
- `POST /api/resources` - 创建新资源
- `GET /api/resources/[id]` - 获取单个资源
- `PUT /api/resources/[id]` - 更新资源
- `DELETE /api/resources/[id]` - 删除资源
- `POST /api/resources/[id]/views` - 增加浏览量
- `POST /api/resources/[id]/downloads` - 增加下载量

### 分类管理

- `GET /api/resources/categories` - 获取所有分类
- `POST /api/resources/categories` - 创建新分类
- `GET /api/resources/categories/[id]` - 获取单个分类
- `PUT /api/resources/categories/[id]` - 更新分类
- `DELETE /api/resources/categories/[id]` - 删除分类

### 其他功能

- `GET /api/resources/search` - 搜索资源
- `GET /api/resources/stats` - 获取统计信息
- `POST /api/resources/batch` - 批量操作
- `GET /api/resources/import-export` - 导出数据
- `POST /api/resources/import-export` - 导入数据

## 🎯 高级功能

### 1. 分类配置

可以通过API动态添加、修改和删除分类：

```typescript
// 添加新分类
const newCategory = {
  id: 'documentary',
  name: '纪录片',
  description: '纪录片资源',
  icon: '📖',
  color: '#27ae60',
  isActive: true,
  order: 6
};

fetch('/api/resources/categories', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newCategory)
});
```

### 2. 搜索功能

支持多条件搜索：

```typescript
// 搜索参数
const searchParams = new URLSearchParams({
  q: '搜索关键词',
  category: 'movie',
  tags: 'tag1,tag2',
  page: '1',
  limit: '20',
  sortBy: 'rating',
  sortOrder: 'desc'
});

fetch(`/api/resources/search?${searchParams}`);
```

### 3. 批量操作

支持批量创建、更新和删除：

```typescript
const batchOperations = [
  {
    type: 'create',
    data: { /* 资源数据 */ }
  },
  {
    type: 'update',
    id: 'resource-id',
    data: { /* 更新数据 */ }
  },
  {
    type: 'delete',
    id: 'resource-id'
  }
];

fetch('/api/resources/batch', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ operations: batchOperations })
});
```

### 4. 数据导入导出

```typescript
// 导出数据
fetch('/api/resources/import-export?format=json&includeCategories=true')
  .then(response => response.blob())
  .then(blob => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resources_export.json';
    a.click();
  });

// 导入数据
const importData = {
  data: { /* 导入的数据 */ },
  options: {
    overwrite: false,
    validateData: true
  }
};

fetch('/api/resources/import-export', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(importData)
});
```

## 🛠️ 开发指南

### 添加新的资源类型

1. 在 `data/categories.json` 中添加新分类
2. 更新 `Resource` 接口（如需要）
3. 在前端组件中处理新类型的显示逻辑

### 扩展数据库功能

1. 在 `ResourceDatabase` 类中添加新方法
2. 在 `ResourceService` 中添加对应的客户端方法
3. 创建相应的API路由
4. 更新 `useResourceDatabase` Hook

### 性能优化建议

1. 对于大量数据，考虑实现分页加载
2. 使用缓存机制减少文件读写
3. 实现数据索引提高搜索性能
4. 考虑使用真实数据库（如SQLite）替代JSON文件

## 🔒 安全考虑

1. 验证所有输入数据
2. 实现适当的错误处理
3. 限制文件上传大小
4. 实现访问控制（如需要）

## 📝 注意事项

1. JSON文件存储适合小到中等规模的数据
2. 并发写入可能导致数据丢失，考虑实现文件锁
3. 定期备份数据文件
4. 监控文件大小，避免过大影响性能

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个数据库系统！

## 📄 许可证

本项目采用MIT许可证。