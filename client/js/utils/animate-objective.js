export const animateObjective = (p, objectivesEl) => {
  const oldObjectiveId = p.objectives[p.nextObjective - 1].id
  const oldObjectiveEl = objectivesEl.querySelector(`[objectiveId="${oldObjectiveId}"]`)
  const oldObjectivePosition = oldObjectiveEl.getAttribute('position')
  const anim = document.createElement('a-animation')
  const newOldObjectivePosition = Object.assign({}, oldObjectivePosition, { y: oldObjectivePosition.y + 0.5 })

  const animProps = {
    direction: 'alternate',
    attribute: 'position',
    from: `${oldObjectivePosition.x} ${oldObjectivePosition.y} ${oldObjectivePosition.z}`,
    to: `${newOldObjectivePosition.x} ${newOldObjectivePosition.y} ${newOldObjectivePosition.z}`,
    repeat: 5,
    dur: 300,
    ease: 'quad'
  }
  Object.keys(animProps).forEach((key) => {
    window.AFRAME.utils.entity
      .setComponentProperty(anim, key, animProps[key])
  })
  oldObjectiveEl.appendChild(anim)
}
