import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '3D魔法作品展示',
    template: '%s | 3D魔法作品展示',
  },
  description:
    '探索充满童趣与科技感的3D艺术世界，扫码即可在手机上查看精彩的3D作品。',
  keywords: [
    '3D作品',
    '3D模型',
    'GLB',
    'Three.js',
    'WebGL',
    '3D展示',
    '3D艺术',
  ],
  authors: [{ name: '3D魔法作品团队' }],
  generator: 'Next.js',
  openGraph: {
    title: '3D魔法作品展示',
    description:
      '探索充满童趣与科技感的3D艺术世界，扫码即可在手机上查看精彩的3D作品。',
    siteName: '3D魔法作品展示',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '3D魔法作品展示',
    description:
      '探索充满童趣与科技感的3D艺术世界，扫码即可在手机上查看精彩的3D作品。',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="en">
      <body className={`antialiased`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}
