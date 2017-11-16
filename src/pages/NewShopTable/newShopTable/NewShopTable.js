import React, {Component} from 'react';
import NewShopTr from './NewShopTr';
import CheckboxAll from './CheckboxAll';
import EventEmitter from './EventEmitter';
import PropTypes from 'prop-types';

var obj = {};

export default class NewShopTable extends Component {
    constructor(props) {
        super(props);

        this.checkAll = this.checkAll.bind(this);
        this.deletes = this.deletes.bind(this);
        this.onCheckSingle = this.onCheckSingle.bind(this);
    }

    onCheckSingle = (info, infoItem) => {
        let checked = '';
        obj = info;
        infoItem.select ? '' : checked = false;
        EventEmitter.dispatch('changeItem', checked);
    };

    deletes = () => {
        this.props.deletes(obj);
    }

    checkAll = (checked) => {
        obj = {};
        let { checkBox, data } = this.props;
        data.map(dt => {
            dt.select = checked;
            obj[dt.id] = dt.id;
        });
        checkBox(data);

    }

    render() {
        const { onEdit, onCopy, onDelete, add, data } = this.props;
        return (
            <div className="zent-table ">
                <div className="thead">
                    <div className="stickrow tr">
                        <div className="cell">
                            {/*<div className="cell__child-container">*/}
                                {/*<input type="checkbox" onClick={this.checkAll}/>*/}
                            {/*</div>*/}
                            <CheckboxAll
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
                    {data.map(i => <NewShopTr
                                            onEdit={onEdit}
                                            onCopy={onCopy}
                                            onDelete={onDelete}
                                            onCheckSingle={this.onCheckSingle}
                                            key={i.id}
                                            obj={obj}
                                            data={i} />)}
                </div>
                <div className="button">
                    <button onClick={add}>add</button>
                    <button onClick={this.deletes}>deletes</button>
                </div>
            </div>
        );
    }
}

NewShopTable.propTypes = {
    isCheckedAll: PropTypes.bool
};

