const { onObjectiveClick } = require('../player-actions.js')

const renderCurrentObjective = (currentObjectiveEl, objective) => {
  const newCurrentObjective = document.createElement(objective.element)

  window.AFRAME.utils.entity
    .setComponentProperty(newCurrentObjective, 'color', objective.color)

  currentObjectiveEl.appendChild(newCurrentObjective)
}

const renderObjective = (objectivesEl, objective, socket, PLAYER_ID) => {
  const newObjective = document.createElement(objective.element)

  const objectiveProperties = {
    position: objective.position,
    color: objective.color,
    'change-color-on-hover': 'color: magenta',
    objectiveId: objective.id
  }

  Object.keys(objectiveProperties).forEach((key) => {
    window.AFRAME.utils.entity
      .setComponentProperty(newObjective, key, objectiveProperties[key])
  })

  newObjective.addEventListener('click', (e) => onObjectiveClick(e, socket, PLAYER_ID))

  objectivesEl.appendChild(newObjective)
}

module.exports = {
  renderCurrentObjective,
  renderObjective
}
