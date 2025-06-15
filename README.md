# SEO React App

一个专业的SEO友好React应用，基于Next.js 14构建，集成了完整的SEO优化方案和现代化开发技术栈。

## ✨ 特性

### 🔍 SEO优化
- **完整的元标签管理** - 动态生成title、description、keywords等
- **结构化数据** - 支持Organization、Website、Article、Breadcrumb等Schema.org标准
- **Open Graph和Twitter Cards** - 社交媒体分享优化
- **XML站点地图** - 自动生成和更新
- **Robots.txt** - 搜索引擎爬虫指导
- **面包屑导航** - 增强用户体验和SEO

### ⚡ 性能优化
- **Next.js 14 App Router** - 最新的React服务端渲染
- **静态生成(SSG)** - 预构建页面提升加载速度
- **增量静态再生(ISR)** - 动态更新静态内容
- **图片优化** - Next.js Image组件自动优化
- **代码分割** - 按需加载减少包体积
- **Web Vitals优化** - 优化Core Web Vitals指标

### 🎨 现代化UI
- **Tailwind CSS** - 实用优先的CSS框架
- **响应式设计** - 完美适配移动端和桌面端
- **暗色模式** - 支持系统主题切换
- **组件化架构** - 可复用的UI组件库
- **无障碍访问** - 遵循WCAG 2.1标准

### 🛠️ 开发体验
- **TypeScript** - 类型安全的开发体验
- **ESLint + Prettier** - 代码质量和格式化
- **Git Hooks** - 提交前自动检查
- **热重载** - 开发时实时预览
- **自定义Hooks** - 封装常用逻辑

## 🚀 快速开始

### 环境要求

- Node.js 18.0 或更高版本
- npm 或 yarn 或 pnpm

### 安装依赖

```bash
# 使用npm
npm install

# 使用yarn
yarn install

# 使用pnpm
pnpm install
```

### 开发模式

```bash
# 启动开发服务器
npm run dev

# 或者
yarn dev

# 或者
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

```bash
# 构建应用
npm run build

# 启动生产服务器
npm run start
```

## 📁 项目结构

```
seo-react-app/
├── public/                 # 静态资源
│   ├── images/            # 图片资源
│   ├── favicon.ico        # 网站图标
│   └── robots.txt         # 爬虫规则
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── globals.css    # 全局样式
│   │   ├── layout.tsx     # 根布局
│   │   └── page.tsx       # 首页
│   ├── components/        # React组件
│   │   ├── layout/        # 布局组件
│   │   ├── sections/      # 页面区块
│   │   ├── seo/          # SEO组件
│   │   └── ui/           # UI组件
│   ├── hooks/            # 自定义Hooks
│   ├── lib/              # 工具函数
│   ├── styles/           # 样式文件
│   └── types/            # TypeScript类型
├── .eslintrc.json        # ESLint配置
├── .prettierrc           # Prettier配置
├── next.config.js        # Next.js配置
├── package.json          # 项目依赖
├── postcss.config.js     # PostCSS配置
├── tailwind.config.ts    # Tailwind配置
└── tsconfig.json         # TypeScript配置
```

## 🔧 配置说明

### 环境变量

创建 `.env.local` 文件并添加以下配置：

```env
# 网站基础信息
SITE_URL=https://yourdomain.com
SITE_NAME=SEO React App
SITE_DESCRIPTION=专业的SEO友好React应用

# 分析工具
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# 其他配置
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### SEO配置

在 `src/app/layout.tsx` 中配置默认SEO设置：

```typescript
export const metadata: Metadata = {
  title: {
    default: '网站标题',
    template: '%s | 网站名称'
  },
  description: '网站描述',
  keywords: ['关键词1', '关键词2'],
  // ... 更多配置
};
```

## 📊 SEO功能详解

### 1. 元标签管理

每个页面都可以自定义SEO元标签：

```typescript
// 页面级别的metadata
export const metadata: Metadata = {
  title: '页面标题',
  description: '页面描述',
  openGraph: {
    title: '分享标题',
    description: '分享描述',
    images: ['/images/og-image.jpg'],
  },
};
```

### 2. 结构化数据

使用 `StructuredData` 组件添加结构化数据：

```tsx
import { StructuredData } from '@/components/seo/StructuredData';

// 组织信息
<StructuredData type="organization" />

// 文章信息
<StructuredData 
  type="article" 
  data={{
    title: '文章标题',
    author: '作者',
    publishedAt: '2024-01-01',
    // ...
  }} 
/>
```

### 3. 面包屑导航

```tsx
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

const breadcrumbItems = [
  { label: '首页', href: '/' },
  { label: '产品', href: '/products' },
  { label: '详情', href: '/products/1', current: true },
];

<Breadcrumbs items={breadcrumbItems} />
```

## 🎨 组件使用

### Button组件

```tsx
import { Button } from '@/components/ui/Button';

<Button variant="default" size="lg">
  点击按钮
</Button>
```

### 自定义Hooks

```tsx
import { useTheme, useDeviceType } from '@/hooks';

function MyComponent() {
  const { theme, setTheme } = useTheme();
  const deviceType = useDeviceType();
  
  // 使用hooks...
}
```

## 📈 性能优化

### 图片优化

```tsx
import Image from 'next/image';

<Image
  src="/images/hero.jpg"
  alt="描述文字"
  width={800}
  height={600}
  priority // 首屏图片使用priority
/>
```

### 代码分割

```tsx
import dynamic from 'next/dynamic';

// 动态导入组件
const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>加载中...</p>,
});
```

## 🚀 部署

### Vercel部署

1. 将代码推送到GitHub
2. 在Vercel中导入项目
3. 配置环境变量
4. 部署完成

### 其他平台

```bash
# 构建静态文件
npm run build
npm run export

# 上传dist文件夹到服务器
```

## 📝 开发规范

### 代码风格

- 使用TypeScript进行类型检查
- 遵循ESLint和Prettier规则
- 组件使用PascalCase命名
- 文件使用kebab-case命名

### 提交规范

```bash
# 功能开发
git commit -m "feat: 添加新功能"

# 问题修复
git commit -m "fix: 修复bug"

# 文档更新
git commit -m "docs: 更新文档"
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 支持

如果您有任何问题或建议，请：

- 创建 [Issue](https://github.com/yourusername/seo-react-app/issues)
- 发送邮件到 contact@example.com
- 访问我们的 [文档网站](https://docs.example.com)

## 🙏 致谢

感谢以下开源项目：

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Lucide React](https://lucide.dev/)

---

**让我们一起构建更好的SEO友好应用！** 🚀