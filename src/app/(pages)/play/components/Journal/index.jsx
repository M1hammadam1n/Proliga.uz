import Gutter from '../../../../../components/Gutter'
import { useTranslation } from 'react-i18next'
import TopTeams from '../TopTeams'
import JournalPagination from './Pagination'
import JournalTable from './Table'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserActivity } from 'app/lib/features/userActivity/userActivity.thunk'
import { useState, useEffect } from 'react'

const Journal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [page, setPage] = useState(0)
  const [perPage, setPerPage] = useState(14)
  const { currentCompetition } = useSelector((store) => store.competition)
  const { season } = useSelector((state) => state.season)
  const { userTable } = useSelector((state) => state.auth)

  useEffect(() => {
    if (currentCompetition?.id && season?.id) {
      dispatch(
        fetchUserActivity({
          competition_id: currentCompetition?.id,
          season_id: season?.id,
          user_id: userTable?.id,
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
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <section className="flex h-full min-h-[40rem] w-full flex-1 table-auto flex-col overflow-x-auto rounded-2xl bg-black p-6 text-neutral-200 lg:w-2/3">
          <JournalTable />
          <JournalPagination />
        </section>
        <TopTeams />
      </div>
    </Gutter>
  )
}

export default Journal
