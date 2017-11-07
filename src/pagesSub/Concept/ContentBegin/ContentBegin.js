import React, {Component} from 'react';

// one
// function LiItem(props) {
//     return <li>{props.value}</li>;
// }

// three class定义构造函数
class Person{
    constructor(value, index) {
        this.value = value;
        this.index = index;
    };
    introduce () {
        return <li key={this.index}>{this.value}</li>;
    }
}

class ContentLists extends Component {
    render() {
        const nameDatas = this.props.names;
        return (
            <div className="nav-item">
                reducer 就是一个纯函数，接收旧的 state 和 action，返回新的 state ==>
                <a href="http://cn.redux.js.org/docs/basics/Reducers.html">[reducers 概念链接]</a>
                <div className="nav-sub">
                    <h4>内容</h4>
                    <ul>
                        {nameDatas.map(
                            // three
                            (value, index) => new Person(value, index).introduce()
                            // one
                            // (value, index) => <LiItem key={index} value={value}/>
                            // two
                            // (value, index) => <li key={index}>{value}</li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

class ContentBegin extends Component {
    render() {
        return(
            <div>
                <h2>高级指引内容</h2>
                <ContentLists names={this.props.names}/>
            </div>
        )
    }
}

export default ContentBegin;