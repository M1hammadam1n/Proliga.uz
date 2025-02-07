import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'app/lib/supabaseClient'
import { addNotification } from './systemNotification.slice'

export const fetchAllNotifications = createAsyncThunk(
  'systemNotification/fetchAllNotifications',
  async ({ userId }) => {
    try {
      const { data: systemData, error: systemError } = await supabase
        .from('system_notification')
        .select('*')
        .eq('is_broadcast', true)
        .is('deleted_at', null)
        .order('created_at')

      if (systemError) {
        console.error('System notification fetch error:', systemError)
        return { data: [], error: systemError.message }
      }

      const { data: personalData, error: personalError } = await supabase
        .from('system_notification')
        .select('*')
        .eq('user_id', userId)
        .is('deleted_at', null)
        .order('created_at')

      if (personalError) {
        console.error('Personal notification fetch error:', personalError)
        return { data: [], error: personalError.message }
      }

      const allNotifications = [...systemData, ...personalData]

      return {
        data: allNotifications,
        error: { ...personalError, ...systemError },
      }
    } catch (error) {
      return { data: [], error: error }
    }
  }
)

export const setupNotificationListener = createAsyncThunk(
  'systemNotification/setupNotificationListener',
  async ({ userId }, { dispatch }) => {
    try {
      supabase
        .channel('public:system_notification')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'system_notification' },
          (payload) => {
            const { name, desc, is_broadcast, user_id } = payload.new

            if (is_broadcast || user_id === userId) {
              dispatch(addNotification({ name, desc }))
            }
          }
        )
        .subscribe()

      return
    } catch (error) {
      toast.error(error.message, { theme: 'dark' })
    }
  }
)
