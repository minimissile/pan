import Link from 'next/link';
import { Share2, Mail, MessageCircle, Heart } from 'lucide-react';

const footerNavigation = {
  categories: [
    { name: '电影', href: '/movies' },
    { name: '电视剧', href: '/tv-series' },
    { name: '综艺', href: '/variety' },
    { name: '动漫', href: '/anime' },
    { name: '纪录片', href: '/documentaries' },
    { name: '应用软件', href: '/apps' },
  ],
  support: [
    { name: '使用帮助', href: '/help' },
    { name: '资源投稿', href: '/submit' },
    { name: '问题反馈', href: '/feedback' },
    { name: '联系我们', href: '/contact' },
  ],
  legal: [
    { name: '网站地图', href: '/sitemap' },
    { name: '隐私政策', href: '/privacy' },
    { name: '版权投诉', href: '/copyright' },
    { name: '免责声明', href: '/disclaimer' },
  ],
  social: [
    {
      name: 'QQ群',
      href: '#',
      icon: MessageCircle,
    },
    {
      name: '微信群',
      href: '#',
      icon: MessageCircle,
    },
    {
      name: '邮箱联系',
      href: 'mailto:admin@kuakes.com',
      icon: Mail,
    },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* 网站信息 */}
          <div className="lg:col-span-1">
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
            
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 max-w-md">
              一个专门分享夸克网盘资源的网站！提供最新的影视剧、电影、电视剧、综艺、动漫等资源分享。
            </p>
            
            <div className="mt-6 flex space-x-4">
              {footerNavigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-label={item.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* 资源分类 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">资源分类</h3>
            <ul className="space-y-3">
              {footerNavigation.categories.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 帮助支持 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">帮助支持</h3>
            <ul className="space-y-3">
              {footerNavigation.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 法律信息 */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">法律信息</h3>
            <ul className="space-y-3">
              {footerNavigation.legal.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 底部版权信息 */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <span>Copyright © {new Date().getFullYear()} 夸克网盘社</span>
              <span>All Rights Reserved</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Link
                href="/sitemap"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                网站地图
              </Link>
              <Link
                href="/privacy"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                隐私政策
              </Link>
              <Link
                href="/copyright"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                版权投诉
              </Link>
            </div>
          </div>
          
          {/* 免责声明 */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center max-w-4xl mx-auto leading-relaxed">
              本站所有资源均来源于网络，仅供学习交流使用，请支持正版！如有侵权请联系我们删除。
              本站不承担任何由于内容的合法性及健康性所引起的争议和法律责任。
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}