import Image from 'next/image'
import Gutter from '../../Gutter'

const GetPoints = () => {
  return (
    <section className="w-full bg-neutral-900 py-4">
      <Gutter>
        <article className="flex w-full flex-row items-center justify-between px-[1rem] md:px-[6rem]">
          <div>
            <h2 className="text-2xl">BALLARNI YIG’ING</h2>
            <p className="max-w-sm">
              Har bir o&apos;yinchi haqiqiy o&apos;yinlarda qilgan harakatlari
              uchun ochko oladi yoki yo&apos;qotadi. Ballar soni
              o&apos;yinchining roliga qarab farq qilishi mumkin. Masalan,
              himoyachi gol uchun 6 ochko, hujumchi esa 4 ochko oladi
            </p>
          </div>

          <div>
            <Image
              src="/images/promotion-2.png"
              alt="football"
              width={400}
              height={400}
            />
          </div>
        </article>
      </Gutter>
    </section>
  )
}

export default GetPoints
