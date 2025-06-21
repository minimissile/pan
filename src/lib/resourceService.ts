'use client';

import { 
  Resource, 
  ResourceCategory, 
  ResourceQuery, 
  ResourceStats, 
  DatabaseResult, 
  ResourceImportData, 
  BatchOperation
} from '@/types/resource';

// 客户端资源服务类
class ResourceService {
  private baseUrl: string;
  
  constructor() {
    this.baseUrl = '/api/resources';
  }
  
  // 通用请求方法
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<DatabaseResult<T>> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      return result;
    } catch (error) {
      return {
        success: false,
        error: `请求失败: ${error}`
      };
    }
  }
  
  // 获取所有资源
  async getResources(): Promise<DatabaseResult<Resource[]>> {
    return this.request<Resource[]>('/');
  }
  
  // 查询资源
  async queryResources(query: ResourceQuery = {}): Promise<DatabaseResult<{ resources: Resource[]; total: number }>> {
    const params = new URLSearchParams();
    
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(key, v.toString()));
        } else {
          params.append(key, value.toString());
        }
      }
    });
    
    return this.request<{ resources: Resource[]; total: number }>(`/?${params.toString()}`);
  }
  
  // 根据ID获取资源
  async getResourceById(id: string): Promise<DatabaseResult<Resource>> {
    return this.request<Resource>(`/${id}`);
  }
  
  // 创建资源
  async createResource(resourceData: Omit<Resource, 'id' | 'createdAt' | 'updatedAt'>): Promise<DatabaseResult<Resource>> {
    return this.request<Resource>('/', {
      method: 'POST',
      body: JSON.stringify(resourceData),
    });
  }
  
  // 更新资源
  async updateResource(id: string, updateData: Partial<Omit<Resource, 'id' | 'createdAt'>>): Promise<DatabaseResult<Resource>> {
    return this.request<Resource>(`/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }
  
  // 删除资源
  async deleteResource(id: string): Promise<DatabaseResult<boolean>> {
    return this.request<boolean>(`/${id}`, {
      method: 'DELETE',
    });
  }
  
  // 获取所有分类
  async getCategories(): Promise<DatabaseResult<ResourceCategory[]>> {
    return this.request<ResourceCategory[]>('/categories');
  }

  
  // 根据ID获取分类
  async getCategoryById(id: string): Promise<DatabaseResult<ResourceCategory>> {
    return this.request<ResourceCategory>(`/categories/${id}`);
  }
  
  // 根据slug获取分类
  async getCategoryBySlug(slug: string): Promise<DatabaseResult<ResourceCategory>> {
    return this.request<ResourceCategory>(`/categories/slug/${slug}`);
  }
  
  // 创建分类
  async createCategory(categoryData: Omit<ResourceCategory, 'id' | 'createdAt' | 'updatedAt'>): Promise<DatabaseResult<ResourceCategory>> {
    return this.request<ResourceCategory>('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  }
  
  // 更新分类
  async updateCategory(id: string, updateData: Partial<Omit<ResourceCategory, 'id' | 'createdAt'>>): Promise<DatabaseResult<ResourceCategory>> {
    return this.request<ResourceCategory>(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }
  
  // 删除分类
  async deleteCategory(id: string): Promise<DatabaseResult<boolean>> {
    return this.request<boolean>(`/categories/${id}`, {
      method: 'DELETE',
    });
  }
  
  // 获取统计信息
  async getStats(): Promise<DatabaseResult<ResourceStats>> {
    return this.request<ResourceStats>('/stats');
  }
  
  // 批量操作
  async batchOperation(operation: BatchOperation): Promise<DatabaseResult<any>> {
    return this.request('/batch', {
      method: 'POST',
      body: JSON.stringify(operation),
    });
  }
  
  // 导入数据
  async importData(data: ResourceImportData): Promise<DatabaseResult<any>> {
    return this.request('/import', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  
  // 导出数据
  async exportData(): Promise<DatabaseResult<any>> {
    return this.request('/export');
  }
  
  // 清空所有数据
  async clearAllData(): Promise<DatabaseResult<boolean>> {
    return this.request<boolean>('/clear', {
      method: 'DELETE',
    });
  }
  
  // 搜索资源
  async searchResources(query: ResourceQuery): Promise<DatabaseResult<{ resources: Resource[]; total: number }>> {
    return this.queryResources(query);
  }
  
  // 搜索资源（兼容旧版本）
  async searchResourcesByTerm(searchTerm: string, options: {
    category?: string;
    limit?: number;
    page?: number;
  } = {}): Promise<DatabaseResult<{ resources: Resource[]; total: number }>> {
    const query: ResourceQuery = {
      search: searchTerm,
      ...options
    };
    
    return this.queryResources(query);
  }
  
  // 获取热门资源
  async getPopularResources(limit: number = 10): Promise<DatabaseResult<Resource[]>> {
    const query: ResourceQuery = {
      sortBy: 'views',
      sortOrder: 'desc',
      limit,
      status: 'active'
    };
    
    const result = await this.queryResources(query);
    if (result.success && result.data) {
      return {
        success: true,
        data: result.data.resources
      };
    }
    
    return {
      success: false,
      error: result.error
    };
  }
  
  // 获取最新资源
  async getLatestResources(limit: number = 10): Promise<DatabaseResult<Resource[]>> {
    const query: ResourceQuery = {
      sortBy: 'uploadDate',
      sortOrder: 'desc',
      limit,
      status: 'active'
    };
    
    const result = await this.queryResources(query);
    if (result.success && result.data) {
      return {
        success: true,
        data: result.data.resources
      };
    }
    
    return {
      success: false,
      error: result.error
    };
  }
  
  // 获取精选资源
  async getFeaturedResources(limit: number = 10): Promise<DatabaseResult<Resource[]>> {
    const query: ResourceQuery = {
      featured: true,
      sortBy: 'rating',
      sortOrder: 'desc',
      limit,
      status: 'active'
    };
    
    const result = await this.queryResources(query);
    if (result.success && result.data) {
      return {
        success: true,
        data: result.data.resources
      };
    }
    
    return {
      success: false,
      error: result.error
    };
  }
  
  // 根据分类获取资源
  async getResourcesByCategory(categorySlug: string, options: {
    limit?: number;
    page?: number;
    sortBy?: ResourceQuery['sortBy'];
    sortOrder?: ResourceQuery['sortOrder'];
  } = {}): Promise<DatabaseResult<{ resources: Resource[]; total: number }>> {
    const query: ResourceQuery = {
      category: categorySlug,
      status: 'active',
      sortBy: 'uploadDate',
      sortOrder: 'desc',
      ...options
    };
    
    return this.queryResources(query);
  }
  
  // 根据标签获取资源
  async getResourcesByTags(tags: string[], options: {
    limit?: number;
    page?: number;
  } = {}): Promise<DatabaseResult<{ resources: Resource[]; total: number }>> {
    const query: ResourceQuery = {
      tags,
      status: 'active',
      sortBy: 'uploadDate',
      sortOrder: 'desc',
      ...options
    };
    
    return this.queryResources(query);
  }
  
  // 获取相关资源
  async getRelatedResources(resourceId: string, limit: number = 5): Promise<DatabaseResult<Resource[]>> {
    try {
      // 先获取当前资源
      const resourceResult = await this.getResourceById(resourceId);
      if (!resourceResult.success || !resourceResult.data) {
        return {
          success: false,
          error: '资源不存在'
        };
      }
      
      const currentResource = resourceResult.data;
      
      // 根据分类和标签查找相关资源
      const query: ResourceQuery = {
        category: currentResource.category,
        status: 'active',
        sortBy: 'rating',
        sortOrder: 'desc',
        limit: limit + 1 // 多获取一个，用于排除当前资源
      };
      
      const result = await this.queryResources(query);
      if (result.success && result.data) {
        // 排除当前资源
        const relatedResources = result.data.resources.filter(r => r.id !== resourceId).slice(0, limit);
        
        return {
          success: true,
          data: relatedResources
        };
      }
      
      return {
        success: false,
        error: result.error
      };
    } catch (error) {
      return {
        success: false,
        error: `获取相关资源失败: ${error}`
      };
    }
  }
  
  // 增加浏览量
  async incrementViews(resourceId: string): Promise<DatabaseResult<Resource>> {
    return this.request<Resource>(`/${resourceId}/views`, {
      method: 'POST',
    });
  }
  
  // 增加下载量
  async incrementDownloads(resourceId: string): Promise<DatabaseResult<Resource>> {
    return this.request<Resource>(`/${resourceId}/downloads`, {
      method: 'POST',
    });
  }
}

// 导出服务实例
export const resourceService = new ResourceService();

// 导出类
export { ResourceService };