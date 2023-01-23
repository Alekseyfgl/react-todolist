import React, { ChangeEvent, FC, useState, KeyboardEvent } from 'react';
import { FilterValuesTypes, TasksType } from './App';
import { Simulate } from 'react-dom/test-utils';
import error = Simulate.error;

type TodolistPropsType = {
    title?: string;
    tasks: TasksType[];
    filter: FilterValuesTypes;
    removeTask: (taskId: string) => void;
    changeFilter: (filter: FilterValuesTypes) => void;
    addTask: (title: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void;
};

export const Todolist: FC<TodolistPropsType> = (props: TodolistPropsType) => {
    const [error, setError] = useState<boolean>(false);
    const errorMessage: false | JSX.Element = error && <p>Title isn't correct</p>;
    const taskCounter: number = props.tasks.length;

    const tasksList: JSX.Element | JSX.Element[] = taskCounter ? (
        props.tasks.map((task: TasksType) => {
            // если функц что-то принимает в себя, то скобки в сдвух сторон
            const removeTasks = (): void => props.removeTask(task.id); //для каждой  <button onClick={removeTasks}>
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>): void => props.changeTaskStatus(task.id, e.currentTarget.checked);
            const taskDoneStyle = task.isDone ? 'done' : '';
            return (
                <li className={taskDoneStyle} key={task.id}>
                    <input type="checkbox" defaultChecked={task.isDone} onChange={changeTaskStatus} />
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
        error && setError(false);
        setTitle(e.currentTarget.value);
    };
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTaskHandler();

    const onClickAddTaskHandler = () => {
        if (title.trim() !== '') {
            props.addTask(title);
        } else {
            setError(true);
        }
        setTitle('');
    };

    const handlerCreator = (filter: FilterValuesTypes) => () => props.changeFilter(filter);

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input className={error ? 'error-input' : ''} value={title} onChange={onChangeSetTitle} onKeyDown={onKeyDownHandler} />
                {errorMessage}
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>{tasksList}</ul>
            <div>
                <button className={props.filter === 'all' ? 'btn-active' : ''} onClick={handlerCreator('all')}>
                    All
                </button>
                <button className={props.filter === 'active' ? 'btn-active' : ''} onClick={handlerCreator('active')}>
                    Active
                </button>
                <button className={props.filter === 'completed' ? 'btn-active' : ''} onClick={handlerCreator('completed')}>
                    Completed
                </button>
            </div>
        </div>
    );
};
