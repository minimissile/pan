'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface BaiduAnalyticsProps {
  baiduId: string;
}

export function BaiduAnalytics({ baiduId }: BaiduAnalyticsProps) {
  useEffect(() => {
    // 百度统计初始化
    if (typeof window !== 'undefined' && window._hmt) {
      window._hmt.push(['_setAutoPageview', false]);
      window._hmt.push(['_trackPageview', window.location.pathname]);
    }
  }, []);

  return (
    <Script
      id="baidu-analytics"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?${baiduId}";
            var s = document.getElementsByTagName("script")[0]; 
            s.parentNode.insertBefore(hm, s);
          })();
        `,
      }}
    />
  );
}

// 百度统计页面浏览事件
export const trackBaiduPageView = (pagePath: string) => {
  if (typeof window !== 'undefined' && window._hmt) {
    window._hmt.push(['_trackPageview', pagePath]);
  }
};

// 百度统计自定义事件
export const trackBaiduEvent = ({
  category,
  action,
  label,
  value,
}: {
  category: string;
  action: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== 'undefined' && window._hmt) {
    window._hmt.push(['_trackEvent', category, action, label, value]);
  }
};

// 百度统计电商事件
export const trackBaiduEcommerce = ({
  action,
  productId,
  productName,
  category,
  price,
  quantity = 1,
}: {
  action: 'purchase' | 'add_to_cart' | 'remove_from_cart' | 'view_item';
  productId: string;
  productName: string;
  category: string;
  price: number;
  quantity?: number;
}) => {
  if (typeof window !== 'undefined' && window._hmt) {
    window._hmt.push([
      '_trackEcommerce',
      action,
      productId,
      productName,
      category,
      price,
      quantity,
    ]);
  }
};

// 声明全局百度统计类型
declare global {
  interface Window {
    _hmt: any[];
  }
}