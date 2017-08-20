let OBJECTIVE_POSITIONS = shuffleArray([
  { x: 6, y: 0.5, z: 3.5 },
  { x: 0, y: 0.5, z: -18.5 },
  { x: 0, y: 0.5, z: -21.5 },
  { x: 22, y: 0.5, z: -24 },
  { x: 24, y: 0.5, z: -21 },
  { x: 5.5, y: 0.5, z: -3.5 },
  { x: 21, y: 2.5, z: 20 },
  { x: 3, y: 5.5, z: 5 },
  { x: -19.5, y: 5.5, z: 19.5 },
  { x: -21.5, y: 0.5, z: 6.5 },
  { x: -24.5, y: 2.5, z: -13 }
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
