import React, {Component} from 'react';
import './NewShopTable.less';
import { Data, dataGenerate } from './../TablePage/data';
import NewShopTable from '../../components/newShopTable/NewShopTable';

export default class NewShopTables extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: Data.dataSets
        };
        this.onChange = this.onChange.bind(this);
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

    deletes() {
        const  { data } = this.state;
        data.pop();
        this.setState({
            data
        })
    };

    onChange(name, age) {
        const  { data } = this.state;
        this.setState({
            data: data.map(i => {
                if(i.name === name) {
                    i.age = age;
                }
                return i;
            })
        })
    };

    edit(name, age) {
        const  { data } = this.state;
        this.setState({
            data: data.map(i => {
                if(i.name === name) {
                    i.age = age;
                }
                return i;
            })
        })
    };

    copy(info) {
        const  { data } = this.state;
        let obj = {};
        data.map((val, i)=> {
            if(val.id === info.id) {
                obj.name = 'copy' + Math.random().toString(36).substring(8) + '-' + info.name;
                obj.age = info.age;
                obj.height = info.height;
                obj.weight = info.weight;
                obj.id = dataGenerate().id;
                obj.index = i;
            }
        });
        //插入数组特定位置
        data.splice(obj.index + 1, 0, obj);
        this.setState({
            data: data
        })

    }

    del(info) {
        const  { data } = this.state;
        let obj = {};
        data.map((val, i)=> {
            if(val.id === info.id) {
                obj.index = i;
            }
        });
        //删除数组特定位置
        data.splice(obj.index, 1);
        this.setState({
            data: data
        })
    }

    render() {
        return (
            <div className="new-shop-table">
                <NewShopTable
                    onChange={this.onChange}
                    onEdit={this.edit}
                    onCopy={this.copy}
                    onDelete={this.del}
                    data={this.state.data} />
                <div className="button">
                    <button onClick={this.add}>add</button>
                    <button onClick={this.deletes}>deletes</button>
                </div>
            </div>
        )
    }
}






