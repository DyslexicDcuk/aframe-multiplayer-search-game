export const renderEnemyPlayer = (playersEl, player) => {
  const oponent = document.createElement('a-entity')
  window.AFRAME.utils.entity
    .setComponentProperty(oponent, 'position', player.position.coordinates)

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
