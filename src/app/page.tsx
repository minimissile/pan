import type { Metadata } from 'next';
import { Metadata } from 'next';
import { Hero } from '@/components/sections/Hero';
import { ResourceList } from '@/components/sections/ResourceList';
import { Categories } from '@/components/sections/Categories';
import { CTA } from '@/components/sections/CTA';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumbs } from '@/components/seo/Breadcrumbs';

export const metadata: Metadata = {
  title: '夸克网盘社-一个专门分享夸克网盘资源的网站！Kuakes.com',
  description: '夸克网盘社是一个专门分享夸克网盘资源的网站，提供最新的影视剧、电影、电视剧、综艺、动漫等资源分享。',
  openGraph: {
    title: '夸克网盘社-一个专门分享夸克网盘资源的网站！',
    description: '夸克网盘社是一个专门分享夸克网盘资源的网站，提供最新的影视剧、电影、电视剧、综艺、动漫等资源分享。',
    url: '/',
    images: [
      {
        url: '/images/kuakes-og.jpg',
        width: 1200,
        height: 630,
        alt: '夸克网盘社',
      },
    ],
  },
};

const breadcrumbItems = [
  { label: '首页', href: '/', current: true },
];

export default function HomePage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* 主要内容区域 */}
      <main className="min-h-screen">
        {/* Hero 区域 */}
        <section aria-labelledby="hero-heading">
          <Hero />
        </section>

        {/* 分类导航 */}
        <section aria-labelledby="categories-heading" className="py-8">
          <Categories />
        </section>

        {/* 资源列表 */}
        <section aria-labelledby="resources-heading" className="py-8">
          <ResourceList />
        </section>

        {/* 行动号召 */}
        <section aria-labelledby="cta-heading" className="py-16 lg:py-24">
          <CTA />
        </section>
      </main>
    </>
  );
}