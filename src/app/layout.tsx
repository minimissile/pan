import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StructuredData } from '@/components/seo/StructuredData';
import { Analytics, AnalyticsNoScript } from '@/components/analytics/Analytics';
import { AnalyticsProvider } from '@/components/analytics/AnalyticsProvider';
import { Metadata } from 'next';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'SEO友好的React应用 - 现代化Web开发',
    template: '%s | SEO友好的React应用',
  },
  description: '基于Next.js构建的SEO优化React应用，提供最佳的用户体验和搜索引擎优化。采用现代化技术栈，响应式设计，性能卓越。',
  keywords: [
    'React',
    'Next.js',
    'SEO优化',
    'TypeScript',
    'Tailwind CSS',
    '响应式设计',
    '现代化Web开发',
    '性能优化'
  ],
  authors: [{ name: '开发团队', url: 'https://yourdomain.com' }],
  creator: 'SEO React App Team',
  publisher: 'SEO React App',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.SITE_URL || 'https://yourdomain.com'),
  alternates: {
    canonical: '/',
    languages: {
      'zh-CN': '/zh-cn',
      'en-US': '/en-us',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: '/',
    title: 'SEO友好的React应用',
    description: '基于Next.js构建的SEO优化React应用，提供最佳的用户体验和搜索引擎优化。',
    siteName: 'SEO React App',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SEO友好的React应用',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO友好的React应用',
    description: '基于Next.js构建的SEO优化React应用，提供最佳的用户体验和搜索引擎优化。',
    images: ['/images/twitter-image.jpg'],
    creator: '@yourhandle',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <head>
        <StructuredData />
        <Analytics
          gaId={process.env.NEXT_PUBLIC_GA_ID}
          gtmId={process.env.NEXT_PUBLIC_GTM_ID}
          baiduId={process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID}
        />
      </head>
      <body className="min-h-screen bg-white font-sans antialiased">
        <AnalyticsNoScript gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        <AnalyticsProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AnalyticsProvider>
      </body>
    </html>
  );
}