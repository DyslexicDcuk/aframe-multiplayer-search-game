// const Rx = require('rxjs/Rx')

const { playerActions } = require('./actions')
const { NODE_POSITIONS } = require('../assets/nodes')

const initialState = {
  players: [],
  nodes: [ ...NODE_POSITIONS ]
}

const mainReducer = function (initState, actions$) {
  return actions$.scan((state, action) => {
    let isNewPlayer
    let nodePositionId
    let oldNodePositionId

    switch (action.type) {
      case playerActions.CREATE:
        isNewPlayer = !state.players.find((p) => p.id === action.payload)
        const availableNodes = state.nodes.filter((n) => !n.isDisabled).map((n) => n.id)
        nodePositionId = availableNodes[Math.floor(Math.random() * availableNodes.length)]

        return Object.assign({}, state, {
          players: isNewPlayer
            ? state.players.concat({
              id: action.payload,
              positionId: nodePositionId,
              position: state.nodes[nodePositionId].position,
              points: 0,
              objectives: []
            })
            : state.players.map((p) => p.id === action.payload
              ? Object.assign({}, p, {
                positionId: nodePositionId,
                position: state.nodes[nodePositionId]
              })
              : p
            ),
          nodes: state.nodes.map((n) => n.id === nodePositionId
            ? Object.assign({}, n, { isDisabled: true })
            : n
          )
        })

      case playerActions.DISCONNECT:
        nodePositionId = state.players.find((p) => p.id === action.payload).positionId
        console.log(nodePositionId)
        return Object.assign({}, state, {
          players: state.players.map((p) => p.id === action.payload
            ? Object.assign({}, p, { position: { x: 0, y: -100, z: 0 } })
            : p
          ),
          nodes: state.nodes.map((n) => n.id === nodePositionId
            ? Object.assign({}, n, { isDisabled: false })
            : n
          )
        })

      case playerActions.MOVE:
        console.log(state.players)
        console.log(state.players.find((p) => p.id === action.payload.playerId))
        oldNodePositionId = state.players.find((p) => p.id === action.payload.playerId).positionId

        return Object.assign({}, state, {
          players: state.players.map((p) => p.id === action.payload.playerId
            ? Object.assign({}, p, {
              positionId: action.payload.positionId,
              position: state.nodes[action.payload.positionId]
            })
            : p
          ),
          nodes: state.nodes.map((n, i) => {
            if (i === action.payload.positionId) {
              return Object.assign({}, n, { isDisabled: true })
            } else if (i === oldNodePositionId) {
              return Object.assign({}, n, { isDisabled: false })
            } else {
              return n
            }
          })
        })

      case playerActions.CHANGE_ORIENTATION:
        return Object.assign({}, state, {
          players: state.players.map((p) => p.id === action.payload.playerId
            ? Object.assign({}, p, { rotation: action.payload.rotation })
            : p
          )
        })

      default:
        return state
    }
  }, initState)
}

// const actions = {
//   createPlayer: (id) => {
//     const nodePositionNo = Math.floor(Math.random() * state.availableNodes)

//     state.players = state.players.concat({
//       id,
//       orientation: null,
//       position: state.availableNodes[nodePositionNo]
//     })

//     state.availableNodes = [
//       ...state.availableNodes.slice(0, nodePositionNo),
//       ...state.availableNodes.slice(nodePositionNo + 1, state.availableNodes.length)
//     ]
//   }
// }

// const playersReducer = function (initState, actions$) {
//   return actions$.scan((state, action) => {
//     switch (action.type) {
//       case playerActions.CREATE:
//         return state

//       default:
//         return state
//     }
//   }, initState)
// }

// const nodesReducer = function (initState, actions$) {
//   return actions$.scan((state, action) => {
//     switch (action.type) {
//       case playerActions.CREATE:
//         return Object.assign({}, state, {
//           availableNodes: [Date.now()]
//         })

//       default:
//         return state
//     }
//   }, initState)
// }

module.exports = {
  initialState,
  mainReducer
  // playersReducer,
  // nodesReducer
}
