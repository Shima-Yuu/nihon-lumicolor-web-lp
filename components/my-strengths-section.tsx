'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'

const services = [
  {
    title: '初期費用<span class="text-yellow-400">0円</span>から<br/>始められる低コスト導入',
    description:
      '初期費用<span class="text-[#e94e1b] font-bold">0円</span>、月額<span class="text-[#e94e1b] font-bold">3,980円</span>（税抜）から始められる手軽さが魅力です。明確な料金プランで比較しやすく、予算に合わせて選べます。将来的に成長したら、段階的にグレードアップも可能なので安心です。',
  },
  {
    title: '<span class="text-yellow-400">整体・治療院専門</span>の<br/>デザインとコンテンツ',
    description:
      '<span class="text-[#e94e1b] font-bold">整体・治療院に特化したサービス</span>だから、患者さんが求める情報が的確に伝わります。3〜4つのテンプレートから選べるライトプラン・スタンダードプランと、オリジナルデザインのプレミアムプランをご用意。ロゴやサイト画像の制作もサポートします。',
  },
  {
    title:
      '<span class="text-yellow-400">手間いらず</span>で<span class="text-yellow-400">本業に集中</span>できる<br/>運用管理サポート',
    description:
      '<span class="text-[#e94e1b] font-bold">月に3〜5回の更新サポート</span>付きで、忙しい院長先生の負担を軽減します。お知らせ投稿や料金表更新を代行し、施術に集中できる環境をサポート。SNS連携機能も標準搭載で、集客力アップを手助けします。',
  },
  {
    title:
      '<span class="text-yellow-400">スマホ対応</span>・<br/><span class="text-yellow-400">集客に特化</span>した機能実装',
    description:
      '<span class="text-[#e94e1b] font-bold">全プランでスマホ最適化デザイン</span>を採用。患者さんが知りたい情報（営業時間・アクセス・料金など）を見やすく配置し、検索上位表示を目指した設計で新規患者獲得をサポートします。',
  },
]

export default function MyStrengthsSection() {
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="ac_my_strengths" className="py-16 pt-12 md:pt-8">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">日本ルミカラーの4つの強み</h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col overflow-hidden border-none shadow-lg">
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={`/images/img_my-strengths-0${index + 1}.png`}
                    alt={service.title.replace(/<br\/?>|<\/?br>/g, ' ')}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader className="bg-[#1a4d89] text-white pb-4 pt-3 md:pt-4">
                  <h3>
                    <CardTitle
                      className="text-xl text-center"
                      dangerouslySetInnerHTML={{ __html: service.title }}
                    />
                  </h3>
                </CardHeader>
                <CardContent className="pt-4 flex-grow">
                  <CardDescription
                    className="text-gray-700 text-sm md:text-base"
                    dangerouslySetInnerHTML={{ __html: service.description }}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
