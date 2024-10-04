import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'app/lib/supabaseClient'

export const fetchTours = createAsyncThunk(
  'tours/fetchTours',
  async ({ competition_id }) => {
    const { data, error } = await supabase
      .from('tour')
      .select('*')
      .eq('competition_id', competition_id)
      .is('deleted_at', null)
      .order('order', { ascending: true })

    return { data, error }
  }
)
