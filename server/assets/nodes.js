const NODE_POSITIONS = [
  { x: 0, y: 0.5, z: 3 },
  { x: 0, y: 0.5, z: -12 },
  { x: -9, y: 0.5, z: -12 },
  { x: 9, y: 0.5, z: -12 },
  { x: -8, y: 0.5, z: -20 },
  { x: 8, y: 0.5, z: -20 },
  { x: 18, y: 0.5, z: 0 },
  { x: 18, y: 3.5, z: -15 },
  { x: 13, y: 0.5, z: 15 },
  { x: -3, y: 0.5, z: 16 },
  { x: -19.5, y: 2.5, z: 19.5 },
  { x: -11, y: 0.5, z: 0 }
].map((p, i) => Object.assign({
  id: i,
  coordinates: p,
  isDisabled: false
}))

module.exports = {
  NODE_POSITIONS
}
