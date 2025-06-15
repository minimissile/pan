// SEO相关类型定义
export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  canonical?: string;
  openGraph?: OpenGraphData;
  twitter?: TwitterCardData;
  robots?: string;
  viewport?: string;
}

export interface OpenGraphData {
  title?: string;
  description?: string;
  type?: 'website' | 'article' | 'book' | 'profile';
  url?: string;
  image?: string;
  imageAlt?: string;
  siteName?: string;
  locale?: string;
}

export interface TwitterCardData {
  card?: 'summary' | 'summary_large_image' | 'app' | 'player';
  site?: string;
  creator?: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
}

// 面包屑导航类型
export interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

// 结构化数据类型
export interface StructuredDataProps {
  type: 'organization' | 'website' | 'breadcrumb' | 'article' | 'product' | 'review';
  data?: any;
}

// 文章类型
export interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  publishedAt: string;
  modifiedAt?: string;
  image?: string;
  url: string;
  tags?: string[];
  category?: string;
  readingTime?: number;
}

// 产品类型
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image?: string;
  url: string;
  brand?: string;
  category?: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder';
  rating?: {
    value: number;
    count: number;
  };
}

// 评论类型
export interface Review {
  id: string;
  author: string;
  rating: number;
  title?: string;
  content: string;
  publishedAt: string;
  product?: {
    name: string;
    url: string;
  };
}

// 导航菜单类型
export interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  children?: NavigationItem[];
  external?: boolean;
}

// 页面配置类型
export interface PageConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  structuredData?: StructuredDataProps[];
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// 分页类型
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// 搜索结果类型
export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: 'page' | 'article' | 'product';
  relevance: number;
}

// 站点配置类型
export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  logo: string;
  favicon: string;
  author: string;
  email: string;
  phone?: string;
  address?: string;
  social: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
    github?: string;
    youtube?: string;
  };
  analytics: {
    googleAnalytics?: string;
    googleTagManager?: string;
    baiduAnalytics?: string;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    defaultKeywords: string[];
    defaultImage: string;
  };
}

// 表单类型
export interface ContactForm {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  subject?: string;
}

// 错误类型
export interface AppError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
}

// 用户类型
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'editor' | 'user';
  createdAt: string;
  updatedAt: string;
}

// 主题类型
export type Theme = 'light' | 'dark' | 'system';

// 语言类型
export type Locale = 'zh-CN' | 'en-US' | 'ja-JP';

// 设备类型
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// 组件通用属性
export interface ComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// 按钮变体类型
export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

// 输入框类型
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

// 模态框类型
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

// 通知类型
export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}