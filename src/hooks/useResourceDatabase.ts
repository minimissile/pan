import { useState, useEffect, useCallback } from 'react';
import { ResourceService } from '@/lib/resourceService';
import { Resource, ResourceCategory, ResourceQuery, ResourceStats } from '@/types/resource';

const resourceService = new ResourceService();

export const useResourceDatabase = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [stats, setStats] = useState<ResourceStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 加载资源
  const loadResources = useCallback(async (query?: ResourceQuery) => {
    setLoading(true);
    setError(null);
    try {
      const result = await resourceService.getResources(query);
      if (result.success && result.data) {
        setResources(result.data);
      } else {
        setError(result.error || '加载资源失败');
      }
    } catch (err) {
      setError(`加载资源失败: ${err}`);
    } finally {
      setLoading(false);
    }
  }, []);

  // 加载分类
  const loadCategories = useCallback(async () => {
    try {
      const result = await resourceService.getCategories();
      if (result.success && result.data) {
        setCategories(result.data);
      }
    } catch (err) {
      console.error('加载分类失败:', err);
    }
  }, []);

  // 加载统计信息
  const loadStats = useCallback(async () => {
    try {
      const result = await resourceService.getStats();
      if (result.success && result.data) {
        setStats(result.data);
      }
    } catch (err) {
      console.error('加载统计信息失败:', err);
    }
  }, []);

  // 创建资源
  const createResource = useCallback(async (resourceData: Omit<Resource, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await resourceService.createResource(resourceData);
      if (result.success && result.data) {
        setResources(prev => [result.data!, ...prev]);
        return result.data;
      } else {
        setError(result.error || '创建资源失败');
        return null;
      }
    } catch (err) {
      setError(`创建资源失败: ${err}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 更新资源
  const updateResource = useCallback(async (id: string, updates: Partial<Resource>) => {
    setLoading(true);
    setError(null);
    try {
      const result = await resourceService.updateResource(id, updates);
      if (result.success && result.data) {
        setResources(prev => prev.map(r => r.id === id ? result.data! : r));
        return result.data;
      } else {
        setError(result.error || '更新资源失败');
        return null;
      }
    } catch (err) {
      setError(`更新资源失败: ${err}`);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // 删除资源
  const deleteResource = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await resourceService.deleteResource(id);
      if (result.success) {
        setResources(prev => prev.filter(r => r.id !== id));
        return true;
      } else {
        setError(result.error || '删除资源失败');
        return false;
      }
    } catch (err) {
      setError(`删除资源失败: ${err}`);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // 创建分类
  const createCategory = useCallback(async (categoryData: Omit<ResourceCategory, 'id'>) => {
    try {
      const result = await resourceService.createCategory(categoryData);
      if (result.success && result.data) {
        setCategories(prev => [...prev, result.data!].sort((a, b) => a.order - b.order));
        return result.data;
      }
      return null;
    } catch (err) {
      console.error('创建分类失败:', err);
      return null;
    }
  }, []);

  // 更新分类
  const updateCategory = useCallback(async (id: string, updates: Partial<ResourceCategory>) => {
    try {
      const result = await resourceService.updateCategory(id, updates);
      if (result.success && result.data) {
        setCategories(prev => prev.map(c => c.id === id ? result.data! : c).sort((a, b) => a.order - b.order));
        return result.data;
      }
      return null;
    } catch (err) {
      console.error('更新分类失败:', err);
      return null;
    }
  }, []);

  // 删除分类
  const deleteCategory = useCallback(async (id: string) => {
    try {
      const result = await resourceService.deleteCategory(id);
      if (result.success) {
        setCategories(prev => prev.filter(c => c.id !== id));
        return true;
      }
      return false;
    } catch (err) {
      console.error('删除分类失败:', err);
      return false;
    }
  }, []);

  // 搜索资源
  const searchResources = useCallback(async (query: string, options?: Partial<ResourceQuery>) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await resourceService.searchResources({
        search: query,
        ...options
      });
      
      if (result.success && result.data) {
        setResources(result.data);
        return result.data;
      } else {
        setError(result.error || '搜索失败');
        return [];
      }
    } catch (err) {
      setError(`搜索失败: ${err}`);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  // 增加浏览量
  const incrementViews = useCallback(async (id: string) => {
    try {
      await resourceService.incrementViews(id);
      // 更新本地状态
      setResources(prev => prev.map(r => {
        if (r.id === id) {
          const count = parseInt(r.views.replace(/[^0-9]/g, '')) || 0;
          const newCount = count + 1;
          let formattedViews: string;
          if (newCount >= 1000000) {
            formattedViews = `${(newCount / 1000000).toFixed(1)}M`;
          } else if (newCount >= 1000) {
            formattedViews = `${(newCount / 1000).toFixed(1)}k`;
          } else {
            formattedViews = newCount.toString();
          }
          return { ...r, views: formattedViews };
        }
        return r;
      }));
    } catch (err) {
      console.error('更新浏览量失败:', err);
    }
  }, []);

  // 增加下载量
  const incrementDownloads = useCallback(async (id: string) => {
    try {
      await resourceService.incrementDownloads(id);
      // 更新本地状态
      setResources(prev => prev.map(r => {
        if (r.id === id) {
          const count = parseInt(r.downloads.replace(/[^0-9]/g, '')) || 0;
          const newCount = count + 1;
          let formattedDownloads: string;
          if (newCount >= 1000000) {
            formattedDownloads = `${(newCount / 1000000).toFixed(1)}M`;
          } else if (newCount >= 1000) {
            formattedDownloads = `${(newCount / 1000).toFixed(1)}k`;
          } else {
            formattedDownloads = newCount.toString();
          }
          return { ...r, downloads: formattedDownloads };
        }
        return r;
      }));
    } catch (err) {
      console.error('更新下载量失败:', err);
    }
  }, []);

  // 初始化加载
  useEffect(() => {
    loadResources();
    loadCategories();
    loadStats();
  }, [loadResources, loadCategories, loadStats]);

  return {
    // 状态
    resources,
    categories,
    stats,
    loading,
    error,
    
    // 资源操作
    loadResources,
    createResource,
    updateResource,
    deleteResource,
    searchResources,
    incrementViews,
    incrementDownloads,
    
    // 分类操作
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    
    // 统计操作
    loadStats,
    
    // 工具方法
    clearError: () => setError(null)
  };
};

export default useResourceDatabase;