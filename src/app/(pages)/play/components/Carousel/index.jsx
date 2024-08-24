'use client'
import { useState } from 'react'
import Gutter from '../../../../../components/Gutter'
import Slide from './Slide'
import Image from 'next/image'

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevState) => {
      if (prevState === data.length - 1) {
        return 0
      } else {
        return prevState + 1
      }
    })
  }
  const prevSlide = () => {
    setCurrentIndex((prevState) => {
      if (prevState === 0) {
        return data.length - 1
      } else {
        return prevState - 1
      }
    })
  }

  return (
    <section className="bg-neutral-800">
      <Gutter>
        {data.map((slide, index) => (
          <Slide
            key={index}
            title={slide.title}
            header={slide.header}
            description={slide.description}
            images={slide.images}
            mainImage={slide.mainImage}
            type={slide.type}
            index={index}
            currentIndex={currentIndex}
            nextSlide={nextSlide}
            prevSlide={prevSlide}
          />
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 hidden -translate-y-1/2 transform bg-opacity-50 px-4 py-2 text-white xl:block"
        >
          <Image
            src="/icons/arrow-down.svg"
            alt="arrow"
            width={32}
            height={32}
            className="rotate-90"
          />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 hidden -translate-y-1/2 transform bg-opacity-50 px-4 py-2 text-white xl:block"
        >
          <Image
            src="/icons/arrow-down.svg"
            className="-rotate-90"
            alt="arrow"
            width={32}
            height={32}
          />
        </button>
      </Gutter>
    </section>
  )
}

const data = [
  {
    header: 'Umumiy qoidalar',
    title: "Jamoa yig'ing",
    description:
      "100 - millionlik byudjetdan foydalaning va chempionatning eng yaxshi futbolchilaridan iborat jamoani to'plang",
    images: '/images/promotion-1.png',
    mainImage: '/images/football-tiles.png',
    type: 1,
  },
  {
    title: 'BALLARNI YiG’ING',
    description:
      "Har bir o'yinchi haqiqiy o'yinlarda qilgan harakatlari uchun ochko oladi yoki yo'qotadi. Ballar soni o'yinchining roliga qarab farq qilishi mumkin. Masalan, himoyachi gol uchun 6 ochko, hujumchi esa 4 ochko oladi",
    mainImage: '/images/promotion-2.png',
    type: 2,
  },
  {
    header: 'Umumiy qoidalar',
    title: 'TRANSFERLARNI AMALGA OSHIRING',
    description:
      'Agar sizning jamoangizdagi o’yinchilardan biri jarohat olgan bo’lsa yoki shunchaki yomon o’ynasa, har bir turda ochko to’plamasa, tarkibni optimalroq o’zgartirish uchun 2 tagacha transferni amalga oshirishingiz mumkin',
    images: '/images/transfer-removebg-preview.png',
    mainImage: '/images/promotion-transfer.png',
    type: 3,
  },
  {
    header: 'Raqobatlashing',
    description: `
Boshqa foydalanuvchilar bilan umumiy ligada qatnashing, Ulardan ko'proq ochko ishlashga harakat qiling va mavsum so'ngida g'olib bo'ling!`,
    mainImage: '/images/promotion-table.png',
    type: 4,
  },
  {
    header: "sovg'alarni yutib oling ",
    title:
      "Eng ko'p ball to'plagan foydalanuvchilar sovg'alarga ega bo'lishadi.",
    type: 5,
    images: [
      { name: 'Iphone 15 Pro Max', img: '/images/promotion-price1.png' },
      { name: 'Playstation 5', img: '/images/promotion-price2.png' },
      { name: 'Tv Samsung  55', img: '/images/promotion-price3.png' },
      { name: 'Apple ipad pro ', img: '/images/promotion-price4.png' },
    ],
  },

  // {
  //   header: 'Umumiy qoidalar',
  //   title: "Jamoa yig'ing",
  //   description:
  //     "100 - millionlik byudjetdan foydalaning va chempionatning eng yaxshi futbolchilaridan iborat jamoani to'plang",
  //   images: '/promotions-tiles.png',
  //   mainImage: '/images/promotion-3.png',
  //   type: 3,
  // },
  //   {
  //     header: 'Umumiy qoidalar',
  //     title: "Jamoa yig'ing",
  //     description:
  //       "100 - millionlik byudjetdan foydalaning va chempionatning eng yaxshi futbolchilaridan iborat jamoani to'plang",
  //     images: '/promotions-tiles.png',
  //     mainImage: '/images/promotion-3.png',
  //     type: 1,
  //   },
]

export default Carousel
