import Script from 'next/script';
import type { Organization, WebSite, BreadcrumbList } from 'schema-dts';

interface StructuredDataProps {
  type?: 'organization' | 'website' | 'breadcrumb' | 'article';
  data?: any;
}

export function StructuredData({ type = 'organization', data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'organization':
        return getOrganizationData();
      case 'website':
        return getWebsiteData();
      case 'breadcrumb':
        return getBreadcrumbData(data);
      case 'article':
        return getArticleData(data);
      default:
        return getOrganizationData();
    }
  };

  return (
    <Script
      id={`structured-data-${type}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(getStructuredData()),
      }}
    />
  );
}

function getOrganizationData(): Organization {
  return {
    '@type': 'Organization',
    '@context': 'https://schema.org',
    name: 'SEO React App',
    description: '专业的SEO友好React应用开发服务',
    url: process.env.SITE_URL || 'https://yourdomain.com',
    logo: {
      '@type': 'ImageObject',
      url: `${process.env.SITE_URL || 'https://yourdomain.com'}/images/logo.png`,
      width: 200,
      height: 200,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+86-400-123-4567',
      contactType: 'customer service',
      availableLanguage: ['Chinese', 'English'],
    },
    sameAs: [
      'https://github.com/yourcompany',
      'https://twitter.com/yourcompany',
      'https://linkedin.com/company/yourcompany',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '北京市朝阳区xxx街道xxx号',
      addressLocality: '北京',
      addressRegion: '北京市',
      postalCode: '100000',
      addressCountry: 'CN',
    },
  };
}

function getWebsiteData(): WebSite {
  return {
    '@type': 'WebSite',
    '@context': 'https://schema.org',
    name: 'SEO React App',
    description: '专业的SEO友好React应用开发服务',
    url: process.env.SITE_URL || 'https://yourdomain.com',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${process.env.SITE_URL || 'https://yourdomain.com'}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'SEO React App',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.SITE_URL || 'https://yourdomain.com'}/images/logo.png`,
      },
    },
  };
}

function getBreadcrumbData(items: Array<{ name: string; url: string }>): BreadcrumbList {
  if (!items || items.length === 0) {
    return {
      '@type': 'BreadcrumbList',
      '@context': 'https://schema.org',
      itemListElement: [],
    };
  }

  return {
    '@type': 'BreadcrumbList',
    '@context': 'https://schema.org',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function getArticleData(article: {
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  modifiedAt?: string;
  image?: string;
  url: string;
}) {
  if (!article) return null;

  return {
    '@type': 'Article',
    '@context': 'https://schema.org',
    headline: article.title,
    description: article.description,
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'SEO React App',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.SITE_URL || 'https://yourdomain.com'}/images/logo.png`,
      },
    },
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    image: article.image ? {
      '@type': 'ImageObject',
      url: article.image,
      width: 1200,
      height: 630,
    } : undefined,
  };
}