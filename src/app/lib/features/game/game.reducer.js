import { PLAYERS } from 'app/utils/playerTypes.util.'
import { toast } from 'react-toastify'

export const addPlayerToTeamReducer = (state, action) => {
  const { player, type } = action.payload

  const existingPlayer = state.team.find((p) => p.id === player.id)

  if (existingPlayer) {
    toast.warning('Player already exists')
    return
  }
  if (type === PLAYERS.GOA && state.GOA.length < 1 && state.team.length < 11) {
    state.GOA.push(player)
  }
  if (type === PLAYERS.DEF && state.DEF.length < 5 && state.team.length < 11) {
    state.DEF.push(player)
  }
  if (type === PLAYERS.MID && state.MID.length < 5 && state.team.length < 11) {
    state.MID.push(player)
  }
  if (type === PLAYERS.STR && state.STR.length < 4 && state.team.length < 11) {
    state.STR.push(player)
  }
  if (state.team.length < 11) {
    state.team.push(player)
  }
}

export const deletePlayerFromTeamReducer = (state, action) => {
  const { player, type } = action.payload

  if (type === PLAYERS.GOA) {
    state.GOA = state.GOA.filter((p) => p.id !== player.id)
  }
  if (type === PLAYERS.DEF) {
    state.DEF = state.DEF.filter((p) => p.id !== player.id)
  }
  if (type === PLAYERS.MID) {
    state.MID = state.MID.filter((p) => p.id !== player.id)
  }
  if (type === PLAYERS.STR) {
    state.STR = state.STR.filter((p) => p.id !== player.id)
  }
  state.team = state.team.filter((p) => p.id !== player.id)
}
