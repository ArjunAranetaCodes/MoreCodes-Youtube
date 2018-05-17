import React from 'react'
import ReactDOM from 'react-dom'

// We need createStore, connect, and Provider:
import { createStore, applyMiddleware, compose } from 'redux'
import { connect, Provider } from 'react-redux'
import App from './App'

const initialState = {}
//reducers
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      }
    case 'SET_NAME':
      return {
        ...state,
        user: action.user
      }
    case 'ADD_TASK':
      return {
        ...state,
        term: action.term
      }
    default:
      return state
  }
}

// Create the redux store.
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
//const store = createStore(reducer)

// Dispatch an action to set the user
// (since initial state is empty)
store.dispatch({
  type: 'INIT_PAYLOAD',
  payload: {
    id: '',
    term: '',
    editDisabled: false,
    items: []
  }
})

// Wrap the whole app in Provider so that connect()
// has access to the store
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
