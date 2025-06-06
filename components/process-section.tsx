'use client'

import { motion } from 'framer-motion'

const processes = [
  {
    number: '01',
    title: 'お打ち合わせ',
    description:
      '当社の営業担当者がお電話・メール・対面にて、サービスについて詳しくご説明し、お客様のご希望や要望をしっかりとお聞きします。',
  },
  {
    number: '02',
    title: 'お申し込み',
    description:
      '営業担当者が提供するサービスの内容と条件を丁寧に説明いたします。ご不明点がなく、完全にご理解いただいた上でご契約ください。',
  },
  {
    number: '03',
    title: 'ヒアリング',
    description:
      '打ち合わせを通じて、ウェブサイトの色調やテイスト、全体的な雰囲気などについて具体的なイメージを決めていきます。',
  },
  {
    number: '04',
    title: 'ホームページ作成',
    description: 'ヒアリングで伺った情報に基づいて、お客様専用のホームページ見本を作成いたします。',
  },
  {
    number: '05',
    title: 'ウェブ公開',
    description:
      'サイトの構成や文章内容など、すべての要素をお客様にご確認いただいた後、正式にインターネット上にホームページを公開します。',
  },
]

export default function ProcessSection() {
  return (
    <section id="ac_process" className="py-16 pt-12 md:pt16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-4">制作の流れ</h2>
          <p className="text-gray-600 mx-auto text-left md:text-center text-sm md:text-base">
            当社がウェブサイト制作の全工程を引き受けますので、ホームページに関する知識がなくても心配無用です。
            <br />
            パソコンが得意でない方でも簡単にご利用いただけます。
          </p>
        </motion.div>

        <div className="relative mt-6 md:mt-16">
          {/* プロセスフロー図（改良版） */}
          <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-1 bg-[#1a4d89] z-0"></div>

          <div className="grid md:grid-cols-5 gap-12 md:gap-8">
            {processes.map((process, index) => (
              <motion.div
                key={index}
                className="relative z-10 flex flex-col items-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 rounded-full bg-[#1a4d89] text-white flex items-center justify-center text-xl font-bold mb-3 md:mb-6 z-10">
                  {process.number}
                </div>
                <div className="bg-white pt-2 px-2 text-center">
                  <h3 className="text-lg md:text-xl font-bold mb-2">{process.title}</h3>
                  <p className="text-left text-gray-600 text-sm md:text-base">
                    {process.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
