'use client';

import { GoogleAnalytics } from './GoogleAnalytics';
import { BaiduAnalytics } from './BaiduAnalytics';
import { GoogleTagManager, GoogleTagManagerNoScript } from './GoogleTagManager';

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
export {
  trackPageView,
  trackEvent,
  trackConversion,
  trackDownload,
  trackSearch,
  trackOutboundLink,
  trackVideoPlay,
  trackFormSubmit,
  trackScrollDepth,
  trackTimeOnPage,
} from './GoogleAnalytics';

export {
  trackBaiduPageView,
  trackBaiduEvent,
  trackBaiduEcommerce,
} from './BaiduAnalytics';

export {
  pushToDataLayer,
  trackGTMPageView,
  trackGTMLogin,
  trackGTMSignUp,
  trackGTMSearch,
  trackGTMShare,
  trackGTMDownload,
  trackGTMVideo,
  trackGTMForm,
  trackGTMError,
  trackGTMCustomEvent,
  trackGTMViewItem,
  trackGTMAddToCart,
  trackGTMPurchase,
} from './GoogleTagManager';

// 统一的追踪函数
export const analytics = {
  // 页面浏览
  pageView: (url: string, title?: string) => {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (window.gtag) {
        trackPageView(url, title);
      }
      
      // GTM
      if (window.dataLayer) {
        trackGTMPageView(url, title);
      }
      
      // 百度统计
      if (window._hmt) {
        trackBaiduPageView(url);
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
      if (window.gtag) {
        trackEvent({ action, category, label, value });
      }
      
      // GTM
      if (window.dataLayer) {
        trackGTMCustomEvent('custom_event', {
          event_action: action,
          event_category: category,
          event_label: label,
          event_value: value,
        });
      }
      
      // 百度统计
      if (window._hmt) {
        trackBaiduEvent({ category, action, label, value });
      }
    }
  },

  // 下载追踪
  download: (fileName: string, fileType: string, fileSize?: number) => {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (window.gtag) {
        trackDownload(fileName, fileType);
      }
      
      // GTM
      if (window.dataLayer) {
        trackGTMDownload(fileName, fileType, fileSize);
      }
      
      // 百度统计
      if (window._hmt) {
        trackBaiduEvent({
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
      if (window.gtag) {
        trackSearch(searchTerm, resultCount);
      }
      
      // GTM
      if (window.dataLayer) {
        trackGTMSearch(searchTerm, resultCount);
      }
      
      // 百度统计
      if (window._hmt) {
        trackBaiduEvent({
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
        trackGTMError(errorMessage, errorType);
      }
      
      // 百度统计
      if (window._hmt) {
        trackBaiduEvent({
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
    gtag: any;
    dataLayer: any[];
    _hmt: any[];
  }
}