'use client'

const Championship = dynamic(() => import('./components/Championship'), {
  ssr: false,
})
const ChampionshipsTitle = dynamic(() => import('./components/Title'), {
  ssr: false,
})
import Gutter from '../../../components/Gutter'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserTeams } from 'app/lib/features/teams/teams.thunk'
import { fetchCompetition } from 'app/lib/features/competition/competition.thunk'
import { selectCompetition } from 'app/lib/features/competition/competition.selector'
import { fetchSeason } from 'app/lib/features/season/season.thunk'
import { useTranslation } from 'react-i18next'
import Image from 'next/image'

const Championships = () => {
  const dispatch = useDispatch()
  const { userTable } = useSelector((state) => state.auth)
  const selectedCompetition = useSelector(selectCompetition)
  const { isLoading } = useSelector((state) => state.competition)
  const { t } = useTranslation()
  const { season } = useSelector((state) => state.season)

  useEffect(() => {
    dispatch(fetchCompetition())
    dispatch(fetchSeason())
  }, [dispatch])

  useEffect(() => {
    if (userTable && season?.id) {
      dispatch(
        fetchUserTeams({
          user_id: userTable.id,
          season_id: season.id,
        })
      )
    }
  }, [dispatch, userTable, season.id])

  return (
    <Gutter>
      <section className="my-6 min-h-80 md:min-h-36 w-full rounded-xl bg-neutral-900 p-6 shadow shadow-neutral-400">
        <ChampionshipsTitle />
        {isLoading ? (
          <div className="flex items-center justify-center">
            <Image
              src="/icons/loading.svg"
              width={24}
              height={24}
              alt="loading"
              className="mx-auto size-10 animate-spin"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {selectedCompetition.map((game, index) => (
              <Championship key={index} game={game} />
            ))}
          </div>
        )}
      </section>
    </Gutter>
  )
}

export default Championships
