'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'
import { CheckCircle, ExternalLink } from 'lucide-react'

const works = [
  {
    title: '整体院の集客力拡大サイト改革',
    category: '戦略的WEBサイト構築',
    image: '/images/img_works_01.png',
    description: '施術内容が伝わるサイト設計で新規顧客45%増加',
    fullDescription:
      '地域密着型整体院のWEBサイトを一新。施術メニューを写真と動画で分かりやすく紹介し、お客様の声や症例写真を掲載。また予約システムを連携させることで24時間いつでも予約可能な環境を構築。スマホ対応も強化し、検索上位表示を実現。結果として新規顧客獲得とリピート率向上に成功しました。',
    results: [
      '月間サイト訪問者数が従来比180%に増加し、新規顧客が45%増加',
      '電話予約からWEB予約へのシフトにより受付業務の工数が60%削減客単価が平均15%向上し、売上増加に貢献',
      '施術コース別のランディングページ作成により顧客単価が20%向上',
    ],
  },
  {
    title: '整体院の口コミ活用集客術',
    category: 'デジタル集客戦略',
    image: '/images/img_works_03.png',
    description: '口コミ戦略で来院数35%増、新規顧客獲得に成功',
    fullDescription:
      '従来のチラシ広告に頼っていた整体院に、Google・Instagram・LINEを活用した総合的なデジタル集客戦略を導入。特に患者の声を活かした口コミマーケティングを強化し、定期的な情報発信と施術効果の見える化を実施。ターゲット層に合わせたコンテンツ制作により、効率的な新規顧客開拓に成功しました。',
    results: [
      '月間総来院数が従来比135%に増加し、新規顧客層を40代女性を中心に拡大',
      '既存客からの紹介率が15%から30%に向上し、広告費用対効果が倍増',
      'Google上の口コミ評価が3.2から4.7に向上し、問い合わせ数が月50件増加',
    ],
  },
  {
    title: '整体院の予約管理システム導入と業務改革',
    category: 'デジタル業務改革',
    image: '/images/img_works_02.png',
    description: '予約管理システム導入で業務工数70%削減、顧客満足度も向上',
    fullDescription:
      '地域密着型の整体院向けに、オンライン予約システムと顧客管理システムを統合導入。電話対応時間の削減により施術に集中できる環境を整備しました。また、顧客データ分析により効果的なリピート促進策を実施し、定期的な来院を促進。業務効率化と売上向上の好循環を生み出しています。',
    results: [
      '予約管理業務の工数が70%削減され、施術時間の確保に成功',
      '電話対応時間が1日あたり平均2時間から30分に短縮',
      '顧客データ活用によりリピート率が25%向上',
    ],
  },
]

export default function WorksSection() {
  const [selectedWork, setSelectedWork] = useState<(typeof works)[0] | null>(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="ac_works" className="py-16 pt-12 md:pt16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-4">制作事例</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-center text-sm md:text-base">
            当社がこれまでに手がけた制作事例をご紹介します。
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {works.map((work, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 w-full">
                  <Image src={work.image} alt={work.title} fill className="object-cover" />
                </div>
                <CardContent className="pt-4 md:pt-6 flex-grow">
                  <Badge className="mb-2 bg-[#1a4d89] hover:bg-[#1a4d89] text-xs md:text-base">
                    {work.category}
                  </Badge>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{work.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base">{work.description}</p>
                </CardContent>
                <CardFooter>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full border-[#1a4d89] text-[#1a4d89] hover:bg-[#1a4d89] hover:text-white transition-all duration-300"
                        onClick={() => setSelectedWork(work)}
                      >
                        詳細を見る
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] p-6 bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
                      <DialogClose asChild></DialogClose>
                      <DialogHeader className="mb-1 md:mb-4">
                        <DialogTitle className="text-lg md:text-2xl font-bold text-gray-800 text-left">
                          {work.title}
                        </DialogTitle>
                        <Badge className="w-fit mt-2 md:!mt-3 bg-[#1a4d89] hover:bg-[#1a4d89]">
                          {work.category}
                        </Badge>
                      </DialogHeader>
                      <div className="relative h-60 w-full md:mt-4 rounded-md overflow-hidden">
                        <Image
                          src={work.image || '/placeholder.svg'}
                          alt={work.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <DialogDescription className="mt-0 md:mt-6 text-sm md:text-base text-gray-700">
                        {work.fullDescription}
                      </DialogDescription>
                      <div className="mt-2 md:mt-6">
                        <h4 className="font-bold text:base md:text-lg mb-3 text-gray-800">成果</h4>
                        <ul className="space-y-3">
                          {work.results.map((result, i) => (
                            <li key={i} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-[#1a4d89] mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm md:text-base">{result}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* 成功事例の外部リンク */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">成功事例の紹介</h3>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className="md:flex">
              <div className="md:w-1/2 relative">
                <div className="relative h-44 md:h-full w-full">
                  <Image
                    src="/images/img_works-sample.png"
                    alt="成功事例サンプル"
                    fill
                    className="object-contain" /* object-coverからobject-containに変更 */
                  />
                </div>
              </div>
              <div className="p-4 md:p-6 md:w-1/2 flex flex-col justify-between">
                <div>
                  <h4 className="text-xl font-bold mb-3">全身もみほぐしアーユス整体院</h4>
                  <p className="text-sm mnd:text-base text-gray-600 mb-4">
                    施術内容とその効果を明確に伝えるサイト設計により、来院予約数が大幅に増加。ユーザーが求める情報をわかりやすく表示し、SEO対策も徹底したリニューアルで集客力を強化しました。
                  </p>

                  <div className="space-y-3 mb-6">
                    <h5 className="font-semibold text-base">成果</h5>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-[#1a4d89] mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">
                          電話予約からWEB予約への移行により受付業務が75%効率化、スタッフの負担を大幅に軽減
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-[#1a4d89] mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">
                          サイト制作後、新規顧客が月間20人増加し、売上を前年比130%に向上
                        </span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-[#1a4d89] mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">
                          口コミ投稿促進施策により評価が平均4.4に向上し、紹介による新規顧客が月10人増加
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <Button
                  className="mt-4 bg-[#1a4d89] hover:bg-[#153d6d] text-white transition-all duration-300 p-3 h-auto text-sm md:w-[300px]"
                  onClick={() =>
                    window.open('https://hogushi-ayus.com/', '_blank', 'noopener,noreferrer')
                  }
                >
                  ホームページはこちら
                  <ExternalLink className="h-4 w-4 ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
