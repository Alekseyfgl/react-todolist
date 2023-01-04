import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";


function App() {
    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]
    let initTasks = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false},
        {id: 4, title: "Yo", isDone: false}
    ]

    // let arr = useState(initTasks)
    // let tasks = arr[0]
    // let setTask = arr[1];
    const [tasks, setTasks] = useState(initTasks);

    const title: string = 'First Todolist'

    function removeTask(id: number) {
        console.log(id)
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    return (
        <div className="App">
            <Todolist title={title} tasks={tasks1}/>

            <Todolist title={title}
                      tasks={tasks}
                      removeTask={removeTask}/>
        </div>
    );
}

export default App;
