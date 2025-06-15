'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchBox } from '@/components/sections/SearchBox';
import { ResourceService } from '@/lib/resourceService';
import { Resource } from '@/types/resource';
import Link from 'next/link';
import { Star, Eye, Download, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const resourceService = new ResourceService();

export default function SearchPage() {
  const searchParams = useSearchParams();
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const tags = searchParams.getAll('tags');

  useEffect(() => {
    if (query || category || tags.length > 0) {
      setSearchQuery(query);
      performSearch();
    }
  }, [query, category, tags]);

  const performSearch = async (page = 1) => {
    setIsLoading(true);
    try {
      const searchParams = {
        search: query,
        category: category || undefined,
        tags: tags.length > 0 ? tags : undefined,
        page,
        limit: 12,
        sortBy: 'uploadDate' as const,
        sortOrder: 'desc' as const
      };

      const result = await resourceService.searchResources(searchParams);
      
      if (result.success && result.data) {
        if (page === 1) {
          setResources(result.data.resources || []);
        } else {
          setResources(prev => [...prev, ...(result.data?.resources || [])]);
        }
        setTotalResults(result.data.total || 0);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    performSearch(currentPage + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 搜索头部 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            搜索资源
          </h1>
          <SearchBox 
            placeholder="搜索影视剧、电影、综艺、动漫..."
            showFilters={true}
            defaultValue={searchQuery}
          />
        </div>
      </div>

      {/* 搜索结果 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 结果统计 */}
        {(query || category || tags.length > 0) && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  搜索结果
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {query && `关键词: "${query}"`}
                  {category && ` 分类: ${category}`}
                  {tags.length > 0 && ` 标签: ${tags.join(', ')}`}
                  {totalResults > 0 && ` - 共找到 ${totalResults} 个结果`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 加载状态 */}
        {isLoading && resources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">搜索中...</div>
          </div>
        )}

        {/* 无结果 */}
        {!isLoading && resources.length === 0 && (query || category || tags.length > 0) && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              没有找到相关资源
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              尝试使用不同的关键词或筛选条件
            </p>
          </div>
        )}

        {/* 搜索结果列表 */}
        {resources.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {resources.map((resource) => (
                <Link key={resource.id} href={`/resource/${resource.id}`}>
                  <div className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer">
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
                    </div>
                    
                    {/* 内容信息 */}
                    <div className="p-4 space-y-3">
                      {/* 标题 */}
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                        {resource.title}
                      </h3>
                      
                      {/* 描述 */}
                      <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                        {resource.description}
                      </p>
                      
                      {/* 标签 */}
                      <div className="flex flex-wrap gap-1">
                        {resource.tags.slice(0, 2).map((tag, index) => (
                          <span key={index} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                        {resource.tags.length > 2 && (
                          <span className="text-gray-500 text-xs px-2 py-1">
                            +{resource.tags.length - 2}
                          </span>
                        )}
                      </div>
                      
                      {/* 统计信息 */}
                      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-3">
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
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* 加载更多按钮 */}
            {resources.length < totalResults && (
              <div className="text-center mt-12">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? '加载中...' : '加载更多结果'}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}