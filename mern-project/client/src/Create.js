import React from "react";
import {createToDo} from "./api";
import {useHistory} from "react-router-dom";
import TodoForm from "./TodoForm";

function Create() {
    const history = useHistory();

    const handleSubmit = async (title) => {
        await createToDo(title);
        history.push('/User')
    }

    return (
        <div>
            <h3>Create ToDo:</h3>
            <TodoForm handleSubmit={handleSubmit}/>
        </div>
    );
}

export default Create;