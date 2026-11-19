import ShowDeckCTA from '@/components/common/ShowDeckCTA';
import EcosystemHero from '@/components/ecosystem/EcosystemHero'
import EcosystemPillars from '@/components/ecosystem/EcosystemPillars'
import ParticipationForm from '@/components/ecosystem/ParticipationForm'
import StrategicSection from '@/components/ecosystem/StrategicSection'
import { getPageContent } from '@/lib/pageContentServer'
import { pageMetadata } from '@/lib/seo'

export const metadata = pageMetadata({
  title: 'The Design POV Ecosystem',
  description:
    'How Design POV works beyond the show: The Core, The Circle, POV Objects, POV Elevate and the magazine — an ecosystem connecting architects, brands, makers and audiences.',
  path: '/ecosystem',
})

// Saving a section in CMS → Ecosystem revalidates this page immediately;
// this is only the fallback refresh interval.
export const revalidate = 3600

export default async function EcosystemPage() {
  const eco = await getPageContent("ecosystem")

  return (
    <main className="min-h-screen">
      {eco.hero.enabled && <EcosystemHero headline={eco.hero.headline} media={eco.hero.media} alt={eco.hero.alt} />}
      {eco.statement.enabled && <StrategicSection text={eco.statement.text} />}
      {eco.pillars.enabled && <EcosystemPillars pillars={eco.pillars.items} />}
      {eco.participation.enabled && (
        <ParticipationForm
          headingMain={eco.participation.headingMain}
          headingBold={eco.participation.headingBold}
          options={eco.participation.options}
        />
      )}
      <ShowDeckCTA />
    </main>
  )
}
