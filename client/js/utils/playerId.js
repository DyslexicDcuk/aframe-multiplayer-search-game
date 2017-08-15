// eslint-disable-next-line
const params = new URLSearchParams(window.location.search.slice(1))
const playerIdFromQuery = params.get('playerId')

let PLAYER_ID

if (playerIdFromQuery) {
  PLAYER_ID = playerIdFromQuery
} else {
  PLAYER_ID = Date.now()
  window.location = window.location + '?playerId=' + PLAYER_ID
}

module.exports = {
  PLAYER_ID
}
