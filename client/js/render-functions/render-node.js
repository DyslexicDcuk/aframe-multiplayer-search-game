const { onPlayerMove } = require('../player-actions')

export const renderNode = (nodesEl, node, i, socket, PLAYER_ID) => {
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

  newNode.addEventListener('click', (e) => onPlayerMove(e, socket, PLAYER_ID))

  nodesEl.appendChild(newNode)
}
