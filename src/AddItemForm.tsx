import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Button, IconButton, TextField} from '@mui/material';
import {ControlPoint, DeleteForever} from '@mui/icons-material';

type AddItemFormPropsType = {
    addItem: (title: string) => void;
};

export const AddItemForm: FC<AddItemFormPropsType> = (props) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    // const errorMessage: false | JSX.Element = error && <p>Title isn't correct</p>;
    // const inputStyle: string = error ? 'error-input' : '';

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
            <TextField value={title}
                       onChange={onChangeSetTitle}
                       onKeyDown={onKeyDownHandler}
                       error={error}
                       helperText={error && 'Title isn\'t correct'}
                       label="Enter title"
                       variant="outlined"
                       size={'small'}
                       sx={{mr: 1}}
            />
            <Button onClick={onClickAddItemHandler}
                    variant={'contained'}
                    color={'primary'}
                    size={'small'}
                    disableElevation
                    endIcon={<ControlPoint/>}
            >add</Button>
        </div>
    );
};
