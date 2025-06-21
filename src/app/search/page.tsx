'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SearchBox } from '../../components/sections/SearchBox';
import { ResourceList } from '../../components/sections/ResourceList';
import { Container } from '../../components/ui/Container';
import { Resource } from '@/types/resource';
import { ResourceService } from '@/lib/resourceService';

const resourceService = new ResourceService();

function SearchPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  const tags = searchParams.getAll('tags');

  const [resources, setResources] = useState<Resource[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const performSearch = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const searchOptions = {
        search: query,
        category: category || undefined,
        tags: tags.length > 0 ? tags : undefined,
        page,
        limit: 12,
        sortBy: 'uploadDate' as const,
        sortOrder: 'desc' as const,
      };
      const result = await resourceService.searchResources(searchOptions);
      if (result.success && result.data) {
        setResources(page === 1 ? result.data.resources : [...resources, ...result.data.resources]);
        setTotalResults(result.data.total);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setIsLoading(false);
    }
  }, [query, category, tags, resources]);

  useEffect(() => {
    performSearch(1);
  }, [query, category, tags]);

  const handleLoadMore = () => {
    performSearch(currentPage + 1);
  };

  const handleSearchResults = (results: Resource[], total: number) => {
    setResources(results);
    setTotalResults(total);
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
            onSearchResults={handleSearchResults}
            placeholder="搜索影视剧、电影、综艺、动漫..."
            showFilters={true}
            initialValue={query}
          />
        </div>
      </div>

      {/* 搜索结果 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 结果统计 */}
        {(query || category || (tags && tags.length > 0)) && !isLoading && (
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
        {isLoading && currentPage === 1 && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400">搜索中...</div>
          </div>
        )}

        {/* 无结果 */}
        {!isLoading && resources.length === 0 && (query || category || (tags && tags.length > 0)) && (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              没有找到相关资源
            </div>
            <p className="text-sm text-gray-400 dark:text-gray-500">
              尝试使用不同的关键词或筛选条件
            </p>
          </div>
        )}

        <ResourceList resources={resources} />

        {/* 加载更多 */}
        {resources.length > 0 && resources.length < totalResults && !isLoading && (
          <div className="text-center mt-8">
            <button onClick={handleLoadMore} className="btn btn-primary">
              加载更多
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              搜索资源
            </h1>
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400">加载中...</div>
            </div>
          </div>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}