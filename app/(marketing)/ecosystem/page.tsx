import ShowDeckCTA from '@/components/common/ShowDeckCTA';
import EcosystemHero from '@/components/ecosystem/EcosystemHero'
import EcosystemPillars from '@/components/ecosystem/EcosystemPillars'
import ParticipationForm from '@/components/ecosystem/ParticipationForm'
import StrategicSection from '@/components/ecosystem/StrategicSection'

export default function EcosystemPage() {
  return (
    <main className="min-h-screen">
      <EcosystemHero />
      <StrategicSection />
      <EcosystemPillars />
      <ParticipationForm />
      <ShowDeckCTA />
    </main>
  )
}