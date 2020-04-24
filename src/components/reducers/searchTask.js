import * as types from './../constants/index';

var initialState = '';

var myReducer = (state = initialState, action) => {
    switch(action.type) {
        case types.SEARCH_TASK :
            return action.keyword;
        default: return state
    }
}

export default myReducer