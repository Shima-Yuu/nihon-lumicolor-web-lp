'use client'

import { motion } from 'framer-motion'
import { Megaphone } from 'lucide-react'

export default function HighlightSection() {
  const currentMonth = new Date().getMonth() + 1
  return (
    <section className="py-8 md:py-16 bg-white highlight">
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 md:p-8 rounded-lg border-l-4 border-yellow-400 shadow-md relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* キャンペーンリボン - 角度を緩める */}
          <div className="absolute w-48 h-48 highlight__ribbon">
            <div
              className="absolute transform bg-[#e94e1b] text-white font-bold py-1 right-0 bottom-0 w-[180%] text-center text-xs md:text-sm shadow-md"
              style={{ transform: 'rotate(20deg)' }}
            >
              期間限定
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            {/* キャンペーンアイコン - Lucideアイコンに変更 */}
            <div
              className="flex-shrink-0 bg-white p-3 rounded-full border-2 border-yellow-300 flex items-center justify-center"
              style={{ width: '64px', height: '64px' }}
            >
              <Megaphone className="w-8 h-8 text-[#e94e1b]" />
            </div>

            <div className="flex-grow">
              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-base md:text-2xl font-bold text-[#e94e1b]">
                  お得な割引キャンペーン
                </h2>
                {/* NEWラベルの位置を調整 */}
                <motion.span
                  className="inline-block align-middle"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <span className="bg-[#e94e1b] text-white text-xs px-2 py-0.5 rounded-full">
                    NEW
                  </span>
                </motion.span>
              </div>
              <p className="text-gray-700 text-sm md:text-base">
                毎月<span className="font-bold text-[#e94e1b] text-lg md:text-xl">先着5社様</span>
                に限り、初回事務手数料が
                <span className="font-bold text-[#e94e1b] text-lg md:text-xl">半額</span>
                になるキャンペーンを実施しております。
              </p>

              <div className="mt-4 bg-white bg-opacity-70 p-3 rounded-lg border border-yellow-200">
                <p className="text-sm flex items-center">
                  <span className="font-medium">
                    キャンペーン期間：2025年{currentMonth}月末まで
                  </span>
                </p>
                <p className="text-sm mt-1 flex items-center font-medium">
                  <span>まずはお気軽にご相談ください。</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
