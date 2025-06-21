'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Film, Tv, Music, Gamepad2, BookOpen, Smartphone, Folder } from 'lucide-react';
import { ResourceCategory, ResourceStats } from '@/types/resource';
import { resourceService } from '@/lib/resourceService';

// 图标映射
const iconMap: Record<string, any> = {
  '🎬': Film,
  '📺': Tv,
  '🎭': Gamepad2,
  '📖': BookOpen,
  '🎪': Music,
  '📱': Smartphone,
};

// 颜色映射
const getColorClass = (color: string) => {
  const colorMap: Record<string, string> = {
    '#e74c3c': 'bg-red-500',
    '#3498db': 'bg-blue-500',
    '#9b59b6': 'bg-purple-500',
    '#27ae60': 'bg-green-500',
    '#f39c12': 'bg-yellow-500',
    '#34495e': 'bg-gray-500',
  };
  return colorMap[color] || 'bg-blue-500';
};

export function Categories() {
  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [stats, setStats] = useState<ResourceStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategoriesAndStats();
  }, []);

  const loadCategoriesAndStats = async () => {
    try {
      setLoading(true);
      
      // 并行加载分类和统计数据
      const [categoriesResult, statsResult] = await Promise.all([
        resourceService.getCategories(),
        resourceService.getStats()
      ]);
      
      if (categoriesResult.success) {
        // 只显示激活的分类，并按order排序
        const activeCategories = categoriesResult.data!
          .filter(cat => cat.isActive)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setCategories(activeCategories);
      }
      
      if (statsResult.success) {
        setStats(statsResult.data!);
      }
    } catch (error) {
      console.error('加载分类数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 获取分类的资源数量
  const getCategoryCount = (categoryId: string): number => {
    if (!stats?.categoryStats) return 0;
    const categoryStat = stats.categoryStats.find(stat => stat.categoryId === categoryId);
    return categoryStat?.count || 0;
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            资源分类
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            选择您感兴趣的分类，发现更多精彩内容
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 animate-pulse">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto"></div>
                <div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-8">
        <h2 id="categories-heading" className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
          资源分类
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          选择您感兴趣的分类，发现更多精彩内容
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const IconComponent = (category.icon && iconMap[category.icon]) || Folder;
          const colorClass = getColorClass(category.color || '');
          const resourceCount = getCategoryCount(category.id);
          
          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="group cursor-pointer bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-700 hover:border-gray-200 dark:hover:border-gray-600 block"
            >
              <div className="text-center space-y-3">
                <div className={`w-12 h-12 ${colorClass} rounded-lg flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-200`}>
                  {category.icon && !iconMap[category.icon] ? (
                    <span className="text-xl">{category.icon}</span>
                  ) : (
                    <IconComponent className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm lg:text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {resourceCount.toLocaleString()} 个资源
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      
      {categories.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <Folder className="h-16 w-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            暂无分类
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            系统中还没有配置任何分类
          </p>
        </div>
      )}
    </div>
  );
}