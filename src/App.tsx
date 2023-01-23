import React, { useEffect, useState } from 'react';
import './App.css';
import { v1 } from 'uuid';
import { Todolist } from './Todolist';

export type TasksType = {
    id: string;
    title: string;
    isDone: boolean;
};
export type FilterValuesTypes = 'all' | 'active' | 'completed';

function App(): JSX.Element {
    const title: string = 'Todolist';
    const [tasks, setTasks] = useState<TasksType[]>([
        { id: '1', title: 'Hello world', isDone: true },
        { id: '2', title: 'I am Happy', isDone: false },
        { id: '3', title: 'Yo', isDone: false },
        { id: '4', title: 'Yo', isDone: false },
    ]);

    const [filter, setFilter] = useState<FilterValuesTypes>('all');
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
    const changeFilter = (filter: FilterValuesTypes) => {
        setFilter(filter);
    };

    const removeTask = (taskId: string): void => {
        setTasks(tasks.filter((t: TasksType) => taskId !== t.id));
    };

    //tasks и filter ставили, чтобы не было ассинхроного изменения стейта, т.к. useEffect синхронизирует
    // useEffect(() => {
    //     console.log(tasks);
    // }, [tasks, filter]);
    const addTask = (title: string) => {
        if (title.trim() !== '') {
            const newTask: TasksType = {
                id: v1(),
                title: title,
                isDone: false,
            };
            setTasks([...tasks, newTask]);
        }
    };

    const changeTaskStatus = (taskId: string, isDone: boolean) => {
        //данную задачу можно решить через find и де структуризацию,
        // но чтобы заставить реакт перерендерить мы создадим только новый массив, это так себе решение!!!

        // в данном случае мы создали новый массив и новый объект
        setTasks(tasks.map((t: TasksType) => (t.id === taskId ? { ...t, isDone: isDone } : t)));
    };

    const filteredTasksForRender: TasksType[] = getFilteredTasksForRender(tasks, filter);
    return (
        <div className="App">
            {/*<Todolist title={title} tasks={filteredTasksForRender} removeTask={removeTask} changeFilter={changeFilter} />*/}

            <Todolist tasks={filteredTasksForRender} removeTask={removeTask} addTask={addTask} changeFilter={changeFilter} changeTaskStatus={changeTaskStatus} filter={filter} />
        </div>
    );
}

export default App;
