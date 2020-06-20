import React from 'react';
import './Input.css';

const Input = (props) => {

    switch (props.type) {
        case "text":
            return <input type="text" placeholder={props.placeholdertext} onKeyUp={props.changeHandler} onChange={props.submitMessage} />;
        case "checkbox":
            const newId = Date.now() + 1;
            return (<div className="round"><input type={props.type} onChange={props.changeHandler} checked={props.checked} id={newId} /><label htmlFor={newId}></label></div>);
        default:
            return null;
    }
}

export default Input;