import React, {Component} from 'react';
import Checkbox from './Checkbox';
import PropTypes from 'prop-types';

// class Option extends Component {
//     render() {
//         const { name, onDelete }= this.props;
//         return (
//             <div className="cell" >
//                 <div className="cell__child-container">
//                     <Link to={`update/${name}`}><span>修改</span></Link>&nbsp;| &nbsp;
//                     <Link to={`copy/${name}`}><span>复制</span></Link>&nbsp;| &nbsp;
//                     <span onClick={() => onDelete(name)}>删除</span>
//                 </div>
//             </div>
//         )
//     }
// }

class Option extends Component {
    render() {
        const { id, edit, onDelete, onCopy, onEdit, onEditing }= this.props;
        return (
            <div className="cell" >
                <div className="cell__child-container">
                    {edit ? <span onClick={() => onEditing(id)}>修改中</span> :
                            <span onClick={() => onEdit(id)}>修改</span>}&nbsp;| &nbsp;
                    <span onClick={() => onCopy(id)}>复制</span>&nbsp;| &nbsp;
                    <span onClick={() => onDelete(id)}>删除</span>
                </div>
            </div>
        )
    }
}

var editData = {};

export default class NewShopTr extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
        this.handleBlurName = this.handleBlurName.bind(this);
        this.handleBlurAge = this.handleBlurAge.bind(this);
        this.handleBlurHeight = this.handleBlurHeight.bind(this);
        this.handleBlurWeight = this.handleBlurWeight.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onCopy = this.onCopy.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onEditing = this.onEditing.bind(this);
        this.checkSingle = this.checkSingle.bind(this);
    };

    // // 接收两个参数，分别为待更新的属性及状态值
    // shouldComponentUpdate(nextProps, nextState) {
    //     // 如果当前的value值与待更新不相等，才执行更新
    //     return this.props.data.sold_num === nextProps.data.sold_num;
    // }

    componentWillMount() {
        this.selectedCheckboxes = new Set();
    };

    handleBlurName(e) {
        editData.name = e.target.value;
    };

    handleBlurAge(e) {
        editData.age = e.target.value;
    };

    handleBlurHeight(e) {
        editData.height = e.target.value;
    };

    handleBlurWeight(e) {
        editData.weight = e.target.value;
    };

    onDelete(e) {
        const { data, onDelete } = this.props;
        onDelete && onDelete({
            id: data.id
        })

    }

    onCopy(e) {
        const { data, onCopy } = this.props;
        let copyData = Object.create(data);
        onCopy && onCopy(copyData);
    }

    onEdit(e) {
        const {data} = this.props;
        editData = data;
        this.setState({edit: true});


    }

    onEditing(e) {
        this.setState({edit: false});
        const { onEdit } = this.props;
        onEdit && onEdit(editData);
    }

    checkSingle(label) {
        const { obj } = this.props;

        if (obj[label]) {
            var isCheckedAll = false;
            delete obj[label];
        } else {
            obj[label] = label;
        }

        const { onCheckSingle } = this.props;
        onCheckSingle && onCheckSingle(obj, isCheckedAll);
    }

    render() {
        const data = this.props.data;
        const { edit } = this.state;

        return (
            <div className="tr">
                <div className="cell">
                    {/*<div className="cell__child-container">*/}
                        {/*<input type="checkbox" onClick={this.checkSingle}/>*/}
                    {/*</div>*/}
                    <Checkbox label={data.id}
                              isCheckedAll={this.props.isCheckedAll}
                              handleCheckboxChange={this.checkSingle}
                              key={data.id} />
                </div>
                <div className="cell">
                    <div className="cell__child-container">
                        {edit ? <input onBlur={this.handleBlurName} defaultValue={data.name}/> : data.name}
                    </div>
                </div>
                <div className="cell">
                    <div className="cell__child-container">
                        {edit ? <input onBlur={this.handleBlurAge} defaultValue={data.age}/> : data.age}
                    </div>
                </div>
                <div className="cell cell--money cell--center">
                    <div className="cell__child-container">
                        {edit ? <input onBlur={this.handleBlurHeight} defaultValue={data.height}/> : data.height}
                    </div>
                </div>
                <div className="cell">
                    <div className="cell__child-container">
                        {edit ? <input onBlur={this.handleBlurWeight} defaultValue={data.weight}/> : data.weight}
                    </div>
                </div>
                <Option onDelete={this.onDelete} onCopy={this.onCopy} onEdit={this.onEdit} onEditing={this.onEditing} id={data.id} edit={edit} />
            </div>
        );
    }
}

NewShopTr.propTypes = {
    edit: PropTypes.bool
};

