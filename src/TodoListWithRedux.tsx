import React, {ChangeEvent, FC} from 'react';
import {FilterValuesTypes, TasksType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, ButtonGroup, Checkbox, IconButton} from '@mui/material';
import {DeleteForever} from '@mui/icons-material';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/redux/store';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';
import {ActionsType} from './state/action.types';
import {changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC} from './state/todolist-reducers';

type TodolistPropsType = {
    todoListId: string;
    title: string;
    filter: FilterValuesTypes;
};

const getFilteredTasksForRender = (tasks: TasksType[], filterValue: FilterValuesTypes): TasksType[] => {
    let filteredTasks: TasksType[] = tasks;

    switch (filterValue) {
        case 'active':
            return (filteredTasks = tasks.filter((t: TasksType) => !t.isDone));
        case 'completed':
            return (filteredTasks = tasks.filter((t: TasksType) => t.isDone));
        default:
            return tasks;
    }
};

export const TodolistWithRedux: FC<TodolistPropsType> = (props: TodolistPropsType) => {

    const tasks: TasksType[] = useSelector<AppRootStateType, TasksType[]>(state => state.tasks[props.todoListId]);
    const dispatch = useDispatch()

    const filteredTasksForRender: TasksType[] = getFilteredTasksForRender(tasks, props.filter);
    const taskCounter: number = tasks.length;

    const onClickRemoveTodoListHandler = (): void => {
        dispatch<ActionsType>(removeTodoListAC(props.todoListId));
    };
    const handlerCreator = (filter: FilterValuesTypes) => (): void => {
        dispatch<ActionsType>(changeTodoListFilterAC(filter, props.todoListId));
    };

    const addItem = (todoListTitle: string): void => {
        dispatch<ActionsType>(addTaskAC(todoListTitle, props.todoListId));
    };

    const changeTodoListTitle = (title: string): void => {
        dispatch<ActionsType>(changeTodoListTitleAC(title, props.todoListId));
    }


    const tasksList: JSX.Element | JSX.Element[] = taskCounter ?
        (filteredTasksForRender.map((task: TasksType) => {
            const removeTasks = (): void => {
                dispatch<ActionsType>(removeTaskAC(task.id, props.todoListId));
            }
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>): void => {
                dispatch<ActionsType>(changeTaskStatusAC(task.id, e.currentTarget.checked, props.todoListId));
            };
            const changeTaskTitle = (title: string): void => {
                dispatch<ActionsType>(changeTaskTitleAC(task.id, title, props.todoListId));
            }

            const taskDoneStyle: string = task.isDone ? 'done' : '';

            return (
                <li className={taskDoneStyle} key={task.id}>
                    <Checkbox
                        checked={task.isDone}
                        onChange={changeTaskStatus}
                        inputProps={{'aria-label': 'controlled'}}
                        size={'small'}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                    <IconButton onClick={removeTasks} aria-label="delete" size="small" color={'error'}>
                        <DeleteForever/>
                    </IconButton>

                </li>
            );
        }))
        : (<span>Тасок нет:(</span>);

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
