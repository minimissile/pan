'use client';

import * as ga from './GoogleAnalytics';
import * as baidu from './BaiduAnalytics';
import * as gtm from './GoogleTagManager';

const { GoogleAnalytics } = ga;
const { BaiduAnalytics } = baidu;
const { GoogleTagManager, GoogleTagManagerNoScript } = gtm;

interface AnalyticsProps {
  gaId?: string;
  gtmId?: string;
  baiduId?: string;
  enableGA?: boolean;
  enableGTM?: boolean;
  enableBaidu?: boolean;
}

export function Analytics({
  gaId,
  gtmId,
  baiduId,
  enableGA = true,
  enableGTM = true,
  enableBaidu = true,
}: AnalyticsProps) {
  // 只在生产环境启用统计
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (!isProduction) {
    return null;
  }

  return (
    <>
      {/* Google Analytics */}
      {enableGA && gaId && gaId !== 'G-XXXXXXXXXX' && (
        <GoogleAnalytics gaId={gaId} />
      )}

      {/* Google Tag Manager */}
      {enableGTM && gtmId && gtmId !== 'GTM-XXXXXXX' && (
        <GoogleTagManager gtmId={gtmId} />
      )}

      {/* 百度统计 */}
      {enableBaidu && baiduId && baiduId !== 'your_baidu_id' && (
        <BaiduAnalytics baiduId={baiduId} />
      )}
    </>
  );
}

// NoScript 组件（用于 body 标签）
export function AnalyticsNoScript({
  gtmId,
  enableGTM = true,
}: {
  gtmId?: string;
  enableGTM?: boolean;
}) {
  const isProduction = process.env.NODE_ENV === 'production';
  
  if (!isProduction) {
    return null;
  }

  return (
    <>
      {enableGTM && gtmId && gtmId !== 'GTM-XXXXXXX' && (
        <GoogleTagManagerNoScript gtmId={gtmId} />
      )}
    </>
  );
}

// 导出所有追踪函数
export * from './GoogleAnalytics';
export * from './BaiduAnalytics';
export * from './GoogleTagManager';

// 统一的追踪函数
export const analytics = {
  // 页面浏览
  pageView: (url: string, title?: string) => {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (typeof window.gtag === 'function') {
        ga.trackPageView(url, title);
      }
      
      // GTM
      if (window.dataLayer && typeof window.dataLayer.push === 'function') {
        gtm.trackGTMPageView(url, title);
      }
      
      // 百度统计
      if (window._hmt && typeof window._hmt.push === 'function') {
        baidu.trackBaiduPageView(url);
      }
    }
  },

  // 事件追踪
  event: ({
    action,
    category,
    label,
    value,
  }: {
    action: string;
    category: string;
    label?: string;
    value?: number;
  }) => {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (typeof window.gtag === 'function') {
        ga.trackEvent({ action, category, label, value });
      }
      
      // GTM
      if (window.dataLayer && typeof window.dataLayer.push === 'function') {
        gtm.trackGTMCustomEvent('custom_event', {
          event_action: action,
          event_category: category,
          event_label: label,
          event_value: value,
        });
      }
      
      // 百度统计
      if (window._hmt && typeof window._hmt.push === 'function') {
        baidu.trackBaiduEvent({ category, action, label, value });
      }
    }
  },

  // 下载追踪
  download: (fileName: string, fileType: string, fileSize?: number) => {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (typeof window.gtag === 'function') {
        ga.trackDownload(fileName, fileType);
      }
      
      // GTM
      if (window.dataLayer && typeof window.dataLayer.push === 'function') {
        gtm.trackGTMDownload(fileName, fileType, fileSize);
      }
      
      // 百度统计
      if (window._hmt && typeof window._hmt.push === 'function') {
        baidu.trackBaiduEvent({
          category: 'file',
          action: 'download',
          label: `${fileName} (${fileType})`,
        });
      }
    }
  },

  // 搜索追踪
  search: (searchTerm: string, resultCount?: number) => {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (typeof window.gtag === 'function') {
        ga.trackSearch(searchTerm, resultCount);
      }
      
      // GTM
      if (window.dataLayer) {
        gtm.trackGTMSearch(searchTerm, resultCount);
      }
      
      // 百度统计
      if (window._hmt) {
        baidu.trackBaiduEvent({
          category: 'engagement',
          action: 'search',
          label: searchTerm,
          value: resultCount,
        });
      }
    }
  },

  // 错误追踪
  error: (errorMessage: string, errorType: string) => {
    if (typeof window !== 'undefined') {
      // GTM
      if (window.dataLayer) {
        gtm.trackGTMError(errorMessage, errorType);
      }
      
      // 百度统计
      if (window._hmt) {
        baidu.trackBaiduEvent({
          category: 'error',
          action: errorType,
          label: errorMessage,
        });
      }
    }
  },
};

// 声明全局类型
declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: any
    ) => void;
    dataLayer: any[];
    _hmt: any[];
  }
}