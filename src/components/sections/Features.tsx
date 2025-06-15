import { 
  Search, 
  Zap, 
  Shield, 
  Smartphone, 
  BarChart3, 
  Code2,
  Globe,
  Rocket,
  Users
} from 'lucide-react';

const features = [
  {
    icon: Search,
    title: 'SEO优化',
    description: '内置完整的SEO优化方案，包括元标签、结构化数据、站点地图等，提升搜索引擎排名。',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-950/20',
  },
  {
    icon: Zap,
    title: '极速性能',
    description: '基于Next.js 14的App Router，支持SSR、SSG和ISR，实现毫秒级页面加载速度。',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
  },
  {
    icon: Smartphone,
    title: '响应式设计',
    description: '采用移动优先的设计理念，完美适配各种设备尺寸，提供一致的用户体验。',
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-950/20',
  },
  {
    icon: Shield,
    title: '安全可靠',
    description: '遵循最佳安全实践，包括CSP、HTTPS、数据验证等，保护用户数据安全。',
    color: 'text-red-600',
    bgColor: 'bg-red-50 dark:bg-red-950/20',
  },
  {
    icon: BarChart3,
    title: '数据分析',
    description: '集成Google Analytics、Search Console等分析工具，实时监控网站性能和用户行为。',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50 dark:bg-purple-950/20',
  },
  {
    icon: Code2,
    title: '开发友好',
    description: 'TypeScript + Tailwind CSS，完整的类型定义和组件库，提升开发效率。',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/20',
  },
  {
    icon: Globe,
    title: '国际化支持',
    description: '内置i18n国际化方案，支持多语言切换，轻松拓展全球市场。',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/20',
  },
  {
    icon: Rocket,
    title: '快速部署',
    description: '支持Vercel、Netlify等平台一键部署，CI/CD自动化流程，快速上线。',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-950/20',
  },
  {
    icon: Users,
    title: '用户体验',
    description: '遵循Web可访问性标准，优化Core Web Vitals指标，提供卓越的用户体验。',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50 dark:bg-pink-950/20',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-secondary/30">
      <div className="container">
        {/* 标题部分 */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            为什么选择我们的
            <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              SEO解决方案
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            我们提供全方位的SEO优化服务，从技术实现到内容策略，
            帮助您的网站在搜索引擎中获得更好的排名和更多的流量。
          </p>
        </div>
        
        {/* 特性网格 */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-card border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                {/* 图标 */}
                <div className={`inline-flex p-3 rounded-xl ${feature.bgColor} mb-6`}>
                  <Icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                
                {/* 内容 */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* 悬浮效果 */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            );
          })}
        </div>
        
        {/* 底部统计 */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">成功项目</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">99.9%</div>
            <div className="text-sm text-muted-foreground">正常运行时间</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">技术支持</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold text-primary">100%</div>
            <div className="text-sm text-muted-foreground">客户满意度</div>
          </div>
        </div>
      </div>
    </section>
  );
}