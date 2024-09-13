import Image from 'next/image'
import Gutter from '../../Gutter'

const CreateTeam = () => {
  return (
    <section className="bg-neutral-800 py-6 md:py-8">
      <Gutter>
        <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row md:gap-4 lg:gap-0">
          <div className="mt-8 flex flex-1 flex-col flex-wrap">
            <div className="mb-6 w-5/6 max-w-[24rem] -skew-x-12 self-start rounded-sm bg-primary md:mb-12 md:max-w-[32rem]">
              <h3 className="promotion-header text-center font-bold capitalize text-black">
                Umumiy qoidalar
              </h3>
            </div>
            <div className="flex flex-col flex-wrap justify-center gap-4 self-center md:self-start lg:pl-8">
              <h2 className="promotion-header font-bold uppercase">
                jamoa yig&apos;ing
              </h2>
              <p className="max-w-xl text-sm text-neutral-300 xs:text-base lg:text-lg xl:text-xl">
                100 millionlik byudjetdan foydalaning va chempionatning eng
                yaxshifutbolchilaridan iborat jamoani to&apos;plang
              </p>
              <div className="relative hidden self-start xs:px-8 md:block">
                <Image
                  width={400}
                  height={400}
                  alt="footballers images"
                  className="aspect-[1.12/1] w-full"
                  src="/images/football-tiles.png"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex-1 items-end self-center xs:w-4/5 md:w-auto">
            <Image
              src="/images/promotion-1.png"
              width={600}
              height={600}
              className="aspect-[1/1.025] h-full w-full"
              alt="interactive stadium"
            />
          </div>
        </div>
      </Gutter>
    </section>
  )
}

export default CreateTeam
