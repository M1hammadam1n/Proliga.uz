import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { data, tabs } from '../../../../../utils/tabs.util'
import { setTab } from '../../../../../lib/features/game/game.slice'
import { toast } from 'react-toastify'

const NavigationTabs = () => {
  const active = 'bg-primary text-black bg-opacity-100'
  const passive =
    'bg-neutral-300 text-neutral-800 hover:text-neutral-950 hover:bg-opacity-70'
  const { tab } = useSelector((state) => state.game)
  const dispatch = useDispatch()

  const setCurrentTab = (key) => {
    if (Object.keys(tabs).includes(key)) {
      return dispatch(setTab(key))
    }
    return toast.error("selected tab doesn't exist!")
  }

  return (
    <div className="flex flex-wrap items-center gap-4 pt-6 2xl:gap-6">
      {data.map((item, index) => (
        <button
          key={item.id}
          className={`rounded px-2 py-1 text-sm font-semibold uppercase transition-all hover:bg-primary sm:px-3 md:px-4 md:py-2 md:text-base ${item.key === tab ? active : passive}`}
          onClick={() => setCurrentTab(item.key)}
        >
          {item.title}
        </button>
      ))}
      <Link
        href="/championships"
        className="rounded bg-neutral-300 bg-opacity-80 px-2 py-1 text-sm font-semibold uppercase text-neutral-800 transition-all hover:bg-primary hover:bg-opacity-60 hover:text-neutral-950 sm:hidden sm:px-3 md:px-4 md:py-2 md:text-base"
      >
        Chempionat
      </Link>
    </div>
  )
}

export default NavigationTabs
