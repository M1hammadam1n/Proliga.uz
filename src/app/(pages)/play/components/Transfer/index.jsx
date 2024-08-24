import Gutter from '../../../../../components/Gutter'
import Image from 'next/image'
import PlayersStructure from '../GameProfile/PlayersStructure'
import GameBrief from '../GameBrief'

const Transfer = () => {
  return (
    <Gutter>
      <main className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="relative">
          <Image
            src="/images/stadium.png"
            alt="stadium"
            width={700}
            height={600}
          />
          <PlayersStructure />
        </div>
        <GameBrief />
      </main>
    </Gutter>
  )
}

export default Transfer
