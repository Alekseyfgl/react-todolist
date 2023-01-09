import React, { useEffect, useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';

type TasksType = {
    id: number;
    title: string;
    isDone: boolean;
};
export type FilterValuesTypes = 'all' | 'active' | 'completed';

function App(): JSX.Element {
    // const tasks1:TasksType[] = [
    //     {id: 1, title: "HTML&CSS", isDone: true},
    //     {id: 2, title: "JS", isDone: true},
    //     {id: 3, title: "ReactJS", isDone: false}
    // ]
    // let tasks2: TasksType[] = [
    //     {id: 1, title: "Hello world", isDone: true},
    //     {id: 2, title: "I am Happy", isDone: false},
    //     {id: 3, title: "Yo", isDone: false},
    //     {id: 4, title: "Yo", isDone: false}
    // ]
    const title: string = 'Todolist';
    const [result, setResult] = useState<TasksType[]>([
        { id: 1, title: 'Hello world', isDone: true },
        { id: 2, title: 'I am Happy', isDone: false },
        { id: 3, title: 'Yo', isDone: false },
        { id: 4, title: 'Yo', isDone: false },
    ]);

    const [filter, setFilter] = useState<FilterValuesTypes>('all');
    const getFilteredTasksForRender = (tasks: TasksType[], filterValue: FilterValuesTypes): TasksType[] => {
        let filteredTasks: TasksType[] = tasks;

        switch (filterValue) {
            case 'active':
                return (filteredTasks = tasks.filter((t) => !t.isDone));
            case 'completed':
                return (filteredTasks = tasks.filter((t) => t.isDone));
            default:
                return tasks;
        }
    };
    const changeFilter = (filter: FilterValuesTypes) => {
        setFilter(filter);
    };

    const removeTask = (taskId: number): void => {
        setResult(result.filter((t: TasksType) => taskId !== t.id));
        console.log(result);
    };

    //result и filter ставили, чтобы не было ассинхроного изменения стейта, т.к. useEffect синхронизирует
    useEffect(() => {
        console.log(result);
    }, [result, filter]);

    const filteredTasksForRender: TasksType[] = getFilteredTasksForRender(result, filter);
    return (
        <div className="App">
            <Todolist title={title} tasks={filteredTasksForRender} removeTask={removeTask} changeFilter={changeFilter} />

            <Todolist tasks={filteredTasksForRender} removeTask={removeTask} changeFilter={changeFilter} />
        </div>
    );
}

export default App;
