import Gutter from '../../../../../components/Gutter'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import TopTeams from '../TopTeams'
import { useDispatch } from 'react-redux'
import { fetchPlayerResult } from 'app/lib/features/playerResult/playerResult.thunk'
import StatisticsTable from './Table'
import StatisticsPagination from './Pagination'

const Statistics = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(14)
  const { currentCompetition } = useSelector((store) => store.competition)
  const { season } = useSelector((state) => state.season)

  useEffect(() => {
    if (currentCompetition?.id && season?.id) {
      dispatch(
        fetchPlayerResult({
          competition_id: currentCompetition?.id,
          season_id: season?.id,
          page,
          perPage,
        })
      )
    }
  }, [dispatch, currentCompetition, season, page, perPage])

  const incrementPage = () => {
    setPage((prevPage) => prevPage + 1)
  }
  const decrementPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0))
  }

  return (
    <Gutter>
      <section className="flex w-full flex-col gap-4 lg:flex-row">
        <div className="flex h-full min-h-[40rem] w-full flex-1 table-auto flex-col overflow-x-auto rounded-2xl bg-black p-6 text-neutral-200 lg:w-2/3">
          <StatisticsTable />
          <StatisticsPagination
            incrementPage={incrementPage}
            decrementPage={decrementPage}
            page={page}
          />
        </div>
        <TopTeams />
      </section>
    </Gutter>
  )
}

export default Statistics
