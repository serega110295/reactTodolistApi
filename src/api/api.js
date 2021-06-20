const { default: axios } = require("axios")

 export const getAllTaskApi = () => {
    axios.get('/tasks').then(res => {
        console.log(res)
    })
}

export const createTaskApi = Tasks => {
    fetch('/', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(Tasks)
    })
}
export const deleteTaskApi = id => {
    fetch(`/${id}`, {
        method: 'DELETE'
    })
} 

export const changeStateApi = (id, state) => {
        fetch(`/update-status/${id}`, {
            method: 'PUT',
            body: state
        })
}

export const deleteAllTaskApi = () => {
    fetch('/tasks', {
        method: 'DELETE'
    })
}