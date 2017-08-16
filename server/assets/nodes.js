const NODE_POSITIONS = [
  { x: 5, y: 0.5, z: -10 },
  { x: -5, y: 0.5, z: -10 },
  { x: 5, y: 0.5, z: 10 },
  { x: -5, y: 0.5, z: 10 }
].map((p, i) => Object.assign({
  id: i,
  coordinates: p,
  isDisabled: false
}))

module.exports = {
  NODE_POSITIONS
}
