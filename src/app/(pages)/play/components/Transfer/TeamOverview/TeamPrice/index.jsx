import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
const TeamPrice = () => {
  const { teamPrice } = useSelector((store) => store.tourTeams)
  const { t } = useTranslation()
  return (
    <div className="w-1/2 md:w-auto">
      <h3
        title="Maksimum sotib olish mumkin bolgan o'yinchilar"
        className="cursor-default text-xs capitalize text-neutral-400 xs:text-sm"
      >
        {t("Jamoa narxi")}
      </h3>
      <p className="text-2xl font-bold sm:text-3xl md:text-4xl">{teamPrice}</p>
    </div>
  )
}

export default TeamPrice
