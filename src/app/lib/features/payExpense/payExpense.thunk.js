import { createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from 'app/lib/supabaseClient'

export const fetchPayExpense = createAsyncThunk(
  'payExpense/fetchPayBalance',
  async () => {
    const { data, error } = await supabase
      .from('pay_expense')
      .select('*')
      .order('created_at', { ascending: true })

    return { data, error }
  }
)
