import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { supabase } from '../../../lib/supabaseClient'
import { useTranslation } from 'react-i18next'
import { setCurrentTourTeamTransfersCount } from 'app/lib/features/tourTeams/tourTeams.slice'

export const useUpdateTourTeam = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { userAuth } = useSelector((state) => state.auth)
  const { t } = useTranslation()

  const updateTourTeam = async ({ team_id, tour_id, count_of_transfers }) => {
    setIsLoading(false)
    setError(null)

    if (!team_id) {
      setError(t('Jamoa ID kiritilmagan!'))
      toast.error(t('Jamoa ID kiritilmagan!'))
    }
    if (!tour_id) {
      setError(t('Turnir ID kiritilmagan!'))
      toast.error(t('Turnir ID kiritilmagan!'))
    }
    if (!count_of_transfers) {
      setError(t('Transfer soni kiritilmagan!'))
      toast.error(t('Transfer soni kiritilmagan!'))
    }

    try {
      setIsLoading(true)

      const { data, error } = await supabase
        .from('tour_team')
        .update({ current_count_of_transfers: count_of_transfers })
        .eq('team_id', team_id)
        .eq('tour_id', tour_id)
        .select()

      if (error) {
        setError(error.message)
        toast.error(error.message)
      }
      if (data) {
        setData(data)
        dispatch(setCurrentTourTeamTransfersCount(count_of_transfers))
      }
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  return { updateTourTeam, isLoading, error, data }
}
