type ButtonPropsType = {
    name: string;
    callback: () => void;
};

export const Button = (props: ButtonPropsType) => {
    const onClickBtnHandler = () => {
        console.log('aaaa');
        props.callback();
    };
    return (
        <div>
            <button onClick={onClickBtnHandler}>{props.name}</button>
        </div>
    );
};
