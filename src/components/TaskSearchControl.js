import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/index';


class TaskSearchControl extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword : ''
        };
    }

    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name] : value
        });
    }

    onSearch = () => {
        this.props.searchTask(this.state.keyword.toLocaleLowerCase());
    }

    render() {
        
        return (
            
            <div className="input-group">
                <input 
                type="text" 
                className="form-control" 
                placeholder="Nhập từ khóa..." 
                name='keyword'
                value= {this.state.keyword}
                onChange={this.onChange}
                />
                <span className="input-group-btn">
                            <button 
                            className="btn btn-primary" 
                            type="button"
                            onClick={this.onSearch}
                            >
                                <span className="fa fa-search mr-5"></span>Tìm
                </button>
                </span>
            </div>

        );

    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        searchTask : (keyword) => {
            dispatch(actions.searchTask(keyword))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskSearchControl);

