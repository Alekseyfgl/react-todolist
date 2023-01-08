import React, {MouseEvent} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {Button} from "./components/Button";




function App() {
    const btn1Foo = (user: string, age: number) => {
        console.log(user, age)
    };
    const btn2Foo = (user: string, age: number) => {
        console.log(user, age)
    };
    const btn3Foo = () => {
        console.log('without params')
    };

    return (
        <div className="App">
            <Button name={'btn-1'} callBack={() => btn1Foo('Alex', 21)}/>
            <Button name={'btn-2'} callBack={() => btn2Foo('Vasya', 22)}/>
            <Button name={'stupid button'} callBack={btn3Foo}/>
        </div>
    );
}

export default App;
