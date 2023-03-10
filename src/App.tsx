import React from 'react';
import './App.css';

import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography, useColorScheme} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {addTodoListAC,} from './state/todolist-reducers';

import {ActionsType} from './state/action.types';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/redux/store';
import {TodolistWithRedux} from './TodoListWithRedux';
import {ModeN} from './theme/NightTheme';

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


function App() {
    const todoLists: TodoListType[] = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)

    const dispatch = useDispatch()

    const addTodoList = (todoTitle: string) => {
        dispatch<ActionsType>(addTodoListAC(todoTitle))
    };


    const todoListComponents: JSX.Element[] = todoLists.map((tl: TodoListType) => {
        return (
            <Grid item key={tl.id}>
                <Paper elevation={3}
                       sx={{p: '20px'}}
                >
                    <TodolistWithRedux todoListId={tl.id} title={tl.title} filter={tl.filter}/>
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

export default App;
