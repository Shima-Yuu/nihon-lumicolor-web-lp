import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import HighlightSection from '@/components/highlight-section'
import WorriesSection from '@/components/worries-section'
import MyStrengthsSection from '@/components/my-strengths-section'
import PricePlanSection from '@/components/price-plan-section'
import CTAArea from '@/components/cta-area'
import ProcessSection from '@/components/process-section'
import WorksSection from '@/components/works-section'
import QaSection from '@/components/qa-section'
import CompanySection from '@/components/company-section'
import ContactSection from '@/components/contact-section'
import Footer from '@/components/footer'
import ScrollToTop from '@/components/scroll-to-top'

export default function Home() {
  return (
    <main id="main" className="min-h-screen">
      <Header />
      <HeroSection />
      <HighlightSection />
      <WorriesSection />
      <MyStrengthsSection />
      <PricePlanSection />
      <CTAArea />
      <WorksSection />
      <ProcessSection />
      <QaSection />
      <CTAArea />
      <CompanySection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
