import * as actionTypes from './actionTypes';

export const addTodo = (id) => {
    return {
        type: actionTypes.ADD_TODO,
        id: id
    }
}