'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Check, ExternalLink } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'
import Link from 'next/link'

// プランIDの型定義
type PlanId = 'light' | 'standard' | 'premium'

// 料金HTMLの型定義
interface Fee {
  amount: string
  taxText?: string
  value?: number // 数値としての料金（計算用）
}

// オプション項目の型定義
interface Option {
  id: string
  name: string
  price: string
  description: string
  value: number // 数値としての料金（計算用）
  availableFor?: PlanId[] // このオプションが有効なプラン
  hasPrefixTilde?: boolean // 価格の先頭に〜があるか
  hasSuffixTilde?: boolean // 価格の末尾に〜があるか
}

// テンプレート情報の型定義
interface Template {
  id: string
  name: string
  imageSrc: string
  url: string
}

// プランの型定義
interface Plan {
  id: PlanId
  name: string
  initialCost: Fee
  initialFee: Fee
  monthlyFee: Fee
  period: string
  features: string[]
  notes: string[]
  ribbon?: string // 吹き出し用テキスト
  templates?: {
    count: number
    items: Template[]
  }
}

export default function PricePlanSection() {
  const [selectedPlan, setSelectedPlan] = React.useState<PlanId>('light')
  const [selectedOptions, setSelectedOptions] = React.useState<string[]>([])
  const [showEstimate, setShowEstimate] = React.useState(false)
  const [discount, setDiscount] = React.useState(50) // 50%割引（半額）に変更

  const currentMonth = new Date().getMonth() + 1

  // 数値を抽出する関数（例: "10,000円" → 10000）
  const extractNumber = (priceStr: string): number => {
    const matches = priceStr.match(/(\d+,?)+/)
    if (!matches) return 0
    return parseInt(matches[0].replace(/,/g, ''), 10)
  }

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

  // 主要色
  const primaryBlue = '#1a4d89'

  // プランごとの背景色グラデーション - より濃い色に調整
  const planColors: Record<PlanId, { bg: string; header: string; border: string }> = {
    light: {
      bg: `linear-gradient(to right, ${primaryBlue}30, ${primaryBlue}40)`,
      header: `${primaryBlue}50`,
      border: `${primaryBlue}40`,
    },
    standard: {
      bg: `linear-gradient(to right, ${primaryBlue}50, ${primaryBlue}60)`,
      header: `${primaryBlue}70`,
      border: `${primaryBlue}60`,
    },
    premium: {
      bg: `linear-gradient(to right, ${primaryBlue}70, ${primaryBlue}90)`,
      header: primaryBlue,
      border: `${primaryBlue}80`,
    },
  }

  // テンプレート情報
  const templateSets = {
    light: [
      {
        id: 'template-l1',
        name: 'テンプレート1',
        imageSrc: '/images/img_light-plan-sample-01.png',
        url: 'https://light1.vercel.app/',
      },
      {
        id: 'template-l2',
        name: 'テンプレート2',
        imageSrc: '/images/img_light-plan-sample-02.png',
        url: 'https://light2-psi.vercel.app/',
      },
      {
        id: 'template-l3',
        name: 'テンプレート3',
        imageSrc: '/images/img_light-plan-sample-03.png',
        url: 'https://light3.vercel.app/',
      },
      {
        id: 'template-l4',
        name: 'テンプレート4',
        imageSrc: '/images/img_light-plan-sample-04.png',
        url: 'https://light4.vercel.app/',
      },
    ],
    standard: [
      {
        id: 'template-s1',
        name: 'テンプレート1',
        imageSrc: '/images/img_standard-plan-sample-01.png',
        url: 'https://standard1-seven.vercel.app/',
      },
      {
        id: 'template-s2',
        name: 'テンプレート2',
        imageSrc: '/images/img_standard-plan-sample-02.png',
        url: 'https://standard2-one.vercel.app/',
      },
      {
        id: 'template-s3',
        name: 'テンプレート3',
        imageSrc: '/images/img_standard-plan-sample-03.png',
        url: 'https://standard3-five.vercel.app/',
      },
    ],
    premium: [], // プレミアムはオリジナルデザインのためテンプレートなし
  }

  // プラン情報を数値付きで更新
  const plans: Plan[] = [
    {
      id: 'light',
      name: 'ライトプラン',
      initialCost: { amount: '0円', value: 0 },
      initialFee: { amount: '9,800円', taxText: '税抜', value: 9800 },
      monthlyFee: { amount: '3,980円', taxText: '税抜', value: 3980 },
      period: '〜1ヶ月',
      ribbon: '低コスト<span class="hidden md:inline-block">で作りたい方向け</span>',
      features: [
        '1ページ（LP）のサイト制作',
        '月3回まで更新可能',
        '4つのデザインテンプレートから選択',
        '電話番号の掲載',
      ],
      notes: [
        'サーバ / ソースコード一式は弊社で管理します',
        '月毎に行う更新に関してはお知らせの追加、画像の差し替え、文言の変更などに限ります',
        'ライトプランではサイトに掲載する文言はお客様にご用意いただく必要があります（オプション追加可）',
        'ライトプランはお問い合わせフォームはございません（オプション追加可）',
        'ライトプランはドメインの指定はできません（オプション追加可）',
        'ライトプランのロゴはテキストのみとなります（オプション追加可）',
      ],
      templates: {
        count: templateSets.light.length,
        items: templateSets.light,
      },
    },
    {
      id: 'standard',
      name: 'スタンダードプラン',
      initialCost: { amount: '198,000円', taxText: '税抜', value: 198000 },
      initialFee: { amount: '9,800円', taxText: '税抜', value: 9800 },
      monthlyFee: { amount: '4,980円', taxText: '税抜', value: 4980 },
      period: '〜1ヶ月',
      ribbon: 'おすすめ',
      features: [
        '5ページまでのサイト制作（今なら2ページ無料特典）',
        '月5回までの更新',
        '3つのデザインテンプレートから選択',
        'オリジナルロゴ・画像作成',
        'お問い合わせフォーム設置',
        '独自ドメイン設定',
      ],
      notes: [
        'サーバ / ソースコード一式は弊社で管理します',
        '月毎に行う更新に関してはお知らせの追加、画像の差し替え、文言の変更などに限ります',
        'スタンダードプランではサイトに掲載する文言はお客様にご用意いただく必要があります（オプション追加可）',
      ],
      templates: {
        count: 3,
        items: templateSets.standard,
      },
    },
    {
      id: 'premium',
      name: 'プレミアムプラン',
      initialCost: { amount: '498,000円', taxText: '税抜', value: 498000 },
      initialFee: { amount: '9,800円', taxText: '税抜', value: 9800 },
      monthlyFee: { amount: '4,980円', taxText: '税抜', value: 4980 },
      period: '〜2ヶ月',
      ribbon: '完全お任せ<span class="hidden md:inline-block">したい方向け</span>',
      features: [
        '10ページまでのサイト制作（今なら2ページ無料特典）',
        '月5回までの更新',
        'オリジナルデザイン',
        'オリジナルロゴ・画像作成',
        'お問い合わせフォーム設置',
        '独自ドメイン取得',
        'Google My Business導入',
        'ライティング',
        'SEO対策',
        'ライティング無料',
      ],
      notes: [
        'サーバ / ソースコード一式は弊社で管理します',
        '月毎に行う更新に関してはお知らせの追加、画像の差し替え、文言の変更などに限ります',
      ],
    },
  ]

  // オプション情報を拡張（計算用の価格と説明を追加）
  const detailedOptions: Option[] = [
    {
      id: 'additional-update',
      name: '更新の追加（月の更新回数の上限を超えた場合）',
      price: '〜5,000円/1回',
      value: 5000,
      description: '※見積もりでは1回のみ追加した場合で計算します',
      hasPrefixTilde: true, // 先頭に〜がある
    },
    {
      id: 'additional-page',
      name: '追加ページ作成',
      price: '50,000円〜/1回',
      value: 50000,
      description:
        'サイトに新しいページを追加する場合。<br>※見積もりでは1回のみ追加した場合で計算します',
      hasSuffixTilde: true, // 末尾に〜がある
    },
    {
      id: 'contact-form',
      name: 'お問い合わせフォーム作成',
      price: '10,000円',
      value: 10000,
      description: '',
      availableFor: ['light'], // ライトプランのみに表示（他のプランには含まれる）
    },
    {
      id: 'custom-domain',
      name: '独自ドメイン取得',
      price: '5,000円',
      value: 5000,
      description: 'お客様専用のドメインを取得します<br>（例：company.com）',
      availableFor: ['light'], // ライトプランのみに表示
    },
    {
      id: 'interview-writing',
      name: 'インタビュー、取材（文言の作成）',
      price: '10,000円',
      value: 10000,
      description: '取材を行い、文言を作成します',
      availableFor: ['light', 'standard'], // ライト、スタンダードプランのみ
    },
    {
      id: 'photo-material',
      name: '写真撮影、素材用意',
      price: '50,000円',
      value: 50000,
      description: '院内にお伺いし、写真を撮影します。<br>不要であれば弊社側で素材を用意します',
    },
    {
      id: 'logo-design',
      name: 'ロゴデザイン',
      price: '50,000円',
      value: 50000,
      description: 'オリジナルのロゴをデザインします',
      availableFor: ['light'], // ライトプランのみ
    },
    {
      id: 'google-business',
      name: 'Google My Business代行',
      price: '10,000円',
      value: 10000,
      description: 'Googleで店舗情報を表示するための設定を代行します',
      availableFor: ['light', 'standard'], // ライト、スタンダードプランのみ
    },
    {
      id: 'blog-creation',
      name: 'ブログ作成',
      price: '50,000円',
      value: 50000,
      description: 'ブログ機能を追加して記事を投稿できるようにします',
    },
    {
      id: 'l-step',
      name: 'L Step構築費用',
      price: '15,000円',
      value: 15000,
      description: 'LINE公式アカウント連携のための設定を行います',
    },
    {
      id: 'video',
      name: '動画撮影',
      price: '100,000円',
      value: 100000,
      description: 'プロによる動画撮影と編集を行います',
    },
    {
      id: 'flyer',
      name: 'チラシ作成',
      price: '30,000円',
      value: 30000,
      description: 'ホームページと連動したチラシのデザインと印刷を行います',
    },
    {
      id: 'renewal',
      name: 'ホームページリニューアル',
      price: '100,000円〜',
      value: 100000,
      description: '既存のホームページを新しいデザインにリニューアルします',
      hasSuffixTilde: true, // 末尾に〜がある
    },
  ]

  const commonFeatures = [
    'お知らせの掲載',
    'レスポンシブ対応（スマホ対応）',
    'SSL対応（セキュリティ対策）',
    'Google Map設置',
    'Youtube動画設置',
    'SNS連携（X, インスタ, Facebook等）',
    'アクセス解析設置（Analytics）',
    'フォトギャラリー設置',
  ]

  // フォーマット済み料金を返す関数
  const FormattedFee = ({ fee }: { fee: Fee }) => (
    <span>
      {fee.amount}
      {fee.taxText && <span className="text-xs">（{fee.taxText}）</span>}
    </span>
  )

  return (
    <section id="ac_price_plan" className="py-16 pt-12 md:pt16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-2xl md:text-3xl font-bold mb-6 md:mb-4 text-center"
            variants={itemVariants}
          >
            料金プラン
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-8 md:mb-12 text-center text-sm md:text-lg"
            variants={itemVariants}
          >
            お客様のニーズに合わせた
            <br className="block md:hidden" />
            3つのプランをご用意しております
          </motion.p>

          <motion.div variants={itemVariants} className="w-full">
            <Tabs defaultValue="light" className="w-full">
              {/* タブと吹き出しのコンテナ */}
              <div className="relative max-w-3xl mx-auto mb-2">
                {/* 吹き出し */}
                <div className="flex justify-between px-2 mb-2">
                  {plans.map(plan => (
                    <div
                      key={`ribbon-${plan.id}`}
                      className={`flex-1 text-center ${plan.id === 'standard' ? 'scale-110 z-10' : ''}`}
                    >
                      {plan.ribbon && (
                        <div
                          className={`
                            inline-block px-4 py-1 pb-1.5 text-xs md:text-sm font-bold text-white rounded-full shadow-md
                            ${
                              plan.id === 'light'
                                ? 'bg-blue-400'
                                : plan.id === 'standard'
                                  ? 'bg-[#e94e1b]'
                                  : 'bg-[#1a4d89]'
                            }
                          `}
                        >
                          <span dangerouslySetInnerHTML={{ __html: plan.ribbon }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* タブリスト */}
                <TabsList className="grid grid-cols-3 mb-8 w-full bg-gray-100">
                  {plans.map(plan => (
                    <TabsTrigger
                      key={plan.id}
                      value={plan.id}
                      className="text-xs md:text-sm md:text-base lg:text-lg py-3 h-full data-[state=active]:bg-white data-[state=active]:text-[#1a4d89]"
                    >
                      {plan.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {plans.map(plan => (
                <TabsContent key={plan.id} value={plan.id} className="w-full max-w-3xl mx-auto">
                  <Card
                    className="border-none shadow-lg overflow-hidden"
                    style={{
                      background: planColors[plan.id].bg,
                    }}
                  >
                    <CardHeader
                      className="text-white text-center py-2 md:py-6"
                      style={{ backgroundColor: planColors[plan.id].header }}
                    >
                      <CardTitle className="text-lg md:text-2xl md:text-3xl">{plan.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 md-p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {/* 金額セクション - 左寄せにして文字サイズ拡大 */}
                        <div
                          className="bg-white p-5 rounded-lg shadow-sm border"
                          style={{ borderColor: planColors[plan.id].border }}
                        >
                          <h3
                            className="text-lg md:text-xl md:text-2xl font-medium border-b pb-3 mb-5"
                            style={{ color: primaryBlue }}
                          >
                            金額
                          </h3>
                          <div className="space-y-3 text-left">
                            <div className="flex justify-between items-center">
                              <span className="text-sm md:text-lg">初期構築費用</span>
                              <span className="text-sm md:text-lg font-medium">
                                <FormattedFee fee={plan.initialCost} />
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm md:text-lg">初回事務手数料</span>
                              <span className="text-sm md:text-lg font-medium">
                                <FormattedFee fee={plan.initialFee} />
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm md:text-lg">月額料金</span>
                              <span className="text-sm md:text-lg font-medium">
                                <FormattedFee fee={plan.monthlyFee} />
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm md:text-lg">制作期間</span>
                              <span className="text-sm md:text-lg font-medium">{plan.period}</span>
                            </div>
                          </div>
                        </div>

                        {/* 特徴セクション - 左寄せで文字サイズ拡大 */}
                        <div
                          className="bg-white p-5 rounded-lg shadow-sm border"
                          style={{ borderColor: planColors[plan.id].border }}
                        >
                          <h3
                            className="text-lg md:text-xl md:text-2xl font-medium border-b pb-3 mb-5"
                            style={{ color: primaryBlue }}
                          >
                            特徴
                          </h3>
                          <ul className="space-y-3 text-left">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <Check className="mr-2 h-3 md:h-5 w-3 md:w-5 mt-1 flex-shrink-0" />
                                <span className="text-sm md:text-lg">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* デザインテンプレートセクション - 修正 */}
                      {plan.templates && (
                        <div
                          className="bg-white p-5 rounded-lg shadow-sm border mb-6"
                          style={{ borderColor: planColors[plan.id].border }}
                        >
                          <h3
                            className="text-lg md:text-xl md:text-2xl font-medium border-b pb-3 mb-5"
                            style={{ color: primaryBlue }}
                          >
                            デザインテンプレート
                          </h3>
                          <p className="text-sm md:text-lg mb-6 font-medium">
                            {plan.templates.count}つのテンプレートから選択可能
                          </p>

                          {/* 3カラムのグリッドで全テンプレートを表示 */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {plan.templates.items.map((template, index) => (
                              <Link
                                href={template.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                key={template.id}
                                className="group transition-all duration-300 hover:shadow-md rounded-lg overflow-hidden block"
                              >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                  {/* テンプレート画像を直接使用 */}
                                  <div className="relative w-full h-full">
                                    <img
                                      src={template.imageSrc}
                                      alt={template.name}
                                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center">
                                      <div className="p-3 text-white flex items-center space-x-1">
                                        <span>詳細を見る</span>
                                        <ExternalLink className="w-4 h-4" />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="p-3 bg-gray-100 text-center font-medium text-sm md:text-base">
                                  {template.name}
                                </div>
                              </Link>
                            ))}
                          </div>

                          {/* ライトプランの場合のみ注釈を表示 */}
                          {plan.id === 'light' && (
                            <div className="mt-6 p-3 bg-gray-50 border border-gray-200 rounded-md text-sm">
                              <p className="flex items-start">
                                <span className="text-xs mr-1">※</span>
                                <span className="text-xs">
                                  上記のでデモサイトではフォームの掲載がございますが、フォームはオプションとなります。
                                  <br />
                                  通常はフォーム箇所は非表示になります。
                                </span>
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* プレミアムプラン用のカスタムデザインセクション */}
                      {plan.id === 'premium' && (
                        <div
                          className="bg-white p-5 rounded-lg shadow-sm border mb-6"
                          style={{ borderColor: planColors[plan.id].border }}
                        >
                          <h3
                            className="text-lg md:text-xl md:text-2xl font-medium border-b pb-3 mb-5"
                            style={{ color: primaryBlue }}
                          >
                            オリジナルデザイン
                          </h3>
                          <div className="text-center p-2 md:p-6">
                            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-8 w-8 md:h-12 md:w-12 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                              </svg>
                            </div>
                            <h4 className="text-lg md:text-xl font-bold mb-2">
                              完全オリジナルデザイン
                            </h4>
                            <p className="text-sm md:text-lg mb-6">
                              テンプレートを使用せず、
                              <br className="md:hidden" />
                              お客様のブランドに合わせた
                              <br />
                              オリジナルデザインで制作いたします
                            </p>
                            <div className="flex justify-center space-x-4">
                              <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-blue-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    />
                                  </svg>
                                </div>
                                <p className="text-xs md:text-sm font-medium">オリジナリティ</p>
                              </div>
                              <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-purple-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm7-4v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                    />
                                  </svg>
                                </div>
                                <p className="text-xs md:text-sm font-medium">ブランディング</p>
                              </div>
                              <div className="text-center">
                                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8 text-amber-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                                    />
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                                    />
                                  </svg>
                                </div>
                                <p className="text-xs md:text-sm font-medium">分析・提案</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 注意点セクション - チェックマークアイコンに変更 */}
                      <div
                        className="bg-white p-5 rounded-lg shadow-sm border"
                        style={{ borderColor: planColors[plan.id].border }}
                      >
                        <h3
                          className="text-lg md:text-xl md:text-2xl font-medium border-b pb-3 mb-5"
                          style={{ color: primaryBlue }}
                        >
                          注意点
                        </h3>
                        {plan.notes.length > 0 ? (
                          <ul className="space-y-3 text-left">
                            {plan.notes.map((note, index) => (
                              <li key={index} className="flex items-start">
                                <div
                                  className="mr-1 h-5 w-5 flex-shrink-0"
                                  style={{ color: '#666' }}
                                >
                                  ※
                                </div>
                                <span className="text-sm md:text-base">{note}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-center text-gray-500 italic text-sm md:text-lg">
                            特になし
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* 全プラン共通事項 - チェックマーク付き */}
          <motion.div
            variants={itemVariants}
            className="mt-10 md:mt-20 p-4 md:p-8 py-6 md:py-8 bg-white rounded-lg shadow-md max-w-3xl mx-auto border-t-4"
            style={{ borderColor: primaryBlue }}
          >
            <h3
              id="ac_price_ccommon_matters"
              className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center"
              style={{ color: primaryBlue }}
            >
              全プラン共通事項
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonFeatures.map((feature, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="rounded-full p-1 mr-3"
                    style={{ backgroundColor: `${primaryBlue}20` }}
                  >
                    <Check className="h-3 w-3 md:h-5 md:w-5" style={{ color: primaryBlue }} />
                  </div>
                  <span className="text-sm md:text-lg">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* オプション料金 - テーブルスタイル改善 */}
          <motion.div variants={itemVariants} className="mt-10 md:mt-20 max-w-3xl mx-auto">
            <h3
              id="ac_price_option"
              className="text-xl md:text-2xl md:text-3xl font-bold mb-6 text-center"
              style={{ color: primaryBlue }}
            >
              オプション料金
            </h3>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Table>
                <TableHeader style={{ backgroundColor: `${primaryBlue}20` }}>
                  <TableRow>
                    <TableHead
                      className="w-[60%] md:w-3/4 text-sm md:text-lg font-bold py-2 md:py-4 text-left"
                      style={{ color: primaryBlue }}
                    >
                      オプション内容
                    </TableHead>
                    <TableHead
                      className="text-sm md:text-lg font-bold py-2 md:py-4 text-right"
                      style={{ color: primaryBlue }}
                    >
                      料金
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {detailedOptions.map((option, index) => (
                    <TableRow key={index} className="border-b">
                      <TableCell className="font-medium text-sm md:text-lg py-4 p-3 md:p-4">
                        {option.name}
                      </TableCell>
                      <TableCell className="text-right text-sm md:text-lg py-4 font-medium p-3 md:p-4">
                        {option.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>

          {/* 見積もりシミュレーター */}
          <motion.div variants={itemVariants} className="mt-10 md:mt-20 max-w-3xl mx-auto">
            <h3
              id="ac_price_simulator"
              className="text-xl md:text-2xl md:text-3xl font-bold mb-6 text-center"
              style={{ color: primaryBlue }}
            >
              制作費用の見積もり
            </h3>
            <div className="bg-white rounded-lg shadow-md p-6 md:p-8 overflow-hidden">
              <div className="mb-6 md:mb-8">
                <h4 className="text-base md:text-xl font-bold mb-4" style={{ color: primaryBlue }}>
                  1. プランを選択してください
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {plans.map(plan => (
                    <div
                      key={plan.id}
                      onClick={() => setSelectedPlan(plan.id)}
                      className={`
                        border-2 rounded-lg p-4 cursor-pointer transition-all
                        ${
                          selectedPlan === plan.id
                            ? `border-[${primaryBlue}] bg-[${primaryBlue}10]`
                            : 'border-gray-200'
                        }
                      `}
                    >
                      <div className="flex items-center mb-2">
                        <div
                          className={`w-5 h-5 rounded-full border-2 mr-2 flex items-center justify-center
                            ${
                              selectedPlan === plan.id
                                ? `border-[${primaryBlue}]`
                                : 'border-gray-300'
                            }
                          `}
                        >
                          {selectedPlan === plan.id && (
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: primaryBlue }}
                            />
                          )}
                        </div>
                        <h5 className="font-bold">{plan.name}</h5>
                      </div>
                      <p className="ml-7 text-sm text-gray-600">
                        初期構築費用: {plan.initialCost.amount}
                      </p>
                      <p className="ml-7 text-sm text-gray-600">
                        月額料金: {plan.monthlyFee.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="text-base md:text-xl font-bold mb-4" style={{ color: primaryBlue }}>
                  2. 追加するオプションを選択してください（任意）
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {detailedOptions
                    .filter(
                      option => !option.availableFor || option.availableFor.includes(selectedPlan)
                    )
                    .map(option => (
                      <div key={option.id} className="flex items-start mb-3">
                        <div className="mr-2 mt-1">
                          <input
                            type="checkbox"
                            id={`option-${option.id}`}
                            className="w-5 h-5"
                            checked={selectedOptions.includes(option.id)}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectedOptions([...selectedOptions, option.id])
                              } else {
                                setSelectedOptions(selectedOptions.filter(id => id !== option.id))
                              }
                            }}
                          />
                        </div>
                        <div>
                          <label
                            htmlFor={`option-${option.id}`}
                            className="font-medium text-sm md:text-sm"
                          >
                            {option.name}{' '}
                            <span className="font-normal text-gray-600 ml-1">({option.price})</span>
                          </label>
                          {option.description && (
                            <p
                              className="text-sm md:text-xs text-gray-600 mt-1"
                              dangerouslySetInnerHTML={{ __html: option.description }}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowEstimate(true)}
                  className="px-8 py-3 bg-[#1a4d89] text-white rounded-md font-bold text-base md:text-lg shadow-md hover:bg-opacity-90 transition-all"
                >
                  見積もり結果を見る
                </button>
              </div>

              {showEstimate && (
                <div className="mt-8 pt-8 border-t-2">
                  <h4
                    className="text-base md:text-xl font-bold mb-6 text-center"
                    style={{ color: primaryBlue }}
                  >
                    お見積り結果
                  </h4>

                  {/* 選択されたプラン情報 */}
                  <div className="mb-4">
                    <h5 className="font-bold mb-2">
                      選択プラン: {plans.find(p => p.id === selectedPlan)?.name}
                    </h5>
                  </div>

                  {/* 料金内訳 */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h5 className="font-bold mb-4">料金内訳</h5>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>初期費用</span>
                        <span>{plans.find(p => p.id === selectedPlan)?.initialCost.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>初回事務手数料</span>
                        <span>{plans.find(p => p.id === selectedPlan)?.initialFee.amount}</span>
                      </div>

                      {/* 選択されたオプション */}
                      {selectedOptions.length > 0 && (
                        <>
                          <div className="pt-2 border-t">
                            <h6 className="font-medium mb-2">オプション</h6>
                            {selectedOptions.map(optionId => {
                              const option = detailedOptions.find(o => o.id === optionId)
                              return option ? (
                                <div key={option.id} className="flex justify-between text-sm mb-1">
                                  <span>{option.name}</span>
                                  <span>{option.price}</span>
                                </div>
                              ) : null
                            })}
                          </div>
                        </>
                      )}

                      {/* 月額料金 */}
                      <div className="pt-2 border-t">
                        <div className="flex justify-between">
                          <span>月額料金</span>
                          <span>{plans.find(p => p.id === selectedPlan)?.monthlyFee.amount}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 合計金額 */}
                  <div className="border-t-2 pt-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-base md:text-lg">初期費用合計</span>
                      <span className="font-bold text-base md:text-lg">
                        {(() => {
                          const plan = plans.find(p => p.id === selectedPlan)
                          const selectedOptionDetails = selectedOptions
                            .map(optionId => detailedOptions.find(o => o.id === optionId))
                            .filter(Boolean) as Option[]

                          // オプションの合計金額を計算
                          const optionTotal = selectedOptionDetails.reduce(
                            (total, option) => total + (option?.value || 0),
                            0
                          )

                          const initialTotal =
                            (plan?.initialCost.value || 0) +
                            (plan?.initialFee.value || 0) +
                            optionTotal

                          // 先頭に〜をつけるオプションがあるか確認
                          const hasPrefixTilde = selectedOptionDetails.some(
                            option => option.hasPrefixTilde
                          )
                          // 末尾に〜をつけるオプションがあるか確認
                          const hasSuffixTilde = selectedOptionDetails.some(
                            option => option.hasSuffixTilde
                          )

                          const prefix = hasPrefixTilde ? '〜' : ''
                          const suffix = hasSuffixTilde ? '〜' : ''

                          return `${prefix}${initialTotal.toLocaleString()}円${suffix}（税抜）`
                        })()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-bold text-base md:text-lg">月額料金</span>
                      <span className="font-bold text-base md:text-lg">
                        {plans.find(p => p.id === selectedPlan)?.monthlyFee.amount}
                      </span>
                    </div>

                    {/* 割引情報 */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-6">
                      <div className="flex items-center mb-2">
                        <svg
                          className="w-5 h-5 text-yellow-500 mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2 3.5-2V4a2 2 0 00-2-2H5zm4.707 3.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L8.414 9H10a3 3 0 013 3v1a1 1 0 102 0v-1a5 5 0 00-5-5H8.414l1.293-1.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="font-bold text-sm md:text-lg">
                          今なら初回事務手数料が{discount}%OFF!
                        </span>
                      </div>
                      <p className="text-sm ml-7">
                        2025年{currentMonth}月末までのお申し込みで適用されます
                      </p>
                    </div>

                    {/* 割引後の金額 */}
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm md:text-xl">
                          割引適用後の
                          <br className="md:hidden" />
                          初期費用
                        </span>
                        <span
                          className="font-bold text-base md:text-xl text-green-700"
                          dangerouslySetInnerHTML={{
                            __html: (() => {
                              const plan = plans.find(p => p.id === selectedPlan)
                              const selectedOptionDetails = selectedOptions
                                .map(optionId => detailedOptions.find(o => o.id === optionId))
                                .filter(Boolean) as Option[]

                              // オプションの合計金額を計算
                              const optionTotal = selectedOptionDetails.reduce(
                                (total, option) => total + (option?.value || 0),
                                0
                              )

                              const initialFeeTotal =
                                (plan?.initialFee.value || 0) * (1 - discount / 100)
                              const initialTotal =
                                (plan?.initialCost.value || 0) +
                                (initialFeeTotal || 0) +
                                optionTotal
                              const taxTotal = initialTotal * 1.1

                              // 先頭に〜をつけるオプションがあるか確認
                              const hasPrefixTilde = selectedOptionDetails.some(
                                option => option.hasPrefixTilde
                              )
                              // 末尾に〜をつけるオプションがあるか確認
                              const hasSuffixTilde = selectedOptionDetails.some(
                                option => option.hasSuffixTilde
                              )

                              const prefix = hasPrefixTilde ? '〜' : ''
                              const suffix = hasSuffixTilde ? '〜' : ''

                              return `${prefix}${Math.floor(initialTotal).toLocaleString()}円${suffix}<br className="md:hidden" /><span class="text-xs block md:inline">（税込${prefix}${Math.floor(taxTotal).toLocaleString()}円${suffix}）</span>`
                            })(),
                          }}
                        />
                      </div>
                    </div>

                    <p className="text-xs md:text-xs text-gray-500 mt-4 text-center">
                      ※
                      このシミュレーション結果はあくまで概算です。正確なお見積りについては、お問い合わせください。
                    </p>

                    <div className="flex justify-center mt-6 flex-col md:flex-row">
                      <button
                        onClick={() => {
                          setShowEstimate(false)
                          setSelectedOptions([])
                        }}
                        className="text-sm md:text-base px-6 py-2 border border-[#1a4d89] text-[#1a4d89] rounded-md font-medium hover:bg-[#1a4d89]10 transition-all mr-0 md:mr-4 mb-4 md:mb-0"
                      >
                        リセット
                      </button>
                      <Button
                        className="bg-gradient-to-r border-2 border-[#e94e1b] from-[#e94e1b] to-[#f26b3c] hover:from-[#d24418] hover:to-[#e45e32] text-white text-sm md:text-base py-2 md:py-6 px-8 shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
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
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
