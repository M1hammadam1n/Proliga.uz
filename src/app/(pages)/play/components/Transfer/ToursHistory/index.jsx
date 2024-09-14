import { useSelector } from 'react-redux'

const ToursHistory = () => {
  const { currentCompetition } = useSelector((store) => store.competition)
  const { currentTeam } = useSelector((store) => store.currentTeam)
  const { currentTourTeam } = useSelector((store) => store.tourTeams)

  return (
    <div className="flex h-min w-full border-collapse flex-col gap-2 overflow-x-auto rounded-xl bg-black p-6 text-neutral-200 md:text-sm lg:w-1/2 xl:text-base">
      <h2 className="text-lg font-bold text-neutral-50">Meni Ochkolarim</h2>
      <div className="flex gap-2 md:gap-8">
        <div>
          <p className="text-xs text-neutral-500 md:text-sm">
            Turnirdagi ochkolar
          </p>
          <span className="text-4xl font-bold text-neutral-50 md:text-6xl">
            {currentTeam?.point ?? '00'}
          </span>
        </div>
        <div>
          <p className="text-xs text-neutral-500 md:text-sm">
            Turdagi ochkolar
          </p>
          <span className="text-4xl font-bold text-neutral-50 md:text-6xl">
            {currentTeam?.point ?? '00'}
          </span>
        </div>
        <div>
          <p className="text-sm text-neutral-500">O&apos;rtacha olgan ballar</p>
          <span className="text-3xl font-bold text-neutral-50 md:text-5xl">
            {currentCompetition?.average_team_point ?? '00'}
          </span>
        </div>
      </div>
      <h3 className="text-base font-semibold capitalize text-neutral-200 md:text-lg">
        ligadagi o&apos;rnim
      </h3>
      <div className="w-min rounded border border-neutral-600 px-6 py-3">
        <p className="tmd:text-2xl max-w-24 text-wrap text-xl font-bold text-neutral-400">
          <span className="mr-1 text-neutral-100">
            {currentTeam?.order ?? '00'}
          </span>
          / {currentTourTeam?.sum_of_team_point ?? '00000'}
        </p>
      </div>
    </div>
  )
}

export default ToursHistory
