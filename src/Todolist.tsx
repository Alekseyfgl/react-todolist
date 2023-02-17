import React, {ChangeEvent, FC} from 'react';
import {FilterValuesTypes, TasksType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton} from '@mui/material';
import {DeleteForever} from '@mui/icons-material';

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
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void;
    changeTodoListTitle: (title: string, todoListId: string) => void
};

export const Todolist: FC<TodolistPropsType> = (props: TodolistPropsType) => {
    const taskCounter: number = props.tasks.length;

    const tasksList: JSX.Element | JSX.Element[] = taskCounter
        ? (props.tasks.map((task: TasksType) => {
            // если функц что-то принимает в себя, то скобки в сдвух сторон
            const removeTasks = (): void => props.removeTask(task.id, props.todoListId);
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>): void => {
                props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId);
            };
            const changeTaskTitle = (title: string) => props.changeTaskTitle(task.id, title, props.todoListId);

            const taskDoneStyle = task.isDone ? 'done' : '';

            return (
                <li className={taskDoneStyle} key={task.id}>
                    <Checkbox
                        checked={task.isDone}
                        onChange={changeTaskStatus}
                        inputProps={{'aria-label': 'controlled'}}
                        size={'small'}
                    />
                    {/*<input type="checkbox" defaultChecked={task.isDone} onChange={changeTaskStatus}/>*/}
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <IconButton onClick={removeTasks} aria-label="delete" size="small" color={'error'}>
                        <DeleteForever/>
                    </IconButton>

                </li>
            );
        }))
        : (<span>Тасок нет:(</span>);

    const onClickRemoveTodoListHandler = () => {
        props.removeTodoList(props.todoListId);
    };
    const handlerCreator = (filter: FilterValuesTypes) => () => props.changeTodoListFilter(filter, props.todoListId);

    const addItem = (todoListTitle: string) => {
        props.addTask(todoListTitle, props.todoListId);
    };

    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/></h3>
                <IconButton onClick={onClickRemoveTodoListHandler}
                            aria-label="delete"
                            size="small"
                            color={'error'}
                >
                    <DeleteForever/>
                </IconButton>
            </div>

            <AddItemForm addItem={addItem}/>
            <ul>{tasksList}</ul>
            <ButtonGroup size={'small'}

                         fullWidth
            >
                <Button
                    onClick={handlerCreator('all')}
                    variant={'contained'}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    sx={{mr: '4px'}}
                    className={'Btn'}
                >
                    All
                </Button>
                <Button
                    onClick={handlerCreator('active')}
                    variant={'contained'}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    sx={{mr: '4px'}}
                >
                    Active
                </Button>
                <Button
                    onClick={handlerCreator('completed')}
                    variant={'contained'}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                >
                    Completed
                </Button>
            </ButtonGroup>
        </div>
    );
};
