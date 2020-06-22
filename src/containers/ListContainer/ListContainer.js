import React from 'react';
import Input from '../../components/UI/Input/Input';
import './ListContainer.css';

const listContainer = (props) => {
    const fnIterate = (filterState) => {
        for (const key in filterState) {
            if (key === "todos" && filterState.todos.length !== 0) {
                return (
                    <ul>
                        {
                            filterState.todos.map((item, index) => {
                                let classes = [];
                                if (item.completed) {
                                    classes.push("checked listItem");
                                } else {
                                    classes.push("listItem");
                                }
                                return (
                                    <React.Fragment key={item.id}>
                                        <li className={classes.join(" ")} data-id={item.id}>
                                            <Input type="checkbox" id={item.id} changeHandler={(event) => props.markCompleteHandler(event, event.target.id)} checked={item.completed} />
                                            <span>{item.title}</span>
                                            <div className="addIcon" onClick={() => props.addListItem(item.id)}>+</div>
                                            <div className="closeIcon" onClick={() => props.deleteListItem(item.id)}>X</div>
                                        </li>
                                        {fnIterate(filterState.todos[index])}
                                    </React.Fragment>
                                )
                            })
                        }
                    </ul>
                )

            }
        }
    }

    return (
        <div className="listContainerDiv" >
            {fnIterate(props.filterState)}
        </div >
    )
}

export default listContainer;