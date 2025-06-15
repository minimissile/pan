// 资源类型定义
export interface Resource {
  id: string;
  title: string;
  category: string;
  description: string;
  image?: string;
  rating: number;
  year: number;
  episodes?: number | null;
  views: string;
  downloads: string;
  uploadDate: string;
  tags: string[];
  fileSize?: number; // 文件大小（字节）
  fileFormat?: string; // 文件格式
  downloadUrl?: string; // 下载链接
  previewUrl?: string; // 预览链接
  status: 'active' | 'inactive' | 'pending'; // 资源状态
  featured?: boolean; // 是否为精选资源
  createdAt: string;
  updatedAt: string;
}

// 资源分类类型定义
export interface ResourceCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon?: string;
  color?: string;
  parentId?: string | null; // 父分类ID，支持多级分类
  order: number; // 排序
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// 资源分类配置类型
export interface ResourceCategoryConfig {
  categories: ResourceCategory[];
  maxDepth: number; // 最大分类层级
  defaultCategory?: string; // 默认分类
}

// 资源查询参数类型
export interface ResourceQuery {
  category?: string;
  tags?: string[];
  year?: number;
  rating?: number;
  search?: string;
  status?: Resource['status'];
  featured?: boolean;
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'rating' | 'year' | 'uploadDate' | 'views' | 'downloads';
  sortOrder?: 'asc' | 'desc';
}

// 资源统计类型
export interface ResourceStats {
  totalResources: number;
  totalCategories: number;
  totalViews: number;
  totalDownloads: number;
  categoryStats: {
    categoryId: string;
    categoryName: string;
    count: number;
    views: number;
    downloads: number;
  }[];
  recentUploads: Resource[];
  popularResources: Resource[];
}

// 数据库操作结果类型
export interface DatabaseResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 资源导入/导出类型
export interface ResourceImportData {
  resources: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>[];
  categories?: Omit<ResourceCategory, 'id' | 'createdAt' | 'updatedAt'>[];
}

export interface ResourceExportData {
  resources: Resource[];
  categories: ResourceCategory[];
  exportDate: string;
  version: string;
}

// 资源备份类型
export interface ResourceBackup {
  id: string;
  name: string;
  description?: string;
  data: ResourceExportData;
  createdAt: string;
  size: number; // 备份文件大小
}

// 资源验证错误类型
export interface ResourceValidationError {
  field: string;
  message: string;
  value?: any;
}

// 批量操作类型
export interface BatchOperation {
  action: 'create' | 'update' | 'delete' | 'activate' | 'deactivate';
  resourceIds?: string[];
  categoryIds?: string[];
  data?: Partial<Resource> | Partial<ResourceCategory>;
}

export interface BatchOperationResult {
  success: boolean;
  processed: number;
  failed: number;
  errors: {
    id: string;
    error: string;
  }[];
}