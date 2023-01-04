import React from "react";
import {FilterValuesType} from "./App";

type TodolistPropsType = {
    title?: string
    tasks: TasksType[]
    removeTask?: (id: number) => void
    changeFilter: (value: FilterValuesType) => void
}
export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const {title, removeTask, changeFilter} = props;

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
                <button onClick={() => changeFilter('all')}>All</button>
                <button onClick={() => changeFilter('active')}>Active</button>
                <button onClick={() => changeFilter('completed')}>Completed</button>
            </div>
        </div>
    )
}