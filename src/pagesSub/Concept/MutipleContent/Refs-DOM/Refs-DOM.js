import React, {Component} from 'react';
import './Refs-DOM.less';

class ContentLists extends Component {
    render() {
        return(
            <div className="refs-dom">
                <h4>Refs & DOM</h4>
                <div className="content">
                    <div>
                        <h5>何时使用 Refs: 使用 refs 的情况</h5>
                        <ul>
                            <li>处理焦点、文本选择或媒体控制</li>
                            <li>触发强制动画</li>
                            <li>集成第三方 DOM 库</li>
                            <li>如果可以通过声明式实现，则尽量避免使用 refs</li>
                        </ul>
                    </div>
                </div>

            </div>
        )
    }
}

class RefsDOM extends Component {
    render() {
        return(
            <div>
                <h2>Refs-DOM</h2>
                <div className="nav-item">
                    React 数据流中, 属性（props）是父组件与子代交互的唯一方式 ==>
                    <a href="https://doc.react-china.org/docs/refs-and-the-dom.html">[Refs & DOM 概念链接]</a>
                </div>
                <ContentLists />
            </div>
        )
    }
}

export default RefsDOM;