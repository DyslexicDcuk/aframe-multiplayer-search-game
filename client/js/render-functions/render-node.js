const { onPlayerMove } = require('../player-actions')

export const renderNode = (nodesEl, node, socket, PLAYER_ID) => {
  const newNode = document.createElement('a-entity')

  const nodeProperties = {
    mixin: 'node',
    position: node.coordinates,
    'change-color-on-hover': 'color: magenta',
    positionId: node.id
  }

  Object.keys(nodeProperties).forEach((key) => {
    window.AFRAME.utils.entity
      .setComponentProperty(newNode, key, nodeProperties[key])
  })

  newNode.addEventListener('click', (e) => onPlayerMove(e, socket, PLAYER_ID))

  nodesEl.appendChild(newNode)
}
