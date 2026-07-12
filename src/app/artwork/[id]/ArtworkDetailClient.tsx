'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ModelViewer } from '@/components/ModelViewer';
import { Artwork } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Share2, Sparkles, Check } from 'lucide-react';

interface ArtworkDetailClientProps {
  artwork: Artwork | undefined;
}

export default function ArtworkDetailClient({ artwork }: ArtworkDetailClientProps) {
  const [shareSuccess, setShareSuccess] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    const title = artwork ? `${artwork.author} - ${artwork.title}` : '3D魔法作品展示';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: `查看 ${artwork?.author} 的魔法作品《${artwork?.title}》`,
          url,
        });
      } catch (err) {
        console.log('分享取消:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (err) {
        try {
          const textarea = document.createElement('textarea');
          textarea.value = url;
          document.body.appendChild(textarea);
          textarea.select();
          document.execCommand('copy');
          document.body.removeChild(textarea);
          setShareSuccess(true);
          setTimeout(() => setShareSuccess(false), 2000);
        } catch (fallbackErr) {
          window.prompt('链接:', url);
        }
      }
    }
  };

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #E0F7FF 0%, #F0E6FF 100%)'
        }}>
        <div className="text-center px-4">
          <Sparkles className="size-12 text-[#718096] mx-auto mb-4" />
          <p className="text-[#2D3748] font-semibold text-lg">作品不存在</p>
          <Link href="/">
            <Button variant="outline" 
              className="mt-6 px-6 py-3 rounded-xl
                border-2 border-[#4FACFE]/30 hover:border-[#4FACFE]
                hover:bg-[#4FACFE]/10 text-[#4FACFE]
                transition-all duration-300">
              <ArrowLeft className="size-4 mr-2" />
              返回首页
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #E0F7FF 0%, #F0E6FF 100%)'
      }}>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/60 border-b border-white/30">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-xl bg-white/50 backdrop-blur-sm 
              border border-white/30 group-hover:bg-[#4FACFE]/10 
              transition-all duration-300">
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-[#4FACFE] group-hover:text-[#9D50BB]" />
            </div>
            <span className="text-xs sm:text-sm text-[#718096] group-hover:text-[#2D3748] transition-colors">
              返回列表
            </span>
          </Link>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleShare}
            className={`gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl
              hover:bg-[#9D50BB]/10 text-[#718096] hover:text-[#9D50BB]
              transition-all duration-300
              ${shareSuccess ? 'text-green-500 bg-green-50' : ''}`}
          >
            {shareSuccess ? (
              <>
                <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">已复制</span>
              </>
            ) : (
              <>
                <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="text-xs sm:text-sm">分享</span>
              </>
            )}
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-5 sm:py-8 md:py-12">
        <div className="mb-4 sm:mb-6 md:mb-8 text-center">
          <div className="inline-flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <Sparkles className="size-4 sm:size-5 text-[#4FACFE]" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D3748]">
              {artwork.title}
            </h1>
            <Sparkles className="size-4 sm:size-5 text-[#9D50BB]" />
          </div>
          <p className="text-xs sm:text-sm md:text-base text-[#718096] flex items-center justify-center gap-1.5 sm:gap-2">
            <Sparkles className="size-3 sm:size-4 text-[#9D50BB]" />
            创作者：{artwork.author}
          </p>
        </div>

        <div className="w-full aspect-square sm:aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9] 
          max-h-[400px] sm:max-h-[500px] lg:max-h-[600px] 
          rounded-3xl overflow-hidden shadow-2xl shadow-[#4FACFE]/20
          border-2 border-white/30"
          style={{
            boxShadow: '0 20px 50px -10px rgba(79, 172, 254, 0.3), 0 0 30px rgba(157, 80, 187, 0.2)'
          }}>
          <ModelViewer modelUrl={artwork.modelFile} />
        </div>

        <div className="mt-5 sm:mt-8 md:mt-12 space-y-5 sm:space-y-6">
          <div className="bg-white/85 backdrop-blur-sm rounded-3xl p-4 sm:p-6 md:p-8 
            border border-white/30 shadow-lg">
            <h2 className="text-base sm:text-lg font-bold text-[#2D3748] mb-3 sm:mb-4 flex items-center gap-2">
              <Sparkles className="size-4 sm:size-5 text-[#4FACFE]" />
              作品信息
            </h2>
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-[#718096]">
              <p className="flex items-center gap-2">
                <span className="font-medium text-[#2D3748]">作品名称：</span>
                <span className="text-[#4FACFE] font-semibold">{artwork.title}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="font-medium text-[#2D3748]">创作者：</span>
                <span className="text-[#9D50BB] font-semibold">{artwork.author}</span>
              </p>
              <div className="flex items-start gap-2 p-2 sm:p-3 
                bg-gradient-to-r from-[#E0F7FF]/50 to-[#F0E6FF]/50 rounded-xl mt-3">
                <Sparkles className="size-3 sm:size-4 text-[#4FACFE] mt-0.5 flex-shrink-0" />
                <p className="text-[10px] sm:text-xs text-[#718096]">
                  操作提示：拖动手指旋转模型，双指捏合缩放，双指拖动平移
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link href="/" className="flex-1">
              <Button variant="outline" 
                className="w-full py-3 sm:py-4 rounded-2xl
                  border-2 border-[#4FACFE]/30 hover:border-[#4FACFE]
                  hover:bg-[#4FACFE]/10 text-[#4FACFE]
                  transition-all duration-300 shadow-lg hover:shadow-xl
                  font-semibold text-sm sm:text-base">
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
                查看更多作品
              </Button>
            </Link>
            <Button
              onClick={handleShare}
              className="flex-1 py-3 sm:py-4 rounded-2xl
                bg-gradient-to-r from-[#4FACFE] to-[#00F2FE]
                hover:from-[#9D50BB] hover:to-[#4FACFE]
                text-white shadow-lg shadow-[#4FACFE]/30
                hover:shadow-xl hover:shadow-[#9D50BB]/40
                transition-all duration-300 font-semibold
                text-sm sm:text-base hover:-translate-y-1">
              <Share2 className="h-4 w-4 sm:h-5 sm:w-5 mr-1.5 sm:mr-2" />
              分享作品
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
