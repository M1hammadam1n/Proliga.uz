import GameProfile from '../GameProfile'
import Statistics from '../Statistics'
import Transfer from '../Transfer'
import Journal from '../Journal'
import Tournament from '../Tournament'
import { TABS } from '../../../../utils/tabs.util'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.thunk'
import { fetchTeamPlayers } from 'app/lib/features/teamPlayers/teamPlayers.thunk'
import { fetchTourTeam } from 'app/lib/features/tourTeam/tourTeam.thunk'
import { useEffect } from 'react'

const CurrentTab = ({ currentTab, paramsId }) => {
  const dispatch = useDispatch()
  const { userAuth, userTable } = useSelector((state) => state.auth)
  const { currentTour } = useSelector((state) => state.tours)

  useEffect(() => {
    if (userAuth && userTable && paramsId) {
      const fetch = async () => {
        dispatch(fetchCurrentTeam({ id: paramsId }))
      }
      fetch()
    }
  }, [userAuth, paramsId, userTable, dispatch])

  console.log(userAuth)
  console.log(userTable)
  console.log(paramsId)
  console.log(currentTour)

  useEffect(() => {
    if (userAuth && userTable && paramsId && currentTour?.id) {
      const fetch = async () => {
        dispatch(
          fetchTeamPlayers({ team_id: paramsId, tour_id: currentTour.id })
        )
        dispatch(fetchTourTeam({ team_id: paramsId, tour_id: currentTour.id }))
      }
      fetch()
    }
  }, [userAuth, paramsId, userTable, dispatch, currentTour])

  return (
    <>
      {currentTab === TABS.GameProfile && <GameProfile />}
      {currentTab === TABS.Transfer && <Transfer paramsId={paramsId} />}
      {currentTab === TABS.Statistics && <Statistics />}
      {currentTab === TABS.Journal && <Journal />}
      {currentTab === TABS.Tournament && <Tournament />}
    </>
  )
}

export default CurrentTab
