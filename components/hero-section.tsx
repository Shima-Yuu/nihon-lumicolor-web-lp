'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function HeroSection() {
  return (
    <section className="relative md:pt-16 overflow-hidden hero">
      {/* 背景グラデーションとパターン */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a4d89] via-[#0f3b6f] to-[#082b57] z-0">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: '60px 60px',
          }}
        ></div>
      </div>

      {/* 装飾的な円形要素 */}
      <div className="absolute top-20 right-[5%] w-64 h-64 rounded-full bg-white opacity-5 hero__round-01"></div>
      <div className="absolute bottom-10 left-[10%] w-40 h-40 rounded-full bg-white opacity-5 hero__round-02"></div>

      <div className="relative z-10 text-white hero__content">
        <div className="flex flex-col lg:flex-row items-center hero__flex">
          <div className="hero__flex-item --textArea">
            <motion.div
              className=""
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="hero__label">ホームページ作りにお困りの治療院の先生方へ</div>
              <div className="hero__message">
                <span>低コスト</span>で、
                <br />
                <span>質の良いサイト</span>を作りませんか？
              </div>
              <p className="hero__price-month">
                制作費<span className="text-yellow-300 font-roboto">0</span>円 /{' '}
                <br className="sm:hidden" />
                月額<span className="text-yellow-300 font-roboto">3,980</span>円〜
                <br className="sm:hidden" />
                <span className="hero__price-tax">
                  （税抜<span className="font-roboto">4,378</span>円）
                </span>
              </p>
              <div className="flex sm:flex-row hero__button">
                <motion.div
                  className="hero__button-item"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
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
                <motion.div
                  className="hero__button-item"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <Button
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0f3b6f] text-lg py-6 px-8 w-full sm:w-auto transition-all duration-300"
                    onClick={() => {
                      const servicesSection = document.getElementById('ac_price_plan')
                      const offset = window.innerWidth < 768 ? 30 : 80
                      if (servicesSection) {
                        window.scrollTo({
                          top: servicesSection.offsetTop - offset,
                          behavior: 'smooth',
                        })
                      }
                    }}
                  >
                    料金プランを見る
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="lg:w-1/2 flex justify-center hero__flex-item --kv"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="overflow-hidden shadow-2xl hero__kv">
              <Image
                src="images/img_hero.png"
                alt=""
                fill
                className="object-cover hero__kv-image"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
