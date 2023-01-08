import React from "react";
import {Banknotes, MoneyState} from "../App";

type NewComponentProps = {
    currentMoney: MoneyState[]
    onClickFilterHandler: (banknote: Banknotes) => void
    filter: Banknotes
}

export const NewComponent = (props: NewComponentProps) => {
    console.log(props.filter)
    return (
        <>
            <ul>
                {props.currentMoney.map((m: MoneyState, i: number) => {
                    return (
                        <li key={i}>
                            <span>{m.banknots}</span>
                            <span>{m.value}</span>
                            <span>{m.number}</span>
                        </li>
                    )
                })}
            </ul>


            <h1>{props.filter}</h1>
            <button onClick={() => props.onClickFilterHandler('all')}>all</button>
            <button onClick={() => props.onClickFilterHandler('RUBLS')}>ruble</button>
            <button onClick={() => props.onClickFilterHandler('Dollars')}>dollar</button>
        </>
    );
}