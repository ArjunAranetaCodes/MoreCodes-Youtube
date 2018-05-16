import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

const initialState = {}
function reducer(state = initialState, action) {
  switch (action.type) {
    // Respond to the SET_USER action and update
    // the state accordingly
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      }
    default:
      return state
  }
}

const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

export default store
