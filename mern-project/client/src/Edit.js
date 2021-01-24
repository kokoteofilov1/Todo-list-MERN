import React from "react";
import {useHistory, useLocation} from "react-router-dom";
import TodoForm from "./TodoForm";
import {editToDo} from "./api";

function Edit() {
    const history = useHistory();
    const location = useLocation();

    const handleSubmit = async (todo) => {
        await editToDo(todo);
        history.push('/User')
    }

    return (
        <div>
            <h3>Edit Todo</h3>
            <TodoForm todo={location.state} handleSubmit={handleSubmit}/>
        </div>
    );
}

export default Edit;