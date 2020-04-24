import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
// import * as actions from './actions/index'

class TaskList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            filterName : '',
            filterStatus : -1
        }
    }

    onChange = (event) => {
        var name = event.target.name;
        var value = event.target.value;
        this.setState({
            [name] : value
        });
        // var filter = {
        //     name : name === 'filterName' ? value : this.state.filterName,          
        //     status : name === 'filterStatus' ? value : this.state.filterStatus
        // }
        // this.props.filterTable(filter);
    }


    render() {
        // var {tasks, filter} = this.props;   
        var { tasks, keyword, sort } = this.props;   
        var { filterName , filterStatus } = this.state;
        filterStatus = parseInt(filterStatus, 10);
        
         //          FILTER sửa dụng state
            // filter name

            if (filterName) 
                tasks = tasks.filter((task) => {
                            return task.name.toLowerCase().indexOf(filterName) !== -1
                        });
            
          
            // filter status    
            
            tasks = tasks.filter((task) => {
                        if (filterStatus === -1) {
                            return true
                        } else {
                            return task.status === ( filterStatus === 1 ? true : false )
                        }
                    });            
                   

        //          FILTER sử dụng redux
        // if (filter) {
        //     // filter name
        //     if (filter.name) {
        //         tasks = tasks.filter((task) => {
        //                     return task.name.toLowerCase().indexOf(filter.name) !== -1
        //                 });
        //     }
        //     // filter status    
        //     tasks = tasks.filter((task) => {
        //                 if (filter.status === -1) {
        //                     return true
        //                 } else {
        //                     return task.status === ( filter.status === 1 ? true : false )
        //                 }
        //             });            
        // };

        //         // SEARCH

        if (keyword) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword) !== -1
            });
        };

        //         // SORT 
        if (sort.by === 'name') {                    // viết tắt cả 2 trg hợp 1 và -1
            tasks.sort((a, b) => {                  // VD: Trg hợp 1 => tăng dần    (a<b<c<d)
                if (a.name > b.name) return sort.value;      // nếu chữ trước theo bảng chữ cái đững đằng sau => sắp xếp
                else if (a.name < b.name) return -sort.value; // nếu chữ trước theo bảng chữ cái đững đằng trước => KHÔNg sắp xếp
                else return 0;
            })
        }

        if (sort.by === 'status') {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sort.value;
                else if (a.status < b.status) return sort.value;
                else return 0;
            })
        }

        var elmTasks = tasks.map((task, index) => {
            return (
                < TaskItem 
                    key={index}          
                    index={index} 
                    task={task}     
                />  
            );
        });
        
        return (
            <table className="table table-bordered table-hover">
            <thead>
                <tr>
                    <th className="text-center">STT</th>
                    <th className="text-center">Tên</th>
                    <th className="text-center">Trạng Thái</th>
                    <th className="text-center">Hành Động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <input 
                        type="text" 
                        className="form-control"
                        name = "filterName"
                        value={this.state.filterName}
                        onChange={this.onChange}
                        />
                    </td>
                    <td>
                        <select 
                        className="form-control"
                        name = "filterStatus"
                        value={this.state.filterStatus}
                        onChange={this.onChange}
                        >
                            <option value={-1}>Tất Cả</option>
                            <option value={0}>Ẩn</option>
                            <option value={1}>Kích Hoạt</option>
                        </select>
                    </td>
                    <td></td>
                </tr>
                
                {elmTasks}

            </tbody>
        </table>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        tasks : state.tasks,
        // filter : state.filterTable
        keyword : state.searchTask,
        sort : state.sortTask
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        // filterTable : (filter) => {
        //     dispatch(actions.filterTable(filter))
        // }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);


