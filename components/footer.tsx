'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#082b57] to-[#1a4d89] text-white">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <Link href="/" className="flex items-center justify-center md:justify-start mb-4">
              <span className="font-bold text-xl">株式会社日本ルミカラー</span>
            </Link>
            <p className="max-w-md text-sm md:text-base">
              デジタルの力でビジネスの可性を拡げる
              <br />
              調査・分析・制作・運用までワンストップ
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end text-sm md:text-base">
            <p>〒173-0037 東京都板橋区小茂根2-3-2 1F</p>
            <p>TEL: 070-8314-3924</p>
            <p>Email: info@nihon-lumicolor.jp</p>
          </div>
        </div>

        <div className="border-t border-white/20 mt-4 pt-4 md:mt-8 md:pt-8 text-center text-xs md:text-base">
          <p>© 2025 Nihon Lumicolor. All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}
