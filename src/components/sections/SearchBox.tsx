'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, X, Filter, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Resource } from '@/types/resource';
import { ResourceService } from '@/lib/resourceService';
import { analytics } from '@/components/analytics/Analytics';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const resourceService = new ResourceService();

interface SearchBoxProps {
  onSearchResults?: (results: Resource[], total: number) => void;
  placeholder?: string;
  showFilters?: boolean;
  autoFocus?: boolean;
}

export function SearchBox({ 
  onSearchResults, 
  placeholder = "搜索影视剧、电影、综艺、动漫...",
  showFilters = true,
  autoFocus = false 
}: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Resource[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const router = useRouter();

  // 防抖搜索
  const debounceSearch = useCallback(
    debounce(async (term: string, category: string) => {
      if (!term.trim()) {
        setSearchResults([]);
        setTotalResults(0);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      try {
        const result = await resourceService.searchResources({
          search: term,
          category: category || undefined,
          limit: 10,
          sortBy: 'uploadDate',
          sortOrder: 'desc'
        });

        if (result.success && result.data) {
          setSearchResults(result.data.resources);
          setTotalResults(result.data.total);
          setShowResults(true);
          
          // 调用回调函数
          onSearchResults?.(result.data.resources, result.data.total);
          
          // 记录搜索分析
          analytics.search(term, result.data.total);
        }
      } catch (error) {
        console.error('搜索失败:', error);
        setSearchResults([]);
        setTotalResults(0);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    [onSearchResults]
  );

  // 搜索输入变化
  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debounceSearch(value, selectedCategory);
  };

  // 分类筛选变化
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (searchTerm.trim()) {
      debounceSearch(searchTerm, category);
    }
  };

  // 执行搜索（点击搜索按钮或回车）
  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    // 跳转到搜索结果页面
    const params = new URLSearchParams({
      q: searchTerm,
      ...(selectedCategory && { category: selectedCategory })
    });
    router.push(`/search?${params.toString()}`);
    setShowResults(false);
  };

  // 键盘事件处理
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowResults(false);
    }
  };

  // 清空搜索
  const clearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setTotalResults(0);
    setShowResults(false);
  };

  // 点击外部关闭结果
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.search-container')) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { value: '', label: '全部' },
    { value: 'movie', label: '电影' },
    { value: 'tv', label: '电视剧' },
    { value: 'anime', label: '动漫' },
    { value: 'variety', label: '综艺' },
    { value: 'documentary', label: '纪录片' }
  ];

  return (
    <div className="search-container relative max-w-2xl mx-auto">
      {/* 搜索框 */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="w-full pl-12 pr-20 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white transition-all duration-200"
        />
        
        {/* 右侧按钮组 */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {searchTerm && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearSearch}
              className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
          
          {showFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFiltersPanel(!showFiltersPanel)}
              className={`h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                selectedCategory ? 'text-blue-500' : ''
              }`}
            >
              <Filter className="h-4 w-4" />
            </Button>
          )}
          
          <Button 
            onClick={handleSearch}
            disabled={!searchTerm.trim() || isSearching}
            className="h-8 px-4"
          >
            {isSearching ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              '搜索'
            )}
          </Button>
        </div>
      </div>

      {/* 筛选面板 */}
      {showFiltersPanel && showFilters && (
        <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-10">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">分类筛选</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange(category.value)}
                  className="text-xs"
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 搜索结果下拉 */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg z-20 max-h-96 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                找到 {totalResults} 个结果
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowResults(false)}
                className="h-6 w-6 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="space-y-2">
              {searchResults.map((resource) => (
                <Link
                  key={resource.id}
                  href={`/resource/${resource.id}`}
                  onClick={() => setShowResults(false)}
                  className="block p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-16 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded flex items-center justify-center text-2xl">
                      🎬
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">
                        {resource.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                          {getCategoryLabel(resource.category)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          ⭐ {resource.rating}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {resource.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            {totalResults > searchResults.length && (
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSearch}
                  className="w-full"
                >
                  查看全部 {totalResults} 个结果
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// 防抖函数
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// 获取分类标签
function getCategoryLabel(category: string): string {
  const categoryMap: Record<string, string> = {
    movie: '电影',
    tv: '电视剧',
    anime: '动漫',
    variety: '综艺',
    documentary: '纪录片'
  };
  return categoryMap[category] || category;
}