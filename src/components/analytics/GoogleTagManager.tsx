'use client';

import Script from 'next/script';

interface GoogleTagManagerProps {
  gtmId: string;
}

export function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  return (
    <>
      {/* Google Tag Manager */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
    </>
  );
}

// GTM NoScript fallback component (for body)
export function GoogleTagManagerNoScript({ gtmId }: GoogleTagManagerProps) {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}

// GTM 数据层推送函数
export const pushToDataLayer = (data: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
  }
};

// 页面浏览事件
export const trackGTMPageView = (pagePath: string, pageTitle?: string) => {
  pushToDataLayer({
    event: 'page_view',
    page_path: pagePath,
    page_title: pageTitle || document.title,
    page_location: window.location.href,
  });
};

// 用户登录事件
export const trackGTMLogin = (method: string, userId?: string) => {
  pushToDataLayer({
    event: 'login',
    method: method,
    user_id: userId,
  });
};

// 用户注册事件
export const trackGTMSignUp = (method: string, userId?: string) => {
  pushToDataLayer({
    event: 'sign_up',
    method: method,
    user_id: userId,
  });
};

// 搜索事件
export const trackGTMSearch = (searchTerm: string, resultCount?: number) => {
  pushToDataLayer({
    event: 'search',
    search_term: searchTerm,
    result_count: resultCount,
  });
};

// 分享事件
export const trackGTMShare = (contentType: string, contentId: string, method: string) => {
  pushToDataLayer({
    event: 'share',
    content_type: contentType,
    content_id: contentId,
    method: method,
  });
};

// 下载事件
export const trackGTMDownload = (fileName: string, fileType: string, fileSize?: number) => {
  pushToDataLayer({
    event: 'file_download',
    file_name: fileName,
    file_type: fileType,
    file_size: fileSize,
  });
};

// 视频事件
export const trackGTMVideo = (action: 'play' | 'pause' | 'complete', videoTitle: string, videoDuration?: number, currentTime?: number) => {
  pushToDataLayer({
    event: 'video_' + action,
    video_title: videoTitle,
    video_duration: videoDuration,
    video_current_time: currentTime,
  });
};

// 表单事件
export const trackGTMForm = (action: 'start' | 'submit' | 'complete', formName: string, formId?: string) => {
  pushToDataLayer({
    event: 'form_' + action,
    form_name: formName,
    form_id: formId,
  });
};

// 错误事件
export const trackGTMError = (errorMessage: string, errorType: string, pagePath?: string) => {
  pushToDataLayer({
    event: 'exception',
    error_message: errorMessage,
    error_type: errorType,
    page_path: pagePath || window.location.pathname,
  });
};

// 自定义事件
export const trackGTMCustomEvent = (eventName: string, parameters: Record<string, any>) => {
  pushToDataLayer({
    event: eventName,
    ...parameters,
  });
};

// 电商事件 - 查看商品
export const trackGTMViewItem = (item: {
  item_id: string;
  item_name: string;
  category: string;
  price: number;
  currency?: string;
}) => {
  pushToDataLayer({
    event: 'view_item',
    currency: item.currency || 'CNY',
    value: item.price,
    items: [item],
  });
};

// 电商事件 - 添加到购物车
export const trackGTMAddToCart = (item: {
  item_id: string;
  item_name: string;
  category: string;
  price: number;
  quantity: number;
  currency?: string;
}) => {
  pushToDataLayer({
    event: 'add_to_cart',
    currency: item.currency || 'CNY',
    value: item.price * item.quantity,
    items: [item],
  });
};

// 电商事件 - 购买
export const trackGTMPurchase = (transactionId: string, items: any[], totalValue: number, currency: string = 'CNY') => {
  pushToDataLayer({
    event: 'purchase',
    transaction_id: transactionId,
    currency: currency,
    value: totalValue,
    items: items,
  });
};

// 声明全局 dataLayer 类型
declare global {
  interface Window {
    dataLayer: any[];
  }
}