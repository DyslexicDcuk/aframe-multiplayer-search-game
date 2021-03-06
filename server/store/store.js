const Rx = require('rxjs/Rx')

const { mainReducer, initialState } = require('./reducer')

const actions$ = new Rx.Subject()
const dispatch = (action) => actions$.next(action)

const stateFn = function (initState, actions$) {
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
