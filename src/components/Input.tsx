import React, { ChangeEvent } from 'react';
import { Simulate } from 'react-dom/test-utils';
import input = Simulate.input;

type InputPropsType = {
    title: string;
    setTitle: (inputValue: string) => void;
};

export const Input = (props: InputPropsType) => {
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.setTitle(e.currentTarget.value);
    };
    return (
        <div>
            <input value={props.title} onChange={onChangeInputHandler} type="text" />
        </div>
    );
};
