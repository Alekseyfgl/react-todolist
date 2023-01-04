import React from "react";
import {renderToReadableStream} from "react-dom/server";

type TodolistPropsType = {
    title?: string
    tasks: TasksType[]
    removeTask?: any
}
type TasksType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const {title, removeTask} = props;

    const handler = (id: number) => {
        if (removeTask) {
            return removeTask(id)
        } else {
            return null
        }
    }
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((t: TasksType,) => {
                    const {id, title, isDone} = t
                    return (
                        <li key={id}><input type="checkbox" defaultChecked={isDone}/> <span>{title}</span>
                            <button onClick={() => handler(id)}>----
                            </button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}