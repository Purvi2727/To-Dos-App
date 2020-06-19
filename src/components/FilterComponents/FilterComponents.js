import React, { Component } from 'react';
import Button from '../UI/Button/Button';
import './FilterComponents.css';

class FilterComponents extends Component {
    state = {
        todosList: null
    }

    componentDidMount() {
        this.setState({
            todosList: this.props.todosList
        })
    }

    allFilterHandler = () => {
        console.log("allFilterHandler");
    }

    activeFilterHandler = () => {
        console.log("activeFilterHandler");
    }

    completedFilterHandler = () => {
        console.log("completedFilterHandler");
    }

    clearAll = () => {
        console.log("clearAll");
    }
    render() {
        return (
            <div className="filterContainer">
                <div>Items left: <span className="badge badge-info">4</span></div>
                <Button type="primary" onClick={this.allFilterHandler}>All</Button>
                <Button type="primary" onClick={this.activeFilterHandler}>Active</Button>
                <Button type="primary" onClick={this.completedFilterHandler}>Completed</Button>
                <Button type="primary" onClick={this.clearAll}>Clear Completed</Button>
            </div>
        )
    }
}

export default FilterComponents;