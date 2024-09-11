import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { supabase } from '../../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export const useCreateTeam = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState(null)
  const { userTable, userAuth } = useSelector((state) => state.auth)
  const router = useRouter()

  const createTeam = async ({ title, formation, competition_id }) => {
    setIsLoading(false)
    setError(null)

    if (!userTable && !userAuth) {
      setError('You must be logged in to create a team')
      toast.error('You must be logged in to create a team')
      router.push('/auth')
      return
    }

    if (!title) {
      setError('Ism bolishi shart')
      toast.error('ism bolishi shart')
      return
    }

    try {
      setIsLoading(true)

      const { data, error } = await supabase
        .from('team')
        .insert({
          name: title,
          formation,
          balance: 100,
          competition_id,
          user_id: userTable.id,
        })
        .select()

      if (error) {
        setError(error.message)
        toast.error(error.message)
        return
      }
      if (data) {
        setData(data[0])
        toast.success('Jomoa muvaffaqiyatli yaratildi')
      }
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }
  return { createTeam, isLoading, error, data }
}
