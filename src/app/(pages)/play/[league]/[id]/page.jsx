'use client'

import GameNavigation from '../../components/GameNavigation'
import CurrentTab from '../../components/CurrentTab'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useGetTourTeam } from 'app/hooks/transfer/useGetTourTeam/useGetTourTeam'
import { fetchCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.thunk'
import { fetchTeamPlayers } from 'app/lib/features/teamPlayers/teamPlayers.thunk'

const Play = ({ params }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { tab } = useSelector((state) => state.game)
  const { userAuth, userTable } = useSelector((state) => state.auth)
  const {
    getTourTeam,
    isLoading: tourTeamLoading,
    error: tourTeamError,
  } = useGetTourTeam()

  useEffect(() => {
    if (params.id && userTable && userAuth) {
      const fetch = async () => {
        await getTourTeam(params.id)
      }
      fetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userAuth, params.id, userTable])

  useEffect(() => {
    if (userAuth && userTable && params.id) {
      const fetch = async () => {
        dispatch(fetchCurrentTeam({ id: params.id }))
        dispatch(fetchTeamPlayers({ team_id: params.id }))
      }
      fetch()
    }
  }, [userAuth, params.id, userTable, dispatch])
  // eslint-disable-next-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (!userAuth || !userTable) {
  //     setTimeout(() => toast.warning('The user is not logged in!'), 500)
  //     return router.push('/login')
  //   }
  // }, [userAuth, userTable, router])
  return (
    <section className="flex flex-col gap-6 overflow-hidden bg-neutral-700 pb-6 text-neutral-700">
      <GameNavigation currentTab={tab} />
      <CurrentTab paramsId={params.id} currentTab={tab} />
    </section>
  )
}

export default Play
