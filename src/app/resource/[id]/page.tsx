'use client';

import { useState } from 'react';
import { Calendar, Download, Eye, Star, Clock, Share2, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QRCodeModal } from '@/components/ui/QRCodeModal';
import { useDeviceType } from '@/hooks';
import Link from 'next/link';

// 模拟资源数据
const resources = {
  1: {
    id: 1,
    title: '装台 Stage Builder (2020)',
    category: '国剧',
    description: '47岁的刁大顺带领一群精壮汉子在西安从事舞台演出的装台工作，在这个鱼龙混杂的行业里，他们用自己的方式诠释着什么是兄弟情义，什么是家庭责任。该剧改编自陈彦的同名小说，真实展现了底层劳动者的生活状态和精神世界。',
    image: '/images/zhuangtai.jpg',
    rating: 8.5,
    year: 2020,
    episodes: 33,
    views: '12.5k',
    downloads: '3.2k',
    uploadDate: '2024-01-15',
    tags: ['剧情', '家庭', '张嘉益', '闫妮'],
    director: '李少飞',
    actors: ['张嘉益', '闫妮', '宋丹丹', '秦海璐'],
    region: '中国大陆',
    language: '汉语普通话',
    duration: '45分钟/集',
    status: '已完结',
    downloadLinks: [
      {
        quality: '超清1080P',
        size: '45.2GB',
        format: 'MP4',
        link: 'https://pan.quark.cn/s/example1'
      },
      {
        quality: '高清720P',
        size: '28.5GB',
        format: 'MP4',
        link: 'https://pan.quark.cn/s/example2'
      }
    ],
    plot: '刁大顺是西安一个装台班子的头儿，他带领着一群兄弟在各种演出现场搭建舞台。这些人虽然文化程度不高，但都有着自己的人生智慧和处世哲学。在装台的过程中，他们不仅要面对各种技术难题，还要处理复杂的人际关系。刁大顺的女儿即将结婚，但高昂的彩礼让这个家庭陷入困境。在兄弟们的帮助下，刁大顺最终解决了问题，也让观众看到了普通劳动者身上的光辉品质。'
  },
  2: {
    id: 2,
    title: '流浪地球2 (2023)',
    category: '科幻电影',
    description: '太阳即将毁灭，人类在地球表面建造出巨大的推进器，寻找新的家园。这是一场关于拯救地球的史诗级冒险。',
    image: '/images/wandering-earth-2.jpg',
    rating: 9.1,
    year: 2023,
    episodes: null,
    views: '45.2k',
    downloads: '15.8k',
    uploadDate: '2024-01-20',
    tags: ['科幻', '灾难', '刘德华', '吴京'],
    director: '郭帆',
    actors: ['刘德华', '吴京', '李雪健', '沙溢'],
    region: '中国大陆',
    language: '汉语普通话',
    duration: '173分钟',
    status: '已上映',
    downloadLinks: [
      {
        quality: '4K超清',
        size: '12.8GB',
        format: 'MP4',
        link: 'https://pan.quark.cn/s/example3'
      },
      {
        quality: '1080P高清',
        size: '6.2GB',
        format: 'MP4',
        link: 'https://pan.quark.cn/s/example4'
      }
    ],
    plot: '在《流浪地球》的前传故事中，太阳急速衰老膨胀，地球面临被吞噬的灭顶之灾。面对绝境，人类将开启"流浪地球"计划，试图带着地球一起逃离太阳系，寻找人类新家园。然而这一宏伟计划需要2500年的时间才能完成，在这个过程中，年轻的人们挺身而出，展开争分夺秒的生死之战。'
  }
};

interface Props {
  params: { id: string };
}

export default function ResourceDetailPage({ params }: Props) {
  const resource = resources[params.id as keyof typeof resources];
  const deviceType = useDeviceType();
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedDownloadLink, setSelectedDownloadLink] = useState<string>('');
  const [selectedResourceTitle, setSelectedResourceTitle] = useState<string>('');

  // 处理下载点击
  const handleDownload = (downloadUrl: string, quality?: string) => {
    const title = quality ? `${resource.title} - ${quality}` : resource.title;
    
    if (deviceType === 'mobile') {
      // 移动端直接跳转
      window.open(downloadUrl, '_blank');
    } else {
      // PC端显示二维码弹窗
      setSelectedDownloadLink(downloadUrl);
      setSelectedResourceTitle(title);
      setIsQRModalOpen(true);
    }
  };

  // 处理主下载按钮点击
  const handleMainDownload = () => {
    if (resource.downloadLinks && resource.downloadLinks.length > 0) {
      const firstLink = resource.downloadLinks[0];
      handleDownload(firstLink.link, firstLink.quality);
    }
  };

  if (!resource) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">资源未找到</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">抱歉，您访问的资源不存在或已被删除。</p>
          <Link href="/">
            <Button>返回首页</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* 面包屑导航 */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">首页</Link>
            <span>/</span>
            <Link href="/#resources" className="hover:text-blue-600 dark:hover:text-blue-400">资源列表</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white">{resource.title}</span>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主要内容 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 资源基本信息 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row gap-6">
                {/* 封面图片 */}
                <div className="flex-shrink-0">
                  <div className="w-48 h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center relative">
                    <div className="text-6xl opacity-20">🎬</div>
                    <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-lg text-sm font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      {resource.rating}
                    </div>
                  </div>
                </div>

                {/* 基本信息 */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {resource.title}
                    </h1>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">导演：</span>
                      <span className="text-gray-900 dark:text-white">{resource.director}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">年份：</span>
                      <span className="text-gray-900 dark:text-white">{resource.year}年</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">地区：</span>
                      <span className="text-gray-900 dark:text-white">{resource.region}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">语言：</span>
                      <span className="text-gray-900 dark:text-white">{resource.language}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">时长：</span>
                      <span className="text-gray-900 dark:text-white">{resource.duration}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">状态：</span>
                      <span className="text-green-600 dark:text-green-400">{resource.status}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {resource.views} 观看
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      {resource.downloads} 下载
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {new Date(resource.uploadDate).toLocaleDateString('zh-CN')}
                    </div>
                  </div>

                  {/* 操作按钮 */}
                  <div className="flex gap-3 pt-4">
                    <Button className="flex-1" onClick={handleMainDownload}>
                      <Download className="h-4 w-4 mr-2" />
                      立即下载
                    </Button>
                    <Button variant="outline">
                      <Heart className="h-4 w-4 mr-2" />
                      收藏
                    </Button>
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      分享
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* 剧情简介 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">剧情简介</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {resource.plot}
              </p>
            </div>

            {/* 演员表 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">主要演员</h2>
              <div className="flex flex-wrap gap-3">
                {resource.actors.map((actor) => (
                  <span
                    key={actor}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg"
                  >
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 侧边栏 */}
          <div className="space-y-6">
            {/* 下载链接 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">下载链接</h3>
              <div className="space-y-3">
                {resource.downloadLinks.map((link, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-medium text-gray-900 dark:text-white">{link.quality}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{link.size}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      格式：{link.format}
                    </div>
                    <Button 
                      className="w-full" 
                      size="sm"
                      onClick={() => handleDownload(link.link, link.quality)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      夸克网盘下载
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  💡 资源一定要转存到自己的网盘才可以观看全部哦！
                </p>
              </div>
            </div>

            {/* 相关推荐 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">相关推荐</h3>
              <div className="space-y-4">
                {Object.values(resources)
                  .filter(r => r.id !== resource.id)
                  .slice(0, 3)
                  .map((relatedResource) => (
                    <Link key={relatedResource.id} href={`/resource/${relatedResource.id}`}>
                      <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <div className="w-16 h-20 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-2xl opacity-20">🎬</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 mb-1">
                            {relatedResource.title}
                          </h4>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <Star className="h-3 w-3 fill-current text-yellow-500" />
                            {relatedResource.rating}
                            <span>·</span>
                            <span>{relatedResource.year}年</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 二维码下载弹窗 */}
      <QRCodeModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        downloadUrl={selectedDownloadLink}
        resourceTitle={selectedResourceTitle}
      />
    </div>
  );
}