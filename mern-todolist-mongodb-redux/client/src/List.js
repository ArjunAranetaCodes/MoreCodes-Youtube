import React, { Component } from 'react'
import { getList, addToList, deleteItem, updateItem } from './ListFunctions'
import { connect, Provider } from 'react-redux'

const initialState = {}
function reducer(state = initialState, action) {
  console.log(action)
  switch (action.type) {
    // Respond to the SET_USER action and update
    case 'GET_TASKS':
      return {
        ...state,
        payload: action.payload
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.user
      }
    case 'ADD_TASK':
      return {
        term: action.term
      }
    default:
      return state
  }
}

function updateTest(name) {
  return {
    type: 'SET_NAME',
    payload: {
      term: name
    }
  }
}

export const getTasks = tasks => {
  return {
    type: 'GET_TASKS',
    payload: tasks
  }
}

class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: '',
      term: '',
      editDisabled: false,
      items: []
    }

    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    this.getAll()
  }

  onChange = event => {
    this.setState({ term: event.target.value, editDisabled: 'disabled' })
    console.log(this.state.editDisabled)
  }

  getAll = () => {
    getList().then(data => {
      this.setState(
        {
          term: '',
          items: [...data]
        },
        () => {
          console.log(this.state.items)
        }
      )
    })
    this.props.dispatch(getTasks(this.state.items))
  }

  onSubmit = e => {
    e.preventDefault()
    addToList(this.state.term).then(() => {
      this.getAll()
    })
  }

  onUpdate = e => {
    e.preventDefault()
    updateItem(this.state.term, this.state.id).then(() => {
      this.getAll()
    })
  }

  onEdit = (item, itemid, e) => {
    e.preventDefault()
    this.setState({
      id: itemid,
      term: item
    })
  }

  onDelete = (val, e) => {
    e.preventDefault()
    deleteItem(val)

    var data = [...this.state.items]
    data.filter(function(item, index) {
      if (item[1] === val) {
        data.splice(index, 1)
      }
      return true
    })
    this.setState({ items: [...data] })
  }

  render() {
    return (
      <div className="col-md-12">
        <input
          type="button"
          value="Change my name !"
          onClick={() => this.props.dispatch(updateTest('aa'))}
        />
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Task Name</label>
            <div className="row">
              <div className="col-md-9">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={this.state.term || ''}
                  onChange={this.onChange.bind(this)}
                />
              </div>
              <div className="col-md-2">
                <button
                  className="btn btn-primary"
                  onClick={this.onUpdate.bind(this)}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            onClick={this.onSubmit.bind(this)}
            className="btn btn-success btn-block"
          >
            Submit
          </button>
        </form>
        <table className="table">
          <tbody>
            {this.state.items.map((item, index) => (
              <tr key={index}>
                <td className="text-left">{item[0]}</td>
                <td className="text-right">
                  <button
                    href=""
                    className="btn btn-info mr-1"
                    disabled={this.state.editDisabled}
                    onClick={this.onEdit.bind(this, item[0], item[1])}
                  >
                    Edit
                  </button>
                  <button
                    href=""
                    className="btn btn-danger"
                    onClick={this.onDelete.bind(this, item[1])}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    payload: state.payload
  }
}

export default connect(
  mapStateToProps,
  null
)(List)
