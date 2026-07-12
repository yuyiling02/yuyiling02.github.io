'use client';

import { useState } from 'react';
import { ArtworkCard } from '@/components/ArtworkCard';
import { SearchBar } from '@/components/SearchBar';
import { Artwork, ArtworkConfig } from '@/lib/types';
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/components/ui/empty';
import { Search, Sparkles, Settings } from 'lucide-react';
import { QRCodeButton } from '@/components/QrcodeButton';

import config from '@/../public/config.json';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const artworks: ArtworkConfig = config;

  const filteredArtworks = artworks.filter((artwork) =>
    artwork.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    artwork.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #E0F7FF 0%, #F0E6FF 100%)'
      }}>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/60 border-b border-white/30">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-5">
          <div className="flex justify-between items-center mb-4 sm:mb-6">
            <div className="flex gap-2">
              <QRCodeButton />
            </div>
            <a
              href="/admin"
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 
                bg-white/80 hover:bg-white rounded-full
                text-xs sm:text-sm font-medium text-[#718096] hover:text-[#4FACFE]
                border border-white/30 hover:border-[#4FACFE]
                transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">管理作品</span>
            </a>
          </div>
          
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#2D3748] tracking-tight mb-1 sm:mb-2"
              style={{
                textShadow: '0 2px 10px rgba(79, 172, 254, 0.2)'
              }}>
              ✨ 3D魔法作品展示 ✨
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-[#718096]">
              探索充满童趣与科技感的3D艺术世界
            </p>
          </div>
          
          <SearchBar onSearch={setSearchQuery} />
          
          <div className="text-center mt-3">
            <span className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 
              bg-white/50 backdrop-blur-sm rounded-full
              text-xs sm:text-sm text-[#718096] border border-white/30">
              <Sparkles className="size-3 sm:size-4 text-[#4FACFE]" />
              {searchQuery ? (
                <>找到 <strong className="text-[#4FACFE]">{filteredArtworks.length}</strong> 个魔法作品</>
              ) : (
                <>共 <strong className="text-[#9D50BB]">{artworks.length}</strong> 个魔法作品</>
              )}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8 md:py-12">
        {filteredArtworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {filteredArtworks.map((artwork) => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <Empty className="py-20 bg-white/30 backdrop-blur-sm rounded-3xl">
            <EmptyHeader>
              <EmptyMedia variant="icon" className="bg-gradient-to-r from-[#4FACFE] to-[#9D50BB]">
                <Search className="h-8 w-8 text-white" />
              </EmptyMedia>
              <EmptyTitle className="text-[#2D3748] text-lg">未找到魔法作品</EmptyTitle>
              <EmptyDescription className="text-[#718096]">
                搜索中没有找到 "{searchQuery}" 相关的作品<br/>
               试试搜索其他关键词？
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        )}
      </main>

      <footer className="backdrop-blur-md bg-white/40 border-t border-white/30 py-8">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-sm text-[#718096] flex items-center justify-center gap-2">
            <Sparkles className="size-4 text-[#4FACFE]" />
            扫描二维码访问，开启你的魔法3D之旅
            <Sparkles className="size-4 text-[#9D50BB]" />
          </p>
        </div>
      </footer>
    </div>
  );
}
