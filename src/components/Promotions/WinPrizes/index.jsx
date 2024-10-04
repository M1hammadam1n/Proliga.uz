import Image from 'next/image'
import Gutter from '../../Gutter'
import { useTranslation } from 'react-i18next'

const PromotionWinPrizes = () => {
  const { t } = useTranslation()

  return (
    <section className="w-full bg-neutral-800 py-6 md:py-8 xl:py-10 2xl:py-12">
      <Gutter>
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="promotion-header font-bold uppercase">
              {t('Sovrinlarni yutib oling')}
            </h2>
            <p className="promotion-text text-neutral-300">
              {t('Eng ko‘p ball')}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div className="flex flex-col items-center justify-center">
              <p className="mb-1 text-2xl md:mb-2">Iphone 15 Pro Max</p>
              <Image
                width={336}
                height={319}
                src="/images/promotion-price1.png"
                alt="Iphone 15 Pro Max"
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="mb-1 text-2xl md:mb-2">Playstation 5</p>
              <Image
                width={336}
                height={319}
                src="/images/promotion-price2.png"
                alt="Iphone 15 Pro Max"
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="mb-1 text-2xl md:mb-2">TV Samsung 55</p>
              <Image
                width={336}
                height={319}
                src="/images/promotion-price3.png"
                alt="Iphone 15 Pro Max"
              />
            </div>

            <div className="flex flex-col items-center justify-center">
              <p className="mb-1 text-2xl md:mb-2">Apple iPad Pro</p>
              <Image
                width={336}
                height={319}
                src="/images/promotion-price4.png"
                alt="Iphone 15 Pro Max"
              />
            </div>
          </div>
        </div>
      </Gutter>
    </section>
  )
}

export default PromotionWinPrizes
