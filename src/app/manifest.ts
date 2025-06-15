import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SEO React App - 专业的SEO友好React应用',
    short_name: 'SEO React App',
    description: '使用Next.js 14和现代化技术栈，打造高性能、SEO优化的React应用。提升搜索引擎排名，增加网站流量，实现业务增长。',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'zh-CN',
    dir: 'ltr',
    categories: ['business', 'productivity', 'technology'],
    
    icons: [
      {
        src: '/icons/icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'maskable any'
      },
      {
        src: '/icons/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'maskable any'
      },
      {
        src: '/icons/icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
        purpose: 'maskable any'
      },
      {
        src: '/icons/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'maskable any'
      },
      {
        src: '/icons/icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
        purpose: 'maskable any'
      },
      {
        src: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable any'
      },
      {
        src: '/icons/icon-384x384.png',
        sizes: '384x384',
        type: 'image/png',
        purpose: 'maskable any'
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable any'
      }
    ],
    
    shortcuts: [
      {
        name: '关于我们',
        short_name: '关于',
        description: '了解我们的团队和服务',
        url: '/about',
        icons: [
          {
            src: '/icons/shortcut-about.png',
            sizes: '96x96',
            type: 'image/png'
          }
        ]
      },
      {
        name: '我们的服务',
        short_name: '服务',
        description: '查看我们提供的专业服务',
        url: '/services',
        icons: [
          {
            src: '/icons/shortcut-services.png',
            sizes: '96x96',
            type: 'image/png'
          }
        ]
      },
      {
        name: '联系我们',
        short_name: '联系',
        description: '获取专业咨询和支持',
        url: '/contact',
        icons: [
          {
            src: '/icons/shortcut-contact.png',
            sizes: '96x96',
            type: 'image/png'
          }
        ]
      }
    ],
    
    screenshots: [
      {
        src: '/screenshots/desktop-home.png',
        sizes: '1280x720',
        type: 'image/png',
        form_factor: 'wide',
        label: '桌面端首页截图'
      },
      {
        src: '/screenshots/mobile-home.png',
        sizes: '375x667',
        type: 'image/png',
        form_factor: 'narrow',
        label: '移动端首页截图'
      }
    ],
    
    related_applications: [
      {
        platform: 'webapp',
        url: 'https://yourdomain.com/manifest.json'
      }
    ],
    
    prefer_related_applications: false,
    
    edge_side_panel: {
      preferred_width: 400
    },
    
    launch_handler: {
      client_mode: 'navigate-existing'
    },
    
    protocol_handlers: [
      {
        protocol: 'mailto',
        url: '/contact?email=%s'
      }
    ],
    
    file_handlers: [
      {
        action: '/upload',
        accept: {
          'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp']
        }
      }
    ]
  };
}