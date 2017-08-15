const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const port = process.env.PORT || 3000
const path = require('path')

const { initStore, dispatch } = require('./store/store')
const { playerActions } = require('./store/actions')

const store$ = initStore()
store$.pluck('players').distinctUntilChanged()
  .subscribe((s) => io.emit('players', s))
store$.pluck('nodes').distinctUntilChanged()
  .subscribe((s) => io.emit('nodes', s))

io.on('connection', (socket) => {
  const PLAYER_ID = socket.handshake.query.playerId

  dispatch({
    type: playerActions.CREATE,
    payload: PLAYER_ID
  })

  socket.on('playerMove', (data) => {
    dispatch({
      type: playerActions.MOVE,
      payload: data
    })
  })

  socket.on('playerChangeOrientation', (data) => {
    dispatch({
      type: playerActions.CHANGE_ORIENTATION,
      payload: data
    })
  })

  socket.on('disconnect', () => {
    console.log(PLAYER_ID)
    dispatch({
      type: playerActions.DISCONNECT,
      payload: PLAYER_ID
    })
  })
})

app.use('/build', express.static(path.join(__dirname, '/../client/build')))
app.get('/', function (req, res) {
  // eslint-disable-next-line
  res.sendFile(path.join(__dirname + '/../client/build/index.html'))
})

http.listen(port, function () {
  console.log('listening on *:' + port)
})
