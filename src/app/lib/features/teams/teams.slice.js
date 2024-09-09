import { createSlice } from '@reduxjs/toolkit'
import { teamsExtraReducer } from './teams.extraReducer'

const initialState = {
  teams: [],
  isLoading: false,
  error: null,
}

const teamsSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {},
  extraReducers: teamsExtraReducer,
})

export default teamsSlice.reducer
