import React from 'react';
import Input from '../../components/UI/Input/Input';
import './ListContainer.css';

const listContainer = (props) => {
    return (
        <div className="listContainerDiv">
            <ul>
                {props.todosList.map((item) => {
                    return <li key={item.id}><Input type="checkbox" markCompleteHandler={(event) => props.changeHandler(event, item.id)} /><span>{item.title}</span></li>
                })}
            </ul>
        </div>
    )
}

export default listContainer;