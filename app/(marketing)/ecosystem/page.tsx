import CTAStrip from '@/components/common/CTAStrip'
import EcosystemHero from '@/components/ecosystem/EcosystemHero'
import EcosystemPillars from '@/components/ecosystem/EcosystemPillars'
import StrategicSection from '@/components/ecosystem/StrategicSection'

export default function EcosystemPage() {
  return (
    <main className="min-h-screen">
      <EcosystemHero />
      <StrategicSection />
      <EcosystemPillars />
            <div className="w-full z-10 bg-white">
        <CTAStrip
          title="Where Design Meets Dialogue"
          ctaLabel="Apply"
          ctaHref='#'
          hoverBgColor="#000000"
          textColor='var(--primary-red)'
          hoverTextColor='var(--color-white)'
        />
      </div>
    </main>
  )
}