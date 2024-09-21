import WalletPaymentOption from './Wallet'
import ClickUpPaymentOption from './ClickUp'
import PaymePaymentOption from './Payme'
import { useState } from 'react'
import { PAYMENTOPTIONS } from 'app/utils/paymentOptions.util'
import { useTranslation } from 'react-i18next'


const PaymentOptions = ({ toggleModal }) => {
  const [paymentOption, setPaymentOption] = useState(PAYMENTOPTIONS.WALLET)
  const active = 'border-primary'
  const passive = 'border-neutral-600 hover:border-yellow-600'
  const { t } = useTranslation()

  return (
    <div className="mt-4">
      <div className="flex w-full items-center gap-6 p-0 pb-6 md:p-6">
        <span className="hidden size-12 items-center justify-center rounded-full bg-neutral-700 font-bold text-neutral-300 sm:flex">
          2
        </span>
        <h3 className="text-lg font-medium sm:text-xl">
        {t("To'lov usulini tanlang")}
        </h3>
      </div>
      <section className="flex flex-wrap justify-center gap-4 sm:justify-start md:gap-6">
        <WalletPaymentOption
          paymentOption={paymentOption}
          setPaymentOption={setPaymentOption}
          active={active}
          passive={passive}
          toggleModal={toggleModal}
        />
        <ClickUpPaymentOption
          paymentOption={paymentOption}
          setPaymentOption={setPaymentOption}
          active={active}
          passive={passive}
        />
        <PaymePaymentOption
          paymentOption={paymentOption}
          setPaymentOption={setPaymentOption}
          active={active}
          passive={passive}
        />
      </section>
    </div>
  )
}

export default PaymentOptions
