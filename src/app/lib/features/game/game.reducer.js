import { PLAYERS } from 'app/utils/playerTypes.util.'
import { toast } from 'react-toastify'

export const addPlayerToTeamReducer = (state, action) => {
  const { player, ignoreExistingPlayers } = action.payload

  const existingPlayer = state.team.find((p) => p.name === player.name)
  if (existingPlayer && !ignoreExistingPlayers) {
    toast.warning('Player already exists')
    return state
  }

  if (
    player.position === PLAYERS.GOA &&
    state.GOA.length < 1 &&
    state.team.length < 11
  ) {
    state.GOA.push(player)
    state.team.push(player)
  }
  if (
    player.position === PLAYERS.DEF &&
    state.DEF.length < 5 &&
    state.team.length < 11
  ) {
    state.DEF.push(player)
    state.team.push(player)
  }
  if (
    player.position === PLAYERS.MID &&
    state.MID.length < 5 &&
    state.team.length < 11
  ) {
    state.MID.push(player)
    state.team.push(player)
  }
  if (
    player.position === PLAYERS.STR &&
    state.STR.length < 4 &&
    state.team.length < 11
  ) {
    state.STR.push(player)
    state.team.push(player)
  }
}

export const updatePlayerInTeamReducer = (state, action) => {
  const { player } = action.payload

  const existingPlayer = state.team.find((p) => p.id === player.id)
  if (existingPlayer) {
    toast.warning('Player already exists')
    return state
  }

  // GOA
  if (
    state.GOA.length > 0 &&
    player.position === PLAYERS.GOA &&
    state.indexes.GOA < 1
  ) {
    state.GOA[state.indexes.GOA] = {
      ...state.GOA[state.indexes.GOA],
      name: player.name,
      club_id: player.club_id,
      club: {
        slug: player.club.slug,
      },
      price: player.price,
    }
    state.indexes.GOA++
  }
  if (
    player.position === PLAYERS.GOA &&
    state.GOA.length < 1 &&
    state.team.length < 11
  ) {
    state.GOA.push(player)
    state.team.push(player)
  }
  // DEF
  if (player.position === PLAYERS.DEF && state.indexes.DEF < 4) {
    state.DEF[state.indexes.DEF] = {
      ...state.DEF[state.indexes.DEF],
      name: player.name,
      club_id: player.club_id,
      club: {
        slug: player.club.slug,
      },
      price: player.price,
    }
    state.indexes.DEF++
  }
  if (
    player.position === PLAYERS.DEF &&
    state.DEF.length < 5 &&
    state.team.length < 11
  ) {
    state.DEF.push(player)
    state.team.push(player)
  }
  // MID
  if (player.position === PLAYERS.MID && state.indexes.MID < 4) {
    state.MID[state.indexes.MID] = {
      ...state.MID[state.indexes.MID],
      name: player.name,
      club_id: player.club_id,
      club: {
        slug: player.club.slug,
      },
      price: player.price,
    }
    state.indexes.MID++
  }
  if (
    player.position === PLAYERS.MID &&
    state.MID.length < 5 &&
    state.team.length < 11
  ) {
    state.MID.push(player)
    state.team.push(player)
  }
  // STR
  if (player.position === PLAYERS.STR && state.indexes.STR < 3) {
    state.STR[state.indexes.STR] = {
      ...state.STR[state.indexes.STR],
      name: player.name,
      club_id: player.club_id,
      club: {
        slug: player.club.slug,
      },
      price: player.price,
    }
    state.indexes.STR++
  }
  if (
    player.position === PLAYERS.STR &&
    state.STR.length < 4 &&
    state.team.length < 11
  ) {
    state.STR.push(player)
    state.team.push(player)
  }
}

export const deletePlayerFromTeamReducer = (state, action) => {
  const { player } = action.payload

  if (player.position === PLAYERS.GOA) {
    state.GOA = state.GOA.filter((p) => p.id !== player.id)
    state.team = state.team.filter((p) => p.id !== player.id)
  }
  if (player.position === PLAYERS.DEF) {
    state.DEF = state.DEF.filter((p) => p.id !== player.id)
    state.team = state.team.filter((p) => p.id !== player.id)
  }
  if (player.position === PLAYERS.MID) {
    state.MID = state.MID.filter((p) => p.id !== player.id)
    state.team = state.team.filter((p) => p.id !== player.id)
  }
  if (player.position === PLAYERS.STR) {
    state.STR = state.STR.filter((p) => p.id !== player.id)
    state.team = state.team.filter((p) => p.id !== player.id)
  }
}
