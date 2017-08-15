let OBJECTIVE_POSITIONS = shuffleArray([
  { x: -10, y: 0.5, z: -5 },
  { x: -8, y: 0.5, z: -5 },
  { x: -6, y: 0.5, z: -5 },
  { x: -4, y: 0.5, z: -5 },
  { x: -2, y: 0.5, z: -5 },
  { x: 0, y: 0.5, z: -5 },
  { x: 2, y: 0.5, z: -5 },
  { x: 4, y: 0.5, z: -5 },
  { x: 6, y: 0.5, z: -5 },
  { x: 8, y: 0.5, z: -5 },
  { x: 10, y: 0.5, z: -5 }
]).map((p, i) => ({
  id: i,
  position: p
}))

const OBJECTIVES = [
  { element: 'a-box', color: 'orange' },
  { element: 'a-box', color: 'blue' },
  { element: 'a-box', color: 'red' },
  { element: 'a-sphere', color: 'orange' },
  { element: 'a-sphere', color: 'blue' },
  { element: 'a-sphere', color: 'red' }
].map((o) => Object.assign({}, o, OBJECTIVE_POSITIONS.splice(
  Math.random() * OBJECTIVE_POSITIONS.length, 1
)[0]))

module.exports = {
  OBJECTIVES
}

function shuffleArray (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return array
}
