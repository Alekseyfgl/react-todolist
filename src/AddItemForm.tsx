import React, { ChangeEvent, FC, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void;
};

export const AddItemForm: FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const errorMessage: false | JSX.Element = error && <p>Title isn't correct</p>;
    const inputStyle: string = error ? 'error-input' : '';

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && props.addItem(e.currentTarget.value);

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false);
        setTitle(e.currentTarget.value);
    };

    const onClickAddItemHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title);
        } else {
            setError(true);
        }
        setTitle('');
    };

    return (
        <div className={'addItemForm'}>
            <input className={inputStyle} value={title} onChange={onChangeSetTitle} onKeyDown={onKeyDownHandler} />
            {errorMessage}
            <button onClick={onClickAddItemHandler}>+</button>
        </div>
    );
};
