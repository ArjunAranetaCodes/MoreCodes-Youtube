import React, { Component } from 'react';
import List from './List'

class App extends Component {
  render () {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h1 className="text-center">TODO</h1>
            <List />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
