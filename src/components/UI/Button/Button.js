import React from 'react';
import './Button.css';

const Button = (props) => {
    return (
        <button type={props.type} className={props.type} onClick={props.click}>{props.children}</button>
    )
}

export default Button;