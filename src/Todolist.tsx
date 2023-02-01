import React, { ChangeEvent, FC, useState, KeyboardEvent } from 'react';
import { FilterValuesTypes, TasksType } from './App';

type TodolistPropsType = {
    todoListId: string;
    title: string;
    tasks: TasksType[];
    filter: FilterValuesTypes;
    removeTask: (taskId: string, todoListId: string) => void;
    changeTodoListFilter: (filter: FilterValuesTypes, todoListId: string) => void;
    addTask: (title: string, todoListId: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void;
    removeTodoList: (todoListId: string) => void;
};

export const Todolist: FC<TodolistPropsType> = (props: TodolistPropsType) => {
    const [error, setError] = useState<boolean>(false);
    const errorMessage: false | JSX.Element = error && <p>Title isn't correct</p>;
    const taskCounter: number = props.tasks.length;

    const tasksList: JSX.Element | JSX.Element[] = taskCounter ? (
        props.tasks.map((task: TasksType) => {
            // если функц что-то принимает в себя, то скобки в сдвух сторон
            const removeTasks = (): void => props.removeTask(task.id, props.todoListId); //для каждой  <button onClick={removeTasks}>
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>): void => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId);
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
            props.addTask(title, props.todoListId);
        } else {
            setError(true);
        }
        setTitle('');
    };

    const onClickRemoveTodoListHandler = () => {
        props.removeTodoList(props.todoListId);
    };
    const handlerCreator = (filter: FilterValuesTypes) => () => props.changeTodoListFilter(filter, props.todoListId);

    const btnAllStyle: string = props.filter === 'all' ? 'btn-active' : '';
    const btnActiveStyle: string = props.filter === 'active' ? 'btn-active' : '';
    const btnCompletedStyle: string = props.filter === 'completed' ? 'btn-active' : '';
    return (
        <div>
            <h3>{props.title}</h3>
            <button onClick={onClickRemoveTodoListHandler}>X</button>
            <div>
                <input className={error ? 'error-input' : ''} value={title} onChange={onChangeSetTitle} onKeyDown={onKeyDownHandler} />
                {errorMessage}
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>{tasksList}</ul>
            <div>
                <button className={btnAllStyle} onClick={handlerCreator('all')}>
                    All
                </button>
                <button className={btnActiveStyle} onClick={handlerCreator('active')}>
                    Active
                </button>
                <button className={btnCompletedStyle} onClick={handlerCreator('completed')}>
                    Completed
                </button>
            </div>
        </div>
    );
};
