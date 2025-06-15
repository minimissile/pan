import { Button } from "@/components/ui/button";
import { Download, Share2, Star, Users } from "lucide-react";
import Link from "next/link";

export function CTA() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      
      <div className="container relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* 图标 */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-8">
            <Share2 className="w-8 h-8 text-white" />
          </div>
          
          {/* 标题 */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            发现更多
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> 精彩资源</span>
          </h2>
          
          {/* 描述 */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            加入我们的社区，获取最新最热门的夸克网盘资源分享，
            包括影视剧、电影、电视剧、综艺、动漫等海量内容。
          </p>
          
          {/* 按钮组 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="group px-8 py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              asChild
            >
              <Link href="/resources">
                <Download className="mr-2 h-5 w-5" />
                浏览资源
              </Link>
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg font-semibold border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400"
              asChild
            >
              <Link href="/submit">
                分享资源
              </Link>
            </Button>
          </div>
          
          {/* 统计数据 */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              已有超过 <span className="font-semibold text-gray-900 dark:text-white">50,000+</span> 用户在这里找到了心仪的资源
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="flex items-center text-yellow-500 mb-2">
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">4.9/5.0 评分</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">用户满意度</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center text-blue-600 dark:text-blue-400 mb-2">
                  <Users className="h-6 w-6" />
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">50,000+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">活跃用户</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="flex items-center text-green-600 dark:text-green-400 mb-2">
                  <Download className="h-6 w-6" />
                </div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">1M+</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">资源下载</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}