import React, { Component } from 'react'
import './App.css'
import List from './List'
import store from './store'
import { Provider } from 'react-redux'

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <h1 className="text-center">TODO </h1>
              <List />
            </div>
          </div>
        </div>
      </Provider>
    )
  }
}

export default App
