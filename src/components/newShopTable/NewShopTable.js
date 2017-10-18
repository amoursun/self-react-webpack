import React, { Component } from 'react';
import NewShopTr from './NewShopTr';

export default class NewShopTable extends Component {
    constructor(props) {
        super(props);
        this.checkAll = this.checkAll.bind(this);

    }

    checkAll() {

    }

    render() {
        const tableData = this.props.data;
        return (
            <div className="zent-table ">
                <div className="thead">
                    <div className="stickrow tr">
                        <div className="cell">
                            <div className="cell__child-container">
                                <input type="checkbox" onClick={this.checkAll}/>
                            </div>
                        </div>
                        <div className="cell">
                            <div className="cell__child-container">姓名</div>
                        </div>
                        <div className="cell" >
                            <div className="cell__child-container">
                                <a>年龄</a>
                            </div>
                        </div>
                        <div
                            className="cell cell--money cell--center"
                            >
                            <div className="cell__child-container">
                                <a>身高<span className="desc"></span>
                                </a>
                            </div>
                        </div>
                        <div className="cell" >
                            <div className="cell__child-container">
                                <a>体重</a>
                            </div>
                        </div>
                        <div className="cell" >
                            <div className="cell__child-container">
                                <a>操作</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="tbody">
                    {tableData.map(i => <NewShopTr onChange={this.props.onChange} key={i.name} id={i.name} data={i} />)}
                </div>
            </div>
        );
    }
}
