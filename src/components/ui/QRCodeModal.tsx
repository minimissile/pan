'use client';

import { Modal } from './Modal';
import { Smartphone, Download } from 'lucide-react';

interface QRCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  downloadUrl: string;
  resourceTitle: string;
}

export function QRCodeModal({ isOpen, onClose, downloadUrl, resourceTitle }: QRCodeModalProps) {
  // 生成二维码URL（使用qr-server.com免费服务）
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(downloadUrl)}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="扫码下载" size="md">
      <div className="text-center">
        {/* 二维码 */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-white rounded-lg shadow-sm border">
            <img 
              src={qrCodeUrl} 
              alt="下载二维码" 
              className="w-48 h-48"
              onError={(e) => {
                // 如果二维码加载失败，显示备用内容
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
            {/* 备用二维码显示 */}
            <div className="hidden w-48 h-48 bg-gray-100 dark:bg-gray-700 flex items-center justify-center rounded">
              <div className="text-center">
                <Smartphone className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">二维码加载中...</p>
              </div>
            </div>
          </div>
        </div>

        {/* 说明文字 */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
            使用手机扫码下载
          </h4>
          <p className="text-gray-600 dark:text-gray-400">
            {resourceTitle}
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Download className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-1">
                  下载步骤：
                </p>
                <ol className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                  <li>1. 使用手机相机或扫码软件扫描二维码</li>
                  <li>2. 在手机浏览器中打开链接</li>
                  <li>3. 点击下载按钮保存到手机</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              💡 建议使用夸克APP扫码，可直接保存到网盘
            </p>
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={() => {
              // 复制链接到剪贴板
              navigator.clipboard.writeText(downloadUrl).then(() => {
                // 可以添加提示
                alert('链接已复制到剪贴板');
              }).catch(() => {
                // 降级处理
                prompt('请手动复制链接:', downloadUrl);
              });
            }}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
          >
            复制链接
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </Modal>
  );
}