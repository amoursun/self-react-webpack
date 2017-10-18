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
        this.delete = this.delete.bind(this);
    }

    add() {
        const  { data } = this.state;
        data.push(dataGenerate());
        this.setState({
            data: data
        })
    };

    delete() {
        const  { data } = this.state;
        data.pop();
        this.setState({
            data
        })
    };

    // onChange(name, age) {
    //     const  { data } = this.state;
    //     this.setState({
    //         data: data.map(i => {
    //             if(i.name === name) {
    //                 i.age = age;
    //             }
    //             return i;
    //         })
    //     })
    // };

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

    render() {
        return (
            <div className="new-shop-table">
                <NewShopTable onChange={this.onChange} data={this.state.data} />
                <div className="button">
                    <button onClick={this.add}>add</button>
                    <button onClick={this.delete}>delete</button>
                </div>
            </div>
        )
    }
}






