import React from 'react';
import './App.css';
import Product from './components/Product';

// store

import { createStore } from 'redux';
import myReducer from './components/reducers/index';
import { Provider } from 'react-redux'                // kết nối react - redux

const store = createStore(
  myReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );


function App() {
  
  return (
    // cung cấp store cho product
    <Provider store = {store}>         
         <Product />              
    </Provider>
  );
}

export default App;
