'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { analytics } from '../components/analytics/Analytics';

/**
 * 页面访问追踪 Hook
 * 自动追踪页面浏览事件
 */
export function usePageTracking() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // 构建完整的URL
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
    
    // 获取页面标题
    const title = document.title;
    
    // 发送页面浏览事件
    analytics.pageView(url, title);
    
    // 记录页面访问时间（用于计算停留时间）
    const startTime = Date.now();
    
    // 页面卸载时计算停留时间
    const handleBeforeUnload = () => {
      const timeOnPage = Math.round((Date.now() - startTime) / 1000);
      if (timeOnPage > 5) { // 只记录停留超过5秒的页面
        analytics.event({
          action: 'time_on_page',
          category: 'engagement',
          label: pathname,
          value: timeOnPage,
        });
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname, searchParams]);
}

/**
 * 滚动深度追踪 Hook
 * 追踪用户滚动行为
 */
export function useScrollTracking() {
  useEffect(() => {
    let maxScrollDepth = 0;
    const scrollDepthMarks = [25, 50, 75, 90, 100];
    const triggeredMarks = new Set<number>();
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollDepth = Math.round((scrollTop / documentHeight) * 100);
      
      if (scrollDepth > maxScrollDepth) {
        maxScrollDepth = scrollDepth;
        
        // 检查是否达到新的里程碑
        scrollDepthMarks.forEach(mark => {
          if (scrollDepth >= mark && !triggeredMarks.has(mark)) {
            triggeredMarks.add(mark);
            analytics.event({
              action: 'scroll_depth',
              category: 'engagement',
              label: `${mark}%`,
              value: mark,
            });
          }
        });
      }
    };
    
    // 节流处理
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
    };
  }, []);
}

/**
 * 错误追踪 Hook
 * 自动追踪JavaScript错误
 */
export function useErrorTracking() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      analytics.error(
        event.message || 'Unknown error',
        'javascript_error'
      );
    };
    
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      analytics.error(
        event.reason?.toString() || 'Unhandled promise rejection',
        'promise_rejection'
      );
    };
    
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
}

/**
 * 性能追踪 Hook
 * 追踪页面性能指标
 */
export function usePerformanceTracking() {
  useEffect(() => {
    // 等待页面完全加载
    const handleLoad = () => {
      // 使用 setTimeout 确保所有资源都已加载
      setTimeout(() => {
        if ('performance' in window && 'getEntriesByType' in performance) {
          const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
          
          if (navigation) {
            // 页面加载时间
            const loadTime = Math.round(navigation.loadEventEnd - navigation.fetchStart);
            
            // DOM 内容加载时间
            const domContentLoadedTime = Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart);
            
            // 首次内容绘制时间
            const paintEntries = performance.getEntriesByType('paint');
            const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
            
            // 发送性能数据
            analytics.event({
              action: 'page_load_time',
              category: 'performance',
              label: window.location.pathname,
              value: loadTime,
            });
            
            analytics.event({
              action: 'dom_content_loaded',
              category: 'performance',
              label: window.location.pathname,
              value: domContentLoadedTime,
            });
            
            if (fcp) {
              analytics.event({
                action: 'first_contentful_paint',
                category: 'performance',
                label: window.location.pathname,
                value: Math.round(fcp.startTime),
              });
            }
          }
        }
      }, 1000);
    };
    
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }
    
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);
}

/**
 * 综合追踪 Hook
 * 包含所有基础追踪功能
 */
export function useAnalytics() {
  usePageTracking();
  useScrollTracking();
  useErrorTracking();
  usePerformanceTracking();
}