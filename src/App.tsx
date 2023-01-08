import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {NewComponent} from "./components/NewComponent";

export type Banknotes = 'Dollars' | 'RUBLS' | 'all';

export type MoneyState = {
    banknots: Banknotes;
    value: number;
    number: string;
}

function App() {
    const [money, setMoney] = useState<MoneyState[]>([
        {banknots: 'Dollars', value: 100, number: ' a1234567890'},
        {banknots: 'Dollars', value: 50, number: ' z1234567890'},
        {banknots: 'RUBLS', value: 100, number: ' w1234567890'},
        {banknots: 'Dollars', value: 100, number: ' e1234567890'},
        {banknots: 'Dollars', value: 50, number: ' c1234567890'},
        {banknots: 'RUBLS', value: 100, number: ' r1234567890'},
        {banknots: 'Dollars', value: 50, number: ' x1234567890'},
        {banknots: 'RUBLS', value: 50, number: ' v1234567890'},
    ])

    const [filter, setFilter] = useState<Banknotes>('all')

    let currentMoney = money

    if (filter === 'Dollars') {
        currentMoney = money.filter(m => m.banknots === 'Dollars')
    }
    if (filter === 'RUBLS') {
        currentMoney = money.filter(m => m.banknots === 'RUBLS')
    }

    const onClickFilterHandler = (banknote: Banknotes) => {
        setFilter(banknote)
    }

    return (
        <NewComponent currentMoney={currentMoney}
                      filter={filter}
                      onClickFilterHandler={onClickFilterHandler}
        />
    );
}

export default App;
