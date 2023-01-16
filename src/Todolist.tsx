import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValuesTypes, TasksType} from './App';

type TodolistPropsType = {
    title?: string;
    tasks: TasksType[];
    removeTask: (taskId: string) => void;
    changeFilter: (filter: FilterValuesTypes) => void;
    addTask: (title: string) => void;
};

export const Todolist: FC<TodolistPropsType> = (props: TodolistPropsType) => {
    const taskCounter: number = props.tasks.length;

    const tasksList: JSX.Element | JSX.Element[] = taskCounter ? (
        props.tasks.map((task: TasksType) => {
            // если функц что-то принимает в себя, то скобки в сдвух сторон
            const removeTasks = () => props.removeTask(task.id); //для каждой  <button onClick={removeTasks}> -</button>нужно создать функцию
            return (
                <li key={task.id}>
                    <input type="checkbox" defaultChecked={task.isDone}/>
                    <span>{task.title}</span>
                    <button onClick={removeTasks}> -</button>
                </li>
            );
        })
    ) : (
        <span>Тасок нет:(</span>
    );

    const [title, setTitle] = useState<string>('');

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTaskHandler();

    const onClickAddTaskHandler = () => {
        props.addTask(title);
        setTitle('');
    };

    const handlerCreator = (filter: FilterValuesTypes) => () => props.changeFilter(filter);

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeSetTitle} onKeyDown={onKeyDownHandler}/>
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>{tasksList}</ul>
            <div>
                <button onClick={handlerCreator('all')}>All</button>
                <button onClick={handlerCreator('active')}>Active</button>
                <button onClick={handlerCreator('completed')}>Completed</button>
            </div>
        </div>
    );
};
