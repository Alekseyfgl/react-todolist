import React from "react";

type TodolistPropsType = {
    title?: string
    tasks: TasksType[]
    removeTask?: Function
}
type TasksType = {
    id: number
    title: string
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType) => {
    const {title, removeTask} = props;


    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((task: TasksType, i: number) => {
                    const {id, title, isDone} = task

                    return (
                        <li key={task.id}><input type="checkbox" defaultChecked={isDone}/>
                            <span>{title}</span>
                            <button onClick={()=> {
                               removeTask!(id)}}>---</button>
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