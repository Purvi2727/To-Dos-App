import React, { Component } from 'react';
import ListContainer from '../ListContainer/ListContainer';
import FilterContainer from '../FilterContainer/FilterContainer';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
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
                            { threadId: 10060101, id: 1006010101, title: "1: New Guest post on brand blogs", completed: false, todos: [] },
                            { threadId: 10060101, id: 1006010102, title: "2: New Guest post on brand blogs", completed: false, todos: [] }
                        ]
                    }
                ]
            }
        ],
        storeNewTodos: null,
        filterType: "all",
        filteredState: null
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

    fnFilterEachItem = (array) => {
        var i = array.length;

        while (i--) {
            let checkEachItem = { ...array[i] };
            if (checkEachItem.completed) {
                array.splice(i, 1);
                continue;
            }
            array[i].todos && this.fnFilterEachItem(array[i].todos);
        }
        return array[0];
    }

    fnMarkCompleteItem = (array, ids, value) => {
        var i = array.length;
        while (i--) {
            if (ids.indexOf(array[i].id) !== -1) {
                array[i].completed = value;
                continue;
            }
            array[i].todos && this.fnMarkCompleteItem(array[i].todos, [parseInt(ids)], value);
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
        let updatedList = [this.state];
        let newId = parseInt(_id);
        updatedList = this.fnMarkCompleteItem(updatedList, [newId], event.target.checked);
        let newList = { ...updatedList };
        this.setState({
            ...this.state,
            todos: newList.todos
        })
    }

    fnMarkCompleteAll = (array, value) => {
        var i = array.length;
        while (i--) {
            array[i].completed = value;
            array[i].todos && this.fnMarkCompleteAll(array[i].todos, value);
        }
        return array[0];
    }

    completeAll = (event) => {
        let updatedList = [this.state];
        updatedList = this.fnMarkCompleteAll(updatedList, event.target.checked);
        let newList = { ...updatedList };
        this.setState({
            ...this.state,
            todos: newList.todos
        })
    }

    filterCompleted = (todoList) => {
        const newFilteredTodoList = [];
        const internalTodoLooper = (list) => {
            list.map((todo) => {
                if (todo.completed) {
                    newFilteredTodoList.push(todo);
                }
                return internalTodoLooper(todo.todos);
            });
        }

        internalTodoLooper(todoList);

        return newFilteredTodoList;
    }


    setFilter = (_filterType) => {
        let filteredList = null;
        switch (_filterType) {
            case "all":
                filteredList = this.state.todos;
                break;
            case "active":
                let updatedList = [this.state];
                updatedList = this.fnFilterEachItem(updatedList);
                if (updatedList !== undefined) {
                    filteredList = updatedList.todos;
                } else {
                    filteredList = []
                }

                break;
            case "completed":
                //console.log(this.filterCompleted([this.state.todos]));
                filteredList = [...this.state.todos];
                break;
            default:
                filteredList = [...this.state.todos];
                break;
        }


        this.setState({
            ...this.state,
            filterType: _filterType,
            filteredState: filteredList
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

        let filterState = { ...this.state, todos: this.state.todos }

        if (this.state.filterType !== "all") {
            filterState = { ...this.state, todos: this.state.filteredState };
        }

        return (
            <div>
                <h1>Todos</h1>
                <div className="inputContainer">

                    <Input type="checkbox" changeHandler={this.completeAll} id="completeAll" />

                    <Input
                        type="text"
                        placeholdertext="What needs to be done? (Press Enter to add)"
                        changeHandler={this.changeHandler}
                        addTodos={this.addTodos} />
                </div>

                {filterState === undefined ? null :
                    <ListContainer
                        filterState={filterState}
                        markCompleteHandler={this.markCompleteHandler}
                        deleteListItem={this.deleteListItem}
                        addListItem={this.addListItem} />
                }

                <FilterContainer count={count} setFilter={this.setFilter} clearAllCompleted={this.clearCompleted} />
            </div >
        );
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(ToDosContainer);