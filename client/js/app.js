import '../css/app.scss'
if (process.env.NODE_ENV !== 'production') {
  require('../index.html')
}

require('./components/index')
const { PLAYER_ID } = require('./utils/playerId')

window.addEventListener('load', () => {
  const sceneEl = document.querySelector('a-scene')
  const playerEl = sceneEl.querySelector('#player')
  const cameraEl = playerEl.querySelector('#camera')

  const nodesEl = sceneEl.querySelector('#nodes')
  const playersEl = sceneEl.querySelector('#players')

  window.onTeleport = (e) => {
    console.log('playerMove', {
      positionId: parseInt(e.target.getAttribute('positionId'), 10),
      playerId: PLAYER_ID
    })
    socket.emit('playerMove', {
      positionId: parseInt(e.target.getAttribute('positionId'), 10),
      playerId: PLAYER_ID
    })
  }

  const socket = window.io('http://192.168.0.15:3000?playerId=' + PLAYER_ID)

  socket.on('nodes', (nodes) => {
    clearChildElements(nodesEl)
    nodes.forEach((node, i) => {
      if (!node.isDisabled) { renderNode(nodesEl, node, i) }
    })
  })

  socket.on('players', (players) => {
    clearChildElements(playersEl)
    players.forEach((p) => {
      if (p.id === PLAYER_ID) {
        window.AFRAME.utils.entity
          .setComponentProperty(playerEl, 'position', p.position)
      } else {
        renderEnemyPlayer(playersEl, p)
      }
    })
  })

  setInterval(() => {
    socket.emit('playerChangeOrientation', {
      playerId: PLAYER_ID,
      rotation: cameraEl.getAttribute('rotation')
    })
  }, 100)
})

function clearChildElements (wrapperEl) {
  while (wrapperEl.firstChild) {
    wrapperEl.removeChild(wrapperEl.firstChild)
  }
}

function renderNode (nodesEl, node, i) {
  const newNode = document.createElement('a-entity')

  const nodeProperties = {
    mixin: 'node',
    position: `${node.x} ${node.y} ${node.z}`,
    'change-color-on-hover': 'color: magenta',
    positionId: i
  }

  Object.keys(nodeProperties).forEach((key) => {
    window.AFRAME.utils.entity
      .setComponentProperty(newNode, key, nodeProperties[key])
  })

  newNode.addEventListener('click', (e) => window.onTeleport(e))

  nodesEl.appendChild(newNode)
}

function renderEnemyPlayer (playersEl, player) {
  const oponent = document.createElement('a-entity')
  window.AFRAME.utils.entity
    .setComponentProperty(oponent, 'position', player.position)

  const body = document.createElement('a-cone')
  const bodyProps = {
    'radius-bottom': 1,
    'radius-top': 0,
    'color': 'tomato',
    'height': 1.8
  }
  Object.keys(bodyProps).forEach((key) => {
    window.AFRAME.utils.entity
      .setComponentProperty(body, key, bodyProps[key])
  })

  const head = document.createElement('a-sphere')
  const headProps = {
    radius: 0.65,
    position: '0 1.3 0',
    rotation: player.rotation
  }
  Object.keys(headProps).forEach((key) => {
    window.AFRAME.utils.entity
      .setComponentProperty(head, key, headProps[key])
  })

  const nose = document.createElement('a-sphere')
  const noseProps = {
    radius: 0.13,
    position: '0 0 -0.65',
    color: 'red'
  }
  Object.keys(noseProps).forEach((key) => {
    window.AFRAME.utils.entity
      .setComponentProperty(nose, key, noseProps[key])
  })

  head.appendChild(nose)
  body.appendChild(head)
  oponent.appendChild(body)
  playersEl.appendChild(oponent)
}
