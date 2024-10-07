'use client'

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { LANGUAGE } from 'app/utils/languages.util'
import { PLAYERS } from 'app/utils/players.util'
import { useTranslation } from 'react-i18next'
import PlayerStatisticsTable from './Table'
import PlayerPhoto from './PlayerPhoto'
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from '@/components/ui/dialog'

const PlayerInfoModal = ({ isModalOpen, setModalOpen }) => {
  const { currentPlayer } = useSelector((store) => store.players)
  const { lang } = useSelector((store) => store.systemLanguage)
  const { playerPoint } = useSelector((store) => store.playerPoint)
  const [matches, setMatches] = useState([])
  const { t } = useTranslation()

  useEffect(() => {
    if (playerPoint?.length > 0) {
      setMatches([])
      playerPoint.forEach((item) => {
        if (item.player_id === currentPlayer.id) {
          setMatches((prevMatch) => [...prevMatch, item])
        }
      })
    }
  }, [currentPlayer, playerPoint])

  const getCorrentPlayerPosition = (position, lang) => {
    if (lang === LANGUAGE.ru) {
      if (position === PLAYERS.GOA) {
        return 'Вратарь'
      }
      if (position === PLAYERS.DEF) {
        return 'Защитник'
      }
      if (position === PLAYERS.MID) {
        return 'Полузащитник'
      }
      if (position === PLAYERS.STR) {
        return 'Нападающий'
      }
    }
    if (lang === LANGUAGE.uz) {
      if (position === PLAYERS.GOA) {
        return 'Darvozabon'
      }
      if (position === PLAYERS.DEF) {
        return 'Himoyachi'
      }
      if (position === PLAYERS.MID) {
        return 'Yarim Himoyachi'
      }
      if (position === PLAYERS.STR) {
        return 'Hujumchi'
      }
    }
    return position
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="overflox-y-auto z-50 flex max-h-[90vh] min-h-[45vh] w-[98%] max-w-[64rem] flex-col gap-4 overflow-y-auto rounded-2xl border border-neutral-500 bg-neutral-900 px-2 py-4 text-neutral-200 xs:mx-auto xs:w-[96%] xs:p-4 sm:w-4/5 md:p-6 lg:w-3/4 xl:w-3/5">
        <PlayerPhoto
          currentPlayer={currentPlayer}
          position={getCorrentPlayerPosition(currentPlayer.position, lang)}
        />
        <div className="flex w-full flex-wrap gap-1">
          <div className="flex-1 rounded-sm border border-neutral-500 bg-neutral-800 px-2 py-1 text-center text-xs md:text-sm">
            <p className="font-semibold text-neutral-50">
              {currentPlayer.price ?? 0}
            </p>
            <p className="text-xs text-neutral-300">{t('Narx')}</p>
          </div>
          <div className="flex-1 rounded-sm border border-neutral-500 bg-neutral-800 px-2 py-1 text-center text-xs md:text-sm">
            <p className="font-semibold text-neutral-50">
              {currentPlayer.point ?? 0}
            </p>
            <p className="text-xs text-neutral-300">{t('Ochko')}</p>
          </div>
          <div className="flex-1 rounded-sm border border-neutral-500 bg-neutral-800 px-2 py-1 text-center text-xs md:text-sm">
            <p className="font-semibold text-neutral-50">
              {currentPlayer.percentage ?? 0}%
            </p>
            <p className="text-xs text-neutral-300">{t('Sotib Olgan')}</p>
          </div>
        </div>
        <PlayerStatisticsTable matches={matches} />
        <DialogDescription className="hidden">
          This is a player information modal
        </DialogDescription>
      </DialogContent>
    </Dialog>
  )
}

export default PlayerInfoModal
