import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
export const useUpdateTeam = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { userAuth } = useSelector((state) => state.auth)
  const { t } = useTranslation()

  const updateTeam = async ({ team_id, is_team_created }) => {
    setIsLoading(false)
    setError(null)

    if (!team_id) {
      setError(t('Jamoa ID kiritilmagan!'))
      toast.error(t('Jamoa ID kiritilmagan!'))
    }
    if (is_team_created) {
      return
    }

    try {
      setIsLoading(true)

      const { data, error } = await supabase
        .from('team')
        .update({ is_team_created: true })
        .eq('id', team_id)
        .select()

      if (error) {
        setError(error.message)
        toast.error(error.message)
      }
      if (data) {
        setData(data)
      }
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  return { updateTeam, isLoading, error, data }
}
