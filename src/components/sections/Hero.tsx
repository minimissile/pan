import { Download, Share2, Star } from 'lucide-react';
import { SearchBox } from './SearchBox';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container relative py-16 lg:py-24">
        <div className="text-center space-y-8">
          {/* Logo和标题 */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Share2 className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                夸克网盘社
              </h1>
            </div>
            
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              一个专门分享夸克网盘资源的网站！提供最新的影视剧、电影、电视剧、综艺、动漫等资源分享
            </p>
          </div>
          
          {/* 搜索框 */}
          <SearchBox 
            placeholder="搜索影视剧、电影、综艺、动漫..."
            showFilters={true}
          />
          
          {/* 特性亮点 */}
          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-blue-500" />
              <span>免费下载</span>
            </div>
            <div className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-green-500" />
              <span>高速分享</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              <span>海量资源</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 bg-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
              <span>安全可靠</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}