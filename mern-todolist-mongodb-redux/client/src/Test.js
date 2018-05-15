import React, { Component } from 'react'
//import ReactDOM from 'react-dom'

// We need createStore, connect, and Provider:
//import { createStore, applyMiddleware, compose } from 'redux'
import { connect } from 'react-redux'

//actions
function updateTest(props) {
  return {
    type: 'SET_NAME',
    user: {
      ...props,
      name: 'Mark'
    }
  }
}

class Test extends Component {
  render() {
    return (
      <input
        type="button"
        value="Change my name !"
        onClick={() => this.props.dispatch(updateTest(this.props.user))}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  null
)(Test)
