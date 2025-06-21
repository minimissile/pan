import { Metadata } from 'next';
import { Breadcrumbs } from '../../components/seo/Breadcrumbs';
import { BarChart3, Users, Eye, Download, TrendingUp, Clock, Globe, Smartphone } from 'lucide-react';

export const metadata: Metadata = {
  title: '数据分析仪表板 - 夸克网盘社',
  description: '查看网站访问统计、用户行为分析和性能指标，了解网站运营状况和用户偏好。',
  robots: {
    index: false, // 不让搜索引擎索引此页面
    follow: false,
  },
};

const breadcrumbItems = [
  { label: '首页', href: '/', current: false },
  { label: '数据分析', href: '/analytics-dashboard', current: true },
];

// 模拟数据
const analyticsData = {
  overview: {
    totalVisitors: 15420,
    pageViews: 45680,
    downloads: 8920,
    avgSessionDuration: '3:45',
    bounceRate: 32.5,
    newVisitors: 68.2,
  },
  topPages: [
    { path: '/', views: 12450, title: '首页' },
    { path: '/movies', views: 8920, title: '电影资源' },
    { path: '/tv-series', views: 6780, title: '电视剧' },
    { path: '/anime', views: 4560, title: '动漫' },
    { path: '/apps', views: 3240, title: '应用软件' },
  ],
  topDownloads: [
    { name: '流浪地球2 (2023)', downloads: 1520, category: '科幻电影' },
    { name: '三体 (2023)', downloads: 1340, category: '科幻剧' },
    { name: '装台 Stage Builder (2020)', downloads: 980, category: '国剧' },
    { name: 'Adobe Photoshop 2024', downloads: 850, category: '设计软件' },
    { name: '鬼灭之刃 第三季', downloads: 720, category: '动漫' },
  ],
  deviceStats: {
    desktop: 45.2,
    mobile: 38.7,
    tablet: 16.1,
  },
  trafficSources: [
    { source: '直接访问', percentage: 42.3, visitors: 6520 },
    { source: '搜索引擎', percentage: 35.8, visitors: 5520 },
    { source: '社交媒体', percentage: 12.4, visitors: 1910 },
    { source: '推荐链接', percentage: 9.5, visitors: 1470 },
  ],
  hourlyTraffic: [
    { hour: '00:00', visitors: 120 },
    { hour: '06:00', visitors: 80 },
    { hour: '12:00', visitors: 450 },
    { hour: '18:00', visitors: 680 },
    { hour: '21:00', visitors: 920 },
  ],
};

export default function AnalyticsDashboard() {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* 页面标题 */}
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">数据分析仪表板</h1>
            <p className="text-gray-600">
              实时监控网站性能和用户行为，优化用户体验
            </p>
          </header>

          {/* 概览统计 */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
              概览统计
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">总访客数</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analyticsData.overview.totalVisitors.toLocaleString()}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+12.5%</span>
                  <span className="text-gray-500 ml-1">vs 上月</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">页面浏览量</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analyticsData.overview.pageViews.toLocaleString()}
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-green-600" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+8.3%</span>
                  <span className="text-gray-500 ml-1">vs 上月</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">下载次数</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analyticsData.overview.downloads.toLocaleString()}
                    </p>
                  </div>
                  <Download className="h-8 w-8 text-purple-600" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+15.7%</span>
                  <span className="text-gray-500 ml-1">vs 上月</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">平均停留时间</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analyticsData.overview.avgSessionDuration}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+5.2%</span>
                  <span className="text-gray-500 ml-1">vs 上月</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">跳出率</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analyticsData.overview.bounceRate}%
                    </p>
                  </div>
                  <Globe className="h-8 w-8 text-red-600" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <span className="text-red-600">-2.1%</span>
                  <span className="text-gray-500 ml-1">vs 上月</span>
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">新访客比例</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {analyticsData.overview.newVisitors}%
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <div className="mt-2 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+3.8%</span>
                  <span className="text-gray-500 ml-1">vs 上月</span>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* 热门页面 */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">热门页面</h3>
              <div className="space-y-3">
                {analyticsData.topPages.map((page, index) => (
                  <div key={page.path} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">{page.title}</p>
                        <p className="text-sm text-gray-500">{page.path}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{page.views.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">浏览量</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* 热门下载 */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">热门下载</h3>
              <div className="space-y-3">
                {analyticsData.topDownloads.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{item.downloads.toLocaleString()}</p>
                      <p className="text-sm text-gray-500">下载</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* 设备统计 */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Smartphone className="h-5 w-5 mr-2 text-blue-600" />
                设备类型分布
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">桌面端</span>
                    <span className="font-semibold">{analyticsData.deviceStats.desktop}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${analyticsData.deviceStats.desktop}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">移动端</span>
                    <span className="font-semibold">{analyticsData.deviceStats.mobile}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${analyticsData.deviceStats.mobile}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">平板</span>
                    <span className="font-semibold">{analyticsData.deviceStats.tablet}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-600 h-2 rounded-full" 
                      style={{ width: `${analyticsData.deviceStats.tablet}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </section>

            {/* 流量来源 */}
            <section className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">流量来源</h3>
              <div className="space-y-3">
                {analyticsData.trafficSources.map((source, index) => (
                  <div key={source.source} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{source.source}</p>
                      <p className="text-sm text-gray-500">{source.visitors.toLocaleString()} 访客</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{source.percentage}%</p>
                      <div className="w-16 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${source.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 说明信息 */}
          <section className="mt-8 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">关于数据分析</h3>
            <div className="text-blue-800 space-y-2">
              <p>• 本页面展示的是模拟数据，用于演示分析功能</p>
              <p>• 实际部署时，数据将来自 Google Analytics、百度统计等真实统计服务</p>
              <p>• 支持实时数据更新、自定义时间范围查询和数据导出功能</p>
              <p>• 可根据需要添加更多维度的分析，如地理位置、用户行为路径等</p>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}