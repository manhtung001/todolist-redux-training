import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/index';


class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false
        };
    };

    componentDidMount() {          // trường hợp ấn vào sửa
        if (this.props.itemEditing && this.props.itemEditing.id !== null){                       // nếu cái task tồn tại, trông TH khi ấn vào thêm công việc thì : task === null
            this.setState({
                id : this.props.itemEditing.id,
                name : this.props.itemEditing.name,
                status : this.props.itemEditing.status
            });
        } else {
            this.onClear();
        }
    }

    componentWillReceiveProps(nextProps) {     
        if (nextProps && nextProps.itemEditing){                      
            this.setState({
                id : nextProps.itemEditing.id,
                name : nextProps.itemEditing.name,
                status : nextProps.itemEditing.status
            });
        } else {
            this.onClear();
        }
    }

    onClear = () => {
        this.setState({
            name : '',
            status : false
        });
    };

    onHandleChange = (event) => {
        var name  = event.target.name;
        var value = event.target.value;

        if (name === 'status') {
            value = event.target.value === 'true' ? true : false
        }

        this.setState({
            [name] : value
        });
    };

    onSave = (event) => {
        event.preventDefault();						
        this.props.onSaveTask(this.state);
        this.onClear();
        this.props.onCloseForm();
    }

    onCloseForm = () => {
        this.props.onCloseForm();
    }

    render() {
        if (!this.props.isDisplayForm) return null; 
        return (
            <div className="panel panel-warning">

                <div className="panel-heading">
                    <h3 className="panel-title">{this.state.id === '' ? 'Thêm công việc' : 'Sửa công việc'}</h3>
                    <br/>
                    <button type="button" className="btn btn-danger" onClick={this.onCloseForm}>Hủy</button>
                </div>

                <div className="panel-body">

                    <form onSubmit={this.onSave}>

                        <div className="form-group">
                            <label>Tên :</label>
                            <input 
                            type="text" 
                            className="form-control"
                            name = "name"
                            value = {this.state.name}
                            onChange = {this.onHandleChange}
                            />
                        </div>

                        <label>Trạng Thái :</label>

                        <select 
                        className="form-control"
                        required="required"
                        name = 'status'
                        value = {this.state.status}
                        onChange = {this.onHandleChange}
                        >
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select>

                        <br/>

                        <div className="text-center">
                            <button 
                            type="submit" 
                            className="btn btn-warning"
                            >
                            {this.state.id === '' ? 'Thêm' : 'Sửa'}
                            </button>&nbsp;
                            <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick={this.onClear}
                            >Xóa
                            </button>
                        </div>

                    </form>

                </div>
            </div>
        );

    }
}

var mapStateToProps = (state) => {
    return {
        isDisplayForm : state.isDisplayForm,
        itemEditing : state.itemEditing
    }
}

var mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask : (task) => {
            dispatch(actions.saveTask(task))
        }, 
        onCloseForm : () => {
            dispatch(actions.closeForm())
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);

