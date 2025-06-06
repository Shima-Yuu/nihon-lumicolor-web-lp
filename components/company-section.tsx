'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export default function CompanySection() {
  return (
    <section id="ac_company" className="py-16 pt-12 md:pt16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-4">会社概要</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-left md:text-center text-sm md:text-base">
            日本ルミカラーは、Webマーケティングと制作のプロフェッショナル集団です。
            <br />
            お客様のビジネス成長を全力でサポートします。
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-bold mb-4 text-[#1a4d89]">基本情報</h3>
                <table className="w-full">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 text-left font-medium text-gray-600 w-1/3 text-sm md:text-base">
                        会社名
                      </th>
                      <td className="py-3  text-sm md:text-base">株式会社日本ルミカラー</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 text-left font-medium text-gray-600 text-sm md:text-base">
                        代表者
                      </th>
                      <td className="py-3 text-sm md:text-base">代表取締役 奥平雅人</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 text-left font-medium text-gray-600 text-sm md:text-base">
                        従業員数
                      </th>
                      <td className="py-3 text-sm md:text-base">3人(外部パートナー含む)</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 text-left font-medium text-gray-600 text-sm md:text-base">
                        事業内容
                      </th>
                      <td className="py-3 text-sm md:text-base">
                        ・化学品事業
                        <br />
                        ・デジタルソリューション事業
                      </td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <th className="py-3 text-left font-medium text-gray-600 text-sm md:text-base">
                        HP
                      </th>
                      <td className="py-3 text-sm md:text-base">
                        <a
                          href="https://nihon-lumicolor.jp/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#1a4d89] hover:text-[#e94e1b] underline transition-colors duration-200"
                        >
                          https://nihon-lumicolor.jp/
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-6">
                <h3 className="text-lg md:text-xl font-bold mb-4 text-[#1a4d89]">所在地・連絡先</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <MapPin className="h-5 w-5 text-[#1a4d89] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm md:text-base">本社</p>
                      <p className="text-gray-600 text-sm md:text-base">
                        〒173-0037 東京都板橋区小茂根2-3-2 1F
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Phone className="h-5 w-5 text-[#1a4d89] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm md:text-base">電話番号</p>
                      <p className="text-gray-600 text-sm md:text-base">
                        <span className="hidden md:block">070-8314-3924</span>
                        <a
                          href="tel:07083143924"
                          className="md:hidden text-[#1a4d89] hover:text-[#e94e1b] underline transition-colors duration-200"
                        >
                          070-8314-3924
                        </a>
                      </p>
                      <p className="text-gray-600 text-xs mt-2">
                        ※ お打ち合わせ中は電話に出ることができません。
                      </p>
                      <p className="text-gray-600 text-xs mt-2">
                        ※ 留守番電話にお名前とご要件をお伝えください。
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Mail className="h-5 w-5 text-[#1a4d89] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm md:text-base">メールアドレス</p>
                      <p className="text-gray-600 text-sm md:text-base">
                        <a
                          href="mailto:info@nihon-lumicolor.jp"
                          className="text-[#1a4d89] hover:text-[#e94e1b] underline transition-colors duration-200"
                        >
                          info@nihon-lumicolor.jp
                        </a>
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Clock className="h-5 w-5 text-[#1a4d89] mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm md:text-base">営業時間</p>
                      <p className="text-gray-600 text-sm md:text-base">
                        平日 9:00〜18:00（土日祝休）
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
