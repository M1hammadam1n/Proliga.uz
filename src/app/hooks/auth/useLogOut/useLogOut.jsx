import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import {
  setUserAuth,
  setUserTable,
} from '../../../lib/features/auth/auth.slice'
import { useRouter } from 'next/navigation'
import { setTeams } from 'app/lib/features/teams/teams.slice'
import { clearNotifications } from 'app/lib/features/systemNotification/systemNotification.slice'

export const useLogOut = () => {
  const dispatch = useDispatch()
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
  const router = useRouter()
  const { t } = useTranslation()

  const logOut = async () => {
    try {
      dispatch(setUserAuth(null))
      dispatch(setUserTable(null))
      dispatch(setTeams([]))
      dispatch(clearNotifications())

      localStorage.removeItem(`user-auth-${sbUrl}`)
      localStorage.removeItem(`user-table-${sbUrl}`)

      router.push('/')
    } catch (error) {
      toast.error(error.message, { theme: 'dark' })
    } finally {
      toast.success(t('Tizimdan chiqdingiz'), { theme: 'dark' })
    }
  }

  return { logOut }
}
