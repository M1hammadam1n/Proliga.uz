import Banner from '@/src/components/Banner'
import Carousel from '@/src/components/Carousel'
import WorldNews from '@/src/components/WorldNews'

const PlayLayout = ({ children }) => {
  return (
    <main className="bg-neutral-200">
      <Banner />
      {children}
      <WorldNews />
      <Carousel />
    </main>
  )
}

export default PlayLayout
