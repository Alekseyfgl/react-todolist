import React, {FC, useEffect, useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from './Todolist';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography, useColorScheme} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {ModeNight} from '@mui/icons-material';

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
};
export type FilterValuesTypes = 'all' | 'active' | 'completed';

type TodoListType = {
    id: string;
    title: string;
    filter: FilterValuesTypes;
};

type TasksStateType = {
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


function App() {
    const todoListId_1 = v1();
    const todoListId_2 = v1();

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: 'What to learn?', filter: 'all'},
        {id: todoListId_2, title: 'SHOP', filter: 'all'},
    ]);

    const [tasks, setTasks] = useState<TasksStateType>({
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

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        // const copyTasks: TasksStateType = {...tasks}
        // copyTasks[todoListId] = copyTasks[todoListId].map((t) => (t.id === taskId ? {...t, title: title} : t))
        // setTasks(copyTasks);
        setTasks({...tasks, [todoListId]: tasks[todoListId].map((t) => (t.id === taskId ? {...t, title: title} : t))});
    }

    const addTodoList = (todoTitle: string) => {
        const newTodoList: TodoListType = {
            id: v1(),
            title: todoTitle,
            filter: 'all',
        };
        setTodoLists([...todoLists, newTodoList]);
        setTasks({...tasks, [newTodoList.id]: []});
    };

    const removeTodoList = (todoListId: string) => {
        const updatedTodoList: TodoListType[] = todoLists.filter((tl) => tl.id !== todoListId);
        setTodoLists(updatedTodoList);
    };

    const changeTodoListFilter = (filter: FilterValuesTypes, todoListId: string) => {
        setTodoLists(todoLists.map((tl: TodoListType) => (tl.id === todoListId ? {...tl, filter: filter} : tl)));
    };

    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: title} : tl))
    };

    const removeTask = (taskId: string, todoListId: string): void => {
        //1 вариант
        /*
        const tasksForUpdate: TasksType[] = tasks[todoListId]; // находим массив в котором будем делать удаления
        const updatedTasks: TasksType[] = tasksForUpdate.filter((t: TasksType) => taskId !== t.id); // тут удаляем таски
        const copyTasks: TasksStateType = { ...tasks }; // сделали копию всего стейта
        copyTasks[todoListId] = updatedTasks; // закидываем в копию отфильтрованные таски
        setTasks(copyTasks);
         */

        //1 вариант
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((t: TasksType) => taskId !== t.id)});
    };

    const addTask = (title: string, todoListId: string) => {
        if (title.trim() !== '') {
            const newTask: TasksType = {
                id: v1(),
                title: title,
                isDone: false,
            };
            // 1 вариант
            /*
            const tasksForUpdate: TasksType[] = tasks[todoListId]; // находим массив куда добавляем таску
            const updatedTasks = [...tasksForUpdate, newTask];
            const copyTasks = { ...tasks }; // делаем копию чтобы работать со стейтом имутабельно
            copyTasks[todoListId] = updatedTasks;
            setTasks(copyTasks);
            */
            //2 вариант
            setTasks({...tasks, [todoListId]: [...tasks[todoListId], newTask]});
        }
    };

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        //данную задачу можно решить через find и де структуризацию,
        // но чтобы заставить реакт перерендерить мы создадим только новый массив, это так себе решение!!!
        // в данном случае мы создали новый массив и новый объект
        setTasks({...tasks, [todoListId]: tasks[todoListId].map((t) => (t.id === taskId ? {...t, isDone: isDone} : t))});
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
                >
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container
                      spacing={4}
                >
                    {todoListComponents}
                </Grid>

            </Container>
        </div>
    );
}

export default App;
