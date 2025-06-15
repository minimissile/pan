'use client';

import { useAnalytics } from '@/hooks/usePageTracking';
import { useEffect } from 'react';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

/**
 * 分析提供者组件
 * 在客户端初始化所有分析功能
 */
export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  // 启用所有分析追踪
  useAnalytics();
  
  useEffect(() => {
    // 在开发环境下显示分析状态
    if (process.env.NODE_ENV === 'development') {
      console.log('🔍 Analytics initialized:', {
        GA: !!process.env.NEXT_PUBLIC_GA_ID && process.env.NEXT_PUBLIC_GA_ID !== 'G-XXXXXXXXXX',
        GTM: !!process.env.NEXT_PUBLIC_GTM_ID && process.env.NEXT_PUBLIC_GTM_ID !== 'GTM-XXXXXXX',
        Baidu: !!process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID && process.env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID !== 'your_baidu_id',
      });
    }
  }, []);
  
  return <>{children}</>;
}