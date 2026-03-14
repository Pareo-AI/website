import { Features as FeaturesSection } from '@/components/sections/Features'

export const metadata = {
  title: 'Features',
  description: 'Explore Pareo\'s powerful compliance management features'
}

export default function FeaturesPage() {
  return (
    <div className="pt-16">
      <FeaturesSection />
    </div>
  )
}
