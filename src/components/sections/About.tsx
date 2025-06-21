import { CheckCircle, Award, Target, TrendingUp } from 'lucide-react';


const achievements = [
  {
    icon: Award,
    title: '行业领先',
    description: '5年专业SEO优化经验，服务过500+企业客户',
  },
  {
    icon: Target,
    title: '精准定位',
    description: '深度分析目标用户，制定个性化SEO策略',
  },
  {
    icon: TrendingUp,
    title: '效果显著',
    description: '平均提升搜索排名300%，流量增长200%',
  },
];

const benefits = [
  '完整的SEO技术实现方案',
  'Next.js 14最新技术栈',
  '响应式设计和移动优化',
  '结构化数据和语义化标签',
  '性能优化和Core Web Vitals',
  '国际化和多语言支持',
  '安全性和可访问性保障',
  '持续的技术支持和维护',
];

export function About() {
  return (
    <section id="about" className="py-24">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 左侧内容 */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-bold">
                专业的
                <span className="text-gradient bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  SEO技术团队
                </span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                我们是一支专注于SEO优化和React开发的专业团队，
                致力于为企业提供高质量的技术解决方案。
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                在数字化时代，拥有一个SEO友好的网站对企业成功至关重要。
                我们深知搜索引擎优化的复杂性和重要性，因此开发了这套
                基于Next.js的完整SEO解决方案。
              </p>
              <p>
                我们的方案不仅关注技术实现，更注重用户体验和业务价值。
                通过现代化的开发技术和最佳实践，帮助您的网站在激烈的
                市场竞争中脱颖而出。
              </p>
            </div>
            
            {/* 优势列表 */}
            <div className="grid sm:grid-cols-2 gap-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">

            </div>
          </div>
          
          {/* 右侧成就展示 */}
          <div className="space-y-8">
            {/* 成就卡片 */}
            <div className="space-y-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={achievement.title}
                    className="bg-card border rounded-2xl p-6 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-xl">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-semibold text-lg">{achievement.title}</h3>
                        <p className="text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* 数据展示 */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border rounded-2xl p-8">
              <h3 className="font-semibold text-lg mb-6 text-center">
                我们的成果
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">成功项目</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">客户满意度</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">300%</div>
                  <div className="text-sm text-muted-foreground">平均排名提升</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">技术支持</div>
                </div>
              </div>
            </div>
            
            {/* 认证徽章 */}
            <div className="flex justify-center gap-4">
              <div className="bg-card border rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🏆</div>
                <div className="text-xs text-muted-foreground">Google认证</div>
              </div>
              <div className="bg-card border rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">⭐</div>
                <div className="text-xs text-muted-foreground">5星评价</div>
              </div>
              <div className="bg-card border rounded-xl p-4 text-center">
                <div className="text-2xl mb-2">🚀</div>
                <div className="text-xs text-muted-foreground">快速交付</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}