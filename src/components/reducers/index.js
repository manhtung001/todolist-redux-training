import { combineReducers } from 'redux';
import tasks from './tasks';
import isDisplayForm from './isDisplayForm';
import itemEditing from './itemEditing';
import filterTable from './filterTable';
import searchTask from './searchTask';
import sortTask from './sortTask';


const myReducer = combineReducers({
    tasks : tasks,
    isDisplayForm : isDisplayForm,
    itemEditing : itemEditing,
    filterTable : filterTable,
    searchTask : searchTask,
    sortTask : sortTask
});

export default myReducer
