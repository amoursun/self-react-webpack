import React, {Component} from 'react';
import PropTypes from 'prop-types';


class CurItemWrapper extends Component {
    render(){
        return (
            <div>
                <CurItemPanel />
            </div>
        )
    }
}

class CurItemPanel extends Component {
    render() {
        return (
            <h5>The curItem is: <span style={{color: 'red'}}>{this.context.curItem}</span></h5>
        )
    }
}

CurItemPanel.contextTypes = {
    curItem: PropTypes.any
};

class ListWrapper extends Component{
    render(){
        return (
            <div>
                <List />
            </div>
        )
    }
}

class List extends Component{
    constructor(props) {
        super(props);
        this.onClickItem = this.onClickItem.bind(this);

    }

    onClickItem = (e) => {
        this.context.changeItem(e.target.textContent);
    }
    render(){
        return (
            <ul>
                <button onClick={this.onClickItem}>item1</button>
                <button onClick={this.onClickItem}>item2</button>
            </ul>
        )
    }
}

List.contextTypes = {
    changeItem: PropTypes.any
}

export default class MyContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curItem: ''
        }
        this.changeItem = this.changeItem.bind(this);
    };

    getChildContext = () => {
        return {
            curItem: this.state.curItem,
            changeItem: this.changeItem
        }
    }
    changeItem = (item) => {
        this.setState({
            curItem: item
        });
    }
    render() {
        return (
            <div className="context">
                <h5>例子如下: </h5>
                <CurItemWrapper />
                <ListWrapper changeItem={this.changeItem}/>
            </div>
        )
    }
}

MyContainer.childContextTypes  = {
    curItem: PropTypes.any,
    changeItem: PropTypes.any
}