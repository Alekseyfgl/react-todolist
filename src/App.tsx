import React, { useState } from 'react';
import './App.css';
import { FullInput } from './components/FullInput';
import { Button } from './components/Button';
import { Input } from './components/Input';

type AppStateTypes = {
    message: string;
};

function App(): JSX.Element {
    let [message, setMessage] = useState<AppStateTypes[]>([{ message: 'msg1' }, { message: 'msg2' }, { message: 'msg3' }]);
    const [title, setTitle] = useState<string>('');

    const addMessage = (inputValue: string) => {
        const newElem = {
            message: inputValue,
        };
        const newMessages: AppStateTypes[] = [newElem, ...message];
        setMessage(newMessages);
    };

    const callBackBtnHandler = () => {
        addMessage(title);
        setTitle('');
    };

    return (
        <div className="App">
            {/*<FullInput addMessage={addMessage} />*/}
            <Input title={title} setTitle={setTitle} />
            <Button name={'+++'} callback={callBackBtnHandler} />
            <div>
                {message.map((m: AppStateTypes, i: number): JSX.Element => {
                    return <div key={i}>{m.message}</div>;
                })}
            </div>
        </div>
    );
}

export default App;
