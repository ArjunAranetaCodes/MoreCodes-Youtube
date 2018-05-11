import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import List from "./List";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      items: []
    };
  }

  onChange = event => {
    this.setState({ term: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    this.setState({
      term: "",
      items: [...this.state.items, this.state.term]
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <h1 className="text-center">TODO List App</h1>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="exampleInputEmail1">Task Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  value={this.state.term}
                  onChange={this.onChange}
                />
              </div>
              <button type="submit" class="btn btn-success btn-block">
                Submit
              </button>
            </form>
            <List items={this.state.items} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
