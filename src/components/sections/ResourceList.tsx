'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Download, Eye, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { analytics } from '@/components/analytics/Analytics';
import { ResourceService } from '@/lib/resourceService';
import { Resource } from '@/types/resource';

const resourceService = new ResourceService();

export function ResourceList() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [visibleResources, setVisibleResources] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResources, setTotalResources] = useState(0);

  // 加载资源数据
  useEffect(() => {
    const loadResources = async () => {
      setIsLoading(true);
      try {
        const result = await resourceService.queryResources({
          page: 1,
          limit: 50,
          sortBy: 'uploadDate',
          sortOrder: 'desc'
        });
        
        if (result.success && result.data) {
          setResources(result.data.resources || []);
          setTotalResources(result.data.total || 0);
        }
      } catch (error) {
        console.error('加载资源失败:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
  }, []);

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleResources(prev => Math.min(prev + 6, Array.isArray(resources) ? resources.length : 0));
      setIsLoading(false);
    }, 1000);
    
    analytics.event({
      action: 'load_more',
      category: 'navigation',
      label: 'resource_list'
    });
  };

  const handleDownload = async (resource: any) => {
    try {
      await resourceService.incrementDownloads(resource.id);
      
      setResources(prev => prev.map(r => 
        r.id === resource.id 
          ? { ...r, downloads: incrementCount(r.downloads) }
          : r
      ));
      
      analytics.download(resource.title, resource.category);
      analytics.event({
        action: 'download',
        category: 'resource',
        label: resource.title,
        value: 1
      });
    } catch (error) {
      console.error('下载失败:', error);
    }
  };

  const handleView = async (resource: any) => {
    try {
      await resourceService.incrementViews(resource.id);
      
      setResources(prev => prev.map(r => 
        r.id === resource.id 
          ? { ...r, views: incrementCount(r.views) }
          : r
      ));
      
      // 导航到资源详情页
      window.location.href = `/resource/${resource.id}`;
    } catch (error) {
      console.error('更新浏览量失败:', error);
    }
  };

  const incrementCount = (countStr: string): string => {
    const count = parseInt(countStr.replace(/[^0-9]/g, '')) || 0;
    const newCount = count + 1;
    
    if (newCount >= 1000000) {
      return `${(newCount / 1000000).toFixed(1)}M`;
    } else if (newCount >= 1000) {
      return `${(newCount / 1000).toFixed(1)}k`;
    } else {
      return newCount.toString();
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 id="resources-heading" className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            最新资源
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            精选优质资源，持续更新中
          </p>
        </div>
        <Button variant="outline">
          查看全部
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(resources) ? resources.slice(0, visibleResources).map((resource) => (
          <div 
            key={resource.id} 
            className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer"
            onClick={() => window.location.href = `/resource/${resource.id}`}
          >
              {/* 封面图片 */}
              <div className="relative aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">🎬</div>
                </div>
                
                {/* 评分标签 */}
                <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  {resource.rating}
                </div>
                
                {/* 分类标签 */}
                <div className="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-lg text-xs">
                  {resource.category}
                </div>
                
                {/* 状态标签 */}
                {resource.status && (
                  <div className="absolute bottom-3 left-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs">
                    {resource.status === 'completed' ? '已完结' : 
                     resource.status === 'ongoing' ? '连载中' : 
                     resource.status === 'upcoming' ? '即将上映' : resource.status}
                  </div>
                )}
                
                {/* Hover时显示的操作按钮 */}
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/90 hover:bg-white text-gray-900 backdrop-blur-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleView(resource);
                    }}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    查看
                  </Button>
                  <Button
                    size="sm"
                    variant="default"
                    className="bg-blue-600 hover:bg-blue-700 text-white backdrop-blur-sm"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDownload(resource);
                    }}
                  >
                    <Download className="h-4 w-4 mr-1" />
                    下载
                  </Button>
                </div>
              </div>
              
              {/* 内容信息 */}
              <div className="p-4 space-y-3">
                {/* 标题 */}
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {resource.title}
                </h3>
                
                {/* 描述 */}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                  {resource.description}
                </p>
                
                {/* 标签 */}
                <div className="flex flex-wrap gap-1">
                  {resource.tags.slice(0, 3).map((tag, index) => (
                    <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                  {resource.tags.length > 3 && (
                    <span className="text-gray-500 text-xs px-2 py-1">
                      +{resource.tags.length - 3}
                    </span>
                  )}
                </div>
                
                {/* 统计信息 */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {resource.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-3 w-3" />
                      {resource.downloads}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(resource.uploadDate).toLocaleDateString('zh-CN')}
                  </div>
                </div>
                
                {/* 年份和集数 */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    {resource.year}年
                    {resource.episodes && ` · ${resource.episodes}集`}
                  </span>
                </div>
              </div>
            </div>
        )) : []}
      </div>
      
      {/* 加载更多按钮 */}
      {Array.isArray(resources) && visibleResources < resources.length && resources.length > 0 && (
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? '加载中...' : '加载更多资源'}
          </Button>
        </div>
      )}
    </div>
  );
}