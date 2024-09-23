import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useEffect, useMemo } from 'react'
import { useUpdateTeamPlayers } from 'app/hooks/transfer/useUpdateTeamPlayers/useUpdateTeamPlayers'
import { setCaptain } from 'app/lib/features/teamPlayers/teamPlayers.slice'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useUpdateTeam } from 'app/hooks/transfer/useUpdateTeam/useUpdateTeam'
import { setTab } from 'app/lib/features/tours/tours.slice'
import { TABS } from 'app/utils/tabs.util'
import { revertTeamPlayers } from 'app/lib/features/teamPlayers/teamPlayers.slice'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
const TransferStadiumForm = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [teamCreateBtns, toggleTeamCreateBtns] = useState(false)
  const { GOA, DEF, MID, STR, playersCount } = useSelector(
    (state) => state.teamPlayers
  )
  const { teamBalance, teamPrice, currentTeam } = useSelector(
    (state) => state.currentTeam
  )
  const { currentTour } = useSelector((state) => state.tours)
  const teamConcat = useMemo(
    () => GOA.concat(DEF, MID, STR),
    [GOA, DEF, MID, STR]
  )
  const { updateTeamPlayers, isLoading, error } = useUpdateTeamPlayers()
  const {
    updateTeam,
    isLoading: teamLoading,
    error: teamError,
  } = useUpdateTeam()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const captains = []
    teamConcat.forEach((player) => {
      if (!player.name || !player.price) {
        toast.warning(
          t('identifikatori') +
            player.id +
            t("bo'lgan va") +
            player.position +
            t("holatidagi o'yinchi yaroqsiz")
        )
        return
      }
      if (player.is_captain) {
        captains.push(player.player_id)
      }
    })

    if (captains.length === 0) {
      toast.warning(t('Kapitan tanlanmagan'))
      return
    }
    if (captains.length > 1) {
      toast.warning(t('Ko`p kapitan tanlangan'))
      return
    }
    if (teamBalance < teamPrice) {
      toast.error(t('Balansingiz yetarli emas'))
      return
    }

    if (
      playersCount.GOA !== 1 ||
      playersCount.DEF < 3 ||
      playersCount.DEF > 5 ||
      playersCount.MID < 3 ||
      playersCount.MID > 5 ||
      playersCount.STR < 2 ||
      playersCount.STR > 3
    ) {
      toast.error(t('Jamoa formatsiyasi notogri'))
      return
    }

    await updateTeamPlayers({
      team: teamConcat,
      team_id: currentTeam.id,
      tour_id: currentTour.id,
    })
    if (currentTeam.is_team_created === false) {
      await updateTeam({ team_id: currentTeam.id })
    }
    if (!error && !isLoading) {
      toast.success(t('Jamoa muvaffaqiyatli yangilandi'))
      dispatch(setTab(TABS.GameProfile))
    }
  }

  useEffect(() => {
    if (currentTeam.is_team_created === false) {
      toggleTeamCreateBtns(true)
    }
  }, [currentTeam])
  // const { t } = useTranslation()
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 flex justify-between gap-x-1 text-black"
    >
      <select
        name="formation"
        id="formation"
        onChange={(e) => dispatch(setCaptain(e.target.value))}
        className="w-full max-w-56 rounded-sm border border-neutral-400 bg-neutral-950 p-1.5 font-semibold text-neutral-50 outline-none"
      >
        <option
          value=""
          className="checked:bg-neutral-700 active:bg-neutral-800"
        >
          {t('Kapitan')}
        </option>
        {teamConcat.map(
          (player) =>
            player.name && (
              <option
                className="bg-neutral-950 checked:bg-neutral-800"
                value={player.player_id}
                key={player.id}
                selected={player.is_captain}
              >
                {player.name}
              </option>
            )
        )}
      </select>
      <div className="flex w-full max-w-[25%] justify-center gap-1">
        {teamCreateBtns && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            type="button"
            title="Avto jamoa yigish"
            className="flex w-16 max-w-20 items-center justify-center gap-1 rounded-sm border border-neutral-400 bg-neutral-950 px-1.5 text-neutral-100 transition-all hover:border-primary xs:w-full sm:max-w-max"
          >
            <Image
              src="/icons/auto.svg"
              alt="auto assemble team"
              width={24}
              height={24}
              draggable={false}
              className="filter-white size-6"
            />
          </motion.button>
        )}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          type="button"
          onClick={() => dispatch(revertTeamPlayers())}
          title="jamoani tozalash"
          className="flex w-full max-w-16 items-center justify-center gap-1 rounded-sm border border-neutral-400 bg-neutral-950 px-1.5 text-neutral-100 transition-all hover:border-primary sm:w-full sm:max-w-max"
        >
          <Image
            src="/icons/revert.svg"
            alt="auto assemble team"
            width={24}
            height={24}
            draggable={false}
            className="filter-white size-6"
          />
        </motion.button>
      </div>
      <button
        type="submit"
        className="rounded-sm border bg-black px-4 text-lg text-white transition-all hover:border-black hover:bg-primary hover:bg-opacity-75 hover:text-black 2xs:px-6 md:px-10"
      >
        {t('Saqlash')}
      </button>
    </form>
  )
}

export default TransferStadiumForm
