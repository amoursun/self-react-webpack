import React, {Component} from 'react';
import './NewShopTable.less';
import { Data, dataGenerate } from './data';
import NewShopTable from '../../components/newShopTable/NewShopTable';
import PropTypes from 'prop-types';


function objFunc(data, obj) {
    let arr = [];

    data.map(value => {
        if (!obj[value.id]) {
            arr.push(value);
        }
    });

    return arr;
}

export default class NewShopTables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: Data.dataSets,
            arr: []
        };
        this.add = this.add.bind(this);
        this.deletes = this.deletes.bind(this);
        this.edit = this.edit.bind(this);
        this.copy = this.copy.bind(this);
        this.del = this.del.bind(this);
    }

    add() {
        const  { data } = this.state;
        data.push(dataGenerate());
        this.setState({
            data: data
        })
    };

    deletes(obj) {
        const  { data } = this.state;
        this.setState({
            data: objFunc(data, obj)
        })
    };

    edit(info) {
        const  { data } = this.state;
        let num = 0;
        data.map((value, i) => {
            if(value.id === info.id) {
                num = i;
            }
        });
        data.splice(num, 1, info);
        this.setState({
            data: data
        });
    };

    copy(info) {
        const  { data } = this.state;
        let num = 0;
        data.map((val, i)=> {
            if(val.id === info.id) {
                info.name = 'copy' + Math.random().toString(36).substring(8) + '-' + info.name;
                info.id = dataGenerate().id;
                num = i;
            }
        });
        //插入数组特定位置
        data.splice(num + 1, 0, info);
        this.setState({
            data: data
        });
    }

    del(info) {
        const  { data } = this.state;
        let num = 0;
        data.map((val, i)=> {
            if(val.id === info.id) {
                num = i;
            }
        });
        //删除数组特定位置
        data.splice(num, 1);
        this.setState({
            data: data
        })
    }

    render() {
        return (
            <div className="new-shop-table">
                <NewShopTable
                    onEdit={this.edit}
                    onCopy={this.copy}
                    onDelete={this.del}
                    add={this.add}
                    deletes={this.deletes}
                    arr={this.state.arr}
                    data={this.state.data} />
            </div>
        )
    }
}

NewShopTables.propTypes = {
    data: PropTypes.array
};





