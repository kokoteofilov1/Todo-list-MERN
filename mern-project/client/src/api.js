import axios from "axios";

export const getTodos = () => {
    return axios.get('/api/User').then(res => res.data.todo);
}

export const createToDo = (title) => {
    const body = JSON.stringify({title})
    axios.post("/api/Create", body, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const editToDo = (todo) => {
    const body = JSON.stringify({todo});
    axios.post("/api/Edit", body, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const deleteToDo = (todo) => {
    axios.post("/api/Delete", todo, {
        headers: {
            'Content-Type': 'application/json',
        }
    });
}
