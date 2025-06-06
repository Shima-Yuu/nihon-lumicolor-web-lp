'use client'

import type React from 'react'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { CheckCircle, PhoneCall } from 'lucide-react'

export default function ContactSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // エラーをクリア
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = 'お名前を入力してください'
    if (!formData.email.trim()) {
      newErrors.email = 'メールアドレスを入力してください'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = '有効なメールアドレスを入力してください'
    }
    if (!formData.phone.trim()) newErrors.phone = '電話番号を入力してください'
    if (!formData.message.trim()) newErrors.message = 'お問い合わせ内容を入力してください'
    // プライバシーポリシーの検証を削除

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      try {
        // Formspreeを使ってフォームデータを送信
        const response = await fetch('https://formspree.io/f/xxxx', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        if (response.ok) {
          toast({
            title: 'お問い合わせを受け付けました',
            description: '担当者より3営業日以内にご連絡いたします。',
          })

          // フォームリセット
          setFormData({
            name: '',
            email: '',
            phone: '',
            company: '',
            message: '',
          })

          // 送信完了状態をセット
          setIsSubmitted(true)
        } else {
          toast({
            title: '送信に失敗しました',
            description: '時間をおいて再度お試しください。',
            variant: 'destructive',
          })
        }
      } catch (error) {
        console.error('Form submission error:', error)
        toast({
          title: 'エラーが発生しました',
          description: 'ネットワーク接続を確認の上、再度お試しください。',
          variant: 'destructive',
        })
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  // フォームを再表示するハンドラー
  const handleNewInquiry = () => {
    setIsSubmitted(false)
  }

  return (
    <section id="ac_contact" className="py-16 pt-12 md:pt16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-4">お問い合わせ</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-left md:text-center text-sm md:text-base mb-4">
            相談等は無料で受けておりますので、お気軽にお問い合わせください。
            <br />
            3営業日以内に担当者よりご連絡いたします。
          </p>

          <motion.div
            className="flex items-center justify-center bg-gray-50 rounded-full py-2 px-6 max-w-md mx-auto shadow-sm border border-gray-100 mt-3"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <PhoneCall className="h-5 w-5 text-[#e94e1b] mr-3" />
            <span className="text-gray-600 mr-2 text-base">
              お電話<span className="hidden md:inline">でのお問い合わせ</span>:
            </span>
            <a
              href="tel:07083143924"
              className="text-[#1a4d89] text-xl md:text-xl font-bold hover:text-[#e94e1b] transition-colors"
            >
              070-8314-3924
            </a>
          </motion.div>
          <p className="text-gray-600 text-xs mt-4">
            ※ お打ち合わせ中は電話に出ることができません。
          </p>
          <p className="text-gray-600 text-xs mt-2">
            ※ 留守番電話にお名前とご要件をお伝えください。
          </p>
        </motion.div>

        <motion.div
          className="max-w-2xl mx-auto bg-gray-50 p-4 md:p-8 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {isSubmitted ? (
            <div className="py-8 text-center">
              <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              <h3 className="text-xl md:text-2xl font-bold mb-2">送信が完了しました</h3>
              <p className="text-gray-600 mb-6">
                お問い合わせありがとうございます。
                <br />
                3営業日以内に担当者よりご連絡いたします。
              </p>
              <Button
                onClick={handleNewInquiry}
                className="bg-[#e94e1b] hover:bg-[#f26b3c] text-white"
              >
                新しいお問い合わせをする
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm md:text-base">
                    お名前 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`text-sm md:text-base${errors.name ? 'border-red-500' : ''}`}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm md:text-base">
                    メールアドレス <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`text-sm md:text-base ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm md:text-base">
                    電話番号 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`text-sm md:text-base ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm md:text-base">
                    会社名（任意）
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="text-sm md:text-base"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm md:text-base">
                    お問い合わせ内容 <span className="text-red-500">*</span>
                    <br />
                    <span className="text-xs text-gray-500">
                      ※使用したいプランやオプションをご記載ください
                    </span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className={`text-sm md:text-base ${errors.message ? 'border-red-500' : ''}`}
                  />
                  {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#e94e1b] hover:bg-[#f26b3c] text-white py-6"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? '送信中...' : '送信する'}
                </Button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  )
}
