import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import './FilterContainer.css';

class FilterContainer extends Component {
    render() {
        return (
            <div className="filterContainer">
                <div>{this.props.count > 1 ? "Items" : "Item"} left: <span className="badge badge-info">{this.props.count}</span></div>
                <Button type="primary" click={() => this.props.setFilter("all")}>All</Button>
                <Button type="primary" click={() => this.props.setFilter("active")}>Active</Button>
                <Button type="primary" click={() => this.props.setFilter("completed")}>Completed</Button>
                <Button type="primary" click={() => this.props.clearAllCompleted()}>Clear Completed</Button>
            </div>
        )
    }

}

export default FilterContainer;