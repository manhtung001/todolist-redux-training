import * as types from './../constants/index';


var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var onSetID = () => {
    return s4() + s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4();
}

var findIndex = (tasks, id) => {
    var index2  = -1;
    tasks.forEach((task, index) => {             // lấy index
        if (task.id === id) {
            index2 = index;
            return index2
        }
    });
    return index2
};


var data = JSON.parse(localStorage.getItem('tasks'));

var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
    var index = -1;
    switch(action.type) {
        case types.LIST_ALL :
            return state

        case types.SAVE_TASK :
            var task = {
                id : action.task.id,
                name : action.task.name,
                status : action.task.status 
            }
            if (!task.id) {
                task.id = onSetID();
                state.push(task);
            } else {
                index = findIndex( state , task.id);
                state[index] = task;
            }
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state]
        
        case types.UPDATE_STATUS :
            index = findIndex( state , action.id);
            var cloneTask = {...state[index]};              // copy y nguyen state[index] bat buoc phai co {...state[index]}
            cloneTask.status = !cloneTask.status;
            state[index] = cloneTask;
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state]
        
        case types.DELETE_TASK :
            index = findIndex( state , action.id);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state]

        default: 
            return state
    }
}

export default myReducer