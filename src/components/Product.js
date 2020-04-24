import React, { Component } from 'react';
import TaskForm from './TaskForm';
import TaskControl from './TaskControl';
import TaskList from './TaskList';
import './Product.css'
// import _ from 'lodash'  // import nguyên cả thư viện . SD: _.filter(array, f)
// import { filter } from 'lodash' // import mỗi filter, đỡ tốn mã nguồn . SD: filter.(array, f)
import { connect } from 'react-redux';
import * as actions from './actions/index';

class Product extends Component {

    toggleForm = () => {
        var { itemEditing } = this.props
        if (itemEditing && itemEditing.id !== '' ) {            // đang sửa ấn thêm
            this.props.onOpenForm();
        } else {                                            // TH thêm bthg
            this.props.onToggleForm();
        }
        this.props.onClearTask({
            id : '',
            name : '',
            status : false
        })
    };

    render() {
        var { isDisplayForm } = this.props;       
        return (
            <div className="container">
                
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1>
                    <hr/>
                </div>
                <div className="row">
            
                    <div className={isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>    
                    <TaskForm />
                    </div>

                    <div className={isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}> 
                        <button 
                        type="button" 
                        className="btn btn-primary"
                        onClick = {this.toggleForm} //   Khi Click vào thì đổi trạng thái of Form 
                        >
                            Thêm Công Việc
                        </button>
                        
                        <TaskControl />

                        <div className="row mt-15">
                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">    
                                < TaskList />      
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onToggleForm : () => {
            dispatch(actions.toggleForm())
        },
        onClearTask : (task) => {
            dispatch(actions.editTask(task))
        },
        onOpenForm : () => {
            dispatch(actions.openForm())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);

