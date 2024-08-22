'use client'
import Hero from '@/src/components/Hero'
import Rules from '@/src/components/Rules'
import Carousel from '@/src/components/Carousel'
import Promotions from '@/src/components/Promotions'
import Banner from '../components/Banner'

export default function Home() {
  return (
    <section>
      <Hero />
      <Promotions />
      <Carousel />
      <Rules />
    </section>
  )
}
