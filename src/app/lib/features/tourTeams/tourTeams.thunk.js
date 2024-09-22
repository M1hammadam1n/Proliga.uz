import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'app/lib/supabaseClient'

export const fetchTourTeams = createAsyncThunk(
  'tours/fetchTourTeams',
  async ({ team_id }) => {
    const { data, error } = await supabase
      .from('tour_team')
      .select('*')
      .eq('team_id', team_id)
      .order('tour_id', { ascending: true })

    return { data, error }
  }
)
