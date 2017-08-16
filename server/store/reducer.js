// const Rx = require('rxjs/Rx')

const { playerActions } = require('./actions')
const { NODE_POSITIONS } = require('../assets/nodes')
const { OBJECTIVES } = require('../assets/objectives')

const initialState = {
  players: [],
  nodes: [ ...NODE_POSITIONS ],
  objectives: [ ...OBJECTIVES ]
}

const mainReducer = function (initState, actions$) {
  return actions$.scan((state, action) => {
    let isNewPlayer
    let nodePositionId
    let oldNodePositionId
    let arr

    switch (action.type) {
      case playerActions.CREATE:
        isNewPlayer = !state.players.find((p) => p.id === action.payload)
        const availableNodes = state.nodes.filter((n) => !n.isDisabled).map((n) => n.id)
        nodePositionId = availableNodes[Math.floor(Math.random() * availableNodes.length)]

        arr = []
        while (arr.length < state.objectives.length) {
          var randomnumber = Math.ceil(Math.random() * state.objectives.length) - 1
          if (arr.indexOf(randomnumber) > -1) continue
          arr[arr.length] = randomnumber
        }

        return Object.assign({}, state, {
          players: isNewPlayer
            ? state.players.concat({
              id: action.payload,
              positionId: nodePositionId,
              position: state.nodes[nodePositionId].position,
              points: 0,
              objectives: arr.map((i) => state.objectives[i]),
              nextObjective: 0
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
          ),
          objectives: [ ...state.objectives ]
        })

      case playerActions.DISCONNECT:
        nodePositionId = state.players.find((p) => p.id === action.payload).positionId
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

      case playerActions.CLICK_OBJECTIVE:
        return Object.assign({}, state, {
          players: state.players.map((p) => {
            if (p.id === action.payload.playerId && p.objectives[p.nextObjective].id === action.payload.objectiveId) {
              return Object.assign({}, p, {
                nextObjective: p.nextObjective + 1
              })
            } else {
              return p
            }
          })
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
