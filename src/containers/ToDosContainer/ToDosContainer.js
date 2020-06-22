import React, { Component } from 'react';
import ListContainer from '../ListContainer/ListContainer';
import FilterContainer from '../FilterContainer/FilterContainer';
import Input from '../../components/UI/Input/Input';
// import { connect } from 'react-redux';
// import * as todosActions from '../../store/actions/todosActions';

import './ToDosContainer.css';

class ToDosContainer extends Component {
    state = {
        todos: [
            {
                id: 1001,
                title: "Quarterly Newsletter",
                completed: false,
                todos: [
                    { threadId: 1001, id: 100101, title: "New Guest post on brand blogs - 1", completed: false, todos: [] },
                    { threadId: 1001, id: 100102, title: "New Guest post on brand blogs - 2", completed: false, todos: [] }
                ]
            },
            {
                id: 1002,
                title: "Recruiting blog post",
                completed: false,
                todos: []
            },
            {
                id: 1003,
                title: "Mobile app launch",
                completed: false,
                todos: []
            },
            {
                id: 1004,
                title: "Interview with John",
                completed: false,
                todos: []
            },
            {
                id: 1005,
                title: "Submit updates to mobile screenshots",
                completed: false,
                todos: []
            },
            {
                id: 1006,
                title: "Quarterly goals",
                completed: false,
                todos: [
                    { threadId: 1006, id: 100601, title: "Guest post on brand blogs", completed: false, todos: [] },
                    { threadId: 1006, id: 100602, title: "Mobile app updates", completed: false, todos: [] },
                    {
                        threadId: 100602,
                        id: 10060101,
                        title: "Volunteer features",
                        completed: false,
                        todos: [
                            { threadId: 10060101, id: 1006010101, title: "click 1 New Guest post on brand blogs", completed: false, todos: [] },
                            { threadId: 10060101, id: 1006010102, title: "click 2 New Guest post on brand blogs", completed: false, todos: [] }
                        ]
                    }
                ]
            }
        ],
        storeNewTodos: null,
        filterType: "all"
    }

    componentDidMount() {
        console.log("[TodosContainer.js] componentDidMount");
        console.log(this.props.todos);
    }

    addTodos = (event) => {
        //storeNewTodos
        let newToDosList = { id: Date.now(), threadId: Date.now(), title: event.target.value, completed: false, todos: [] };

        this.setState({
            ...this.state,
            storeNewTodos: newToDosList
        })
    }

    changeHandler = (event, _id) => {
        let updatedList = [...this.state.todos];
        let newToDosList = this.state.storeNewTodos;
        if (event.key === "Enter") {
            updatedList.push(newToDosList);
            event.target.value = "";
        }
        this.setState({
            ...this.state,
            todos: updatedList
        })
    }

    fnIterate = (state = this.state, _id, _value, _action) => {
        const updatedList = state;
        let newObj = {};


        for (const key in state) {
            if (key === "todos" && updatedList.todos.length !== 0) {
                let newArr = updatedList.todos;
                for (let i = 0; i < updatedList.todos.length; i++) {
                    let item = updatedList.todos[i];
                    if (item.id === parseInt(_id)) {
                        item.completed = _value;
                    }
                    this.fnIterate(state.todos[i], _id, _value, _action);
                }
                newObj[key] = [...newArr];
            } else {
                newObj = { ...updatedList };
            }
        }

        this.setState({
            ...this.state,
            todos: newObj.todos
        })
    }

    fnIterateDelete = (array, ids) => {
        var i = array.length;
        while (i--) {
            if (ids.indexOf(array[i].id) !== -1) {
                array.splice(i, 1);
                continue;
            }
            array[i].todos && this.fnIterateDelete(array[i].todos, ids);
        }

        return array[0];
    }

    deleteListItem = (_id) => {

        let updatedList = [this.state];
        updatedList = this.fnIterateDelete(updatedList, [_id]);
        let newList = { ...updatedList };
        this.setState({
            ...this.state,
            todos: newList.todos
        })
    }

    fnAddListItem = (array, ids) => {
        var i = array.length;
        while (i--) {

            if (ids.indexOf(array[i].id) !== -1) {
                let newStr = { threadId: i, id: Date.now(), title: "{{ Temporary Dummy data }}", completed: false, todos: [] }
                array[i].todos.push(newStr);
                continue;
            }
            array[i].todos && this.fnAddListItem(array[i].todos, ids);
        }
        return array[0];
    }

    addListItem = (_id) => {
        let updatedList = [this.state];
        updatedList = this.fnAddListItem(updatedList, [_id]);
        let newList = { ...updatedList };
        this.setState({
            ...this.state,
            todos: newList.todos
        })
    }

    markCompleteHandler = (event, _id) => {
        this.fnIterate(this.state, _id, event.target.checked, "markComplete");
    }

    completeAll = (event) => {
        let updatedList = [...this.state.todos];
        updatedList.forEach(item => {
            item.completed = event.target.checked;
        })
        this.setState({
            ...this.state,
            todos: updatedList
        })
    }

    setFilter = (_filterType) => {
        this.setState({
            ...this.state,
            filterType: _filterType
        })
    }

    clearCompleted = () => {
        const updatedList = [...this.state.todos];
        const newList = updatedList.filter(item => {
            return !item.completed;
        })

        this.setState({
            ...this.state,
            todos: newList
        })
    }



    render() {
        let count = 0;
        count = this.state.todos.filter(item => {
            return !item.completed;
        }).length;

        let filteredList = this.state.todos;
        switch (this.state.filterType) {
            case "all":
                filteredList = [...this.state.todos];
                break;
            case "active":
                filteredList = filteredList.filter(item => {
                    return !item.completed;
                })
                break;
            case "completed":
                filteredList = filteredList.filter(item => {
                    return item.completed;
                })
                break;
            default:
                filteredList = [...this.state.todos];
                break;
        }

        const filterState = { ...this.state, todos: filteredList };

        return (
            <div>
                <h1>Todos</h1>
                <div className="inputContainer">
                    <Input
                        type="checkbox"
                        changeHandler={this.completeAll} />

                    <Input
                        type="text"
                        placeholdertext="What needs to be done? (Press Enter to add)"
                        changeHandler={this.changeHandler}
                        addTodos={this.addTodos} />
                </div>


                <ListContainer
                    filterState={filterState}
                    markCompleteHandler={this.markCompleteHandler}
                    deleteListItem={this.deleteListItem}
                    addListItem={this.addListItem} />

                <FilterContainer count={count} setFilter={this.setFilter} clearAllCompleted={this.clearCompleted} />
            </div >
        );
    }
}

export default ToDosContainer;