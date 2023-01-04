import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active'

function App() {
    // const tasks1 = [
    //     {id: 1, title: "HTML&CSS", isDone: true},
    //     {id: 2, title: "JS", isDone: true},
    //     {id: 3, title: "ReactJS", isDone: false}
    // ]
    const initTasks = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false},
        {id: 4, title: "Yo", isDone: true}
    ]

    const title: string = 'First Todolist'

    const [tasks, setTasks] = useState<TasksType[]>(initTasks);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    let tasksTodoList: TasksType[] = tasks

    if (filter === 'completed') {
        tasksTodoList = tasks.filter(t => t.isDone)
    }
    if (filter === 'active') {
        tasksTodoList = tasks.filter(t => !t.isDone)
    }


    function removeTask(id: number) {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist title={title} tasks={tasksTodoList}
                      changeFilter={changeFilter}/>

            <Todolist title={title}
                      tasks={tasksTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
