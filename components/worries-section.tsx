'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useIsMobile } from '@/hooks/use-mobile'

export default function WorriesSection() {
  const isMobile = useIsMobile()

  return (
    <section id="ac_worries" className="worries">
      <motion.h2
        className="text-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Image
          src={isMobile ? '/images/img_worries--sp.png' : '/images/img_worries.png'}
          alt="こんな悩みありませんか？"
          width={1368}
          height={550}
          className="w-full object-cover object-top"
          priority
        />
      </motion.h2>

      {/* 追加したテキストエリア */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="font-bold worries__lead mb-0 md:mb-12">
          <span className="worries__lead-slash hidden md:inline-block">＼</span>
          このようなお悩みは
          <br className="block md:hidden" />
          <span className="text-[#e94e1b]">日本ルミカラー</span>
          にお任せください！
          <span className="worries__lead-slash --right hidden md:inline-block">／</span>
        </h3>
      </motion.div>
    </section>
  )
}
