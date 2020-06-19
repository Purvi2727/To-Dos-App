import React from 'react';

const Input = (props) => {
    switch (props.type) {
        case "text":
            return <input type="text" placeholder={props.placeholdertext} onChange={props.changeHandler} />;
        case "checkbox":
            return <input type={props.type} onChange={props.changeHandler} />;
        default:
            return null;
    }
}

export default Input;