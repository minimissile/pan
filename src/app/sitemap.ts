import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.SITE_URL || 'https://yourdomain.com';
  const currentDate = new Date().toISOString();

  // 静态页面
  const staticPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // 动态页面 - 博客文章
  const blogPosts = [
    {
      url: `${baseUrl}/blog/nextjs-seo-optimization`,
      lastModified: '2024-01-15T10:00:00.000Z',
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/react-performance-tips`,
      lastModified: '2024-01-10T14:30:00.000Z',
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/blog/web-vitals-optimization`,
      lastModified: '2024-01-05T09:15:00.000Z',
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  // 动态页面 - 服务页面
  const servicePages = [
    {
      url: `${baseUrl}/services/seo-optimization`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/web-development`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/performance-optimization`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services/technical-consulting`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // 动态页面 - 案例研究
  const portfolioPages = [
    {
      url: `${baseUrl}/portfolio/ecommerce-platform`,
      lastModified: '2024-01-12T16:00:00.000Z',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio/corporate-website`,
      lastModified: '2024-01-08T11:30:00.000Z',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/portfolio/mobile-app`,
      lastModified: '2024-01-03T13:45:00.000Z',
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
  ];

  // 合并所有页面
  return [
    ...staticPages,
    ...blogPosts,
    ...servicePages,
    ...portfolioPages,
  ];
}

// 如果需要动态获取数据，可以使用以下方式：
/*
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.SITE_URL || 'https://yourdomain.com';
  
  // 从API或数据库获取动态数据
  const posts = await fetch(`${baseUrl}/api/posts`).then(res => res.json());
  const products = await fetch(`${baseUrl}/api/products`).then(res => res.json());
  
  // 生成动态页面的sitemap条目
  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));
  
  const productUrls = products.map((product: any) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: product.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  return [
    // 静态页面...
    ...postUrls,
    ...productUrls,
  ];
}
*/