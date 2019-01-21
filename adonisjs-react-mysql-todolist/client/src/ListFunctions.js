import axios from 'axios'

export const getList = () => {
  return axios
    .get('api/tasks', {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      var data = []
      Object.keys(res.data).forEach(function(key) {
        var val = res.data[key]
        data.push([val.task_name, val.id])
      })

      return data
    })
}

export const addToList = term => {
  return axios
    .post(
      'api/task',
      {
        task_name: term
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(function(response) {
      console.log(response)
    })
}

export const deleteItem = term => {
  axios
    .delete(`api/task/${term}`, {
      headers: { 'Content-Type': 'application/json' }
    })
    .then(function(response) {
      console.log(response)
    })
    .catch(function(error) {
      console.log(error)
    })
}

export const updateItem = (term, id) => {
  return axios
    .put(
      `api/task/${id}`,
      {
        task_name: term
      },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    )
    .then(function(response) {
      console.log(response)
    })
}
