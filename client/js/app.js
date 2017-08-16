import '../css/app.scss'
if (process.env.NODE_ENV !== 'production') { require('../index.html') }

require('./components/index')
const { PLAYER_ID } = require('./utils/playerId')

const { clearChildElements } = require('./utils/clear-child-elements')
const renderFunctions = require('./render-functions/index')

window.addEventListener('load', () => {
  // main elements
  const sceneEl = document.querySelector('a-scene')
  const playerEl = sceneEl.querySelector('#player')
  const cameraEl = playerEl.querySelector('#camera')
  // wrapper elements
  const nodesEl = sceneEl.querySelector('#nodes')
  const playersEl = sceneEl.querySelector('#players')
  const objectivesEl = sceneEl.querySelector('#objectives')
  const currentObjectiveEl = sceneEl.querySelector('#currentObjective')

  const socket = window.io('http://localhost:3000?playerId=' + PLAYER_ID)

  socket.on('nodes', (nodes) => {
    clearChildElements(nodesEl)
    nodes.forEach((node, i) => {
      if (!node.isDisabled) { renderFunctions.renderNode(nodesEl, node, i, socket, PLAYER_ID) }
    })
  })

  socket.on('players', (players) => {
    clearChildElements(playersEl)
    players.forEach((p) => {
      if (p.id === PLAYER_ID) {
        // if (p.nextObjective === 3) {
        //   socket.disconnect()
        //   window.location = 'http://imgur.com/gallery/Gk9Q5sK'
        // }
        window.AFRAME.utils.entity
          .setComponentProperty(playerEl, 'position', p.position)
        clearChildElements(currentObjectiveEl)
        renderFunctions.renderCurrentObjective(currentObjectiveEl, p.objectives[p.nextObjective])
      } else {
        renderFunctions.renderEnemyPlayer(playersEl, p)
      }
    })
  })

  socket.on('objectives', (objectives) => {
    clearChildElements(objectivesEl)
    objectives.forEach((objective) => {
      renderFunctions.renderObjective(objectivesEl, objective, socket, PLAYER_ID)
    })
  })

  setInterval(() => {
    socket.emit('playerChangeOrientation', {
      playerId: PLAYER_ID,
      rotation: cameraEl.getAttribute('rotation')
    })
  }, 100)
})
