import React from 'react';
import Button from '../../components/UI/Button/Button';
import './FilterContainer.css';

const FilterContainer = (props) => {
    return (
        <div className="filterContainer">
            <div>{props.count > 1 ? "Items" : "Item"} left: <span className="badge badge-info">{props.count}</span></div>
            <Button type="primary" click={() => props.setFilter("all")}>All</Button>
            <Button type="primary" click={() => props.setFilter("active")}>Active</Button>
            <Button type="primary" click={() => props.setFilter("completed")}>Completed</Button>
            <Button type="primary" click={() => props.clearAllCompleted()}>Clear Completed</Button>
        </div>
    )
}

export default FilterContainer;