import type React from 'react'
import type { Metadata } from 'next'
import { Noto_Sans_JP, Roboto } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { GoogleAnalytics } from '@/components/google-analytics'
import { MicrosoftClarity } from '@/components/microsoft-clarity'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-noto-sans-jp',
})

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: '整体院向けホームページ制作｜初期費用0円・月額3,980円～｜株式会社日本ルミカラー',
  description:
    '整体院・治療院向けホームページ制作なら株式会社日本ルミカラー。初期費用0円・月額3,980円～で高品質なサイトを提供。ライト・スタンダード・プレミアムの3プランをご用意し、お客様のニーズに合わせた最適なサイト制作をサポートします。お問い合わせフォーム設置やロゴ制作も対応可能。',
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: '/images/favicon.webp',
    apple: '/images/apple-touch-icon.webp',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <GoogleAnalytics gaId="G-9VJHHWHGGE" />
        <MicrosoftClarity clarityId="rjt0nn5vwh" />
      </head>
      <body className={`${notoSansJP.variable} ${roboto.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
