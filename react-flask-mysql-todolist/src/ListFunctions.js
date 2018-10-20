import axios from 'axios'

export const getList = () => {
    return axios
        .get('api/tasks', {
            headers: { "Content-type": "application/json" }
        })
        .then(res => {
            var data = []
            Object.keys(res.data).forEach((key) => {
                var val = res.data[key]
                data.push([val.title, val.id])
            })

            return data
        })
}

export const addToList = term => {
    return axios
        .post(
            'api/task', {
                title: term
            }, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            console.log(res)
        })
}

export const deleteItem = term => {
    axios
        .delete(
            `api/task/${term}`, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            console.log(res)
        })
        .catch((res) => {
            console.log(res)
        })
}

export const updateItem = (term, id) => {
    return axios
        .put(
            `api/task/${id}`, {
                title: term
            }, {
                headers: { "Content-type": "application/json" }
            })
        .then((res) => {
            console.log(res)
        })
}