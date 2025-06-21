import fs from 'fs';
import path from 'path';
import { 
  Resource, 
  ResourceCategory, 
  ResourceQuery, 
  ResourceStats, 
  DatabaseResult, 
  ResourceImportData, 
  ResourceExportData,
  BatchOperation,
  BatchOperationResult,
  ResourceValidationError
} from '@/types/resource';

// 数据库文件路径配置
const DB_DIR = path.join(process.cwd(), 'data');
const RESOURCES_FILE = path.join(DB_DIR, 'resources.json');
const CATEGORIES_FILE = path.join(DB_DIR, 'categories.json');
const CONFIG_FILE = path.join(DB_DIR, 'config.json');
const STATS_FILE = path.join(DB_DIR, 'stats.json');

// 确保数据目录存在
function ensureDataDirectory(): void {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
}

// 读取JSON文件
function readJsonFile<T>(filePath: string, defaultValue: T): T {
  try {
    if (!fs.existsSync(filePath)) {
      return defaultValue;
    }
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    return defaultValue;
  }
}

// 写入JSON文件
function writeJsonFile<T>(filePath: string, data: T): boolean {
  try {
    ensureDataDirectory();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${filePath}:`, error);
    return false;
  }
}

// 生成唯一ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// 验证资源数据
function validateResource(resource: Partial<Resource>): ResourceValidationError[] {
  const errors: ResourceValidationError[] = [];
  
  if (!resource.title || resource.title.trim().length === 0) {
    errors.push({ field: 'title', message: '标题不能为空' });
  }
  
  if (!resource.category || resource.category.trim().length === 0) {
    errors.push({ field: 'category', message: '分类不能为空' });
  }
  
  if (!resource.description || resource.description.trim().length === 0) {
    errors.push({ field: 'description', message: '描述不能为空' });
  }
  
  if (resource.rating !== undefined && (resource.rating < 0 || resource.rating > 10)) {
    errors.push({ field: 'rating', message: '评分必须在0-10之间' });
  }
  
  if (resource.year !== undefined && (resource.year < 1900 || resource.year > new Date().getFullYear() + 5)) {
    errors.push({ field: 'year', message: '年份不合法' });
  }
  
  return errors;
}

// 验证分类数据
function validateCategory(category: Partial<ResourceCategory>): ResourceValidationError[] {
  const errors: ResourceValidationError[] = [];
  
  if (!category.name || category.name.trim().length === 0) {
    errors.push({ field: 'name', message: '分类名称不能为空' });
  }
  
  if (!category.slug || category.slug.trim().length === 0) {
    errors.push({ field: 'slug', message: '分类标识不能为空' });
  }
  
  if (category.slug && !/^[a-z0-9-]+$/.test(category.slug)) {
    errors.push({ field: 'slug', message: '分类标识只能包含小写字母、数字和连字符' });
  }
  
  return errors;
}

// 资源数据库类
export class ResourceDatabase {
  private static instance: ResourceDatabase;
  
  private constructor() {
    this.initializeDatabase();
  }
  
  public static getInstance(): ResourceDatabase {
    if (!ResourceDatabase.instance) {
      ResourceDatabase.instance = new ResourceDatabase();
    }
    return ResourceDatabase.instance;
  }
  
  // 初始化数据库
  private initializeDatabase(): void {
    ensureDataDirectory();
    
    // 初始化默认分类
    const categories = this.getCategories();
    if (categories.length === 0) {
      this.initializeDefaultCategories();
    }
    
    // 初始化配置
    const config = readJsonFile(CONFIG_FILE, {
      version: '1.0.0',
      maxDepth: 3,
      defaultCategory: 'other',
      autoBackup: true,
      backupInterval: 24 * 60 * 60 * 1000, // 24小时
    });
    writeJsonFile(CONFIG_FILE, config);
  }
  
  // 初始化默认分类
  private initializeDefaultCategories(): void {
    const defaultCategories: ResourceCategory[] = [
      {
        id: generateId(),
        name: '国剧',
        slug: 'chinese-drama',
        description: '国产电视剧',
        icon: '🎭',
        color: '#3B82F6',
        parentId: null,
        order: 1,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: generateId(),
        name: '科幻电影',
        slug: 'sci-fi-movie',
        description: '科幻类电影',
        icon: '🚀',
        color: '#8B5CF6',
        parentId: null,
        order: 2,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: generateId(),
        name: '科幻剧',
        slug: 'sci-fi-drama',
        description: '科幻类电视剧',
        icon: '🛸',
        color: '#06B6D4',
        parentId: null,
        order: 3,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: generateId(),
        name: '犯罪剧',
        slug: 'crime-drama',
        description: '犯罪悬疑类电视剧',
        icon: '🔍',
        color: '#EF4444',
        parentId: null,
        order: 4,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: generateId(),
        name: '古装电影',
        slug: 'costume-movie',
        description: '古装历史类电影',
        icon: '👑',
        color: '#F59E0B',
        parentId: null,
        order: 5,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: generateId(),
        name: '动漫',
        slug: 'anime',
        description: '动画片和动漫',
        icon: '🎨',
        color: '#10B981',
        parentId: null,
        order: 6,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: generateId(),
        name: '其他',
        slug: 'other',
        description: '其他类型资源',
        icon: '📁',
        color: '#6B7280',
        parentId: null,
        order: 999,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
    
    writeJsonFile(CATEGORIES_FILE, defaultCategories);
  }
  
  // 获取所有资源
  public getResources(): Resource[] {
    return readJsonFile<Resource[]>(RESOURCES_FILE, []);
  }
  
  // 获取所有分类
  public getCategories(): ResourceCategory[] {
    return readJsonFile<ResourceCategory[]>(CATEGORIES_FILE, []);
  }
  
  // 根据查询条件获取资源
  public queryResources(query: ResourceQuery = {}): DatabaseResult<{ resources: Resource[]; total: number }> {
    try {
      let resources = this.getResources();
      
      // 过滤条件
      if (query.category) {
        resources = resources.filter(r => r.category === query.category);
      }
      
      if (query.tags && query.tags.length > 0) {
        resources = resources.filter(r => 
          query.tags!.some(tag => r.tags.includes(tag))
        );
      }
      
      if (query.year) {
        resources = resources.filter(r => r.year === query.year);
      }
      
      if (query.rating) {
        resources = resources.filter(r => r.rating >= query.rating!);
      }
      
      if (query.status) {
        resources = resources.filter(r => r.status === query.status);
      }
      
      if (query.featured !== undefined) {
        resources = resources.filter(r => r.featured === query.featured);
      }
      
      if (query.search) {
        const searchTerm = query.search.toLowerCase();
        resources = resources.filter(r => 
          r.title.toLowerCase().includes(searchTerm) ||
          r.description.toLowerCase().includes(searchTerm) ||
          r.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
      }
      
      // 排序
      if (query.sortBy) {
        resources.sort((a, b) => {
          const aValue = a[query.sortBy!];
          const bValue = b[query.sortBy!];
          
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            return query.sortOrder === 'desc' 
              ? bValue.localeCompare(aValue)
              : aValue.localeCompare(bValue);
          }
          
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return query.sortOrder === 'desc' 
              ? bValue - aValue
              : aValue - bValue;
          }
          
          return 0;
        });
      }
      
      const total = resources.length;
      
      // 分页
      if (query.page && query.limit) {
        const start = (query.page - 1) * query.limit;
        const end = start + query.limit;
        resources = resources.slice(start, end);
      }
      
      return {
        success: true,
        data: { resources, total }
      };
    } catch (error) {
      return {
        success: false,
        error: `查询资源失败: ${error}`
      };
    }
  }
  
  // 根据ID获取资源
  public getResourceById(id: string): DatabaseResult<Resource> {
    try {
      const resources = this.getResources();
      const resource = resources.find(r => r.id === id);
      
      if (!resource) {
        return {
          success: false,
          error: '资源不存在'
        };
      }
      
      return {
        success: true,
        data: resource
      };
    } catch (error) {
      return {
        success: false,
        error: `获取资源失败: ${error}`
      };
    }
  }
  
  // 创建资源
  public createResource(resourceData: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>): DatabaseResult<Resource> {
    try {
      // 验证数据
      const errors = validateResource(resourceData);
      if (errors.length > 0) {
        return {
          success: false,
          error: `数据验证失败: ${errors.map(e => e.message).join(', ')}`
        };
      }
      
      const resources = this.getResources();
      const now = new Date().toISOString();
      
      const newResource: Resource = {
        ...resourceData,
        id: generateId(),
        createdAt: now,
        updatedAt: now
      };
      
      resources.push(newResource);
      
      if (!writeJsonFile(RESOURCES_FILE, resources)) {
        return {
          success: false,
          error: '保存资源失败'
        };
      }
      
      // 更新统计信息
      this.updateStats();
      
      return {
        success: true,
        data: newResource,
        message: '资源创建成功'
      };
    } catch (error) {
      return {
        success: false,
        error: `创建资源失败: ${error}`
      };
    }
  }
  
  // 更新资源
  public updateResource(id: string, updateData: Partial<Omit<Resource, 'id' | 'createdAt'>>): DatabaseResult<Resource> {
    try {
      const resources = this.getResources();
      const index = resources.findIndex(r => r.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: '资源不存在'
        };
      }
      
      // 验证更新数据
      const mergedData = { ...resources[index], ...updateData };
      const errors = validateResource(mergedData);
      if (errors.length > 0) {
        return {
          success: false,
          error: `数据验证失败: ${errors.map(e => e.message).join(', ')}`
        };
      }
      
      const updatedResource: Resource = {
        ...resources[index],
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      
      resources[index] = updatedResource;
      
      if (!writeJsonFile(RESOURCES_FILE, resources)) {
        return {
          success: false,
          error: '保存资源失败'
        };
      }
      
      // 更新统计信息
      this.updateStats();
      
      return {
        success: true,
        data: updatedResource,
        message: '资源更新成功'
      };
    } catch (error) {
      return {
        success: false,
        error: `更新资源失败: ${error}`
      };
    }
  }
  
  // 删除资源
  public deleteResource(id: string): DatabaseResult<boolean> {
    try {
      const resources = this.getResources();
      const index = resources.findIndex(r => r.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: '资源不存在'
        };
      }
      
      resources.splice(index, 1);
      
      if (!writeJsonFile(RESOURCES_FILE, resources)) {
        return {
          success: false,
          error: '删除资源失败'
        };
      }
      
      // 更新统计信息
      this.updateStats();
      
      return {
        success: true,
        data: true,
        message: '资源删除成功'
      };
    } catch (error) {
      return {
        success: false,
        error: `删除资源失败: ${error}`
      };
    }
  }
  
  // 根据ID获取分类
  public getCategoryById(id: string): DatabaseResult<ResourceCategory> {
    try {
      const categories = this.getCategories();
      const category = categories.find(c => c.id === id);
      
      if (!category) {
        return {
          success: false,
          error: '分类不存在'
        };
      }
      
      return {
        success: true,
        data: category
      };
    } catch (error) {
      return {
        success: false,
        error: `获取分类失败: ${error}`
      };
    }
  }
  
  // 根据slug获取分类
  public getCategoryBySlug(slug: string): DatabaseResult<ResourceCategory> {
    try {
      const categories = this.getCategories();
      const category = categories.find(c => c.slug === slug);
      
      if (!category) {
        return {
          success: false,
          error: '分类不存在'
        };
      }
      
      return {
        success: true,
        data: category
      };
    } catch (error) {
      return {
        success: false,
        error: `获取分类失败: ${error}`
      };
    }
  }
  
  // 创建分类
  public createCategory(categoryData: Omit<ResourceCategory, 'id' | 'createdAt' | 'updatedAt'>): DatabaseResult<ResourceCategory> {
    try {
      // 验证数据
      const errors = validateCategory(categoryData);
      if (errors.length > 0) {
        return {
          success: false,
          error: `数据验证失败: ${errors.map(e => e.message).join(', ')}`
        };
      }
      
      const categories = this.getCategories();
      
      // 检查slug是否已存在
      if (categories.some(c => c.slug === categoryData.slug)) {
        return {
          success: false,
          error: '分类标识已存在'
        };
      }
      
      const now = new Date().toISOString();
      
      const newCategory: ResourceCategory = {
        ...categoryData,
        id: generateId(),
        createdAt: now,
        updatedAt: now
      };
      
      categories.push(newCategory);
      
      if (!writeJsonFile(CATEGORIES_FILE, categories)) {
        return {
          success: false,
          error: '保存分类失败'
        };
      }
      
      return {
        success: true,
        data: newCategory,
        message: '分类创建成功'
      };
    } catch (error) {
      return {
        success: false,
        error: `创建分类失败: ${error}`
      };
    }
  }
  
  // 更新分类
  public updateCategory(id: string, updateData: Partial<Omit<ResourceCategory, 'id' | 'createdAt'>>): DatabaseResult<ResourceCategory> {
    try {
      const categories = this.getCategories();
      const index = categories.findIndex(c => c.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: '分类不存在'
        };
      }
      
      // 如果更新slug，检查是否已存在
      if (updateData.slug && updateData.slug !== categories[index].slug) {
        if (categories.some(c => c.slug === updateData.slug && c.id !== id)) {
          return {
            success: false,
            error: '分类标识已存在'
          };
        }
      }
      
      // 验证更新数据
      const mergedData = { ...categories[index], ...updateData };
      const errors = validateCategory(mergedData);
      if (errors.length > 0) {
        return {
          success: false,
          error: `数据验证失败: ${errors.map(e => e.message).join(', ')}`
        };
      }
      
      const updatedCategory: ResourceCategory = {
        ...categories[index],
        ...updateData,
        updatedAt: new Date().toISOString()
      };
      
      categories[index] = updatedCategory;
      
      if (!writeJsonFile(CATEGORIES_FILE, categories)) {
        return {
          success: false,
          error: '保存分类失败'
        };
      }
      
      return {
        success: true,
        data: updatedCategory,
        message: '分类更新成功'
      };
    } catch (error) {
      return {
        success: false,
        error: `更新分类失败: ${error}`
      };
    }
  }
  
  // 删除分类
  public deleteCategory(id: string): DatabaseResult<boolean> {
    try {
      const categories = this.getCategories();
      const index = categories.findIndex(c => c.id === id);
      
      if (index === -1) {
        return {
          success: false,
          error: '分类不存在'
        };
      }
      
      const category = categories[index];
      
      // 检查是否有资源使用此分类
      const resources = this.getResources();
      const hasResources = resources.some(r => r.category === category.slug);
      
      if (hasResources) {
        return {
          success: false,
          error: '该分类下还有资源，无法删除'
        };
      }
      
      // 检查是否有子分类
      const hasChildren = categories.some(c => c.parentId === id);
      
      if (hasChildren) {
        return {
          success: false,
          error: '该分类下还有子分类，无法删除'
        };
      }
      
      categories.splice(index, 1);
      
      if (!writeJsonFile(CATEGORIES_FILE, categories)) {
        return {
          success: false,
          error: '删除分类失败'
        };
      }
      
      return {
        success: true,
        data: true,
        message: '分类删除成功'
      };
    } catch (error) {
      return {
        success: false,
        error: `删除分类失败: ${error}`
      };
    }
  }
  
  // 获取统计信息
  public getStats(): ResourceStats {
    try {
      const resources = this.getResources();
      const categories = this.getCategories();
      
      const totalViews = resources.reduce((sum, r) => {
        const views = parseInt(r.views.replace(/[^0-9]/g, '')) || 0;
        return sum + views;
      }, 0);
      
      const totalDownloads = resources.reduce((sum, r) => {
        const downloads = parseInt(r.downloads.replace(/[^0-9]/g, '')) || 0;
        return sum + downloads;
      }, 0);
      
      const categoryStats = categories.map(category => {
        const categoryResources = resources.filter(r => r.category === category.slug);
        const views = categoryResources.reduce((sum, r) => {
          const views = parseInt(r.views.replace(/[^0-9]/g, '')) || 0;
          return sum + views;
        }, 0);
        const downloads = categoryResources.reduce((sum, r) => {
          const downloads = parseInt(r.downloads.replace(/[^0-9]/g, '')) || 0;
          return sum + downloads;
        }, 0);
        
        return {
          categoryId: category.id,
          categoryName: category.name,
          count: categoryResources.length,
          views,
          downloads
        };
      });
      
      const recentUploads = resources
        .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
        .slice(0, 10);
      
      const popularResources = resources
        .sort((a, b) => {
          const aViews = parseInt(a.views.replace(/[^0-9]/g, '')) || 0;
          const bViews = parseInt(b.views.replace(/[^0-9]/g, '')) || 0;
          return bViews - aViews;
        })
        .slice(0, 10);
      
      return {
        totalResources: resources.length,
        totalCategories: categories.length,
        totalViews,
        totalDownloads,
        categoryStats,
        recentUploads,
        popularResources
      };
    } catch (error) {
      console.error('获取统计信息失败:', error);
      return {
        totalResources: 0,
        totalCategories: 0,
        totalViews: 0,
        totalDownloads: 0,
        categoryStats: [],
        recentUploads: [],
        popularResources: []
      };
    }
  }
  
  // 更新统计信息
  private updateStats(): void {
    try {
      const stats = this.getStats();
      writeJsonFile(STATS_FILE, {
        ...stats,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error('更新统计信息失败:', error);
    }
  }
  
  // 批量操作
  public batchOperation(operation: BatchOperation): DatabaseResult<BatchOperationResult> {
    try {
      let processed = 0;
      let failed = 0;
      const errors: { id: string; error: string }[] = [];
      
      if (operation.resourceIds && operation.resourceIds.length > 0) {
        for (const id of operation.resourceIds) {
          let result: DatabaseResult<any>;
          
          switch (operation.action) {
            case 'delete':
              result = this.deleteResource(id);
              break;
            case 'update':
              if (operation.data) {
                result = this.updateResource(id, operation.data as Partial<Resource>);
              } else {
                result = { success: false, error: '缺少更新数据' };
              }
              break;
            case 'activate':
              result = this.updateResource(id, { status: 'active' });
              break;
            case 'deactivate':
              result = this.updateResource(id, { status: 'inactive' });
              break;
            default:
              result = { success: false, error: '不支持的操作' };
          }
          
          if (result.success) {
            processed++;
          } else {
            failed++;
            errors.push({ id, error: result.error || '操作失败' });
          }
        }
      }
      
      if (operation.categoryIds && operation.categoryIds.length > 0) {
        for (const id of operation.categoryIds) {
          let result: DatabaseResult<any>;
          
          switch (operation.action) {
            case 'delete':
              result = this.deleteCategory(id);
              break;
            case 'update':
              if (operation.data) {
                result = this.updateCategory(id, operation.data as Partial<ResourceCategory>);
              } else {
                result = { success: false, error: '缺少更新数据' };
              }
              break;
            default:
              result = { success: false, error: '不支持的操作' };
          }
          
          if (result.success) {
            processed++;
          } else {
            failed++;
            errors.push({ id, error: result.error || '操作失败' });
          }
        }
      }
      
      return {
        success: true,
        data: {
          success: failed === 0,
          processed,
          failed,
          errors
        }
      };
    } catch (error) {
      return {
        success: false,
        error: `批量操作失败: ${error}`
      };
    }
  }
  
  // 导入数据
  public importData(data: ResourceImportData): DatabaseResult<{ resourcesImported: number; categoriesImported: number }> {
    try {
      let resourcesImported = 0;
      let categoriesImported = 0;
      
      // 导入分类
      if (data.categories && data.categories.length > 0) {
        for (const categoryData of data.categories) {
          const result = this.createCategory(categoryData);
          if (result.success) {
            categoriesImported++;
          }
        }
      }
      
      // 导入资源
      if (data.resources && data.resources.length > 0) {
        for (const resourceData of data.resources) {
          const result = this.createResource(resourceData);
          if (result.success) {
            resourcesImported++;
          }
        }
      }
      
      return {
        success: true,
        data: {
          resourcesImported,
          categoriesImported
        },
        message: `导入完成：${resourcesImported}个资源，${categoriesImported}个分类`
      };
    } catch (error) {
      return {
        success: false,
        error: `导入数据失败: ${error}`
      };
    }
  }
  
  // 导出数据
  public exportData(): DatabaseResult<ResourceExportData> {
    try {
      const resources = this.getResources();
      const categories = this.getCategories();
      
      const exportData: ResourceExportData = {
        resources,
        categories,
        exportDate: new Date().toISOString(),
        version: '1.0.0'
      };
      
      return {
        success: true,
        data: exportData
      };
    } catch (error) {
      return {
        success: false,
        error: `导出数据失败: ${error}`
      };
    }
  }
  
  // 清空所有数据
  public clearAllData(): DatabaseResult<boolean> {
    try {
      writeJsonFile(RESOURCES_FILE, []);
      writeJsonFile(CATEGORIES_FILE, []);
      
      // 重新初始化默认分类
      this.initializeDefaultCategories();
      
      // 更新统计信息
      this.updateStats();
      
      return {
        success: true,
        data: true,
        message: '所有数据已清空'
      };
    } catch (error) {
      return {
        success: false,
        error: `清空数据失败: ${error}`
      };
    }
  }
}

// 导出数据库实例
export const db = ResourceDatabase.getInstance();