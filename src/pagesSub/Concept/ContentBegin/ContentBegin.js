import React, {Component} from 'react';


function LiItem(props) {
    return <li>{props.value}</li>;
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
                            // (value, index) => <LiItem key={index} value={value}/>
                            (value, index) => <li key={index}>{value}</li>
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