const Rx = require('rxjs/Rx')

const { mainReducer, initialState } = require('./reducer')

const actions$ = new Rx.Subject()
const dispatch = (action) => actions$.next(action)

const stateFn = function (initState, actions$) {
  // const combine = (s) => ({
  //   players: s[0],
  //   nodes: s[1]
  // })

  // const appState$ = playersReducer(initState.players, actions$)
  //   .zip(nodesReducer(initState.nodes, actions$))
  //   .map(combine)

  const appState$ = mainReducer(initState, actions$)

  const state = new Rx.BehaviorSubject(initState)
  appState$.subscribe((s) => state.next(s))

  return state
}

const initStore = () => stateFn(initialState, actions$)

module.exports = {
  initStore,
  dispatch
}
