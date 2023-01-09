import React, { FC } from 'react';
import { FilterValuesTypes } from './App';

type TodolistPropsType = {
    title?: string;
    tasks: TasksType[];
    removeTask: (taskId: number) => void;
    changeFilter: (filter: FilterValuesTypes) => void;
};
type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
};

export const Todolist: FC<TodolistPropsType> = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input />
                <button>+</button>
            </div>
            <ul>
                {props.tasks.length !== 0 ? (
                    props.tasks.map((task: TasksType) => {
                        // если функц что-то принимает в себя, то скобки в сдвух сторон
                        const removeTasks = () => props.removeTask(task.id); //для каждой  <button onClick={removeTasks}> -</button>нужно создать функцию
                        return (
                            <li key={task.id}>
                                <input type="checkbox" defaultChecked={task.isDone} />
                                <span>{task.title}</span>
                                <button onClick={removeTasks}> -</button>
                            </li>
                        );
                    })
                ) : (
                    <span>Тасок нет:(</span>
                )}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};
