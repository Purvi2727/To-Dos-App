import React from 'react';
import Input from '../../components/UI/Input/Input';

const InputContainer = (props) => {
    return (
        <div>
            <Input type="checkbox" changeHandler={props.completeAll} />
            <Input
                type="text"
                placeholdertext="What needs to be done?"
                changeHandler={props.changeHandler}
                addTodos={(event) => props.addTodos(event)} />
        </div>
    )
}

export default InputContainer;