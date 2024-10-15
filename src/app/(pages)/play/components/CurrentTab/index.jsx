/* eslint-disable @next/next/no-img-element */
'use client'

import GameProfile from '../GameProfile'
import Statistics from '../Statistics'
import Transfer from '../Transfer'
import Journal from '../Journal'
import Tournament from '../Tournament'
import { TABS } from '../../../../utils/tabs.util'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useMemo, useState, useRef } from 'react'
import { setTeamBalance } from 'app/lib/features/tourTeams/tourTeams.slice'
import { setTab } from 'app/lib/features/tours/tours.slice'
import { fetchCurrentTeam } from 'app/lib/features/currentTeam/currentTeam.thunk'
import { fetchTeamPlayers } from 'app/lib/features/teamPlayers/teamPlayers.thunk'
import { fetchTourTeams } from 'app/lib/features/tourTeams/tourTeams.thunk'
import { fetchTours } from 'app/lib/features/tours/tours.thunk'
import { fetchPlayerPoint } from 'app/lib/features/playerPoint/playerPoint.thunk'
import Gutter from 'components/Gutter'
import { fetchTopPlayers } from 'app/lib/features/players/players.thunk'
import { fetchTopTeams } from 'app/lib/features/teams/teams.thunk'

const CurrentTab = ({ currentTab, paramsId }) => {
  const dispatch = useDispatch()
  const { userAuth, userTable } = useSelector((state) => state.auth)
  const { currentTour } = useSelector((state) => state.tours)
  const { currentTeam } = useSelector((state) => state.currentTeam)
  const { teamPrice } = useSelector((store) => store.teamPlayers)
  const { currentCompetition } = useSelector((store) => store.competition)
  const { GOA, DEF, MID, STR } = useSelector((store) => store.teamPlayers)
  const { players } = useSelector((store) => store.players)
  const teamConcat = useMemo(
    () => GOA.concat(DEF, MID, STR),
    [GOA, DEF, MID, STR]
  )
  const [windowWidth, setWindowWidth] = useState(0)
  let timeOutId = useRef()
  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    if (currentTeam?.is_team_created) {
      dispatch(setTab(TABS.GameProfile))
    } else {
      dispatch(setTab(TABS.Transfer))
    }
  }, [dispatch, currentTeam])

  useEffect(() => {
    if (userAuth && userTable?.id && paramsId) {
      const fetch = async () => {
        dispatch(fetchCurrentTeam({ id: paramsId, user_id: userTable?.id }))
      }
      fetch()
    }
  }, [userAuth, paramsId, userTable, dispatch])

  useEffect(() => {
    if (paramsId && currentTour?.id) {
      const fetch = async () => {
        dispatch(
          fetchTeamPlayers({
            team_id: paramsId,
            tour_id: currentTour.id,
          })
        )
      }
      fetch()
    }
  }, [paramsId, userTable, currentTour, dispatch])

  useEffect(() => {
    if (paramsId) {
      const fetch = async () => {
        dispatch(fetchTourTeams({ team_id: paramsId }))
      }
      fetch()
    }
  }, [paramsId, userTable, currentTour, dispatch])

  useEffect(() => {
    if (currentTeam?.competition_id) {
      const fetch = async () => {
        dispatch(
          fetchTours({
            competition_id: currentTeam.competition_id.id,
            registered_tour_id: currentTeam?.registered_tour_id,
          })
        )
      }
      fetch()
    }
  }, [currentTeam, dispatch])

  useEffect(() => {
    dispatch(
      setTeamBalance({
        price: teamPrice ?? 0,
        balance: currentTeam?.balance ?? 100,
      })
    )
  }, [teamPrice, dispatch, currentTeam])

  useEffect(() => {
    const teamPlayersId = []
    teamConcat.forEach((player) => {
      player.name && teamPlayersId.push(player.player_id)
    })

    if (
      currentTour?.id &&
      currentTeam?.competition_id?.id &&
      teamPlayersId?.length > 0
    ) {
      dispatch(
        fetchPlayerPoint({
          competition_id: currentTeam.competition_id.id,
          tour_id: currentTour.id,
          playerIds: teamPlayersId,
        })
      )
    }
  }, [dispatch, currentTour, currentTeam, teamConcat])

  useEffect(() => {
    if (currentCompetition?.id) {
      dispatch(
        fetchTopTeams({
          competition_id: currentCompetition?.id,
        })
      )
    }
  }, [currentCompetition, dispatch])

  useEffect(() => {
    if (currentCompetition?.id && players?.length > 0) {
      dispatch(
        fetchTopPlayers({
          competition_id: currentCompetition?.id,
        })
      )
    }
  }, [currentCompetition, dispatch, players])

  useEffect(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  const NEXT_PUBLIC_BANNER_ONE_RENDER_WIDTH =
    process.env.NEXT_PUBLIC_BANNER_ONE_RENDER_WIDTH ?? 1280
  const NEXT_PUBLIC_BANNER_TWO_RENDER_WIDTH =
    process.env.NEXT_PUBLIC_BANNER_TWO_RENDER_WIDTH ?? 1440

  return (
    <Gutter>
      <div className="flex gap-1 2xl:gap-2">
        {windowWidth >= NEXT_PUBLIC_BANNER_ONE_RENDER_WIDTH && (
          <div className="mt-auto hidden h-[500px] w-[100px] min-w-[120px] overflow-hidden rounded bg-neutral-500 xl:block">
            <img
              src={'/images/banner.jpg'}
              alt={'banner'}
              className="h-full w-full"
            />
          </div>
        )}
        {currentTab === TABS.GameProfile && <GameProfile />}
        {currentTab === TABS.Transfer && <Transfer paramsId={paramsId} />}
        {currentTab === TABS.Statistics && <Statistics />}
        {currentTab === TABS.Journal && <Journal />}
        {currentTab === TABS.Tournament && <Tournament />}
        {windowWidth >= NEXT_PUBLIC_BANNER_TWO_RENDER_WIDTH && (
          <div className="mt-auto hidden h-[500px] w-[100px] min-w-[120px] overflow-hidden rounded bg-neutral-500 xl:block">
            <img
              src={'/images/banner.jpg'}
              alt={'banner'}
              className="h-full w-full"
            />
          </div>
        )}
      </div>
    </Gutter>
  )
}

export default CurrentTab
