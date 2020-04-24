import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/index';


class TaskSortControl extends Component {

    onClick = (sortBy, sortValue) => {
        var sort = {
            by : sortBy,
            value : parseInt(sortValue)
        }
        this.props.sortTask(sort);
    };

    render() {
        
        return (
      
            <div className="dropdown">
                <button 
                className="btn btn-primary dropdown-toggle" 
                type="button" id="dropdownMenu1" 
                data-toggle="dropdown" 
                aria-haspopup="true"
                aria-expanded="true">
                    Sắp Xếp <span className="ml-5"></span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                    
                    <li 
                    className={this.props.sort.by === 'name' && this.props.sort.value === 1 ? 'sort_selected' : ''}
                    onClick={ () => this.onClick('name', 1)}
                    >
                        <button type="button">
                                    <span>
                                        Tên A-Z
                                    </span>
                                </button>
                    </li>

                    <li 
                    className={this.props.sort.by === 'name' && this.props.sort.value === -1 ? 'sort_selected' : ''}
                    onClick={ () => this.onClick('name', -1)}
                    >
                        <button type="button">
                                    <span className="fa fa-sort-alpha-desc pr-5">
                                        Tên Z-A
                                    </span>
                                </button>
                    </li>

                    <li role="separator" className="divider"></li>

                    <li
                    className={this.props.sort.by === 'status' && this.props.sort.value === 1 ? 'sort_selected' : ''}
                    onClick={ () => this.onClick('status', 1)}
                    ><button type="button">Trạng Thái Kích Hoạt</button></li>

                    <li
                    className={this.props.sort.by === 'status' && this.props.sort.value === -1 ? 'sort_selected' : ''}
                    onClick={ () => this.onClick('status', -1)}
                    ><button type="button">Trạng Thái Ẩn</button></li>
                </ul>
            </div>
                
            
        );

    }
}

const mapStateToProps = (state) => {
    return {
        sort : state.sortTask
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        sortTask : (sort) => {
            dispatch(actions.sortTask(sort))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskSortControl);


