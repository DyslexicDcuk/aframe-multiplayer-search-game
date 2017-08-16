const onPlayerMove = (e, socket, PLAYER_ID) => {
  socket.emit('playerMove', {
    positionId: parseInt(e.target.getAttribute('positionId'), 10),
    playerId: PLAYER_ID
  })
}

const onObjectiveClick = (e, socket, PLAYER_ID) => {
  socket.emit('clickObjective', {
    objectiveId: parseInt(e.target.getAttribute('objectiveId'), 10),
    playerId: PLAYER_ID
  })
}

module.exports = {
  onPlayerMove,
  onObjectiveClick
}
