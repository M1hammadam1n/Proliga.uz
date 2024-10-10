import Image from 'next/image'
import Gutter from '../../Gutter'
import { useTranslation } from 'react-i18next'

const PromotionMakeTransfers = () => {
  const { t } = useTranslation()
  return (
    <div className="w-full bg-neutral-800 py-6 md:py-8 xl:py-10 2xl:py-12">
      <Gutter>
        <div className="bg-custom-image align-center flex flex-col bg-cover">
          <h2 className="promotion-header self-center text-center font-bold uppercase xs:justify-start xs:text-start">
            {t('Transferlarni amalga oshiring')}
          </h2>
          <p className="promotion-text mt-6 self-center text-center text-neutral-400 md:w-3/4 xl:mt-10">
            {t('Agar sizning jamoangizdagi')}
          </p>
          <div className="mx-auto mt-10 w-full flex-1 md:w-auto md:items-center md:justify-center">
            <Image
              width={536}
              height={193}
              src="/images/promotion-transfer.png"
              alt="transfer players"
              className="mx-auto h-full w-full md:mx-0"
            />
          </div>
        </div>
      </Gutter>
    </div>
  )
}

export default PromotionMakeTransfers
