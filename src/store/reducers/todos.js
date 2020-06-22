import * as actionTypes from '../actions/actionTypes';

const initialState = {
    todos: [{
        id: 1001,
        title: "Quarterly Newsletter",
        completed: false,
        todos: [{
            threadId: 1001,
            id: 100101,
            title: "New Guest post on brand blogs - 1",
            completed: false,
            todos: []
        },
        {
            threadId: 1001,
            id: 100102,
            title: "New Guest post on brand blogs - 2",
            completed: false,
            todos: []
        }
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
        todos: [{
            threadId: 1006,
            id: 100601,
            title: "Guest post on brand blogs",
            completed: false,
            todos: []
        },
        {
            threadId: 1006,
            id: 100602,
            title: "Mobile app updates",
            completed: false,
            todos: []
        },
        {
            threadId: 100602,
            id: 10060101,
            title: "Volunteer features",
            completed: false,
            todos: [{
                threadId: 10060101,
                id: 1006010101,
                title: "click 1 New Guest post on brand blogs",
                completed: false,
                todos: []
            },
            {
                threadId: 10060101,
                id: 1006010102,
                title: "click 2 New Guest post on brand blogs",
                completed: false,
                todos: []
            }
            ]
        }
        ]
    }
    ]
}

/*const fnAddListItem = (array, ids) => {
    console.log(array);
    var i = array.length;
    while (i--) {
        if (ids.indexOf(array[i].id) !== -1) {
            let newStr = { threadId: i, id: Date.now(), title: "{{ Temporary Dummy data }}", completed: false, todos: [] }
            array[i].todos.push(newStr);
            continue;
        }
        array[i].todos && fnAddListItem(array[i].todos, ids);
    }
    return array[0];
}*/

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TODO:
            // let updatedList = [state];
            //updatedList = fnAddListItem(updatedList, [action.id]);
            //let newList = { ...updatedList };            
            break;
        // return {
        //     ...state,
        //     todos: newList.todos
        // }

        default:
            return {
                ...state
            }
    }
}

export default reducer;