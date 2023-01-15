import React, { ChangeEvent, useState } from 'react';

type FullInputPropsType = {
    addMessage: (input: string) => void;
};

export const FullInput = (props: FullInputPropsType) => {
    const [input, setInput] = useState<string>('');

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value);
    };

    const onClickBtnHandler = () => {
        props.addMessage(input);
        setInput('');
    };
    return (
        <div>
            <input value={input} onChange={onChangeInputHandler} type="text" />
            <button onClick={onClickBtnHandler}>+</button>
        </div>
    );
};
