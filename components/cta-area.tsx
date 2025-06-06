'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function CTAArea() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  }

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 relative">
      <div className="relative container mx-auto px-4 z-10">
        {/* テキストエリアを右に寄せて、白い背景で囲む */}
        <motion.div
          className="max-w-4xl mx-auto flex justify-end"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 lg:max-w-[600px] relative z-20">
            <motion.h2
              className="text-lg md:text-3xl font-bold mb-3 md:mb-6 text-gray-800 md:leading-relaxed"
              variants={itemVariants}
            >
              導入の検討に迷うことがあれば、
              <br />
              お気軽にご相談ください
            </motion.h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 w-full mt-3 md:mt-6">
              <motion.div className="flex flex-col items-center" variants={itemVariants}>
                <a
                  href="tel:07083143924"
                  className="text-orange-500 text-3xl md:text-4xl font-bold hover:opacity-80 transition-opacity"
                >
                  070-8314-3924
                </a>
                <p className="text-gray-600 text-xs mt-2">※ 受付時間 平日9:00〜18:00</p>
                <p className="text-gray-600 text-xs mt-2">
                  ※ お打ち合わせ中は電話に出ることができません。
                </p>
                <p className="text-gray-600 text-xs mt-2">
                  ※ 留守番電話にお名前とご要件をお伝えください。
                </p>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  className="bg-gradient-to-r border-2 border-[#e94e1b] from-[#e94e1b] to-[#f26b3c] hover:from-[#d24418] hover:to-[#e45e32] text-white text-lg py-6 px-8 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
                  onClick={() => {
                    const contactSection = document.getElementById('ac_contact')
                    const offset = window.innerWidth < 768 ? 30 : 80
                    if (contactSection) {
                      window.scrollTo({
                        top: contactSection.offsetTop - offset,
                        behavior: 'smooth',
                      })
                    }
                  }}
                >
                  無料相談する
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 背景画像とグラデーションオーバーレイ */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* 背景画像 */}
        <Image
          src="/images/img_cta-bg.png"
          alt="背景"
          fill
          style={{ objectFit: 'cover' }}
          priority
          className="z-0"
        />
        {/* 青いグラデーションオーバーレイ */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a4d89]/10 to-[#1a4d89]/80 z-1 mix-blend-overlay"></div>
      </div>
    </section>
  )
}
