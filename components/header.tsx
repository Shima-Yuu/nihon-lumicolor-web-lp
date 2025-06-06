'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: '日本ルミカラーの4つの強み', href: '#ac_my_strengths' },
  { name: '料金プラン', href: '#ac_price_plan' },
  { name: '制作事例', href: '#ac_works' },
  { name: '制作の流れ', href: '#ac_process' },
  { name: 'よくある質問', href: '#ac_qa' },
  { name: '会社概要', href: '#ac_company' },
  { name: 'お問い合わせ', href: '#ac_contact' },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)

      // 一度でもスクロールしたらフラグを立てる
      if (!hasScrolled && scrollPosition > 100) {
        setHasScrolled(true)
      }

      // スクロール位置が最上部に近い場合はアクティブセクションなし
      if (scrollPosition < 100) {
        setActiveSection('')
        return
      }

      // 以下の処理はスクロールが発生した場合のみ実行
      if (hasScrolled) {
        const scrollPosition = window.scrollY + 100
        let currentActiveSection = ''

        // 各セクションの位置を確認してアクティブなセクションを特定
        for (const item of navItems) {
          const sectionId = item.href.substring(1)
          const element = document.getElementById(sectionId)

          if (element) {
            const top = element.offsetTop
            const height = element.offsetHeight

            if (scrollPosition >= top && scrollPosition < top + height) {
              currentActiveSection = sectionId
              break
            }
          }
        }

        setActiveSection(currentActiveSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // 初期状態を設定
    return () => window.removeEventListener('scroll', handleScroll)
  }, [hasScrolled])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-0 ' : 'bg-white py-1.5'
      )}
    >
      <div className="container !px-2 md:!px-4 mx-auto flex justify-between items-center">
        <h1 className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="株式会社日本ルミカラー"
            width={270}
            height={60}
            style={{ height: 'auto' }}
            className={cn(
              'transition-opacity w-[220px] md:w-[270px]',
              isScrolled ? 'opacity-100' : 'opacity-100'
            )}
          />
        </h1>
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-6">
            {navItems.map(item => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={cn(
                    'font-medium transition-colors hover:text-[#e94e1b]',
                    'text-gray-700',
                    activeSection === item.href.substring(1) && 'text-[#e94e1b] font-bold'
                  )}
                  onClick={e => {
                    e.preventDefault()
                    const element = document.getElementById(item.href.substring(1))
                    if (element) {
                      window.scrollTo({
                        top: element.offsetTop - 80,
                        behavior: 'smooth',
                      })
                    }
                  }}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button
            className="bg-[#e94e1b] hover:bg-[#f26b3c] text-white transition-all duration-300 hover:shadow-lg"
            onClick={() => {
              const contactSection = document.getElementById('ac_contact')
              if (contactSection) {
                window.scrollTo({
                  top: contactSection.offsetTop - 80,
                  behavior: 'smooth',
                })
              }
            }}
          >
            無料相談する
          </Button>
        </nav>
        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-2xl"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
        >
          {mobileMenuOpen ? (
            <X className="text-gray-700" size={24} />
          ) : (
            <Menu className="text-gray-700" size={24} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.1 }}
            className="md:hidden bg-white shadow-lg"
          >
            <nav className="container mx-auto px-4 py-4">
              <ul className="flex flex-col divide-y divide-gray-100">
                {navItems.map(item => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="block py-3 md:py-4 px-4 rounded-md text-gray-700 text-sm md:text-base hover:bg-gray-50 hover:text-[#1a4d89] transition-colors font-medium"
                      onClick={e => {
                        e.preventDefault()
                        setMobileMenuOpen(false)
                        setTimeout(() => {
                          const element = document.getElementById(item.href.substring(1))
                          if (element) {
                            const offset = window.innerWidth < 768 ? 30 : 80
                            window.scrollTo({
                              top: element.offsetTop - offset,
                              behavior: 'smooth',
                            })
                          }
                        }, 100)
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="pt-4">
                  <Button
                    className="w-full bg-[#e94e1b] hover:bg-[#f26b3c] text-white py-2 md:py-3 text-sm md:text-base"
                    onClick={() => {
                      setMobileMenuOpen(false)
                      setTimeout(() => {
                        const contactSection = document.getElementById('ac_contact')
                        if (contactSection) {
                          const offset = window.innerWidth < 768 ? 30 : 80
                          window.scrollTo({
                            top: contactSection.offsetTop - offset,
                            behavior: 'smooth',
                          })
                        }
                      }, 100)
                    }}
                  >
                    無料相談する
                  </Button>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
