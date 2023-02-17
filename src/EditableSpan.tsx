import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Simulate} from 'react-dom/test-utils';
import input = Simulate.input;
import {TextField} from '@mui/material';

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
    const onKeyDownHandler = (e: KeyboardEvent<HTMLDivElement>) => {
        e.key === 'Enter' && offEditMode()
    }
    return editMode
        ? <TextField value={title}
                     onBlur={offEditMode}
                     onChange={onChangeHandler}
                     variant="standard"
                     autoFocus
                     onKeyDown={onKeyDownHandler}
        />
        :
        <span onDoubleClick={onEditMode}>
            {title}
        </span>;
};
