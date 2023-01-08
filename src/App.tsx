import React, {MouseEvent, useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {Button} from "./components/Button";



function App() {

    //обычно в useState не кладут большие массивы с объектами, т.к. это локальное состояние компоненты
    let [a, setA] = useState(1)

    const onClickHandle = () => {
        ++a;
        setA(a)
    }

    const onClickReset = () => {
        ++a;
        setA(a)
    }

    return (
        <div className="App">

            <h1>{a}</h1>
            <button onClick={onClickHandle}>--number--</button>
            <button onClick={onClickReset}>--reset count--</button>
        </div>
    );
}

export default App;
