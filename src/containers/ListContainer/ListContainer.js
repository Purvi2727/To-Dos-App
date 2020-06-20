import React from 'react';
import Input from '../../components/UI/Input/Input';
import './ListContainer.css';

const listContainer = (props) => {
    let buildStructure = ``;

    function fnIterate(state) {
        for (const key in state) {
            if (key === "todos" && state.todos.length !== 0) {
                buildStructure += `<ul>`;
                state.todos.forEach((item, index) => {
                    //this works
                    let newStr = `<li key=${item.id}>${item.title} <button onClick="fnAdd(${item.id})">Add</button></li>`;
                    // const newId = Date.now() + 1;
                    // console.log(item.completed);

                    //structure not working
                    // let newStr = (`<li key=${item.id}><input type="checkbox" defaultChecked=${item.completed ? "true" : "false"}/><span>${item.title}</span></li>`);

                    // let inputComponent = (<Input type="checkbox" changeHandler={(event) => props.markCompleteHandler(event, item.id)} checked={item.completed} />);

                    // console.log(`${inputComponent}`);
                    buildStructure += newStr;
                    fnIterate(state.todos[index]);

                })
                buildStructure += `</ul>`;
            }
        }
    }
    fnIterate(props.filterState);
    console.log(buildStructure);


    const listItems = props.filterState.todos.map((item) => {
        let classes = [];
        if (item.completed) {
            classes.push("checked listItem");
        } else {
            classes.push("listItem");
        }
        return (
            <ul key={item.id}>
                <li className={classes.join(" ")} >
                    <Input type="checkbox" changeHandler={(event) => props.markCompleteHandler(event, item.id)} checked={item.completed} />
                    <span>{item.title}</span>
                    <div className="closeIcon" onClick={() => props.deleteListItem(item.id)}>X</div>
                </li>
            </ul>
        )
    });
    return (
        <div className="listContainerDiv" >
            {listItems}
            <div dangerouslySetInnerHTML={{ __html: buildStructure }} />
        </div >
    )
}

export default listContainer;