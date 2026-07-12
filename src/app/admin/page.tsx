'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Trash2, Plus, Edit, ArrowLeft, Sparkles, Upload, FileText, Image as ImageIcon, AlertTriangle, Lock, LogOut, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Artwork, ArtworkConfig } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { QRCodeButton } from '@/components/QrcodeButton';

const ADMIN_PASSWORD = 'admin123';

import config from '@/../public/config.json';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const [artworks, setArtworks] = useState<ArtworkConfig>(config);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    modelFile: '',
    thumbnail: '',
  });

  useEffect(() => {
    const savedLogin = localStorage.getItem('isAdmin');
    if (savedLogin === 'true') {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      setLoggedIn(true);
      setLoginError('');
    } else {
      setLoginError('密码错误，请重试');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    setLoggedIn(false);
    setPassword('');
  };

  const handleSubmit = () => {
    alert('当前为静态网站模式，无法在线编辑作品。\n\n如需添加/修改作品，请手动编辑 public/config.json 文件，并上传模型和缩略图到对应的目录。');
    setDialogOpen(false);
    resetForm();
  };

  const handleEdit = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setFormData({
      author: artwork.author === '未知作者' ? '' : artwork.author,
      title: artwork.title,
      modelFile: artwork.modelFile,
      thumbnail: artwork.thumbnail,
    });
    setDialogOpen(true);
  };

  const resetForm = () => {
    setEditingArtwork(null);
    setFormData({
      author: '',
      title: '',
      modelFile: '',
      thumbnail: '',
    });
  };

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #E0F7FF 0%, #F0E6FF 100%)'
        }}>
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-white/30 
          rounded-3xl shadow-2xl overflow-hidden">
          <CardHeader className="pb-6 text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-[#4FACFE] to-[#9D50BB] 
              flex items-center justify-center mb-4 shadow-lg shadow-[#4FACFE]/30">
              <Lock className="size-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-[#2D3748]">
              管理员登录
            </CardTitle>
            <p className="text-sm text-[#718096] mt-2">
              请输入管理员密码以访问管理面板
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                placeholder="请输入密码"
                className="h-14 text-lg bg-white/50 border-2 border-[#4FACFE]/20 
                  focus:border-[#4FACFE] focus:ring-[#4FACFE]/10
                  rounded-2xl text-[#2D3748]"
              />
              {loginError && (
                <p className="text-sm text-[#F56565] mt-2 flex items-center gap-1">
                  <AlertTriangle className="size-4" />
                  {loginError}
                </p>
              )}
            </div>
            <Button
              onClick={handleLogin}
              disabled={!password}
              className="w-full py-4 bg-gradient-to-r from-[#4FACFE] to-[#00F2FE]
                hover:from-[#9D50BB] hover:to-[#4FACFE]
                text-white rounded-2xl shadow-lg shadow-[#4FACFE]/30
                hover:shadow-xl hover:shadow-[#9D50BB]/40
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300 font-semibold text-lg"
            >
              <Lock className="size-5 mr-2" />
              登录
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen"
      style={{
        background: 'linear-gradient(135deg, #E0F7FF 0%, #F0E6FF 100%)'
      }}>
      <header className="backdrop-blur-md bg-white/60 border-b border-white/30 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-5 flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="p-2 rounded-xl bg-white/50 backdrop-blur-sm 
              border border-white/30 group-hover:bg-[#4FACFE]/10 
              transition-all duration-300">
              <ArrowLeft className="h-5 w-5 text-[#4FACFE] group-hover:text-[#9D50BB]" />
            </div>
            <span className="text-sm text-[#718096] group-hover:text-[#2D3748] transition-colors">
              返回首页
            </span>
          </Link>
          
          <h1 className="text-xl font-bold text-[#2D3748] flex items-center gap-2 flex-shrink-0">
            <Sparkles className="size-6 text-[#4FACFE]" />
            作品管理中心
          </h1>
          
          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="gap-2 px-4 py-2 rounded-xl
                hover:bg-[#F56565]/10 text-[#718096] hover:text-[#F56565]
                transition-all duration-300"
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">退出</span>
            </Button>
            <QRCodeButton />
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="size-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-amber-800">静态网站模式</p>
            <p className="text-xs text-amber-600 mt-1">
              当前网站已配置为静态导出模式，无法在线上传和修改作品。如需添加或修改作品，请手动编辑 <code className="bg-amber-200 px-1.5 py-0.5 rounded text-amber-800">public/config.json</code> 文件，并将GLB模型和缩略图上传到对应的目录。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((artwork) => (
            <Card key={artwork.id} 
              className="bg-white/85 backdrop-blur-sm border border-white/30 
                rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300
                hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-5 text-[#4FACFE]" />
                    <CardTitle className="text-lg font-bold text-[#2D3748]">
                      {artwork.title}
                    </CardTitle>
                  </div>
                </div>
                <p className="text-sm text-[#718096] mt-1 flex items-center gap-1">
                  <Sparkles className="size-3 text-[#9D50BB]" />
                  作者：{artwork.author || '未知作者'}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="text-xs text-[#718096] space-y-2 p-3 
                  bg-gradient-to-r from-[#E0F7FF]/50 to-[#F0E6FF]/50 rounded-xl">
                  <p className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-[#4FACFE]/10 text-[#4FACFE]">
                      ID: {artwork.id}
                    </Badge>
                  </p>
                  <p className="truncate flex items-center gap-1">
                    <FileText className="size-3 text-[#4FACFE]" />
                    模型：{artwork.modelFile}
                  </p>
                  <p className="truncate flex items-center gap-1">
                    <ImageIcon className="size-3 text-[#9D50BB]" />
                    缩略图：{artwork.thumbnail}
                  </p>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(artwork)}
                    disabled
                    className="gap-2 px-4 py-2 rounded-xl
                      border-2 border-[#A0AEC0]/20 bg-[#F7FAFC]
                      text-[#A0AEC0] cursor-not-allowed"
                  >
                    <Edit className="h-4 w-4" />
                    编辑
                  </Button>
                  
                  <Link href={`/artwork/${artwork.id}`} className="flex-1">
                    <Button variant="outline" size="sm" 
                      className="w-full py-2 rounded-xl
                        border-2 border-[#9D50BB]/20 hover:border-[#9D50BB]
                        hover:bg-[#9D50BB]/10 text-[#9D50BB]
                        transition-all duration-300">
                      <Sparkles className="size-4 mr-2" />
                      查看
                    </Button>
                  </Link>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    disabled
                    className="gap-2 px-4 py-2 rounded-xl
                      border-2 border-[#A0AEC0]/20 bg-[#F7FAFC]
                      text-[#A0AEC0] cursor-not-allowed"
                  >
                    <Trash2 className="h-4 w-4" />
                    删除
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {artworks.length === 0 && (
          <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl
            border border-white/30">
            <Sparkles className="size-12 text-[#4FACFE] mx-auto mb-4 animate-pulse" />
            <p className="text-[#718096] text-lg">
              暂无作品，手动编辑 config.json 添加作品
            </p>
          </div>
        )}
      </main>

      <Dialog open={dialogOpen} onOpenChange={(open) => {
        setDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogTrigger asChild>
          <Button disabled
            className="gap-3 px-6 py-3 
              bg-gray-200 text-gray-400 rounded-2xl cursor-not-allowed
              shadow-lg"
          >
            <Plus className="h-5 w-5" />
            添加作品
          </Button>
        </DialogTrigger>
      
        <DialogContent className="max-w-md bg-white/95 backdrop-blur-md 
          border border-white/30 rounded-3xl shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-[#2D3748] flex items-center gap-2">
              <AlertTriangle className="size-5 text-amber-500" />
              静态模式提示
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-5 mt-6">
            <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
              <AlertCircle className="size-5 text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-amber-800">无法在线编辑</p>
                <p className="text-xs text-amber-600 mt-1">
                  当前为静态网站模式，如需添加或修改作品，请手动编辑 config.json 文件。
                </p>
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-[#2D3748]">手动添加作品步骤：</h3>
              <ol className="text-xs text-[#718096] space-y-1">
                <li>1. 将GLB模型文件上传到 <code className="bg-gray-100 px-1 rounded">public/models/</code> 目录</li>
                <li>2. 将缩略图上传到 <code className="bg-gray-100 px-1 rounded">public/thumbnails/</code> 目录</li>
                <li>3. 编辑 <code className="bg-gray-100 px-1 rounded">public/config.json</code> 添加作品信息</li>
              </ol>
            </div>
            
            <Button
              onClick={() => setDialogOpen(false)}
              className="w-full py-3 rounded-xl
                bg-gradient-to-r from-[#4FACFE] to-[#00F2FE]
                text-white font-semibold"
            >
              知道了
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
