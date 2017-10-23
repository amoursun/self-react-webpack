import React, { Component } from 'react';
import NewShopTr from './NewShopTr';
import CheckboxAll from './CheckboxAll';
import PropTypes from 'prop-types';

var obj = {};
var selectedAllCheckboxes = [];

export default class NewShopTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckedAll: false
        };
        this.checkAll = this.checkAll.bind(this);
        this.deletes = this.deletes.bind(this);
        this.onCheckSingle = this.onCheckSingle.bind(this);
    }

    componentWillMount() {
        this.props.data.map(value => {
            selectedAllCheckboxes.push(value.id);
        });
    }

    componentWillReceiveProps() {
        selectedAllCheckboxes = [];
        this.props.data.map(value => {
            selectedAllCheckboxes.push(value.id);
        });
    }

    onCheckSingle(info, checked) {
        obj = info;
    }

    deletes() {
        this.props.deletes(obj);
    }

    checkAll(arr, checked) {
        let arrObj = {};

        arr.map(value => {
            arrObj[value] = value;
        });
        obj = arrObj;

        this.setState({ isCheckedAll: checked })
    }

    render() {
        const tableData = this.props.data;
        return (
            <div className="zent-table ">
                <div className="thead">
                    <div className="stickrow tr">
                        <div className="cell">
                            {/*<div className="cell__child-container">*/}
                                {/*<input type="checkbox" onClick={this.checkAll}/>*/}
                            {/*</div>*/}
                            <CheckboxAll
                                labelAll={selectedAllCheckboxes}
                                handleCheckboxAllChange={this.checkAll} />
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
                    {tableData.map(i => <NewShopTr
                                            onEdit={this.props.onEdit}
                                            onCopy={this.props.onCopy}
                                            onDelete={this.props.onDelete}
                                            onCheckSingle={this.onCheckSingle}
                                            key={i.id}
                                            id={i.id}
                                            obj={obj}
                                            isCheckedAll={this.state.isCheckedAll}
                                            data={i} />)}
                </div>
                <div className="button">
                    <button onClick={this.props.add}>add</button>
                    <button onClick={this.deletes}>deletes</button>
                </div>
            </div>
        );
    }
}

NewShopTable.propTypes = {
    isCheckedAll: PropTypes.bool
};

