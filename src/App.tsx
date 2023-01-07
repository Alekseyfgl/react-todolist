import React, {MouseEvent} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {Button} from "./components/Button";


type  TasksType = {
    id: number
    title: string
    isDone: boolean
}

function App() {
    const tasks1 = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]
    const tasks2 = [
        {id: 1, title: "Hello world", isDone: true},
        {id: 2, title: "I am Happy", isDone: false},
        {id: 3, title: "Yo", isDone: false},
        {id: 4, title: "Yo", isDone: false}
    ]


    const title: string = 'First Todolist'

    function removeTask(id: number) {

        let result = tasks2.filter((t: TasksType) => id !== t.id)
        console.log(result)
    }

    const btn1Foo = (user: string,age: number) => {
        console.log(user, age)
    };
    const btn2Foo = (user: string, age: number) => {
        console.log(user, age)
    };

    return (
        <div className="App">
            {/*<Todolist title={title}*/}
            {/*          tasks={tasks1}/>*/}
            {/*<Todolist tasks={tasks2}*/}
            {/*          removeTask={removeTask}/>*/}

            <Button name={'btn-1'} callBack={()=>btn1Foo('Alex',21)}/>
            <Button name={'btn-2'} callBack={()=>btn2Foo('Vasya',22)}/>
        </div>
    );
}

export default App;
