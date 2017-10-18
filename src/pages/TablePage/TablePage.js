import React, {Component} from 'react';
import './TablePage.less';
import { Data, dataGenerateBegin } from './data';
import CTable from '../../components/table/Table';


export default class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: Data.dataList
        };
        this.onChange = this.onChange.bind(this);
        this.add = this.add.bind(this);
        this.delete = this.delete.bind(this);
    }

    // add = () => {
    add() {
        const  { data } = this.state;
        data.push(dataGenerateBegin());
        this.setState({
            data: data
        });
    };

    // delete = () => {
    delete() {
        const  { data } = this.state;
        data.pop();
        this.setState({
            data: data
        })
    };

    // onChange = (item_id, sold_num) => {
    onChange(item_id, sold_num) {
        const  { data } = this.state;
        this.setState({
            data: data.map(i => {
                if(i.item_id === item_id) {
                    // i.sold_num = sold_num * 2;//每次输入完成后成非编辑时数字会 * 2
                    i.sold_num = sold_num;
                }
                return i;
            })
        })
    };

    render() {
        const { data } = this.state;
        return (
            <div className="table-page">
                <CTable onChange={this.onChange} data={data} />
                <div className="button">
                    <button onClick={this.add}>add</button>
                    <button onClick={this.delete}>delete</button>
                </div>
            </div>
        );
    }
}

