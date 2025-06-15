import { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';
import { ExternalLink, FileText, Home, Shield, Users, Search, Download, Play, Tv, Gamepad2, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
  title: '站点地图 - 夸克网盘社',
  description: '夸克网盘社完整站点地图，包含所有页面链接和网站结构导航，帮助用户快速找到所需内容。',
  openGraph: {
    title: '站点地图 - 夸克网盘社',
    description: '夸克网盘社完整站点地图，包含所有页面链接和网站结构导航，帮助用户快速找到所需内容。',
    url: '/sitemap-page',
  },
  robots: {
    index: true,
    follow: true,
  },
};

const breadcrumbItems = [
  { label: '首页', href: '/', current: false },
  { label: '站点地图', href: '/sitemap', current: true },
];

const siteStructure = {
  main: {
    title: '主要页面',
    icon: Home,
    pages: [
      { name: '首页', href: '/', description: '网站主页，最新资源和热门内容' },
      { name: '搜索', href: '/search', description: '搜索所有资源内容' },
    ]
  },
  categories: {
    title: '资源分类',
    icon: Play,
    pages: [
      { name: '电影', href: '/movies', description: '最新电影资源分享' },
      { name: '电视剧', href: '/tv-series', description: '热门电视剧资源' },
      { name: '综艺', href: '/variety', description: '综艺节目资源' },
      { name: '动漫', href: '/anime', description: '动漫动画资源' },
      { name: '纪录片', href: '/documentaries', description: '纪录片资源分享' },
      { name: '应用软件', href: '/apps', description: '实用软件应用下载' },
    ]
  },
  support: {
    title: '帮助支持',
    icon: Users,
    pages: [
      { name: '使用帮助', href: '/help', description: '网站使用指南和常见问题' },
      { name: '资源投稿', href: '/submit', description: '分享您的优质资源' },
      { name: '问题反馈', href: '/feedback', description: '意见建议和问题反馈' },
      { name: '联系我们', href: '/contact', description: '联系方式和客服支持' },
    ]
  },
  legal: {
    title: '法律信息',
    icon: Shield,
    pages: [
      { name: '免责声明', href: '/disclaimer', description: '网站免责声明和使用条款' },
      { name: '隐私政策', href: '/privacy', description: '用户隐私保护政策' },
      { name: '版权投诉', href: '/copyright', description: '版权投诉和处理流程' },
      { name: '站点地图', href: '/sitemap', description: '网站结构和页面导航' },
    ]
  },
  tools: {
    title: '实用工具',
    icon: Search,
    pages: [
      { name: '高级搜索', href: '/advanced-search', description: '更精确的搜索功能' },
      { name: '下载助手', href: '/download-helper', description: '下载工具和使用指南' },
      { name: '资源收藏', href: '/favorites', description: '收藏和管理您喜欢的资源' },
      { name: '观看历史', href: '/history', description: '查看您的浏览历史' },
    ]
  }
};

const quickLinks = [
  { name: '最新资源', href: '/latest', icon: Download },
  { name: '热门推荐', href: '/popular', icon: Play },
  { name: '高清电影', href: '/movies/hd', icon: Tv },
  { name: '热播剧集', href: '/tv-series/trending', icon: Tv },
  { name: '经典动漫', href: '/anime/classic', icon: Gamepad2 },
  { name: '实用软件', href: '/apps/utilities', icon: Smartphone },
];

export default function SitemapPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 页面标题 */}
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">站点地图</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              探索夸克网盘社的完整结构，快速找到您需要的内容和功能
            </p>
          </header>

          {/* 快速链接 */}
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
              <ExternalLink className="h-6 w-6 mr-2 text-blue-600" />
              快速链接
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {quickLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 text-center group"
                  >
                    <Icon className="h-8 w-8 mx-auto mb-2 text-blue-600 group-hover:text-blue-700" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* 网站结构 */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-blue-600" />
              网站结构
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Object.entries(siteStructure).map(([key, section]) => {
                const Icon = section.icon;
                return (
                  <div key={key} className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <Icon className="h-5 w-5 mr-2 text-blue-600" />
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.pages.map((page) => (
                        <li key={page.href}>
                          <Link
                            href={page.href}
                            className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                                  {page.name}
                                </h4>
                                <p className="text-sm text-gray-600 mt-1">
                                  {page.description}
                                </p>
                              </div>
                              <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors flex-shrink-0 mt-1" />
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </section>

          {/* 统计信息 */}
          <section className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-semibold mb-4">网站统计</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <div className="text-3xl font-bold mb-1">50+</div>
                  <div className="text-blue-100">页面总数</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">6</div>
                  <div className="text-blue-100">主要分类</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">1000+</div>
                  <div className="text-blue-100">资源数量</div>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-1">24/7</div>
                  <div className="text-blue-100">服务时间</div>
                </div>
              </div>
            </div>
          </section>

          {/* 使用提示 */}
          <section className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">使用提示</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">如何使用站点地图</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 点击任意链接快速跳转到对应页面</li>
                  <li>• 使用快速链接访问热门内容</li>
                  <li>• 通过分类浏览找到您需要的资源类型</li>
                  <li>• 查看页面描述了解具体功能</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">寻找帮助</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 访问"使用帮助"页面查看详细指南</li>
                  <li>• 通过"问题反馈"页面报告问题</li>
                  <li>• 使用"联系我们"页面获取支持</li>
                  <li>• 查看"免责声明"了解使用条款</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 页脚信息 */}
          <footer className="mt-12 text-center text-gray-500">
            <p className="mb-2">
              最后更新时间：{new Date().toLocaleDateString('zh-CN')}
            </p>
            <p className="text-sm">
              如果您发现任何链接失效或有建议，请通过
              <Link href="/feedback" className="text-blue-600 hover:text-blue-700 mx-1">
                问题反馈
              </Link>
              页面告知我们。
            </p>
          </footer>
        </div>
      </main>
    </>
  );
}