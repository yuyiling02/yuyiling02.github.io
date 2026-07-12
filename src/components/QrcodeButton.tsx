'use client';

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { QrCode, X, Check } from 'lucide-react';

interface QRCodeButtonProps {
  className?: string;
}

export function QRCodeButton({ className }: QRCodeButtonProps) {
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <>
      {/* 扫码按钮 */}
      <Button
        onClick={() => setShowQR(true)}
        className={`${className} bg-gradient-to-r from-pink-400 via-yellow-400 to-blue-400 text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
      >
        <QrCode className="w-5 h-5 mr-2" />
        扫码查看
      </Button>

      {/* 二维码弹窗 */}
      {showQR && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowQR(false)}
        >
          <div 
            className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 标题 */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold bg-gradient-to-r from-pink-500 via-yellow-500 to-blue-500 bg-clip-text text-transparent">
                扫码访问
              </h3>
              <button 
                onClick={() => setShowQR(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* 二维码 */}
            <div className="bg-white rounded-2xl p-6 flex justify-center mb-4 border border-gray-100">
              <QRCodeSVG 
                value={currentUrl}
                size={256}
                level="H"
                includeMargin={true}
                bgColor="#ffffff"
                fgColor="#2D3748"
              />
            </div>

            {/* 提示文字 */}
            <p className="text-center text-gray-600 text-sm">
              使用手机扫描二维码即可访问当前页面
            </p>
            
            {/* 当前地址 */}
            <div className="mt-3 flex items-center justify-center gap-2">
              <input 
                type="text" 
                value={currentUrl} 
                readOnly
                className="flex-1 text-center text-gray-400 text-xs bg-gray-50 rounded-lg px-3 py-2 border border-gray-200"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(currentUrl).then(() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }).catch(() => {
                    const textarea = document.createElement('textarea');
                    textarea.value = currentUrl;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  });
                }}
                className="px-3 py-2 bg-gradient-to-r from-pink-400 to-purple-400 text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"
              >
                {copied ? <Check className="w-4 h-4" /> : '复制'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}