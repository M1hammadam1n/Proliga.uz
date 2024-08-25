import React from 'react'
import Image from 'next/image'
import Gutter from '../../Gutter'

const Transfers = () => {
  return (
    <div className="w-full bg-neutral-800 py-8 2xl:py-16">
      <Gutter>
        <div className="bg-custom-image align-center flex flex-col bg-cover">
          <h2 className="text-center text-3xl font-bold uppercase xs:justify-start xs:text-start xs:text-sm md:text-3xl lg:text-4xl">
            TRANSFERLARNI AMALGA OSHIRING
          </h2>
          <p className="mt-10 w-3/4 text-center text-2xl text-neutral-400 xs:justify-start xs:text-start xs:text-xs lg:text-lg xl:text-xl 2xl:text-xl">
            Agar sizning jamoangizdagi o&apos;yinchilardan biri jarohat olgan
            bo&apos;lsa yoki shunchaki yomon o&apos;ynasa, har bir turda ochko
            to&apos;plamasa, tarkibni optimalroq o&apos;zgartirish uchun 2
            tagacha transferni amalga oshirishingiz mumkin
          </p>

          <div className={'mx-auto mt-10 flex items-center justify-center'}>
            <Image
              width={536}
              height={193}
              src={'/images/promotion-transfer.png'}
              alt="transfer players"
              className="xs:h-22 xs:w-72"
            />
          </div>
        </div>
      </Gutter>
    </div>
  )
}

export default Transfers
