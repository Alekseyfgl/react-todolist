import React, {ChangeEvent, FC, useState} from 'react';
import {Simulate} from 'react-dom/test-utils';
import input = Simulate.input;

type EditableSpanPropsType = {
    title: string;
    changeTitle: (title: string) => void;
};


export const EditableSpan: FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [title, setTitle] = useState<string>(props.title);
    const onEditMode = () => setEditMode(true);
    const offEditMode = () => {
        props.changeTitle(title)
        setEditMode(false);
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <input type="text"
                 value={title}
                 autoFocus
                 onBlur={offEditMode}
                 onChange={onChangeHandler}/>
        : <span onDoubleClick={onEditMode}>
            {title}
        </span>;
};
