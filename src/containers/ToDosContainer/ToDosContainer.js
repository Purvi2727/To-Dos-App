import React, { Component } from 'react';
import ListContainer from '../ListContainer/ListContainer';
import FilterComponents from '../../components/FilterComponents/FilterComponents';
import Input from '../../components/UI/Input/Input';

class ToDosContainer extends Component {
    state = {
        todos: [
            { id: "abci", title: "Quarterly Newsletter", completed: false, subList: [] },
            { id: "sfsi", title: "Recruiting blog post", completed: false },
            { id: "sf3s", title: "Mobile app launch", completed: false },
            { id: "645d", title: "Interview with John", completed: false },
            { id: "hrr4", title: "Submit updates to mobile screenshots", completed: false },
            {
                id: "39hf", title: "Quarterly goals", completed: false,
                subList: [
                    { id: "32j3", title: "Guest post on brand blogs", completed: false },
                    { id: "3293", title: "Mobile app updates", completed: false },
                    { id: "3d03", title: "Volunteer features", completed: false }
                ]
            }
        ]
    }

    changeHandler = (event, _id) => {


    }

    markCompleteHandler = (event, _id) => {
        let updatedList = [...this.state.todos];
        updatedList.forEach(item => {
            if (item.id === _id) {
                if (event.target.type === "checkbox") {
                    item.completed = event.target.checked;
                }
            }
        })
        this.setState({
            todos: updatedList
        })
    }

    completeAll = () => {
        console.log("[completeAll]");
    }
    render() {
        return (
            <div>
                <h1>Todos</h1>
                <Input type="checkbox" changeHandler={this.completeAll} />
                <Input type="text" placeholdertext="What needs to be done?" changeHandler={this.changeHandler} />
                <ListContainer todosList={this.state.todos} markCompleteHandler={this.markCompleteHandler} />
                <FilterComponents todosList={this.state.todos} />
            </div >
        );
    }
}

export default ToDosContainer;