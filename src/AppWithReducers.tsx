import React, {FC, useReducer, useState, Reducer} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography, useColorScheme} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {ModeNight} from '@mui/icons-material';
import {addTodoListAC, changeTodoListFilterAC, changeTodoListTitleAC, removeTodoListAC, todolistReducers} from './state/todolist-reducers';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './state/tasks-reducer';
import {ActionsType} from './state/action.types';

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
};
export type FilterValuesTypes = 'all' | 'active' | 'completed';

export type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesTypes;
};

export type TasksStateType = {
    [todoListId: string]: TasksType[];
};


const ModeN: FC = () => {
    const {mode, setMode} = useColorScheme();

    return (
        <IconButton aria-label="delete" size="small" sx={{mr: '30px'}}
                    onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
        >
            <ModeNight/>
        </IconButton>
    );
}


function AppWithReducers() {
    const todoListId_1 = v1();
    const todoListId_2 = v1();


    const [todoLists, dispatchToTodoList] = useReducer<Reducer<TodoListType[], ActionsType>>(todolistReducers, [
        {id: todoListId_1, title: 'What to learn?', filter: 'all'},
        {id: todoListId_2, title: 'SHOP', filter: 'all'},
    ]);

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId_1]: [
            {id: '1', title: 'Hello world', isDone: true},
            {id: '2', title: 'I am Happy', isDone: false},
            {id: '3', title: 'Yo', isDone: false},
            {id: '4', title: 'Yo', isDone: false},
        ],
        [todoListId_2]: [
            {id: '5', title: 'WHISKY', isDone: true},
            {id: '6', title: 'COLA', isDone: false},
            {id: '7', title: 'ACE', isDone: false},
        ],
    });


    //side effect - запросы на сервер
    //не детерменирована - не определно
    const addTodoList = (todoTitle: string) => {


        const action = addTodoListAC(todoTitle)
        dispatchToTodoList(action)
        dispatchToTasks(action)
    };
    const removeTodoList = (todoListId: string) => {
        const action = removeTodoListAC(todoListId)
        dispatchToTasks(action)
        dispatchToTodoList(action)
    };
    const changeTodoListTitle = (title: string, todoListId: string) => {
        dispatchToTodoList(changeTodoListTitleAC(todoListId, title))
    };
    const changeTodoListFilter = (filter: FilterValuesTypes, todoListId: string) => {
        dispatchToTodoList(changeTodoListFilterAC(filter, todoListId))
    };


    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todoListId))
    }
    const removeTask = (taskId: string, todoListId: string): void => {
        dispatchToTasks(removeTaskAC(taskId, todoListId))
    };
    const addTask = (title: string, todoListId: string) => {
        if (title.trim() !== '') {
            dispatchToTasks(addTaskAC(title, todoListId))
        }
    };
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    };


    //utility
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

    const todoListComponents: JSX.Element[] = todoLists.map((tl: TodoListType) => {
        const filteredTasksForRender: TasksType[] = getFilteredTasksForRender(tasks[tl.id], tl.filter);

        return (
            <Grid item>
                <Paper elevation={3}
                       sx={{p: '20px'}}
                >
                    <Todolist
                        key={tl.id}
                        todoListId={tl.id}
                        title={tl.title}
                        removeTodoList={removeTodoList}
                        tasks={filteredTasksForRender}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeTodoListFilter={changeTodoListFilter}
                        changeTaskStatus={changeTaskStatus}
                        filter={tl.filter}
                        changeTaskTitle={changeTaskTitle}
                        changeTodoListTitle={changeTodoListTitle}
                    />
                </Paper>
            </Grid>

        );
    });

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <ModeN/>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container
                      sx={{p: '20px 0'}}
                      display={'flex'}
                      justifyContent={'center'}
                >
                    <Paper elevation={3}
                           sx={{p: '20px'}}
                    >
                        <AddItemForm addItem={addTodoList}/>
                    </Paper>

                </Grid>
                <Grid container
                      spacing={4}
                      display={'flex'}
                      justifyContent={'center'}
                >
                    {todoListComponents}
                </Grid>

            </Container>
        </div>
    );
}

export default AppWithReducers;
