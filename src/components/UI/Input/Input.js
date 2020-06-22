import React from 'react';
import './Input.css';

const Input = (props) => {

    switch (props.type) {
        case "text":
            return <input type="text" placeholder={props.placeholdertext} onKeyUp={props.changeHandler} onChange={props.addTodos} />;
        case "checkbox":
            return (<div className="round"><input type={props.type} onChange={props.changeHandler} checked={props.checked} id={props.id} /><label htmlFor={props.id}></label></div>);
        default:
            return null;
    }
}

export default Input;