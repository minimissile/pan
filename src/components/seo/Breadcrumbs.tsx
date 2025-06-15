import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { StructuredData } from './StructuredData';

interface BreadcrumbItem {
  label: string;
  href: string;
  current?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  // 为结构化数据准备数据
  const structuredDataItems = items.map(item => ({
    name: item.label,
    url: `${process.env.SITE_URL || 'https://yourdomain.com'}${item.href}`,
  }));

  return (
    <>
      {/* 结构化数据 */}
      <StructuredData type="breadcrumb" data={structuredDataItems} />
      
      {/* 面包屑导航 */}
      <nav 
        aria-label="面包屑导航" 
        className={`bg-secondary/30 border-b ${className}`}
      >
        <div className="container py-3">
          <ol className="flex items-center space-x-2 text-sm">
            {items.map((item, index) => {
              const isLast = index === items.length - 1;
              const isFirst = index === 0;
              
              return (
                <li key={item.href} className="flex items-center">
                  {/* 分隔符 */}
                  {!isFirst && (
                    <ChevronRight 
                      className="h-4 w-4 text-muted-foreground mx-2" 
                      aria-hidden="true"
                    />
                  )}
                  
                  {/* 面包屑项 */}
                  {isLast ? (
                    <span 
                      className="font-medium text-foreground flex items-center"
                      aria-current="page"
                    >
                      {isFirst && <Home className="h-4 w-4 mr-1" aria-hidden="true" />}
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-muted-foreground hover:text-foreground transition-colors flex items-center"
                    >
                      {isFirst && <Home className="h-4 w-4 mr-1" aria-hidden="true" />}
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </>
  );
}