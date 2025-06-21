'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Share2, Search, User, Moon, Sun, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Resource } from '@/types/resource';
import { ResourceService } from '@/lib/resourceService';
import { analytics } from '@/components/analytics/Analytics';

const resourceService = new ResourceService();

import { ResourceCategory } from '@/types/resource';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<Resource[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoriesResult = await resourceService.getCategories();
      if (categoriesResult.success) {
        const activeCategories = categoriesResult.data!
          .filter(cat => cat.isActive)
          .sort((a, b) => (a.order || 0) - (b.order || 0));
        setCategories(activeCategories);
      }
    } catch (error) {
      console.error('加载分类数据失败:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between" aria-label="主导航">
        {/* Logo */}
        <div className="flex items-center">
          <Link 
            href="/" 
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            aria-label="返回首页"
          >
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
              <Share2 className="h-4 w-4" />
            </div>
            <span>夸克网盘社</span>
          </Link>
        </div>

        {/* 桌面导航 */}
        <div className="hidden lg:flex lg:items-center lg:space-x-8">
          <Link href="/" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">首页</Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* 右侧按钮 */}
        <div className="hidden md:flex md:items-center md:space-x-3">
          {/* 搜索按钮/搜索框 */}
          <div className="relative">
            {!searchOpen ? (
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 dark:text-gray-300"
                onClick={() => {
                  setSearchOpen(true);
                  setTimeout(() => searchInputRef.current?.focus(), 100);
                }}
              >
                <Search className="h-4 w-4 mr-1" />
                搜索
              </Button>
            ) : (
              <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-1 min-w-[300px]">
                <Search className="h-4 w-4 text-gray-400 mr-2" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="搜索影视剧、电影、综艺..."
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white placeholder-gray-500"
                />
                {isSearching && (
                  <Loader2 className="h-4 w-4 text-gray-400 animate-spin mr-2" />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchTerm('');
                    setShowResults(false);
                  }}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            
            {/* 搜索结果下拉 */}
            {searchOpen && showResults && searchResults.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
                <div className="p-3">
                  <div className="space-y-2">
                    {searchResults.slice(0, 5).map((resource) => (
                      <Link
                        key={resource.id}
                        href={`/resource/${resource.id}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setShowResults(false);
                          setSearchTerm('');
                        }}
                        className="block p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <div className="w-8 h-10 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded flex items-center justify-center text-sm">
                            🎬
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 dark:text-white text-sm truncate">
                              {resource.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                                {getCategoryLabel(resource.category)}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                ⭐ {resource.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  {searchResults.length > 5 && (
                    <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleViewAllResults}
                        className="w-full text-sm"
                      >
                        查看全部结果
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">
            <Moon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-600 dark:text-gray-300">
            <User className="h-4 w-4 mr-1" />
            登录
          </Button>
        </div>

        {/* 移动端菜单按钮 */}
        <div className="md:hidden flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600 dark:text-gray-300"
            onClick={() => router.push('/search')}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
            aria-expanded={mobileMenuOpen}
            className="text-gray-600 dark:text-gray-300"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* 移动端导航菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <div className="container py-4 space-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-3 border-t border-gray-200 dark:border-gray-700">
              <Button 
                variant="ghost" 
                size="sm" 
                className="w-full justify-start text-gray-600 dark:text-gray-300"
                onClick={() => {
                  router.push('/search');
                  setMobileMenuOpen(false);
                }}
              >
                <Search className="h-4 w-4 mr-2" />
                搜索
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600 dark:text-gray-300">
                <User className="h-4 w-4 mr-2" />
                登录
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-gray-600 dark:text-gray-300">
                <Moon className="h-4 w-4 mr-2" />
                深色模式
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );

  // 搜索处理函数
  async function handleSearchChange(value: string) {
    setSearchTerm(value);
    
    if (!value.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setIsSearching(true);
    try {
      const result = await resourceService.searchResources({
        search: value,
        limit: 8,
        sortBy: 'uploadDate',
        sortOrder: 'desc'
      });

      if (result.success && result.data) {
        setSearchResults(result.data.resources);
        setShowResults(true);
        analytics.search(value, result.data.total);
      }
    } catch (error) {
      console.error('搜索失败:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  // 键盘事件处理
  function handleSearchKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && searchTerm.trim()) {
      handleViewAllResults();
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
      setShowResults(false);
    }
  }

  // 查看全部结果
  function handleViewAllResults() {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchOpen(false);
      setShowResults(false);
      setSearchTerm('');
    }
  }

  // 点击外部关闭搜索
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if (searchOpen && !target.closest('.relative')) {
        setSearchOpen(false);
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [searchOpen]);
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