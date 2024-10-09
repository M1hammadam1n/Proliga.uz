import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setUserAuth, setUserTable } from './lib/features/auth/auth.slice'
import { usePathname, useRouter } from 'next/navigation'
import { setLanguage } from './lib/features/systemLanguage/systemLanguage.slice'
import { LANGUAGE } from './utils/languages.util'
import { useTranslation } from 'react-i18next'
import {
  fetchSystemNotification,
  setupNotificationListener,
} from './lib/features/systemNotification/systemNotification.thunk'

const GetInitialState = ({ children }) => {
  const dispatch = useDispatch()
  const { userAuth, userTable } = useSelector((state) => state.auth)
  const { systemNotifications } = useSelector(
    (state) => state.systemNotifications
  )
  const { lang } = useSelector((state) => state.systemLanguage)
  const { i18n } = useTranslation()
  const path = usePathname()
  const router = useRouter()

  useEffect(() => {
    const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL.slice(8, 28)
    const auth =
      localStorage.getItem(`user-auth-${sbUrl}`) &&
      JSON.parse(localStorage.getItem(`user-auth-${sbUrl}`))
    const table =
      localStorage.getItem(`user-table-${sbUrl}`) !== 'undefined' &&
      JSON.parse(localStorage.getItem(`user-table-${sbUrl}`))

    if (auth && auth?.session?.access_token && !userAuth) {
      dispatch(setUserAuth(auth))
    }
    if (table && table.email && !userTable) {
      dispatch(setUserTable(table))
    }
    if (!auth && !table && path.slice(1, 5) === 'play') {
      router.push('/')
    }
  }, [dispatch, userAuth, userTable, router, path])

  useEffect(() => {
    if (userTable?.id) {
      dispatch(fetchSystemNotification({ userId: userTable.id }))
      // systemNotifications?.length === 0 &&
      //   dispatch(setupNotificationListener({ userId: userTable.id }))
    }
  }, [dispatch, userTable])

  useEffect(() => {
    if (lang !== userTable?.language && userTable?.id) {
      dispatch(setLanguage(userTable?.language ?? LANGUAGE.uz))
      i18n.changeLanguage(userTable?.language ?? LANGUAGE.uz)
    }
  }, [dispatch, lang, userTable?.language, i18n, userTable])

  return <>{children}</>
}

export default GetInitialState
