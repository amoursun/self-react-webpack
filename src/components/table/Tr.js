// import React, {Component} from 'react';
import React, {PureComponent} from 'react';

// export default class Tr extends Component {
export default class Tr extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            edit: false
        };
        this.handleBlur = this.handleBlur.bind(this);
        this.handleClick = this.handleClick.bind(this);
    };

    // // 接收两个参数，分别为待更新的属性及状态值
    // shouldComponentUpdate(nextProps, nextState) {
    //     // 如果当前的value值与待更新不相等，才执行更新
    //     return this.props.data.sold_num === nextProps.data.sold_num;
    // }

    // handleBlur = (e) => {
    handleBlur(e) {
        const value = e.target.value;
        this.setState({edit: false});
        // const {onChange, data: {item_id}} = this.props;
        // onChange && onChange(item_id, value);
        const { onChange, data } = this.props;
        onChange && onChange(data.get('item_id'), value);
    };
 
    // handleClick = () => {
    handleClick() {
        this.setState({ edit: true });
    };

    render() {
        const data = this.props.data;
        const { edit, value } = this.state;

        return (
            <div className="tr">
                <div className="cell">
                    <div className="cell__child-container">
                        {/*<div>{data.item_id}</div>*/}
                        <div>{data.get('item_id')}</div>
                    </div>
                </div>
                <div className="cell">
                    {/*<div className="cell__child-container">{data.bro_xh}</div>*/}
                    <div className="cell__child-container">{data.get('bro_xh')}</div>
                </div>
                <div className="cell cell--money cell--center">
                    {/*<div className="cell__child-container">{data.stock_num}</div>*/}
                    <div className="cell__child-container">{data.get('stock_num')}</div>
                </div>
                <div className="cell">
                    {/*<div className="cell__child-container">{edit ?*/}
                        {/*<input onBlur={this.handleBlur} defaultValue={data.sold_num}/> : data.sold_num}</div>*/}
                    <div className="cell__child-container">{edit ?
                        <input onBlur={this.handleBlur} defaultValue={data.get('sold_num')}/> : data.get('sold_num')}
                    </div>
                </div>
                <div className="cell">
                    <div className="cell__child-container">
                        <span onClick={this.handleClick}>修改</span>
                    </div>
                </div>
            </div>
        );
    }
}