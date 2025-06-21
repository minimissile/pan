'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface GoogleAnalyticsProps {
  gaId: string;
}

export function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  useEffect(() => {
    // 确保 gtag 函数可用
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', gaId, {
        page_title: document.title,
        page_location: window.location.href,
      });
    }
  }, [gaId]);

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  );
}

// 页面浏览事件
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID!, {
      page_title: title || document.title,
      page_location: url,
    });
  }
};

// 自定义事件追踪
export const trackEvent = ({
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
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// 转化事件追踪
export const trackConversion = (conversionId: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
    });
  }
};

// 下载事件追踪
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent({
    action: 'download',
    category: 'file',
    label: `${fileName} (${fileType})`,
  });
};

// 搜索事件追踪
export const trackSearch = (searchTerm: string, resultCount?: number) => {
  trackEvent({
    action: 'search',
    category: 'engagement',
    label: searchTerm,
    value: resultCount,
  });
};

// 外链点击追踪
export const trackOutboundLink = (url: string, linkText?: string) => {
  trackEvent({
    action: 'click',
    category: 'outbound_link',
    label: linkText || url,
  });
};

// 视频播放追踪
export const trackVideoPlay = (videoTitle: string, videoDuration?: number) => {
  trackEvent({
    action: 'play',
    category: 'video',
    label: videoTitle,
    value: videoDuration,
  });
};

// 表单提交追踪
export const trackFormSubmit = (formName: string, success: boolean = true) => {
  trackEvent({
    action: success ? 'submit_success' : 'submit_error',
    category: 'form',
    label: formName,
  });
};

// 页面滚动深度追踪
export const trackScrollDepth = (depth: number) => {
  trackEvent({
    action: 'scroll',
    category: 'engagement',
    label: `${depth}%`,
    value: depth,
  });
};

// 页面停留时间追踪
export const trackTimeOnPage = (timeInSeconds: number, pagePath: string) => {
  trackEvent({
    action: 'time_on_page',
    category: 'engagement',
    label: pagePath,
    value: timeInSeconds,
  });
};