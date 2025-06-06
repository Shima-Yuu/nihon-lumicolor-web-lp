'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useState } from 'react'

export default function QaSection() {
  // 開いている項目を管理する状態
  const [openItems, setOpenItems] = useState<string[]>([])

  const faqItems = [
    {
      question: '解約に違約金は発生しますか？',
      answer: 'ご解約に際して、違約金は一切いただいておりません。',
    },
    {
      question: 'お支払いのタイミングはいつですか？',
      answer:
        '初期費用（初期構築費用 + 初回事務手数料）は半金を制作前に、残り半金を納品時にお振込いただいております。計2回払いとなります。月額料金は、公開した翌月1日にお支払いいただきます。月途中での公開の場合、初回請求時に利用日数に応じた日割り計算を適用いたします。',
    },
    {
      question: 'SEO対策はしてますか？',
      answer:
        '基本的なSEO対策はすべてのプランに含まれています。適切なタイトルタグ、メタディスクリプション、構造化データ、高速表示のための最適化、モバイルフレンドリー対応などを標準で実施しています。地域名や診療内容を含めたキーワード対策も行い、検索エンジンで見つけやすいサイト作りをサポートします。',
    },
    {
      question: '料金プランの違いは何ですか？',
      answer:
        '主な違いは、テンプレートの種類、カスタマイズ性、サポート内容です。ライトプランは基本的なテンプレート、スタンダードプランはより多くのテンプレートと機能、プレミアムプランはフルカスタマイズのオリジナルデザインとなります。詳細は料金プランセクションをご確認ください。',
    },
    {
      question: 'ドメイン取得やサーバー契約は別途必要ですか？',
      answer:
        '当サービスには、ドメイン取得費用とサーバー費用が含まれています。別途契約や手続きは不要です。既にお持ちのドメインがある場合は、そちらを使用することも可能です。',
    },
    {
      question: 'スマートフォン対応していますか？',
      answer:
        'はい、すべてのプランでスマートフォン・タブレット対応のレスポンシブデザインを採用しています。スマホでの閲覧が多い昨今、スマホ表示を最適化したデザインで患者様の利便性を高めます。',
    },
    {
      question: '制作開始から公開までどのくらいの期間がかかりますか？',
      answer:
        '基本的には契約後、約2〜4週間程度での公開を目指しています。テンプレートを利用するプランでは比較的早く、オリジナルデザインのプレミアムプランではお打ち合わせや細かい調整があるため、やや長めの期間をいただいております。',
    },
    {
      question: 'ホームページのデータなどはいただけますか？',
      answer:
        'HTMLやCSSなどのコードや弊社が作成したコンテンツ等の権利は弊社に帰属するため、データをお渡しすることはできません。また、ご解約の際にはデータは削除させていただきます。ただし、お客様からご提供いただいた写真等のデータやお客様ご自身で作成されたブログのテキスト等データについてはご返却・譲渡をさせていただきます。',
    },
    {
      question: 'SNSやYoutubeをホームページに載せれますか？',
      answer:
        'はい、InstagramやFacebook、YouTubeなどのSNSとホームページを連携することが可能です。SNSの投稿をホームページに表示したり、ホームページからSNSへの誘導リンクを設置するなど、集客効果を高める連携機能をご用意しています。また、LINE公式アカウントとの連携も可能で、予約受付の効率化にも貢献します。',
    },
    {
      question: '現在のホームページをリューアルすることは可能ですか？',
      answer:
        'はい、可能です。現在のホームページをリニューアルする際は、デザインやコンテンツの見直しを行い、より効果的なサイトに仕上げることが可能です。リニューアルにあたっては、現在のサイトのデータを引き継ぐこともできますので、お気軽にご相談ください。',
    },
  ]

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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="ac_qa" className="py-16 pt-12 md:pt16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-4">よくある質問</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base text-left md:text-center">
            ホームページ制作・運営に関するよくあるご質問をまとめました。
            <br />
            その他のご質問は、お気軽にお問い合わせください。
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Accordion
            type="multiple"
            value={openItems}
            onValueChange={setOpenItems}
            className="bg-white rounded-lg shadow-md"
          >
            {faqItems.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className={index === 0 ? 'border-t border-b' : 'border-b'}
                >
                  <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-gray-50 text-left font-medium text-gray-800">
                    <div className="flex items-center text-sm md:text-base">
                      <span className="text-[#1a4d89] font-bold mr-3">Q.</span>
                      {item.question}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-5 text-gray-600">
                    <div className="flex text-sm md:text-base">
                      <span className="text-[#e94e1b] font-bold mr-3">A.</span>
                      <div>{item.answer}</div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
