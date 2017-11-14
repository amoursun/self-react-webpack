import React, {Component} from 'react';
import './Events.less';
import EventEmitter from './EventEmitter';


class CurItemPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curItem: '   '
        }
    };

    componentDidMount = () => {
        let self = this;
        EventEmitter.subscribe('changeItem', (newItem) => {
            self.setState({
                curItem: newItem
            });
        })
    };

    componentWillUnmount = () => {
        EventEmitter.unSubscribe('changeItem');
    };

    render() {
        return (
            <p>
                The curItem is:  ({this.state.curItem})
            </p>
        )
    }
}

class SelectionButtons extends Component {
    constructor(props) {
        super(props);
        this.onClickItem = this.onClickItem.bind(this);
    }

    onClickItem = (e) => {
        EventEmitter.dispatch('changeItem', e.target.textContent);
    }

    render() {
        return (
            <div>
                <button onClick={this.onClickItem}>item1</button>
                <button onClick={this.onClickItem}>item2</button>
            </div>
        )
    }
}

export default class Events extends Component {
    render() {
        return (
            <div className="brother-events">
               <h4>全局事件 (Events)</h4>
               <div>可以使用事件来实现组件间的沟通：改变数据的组件发起一个事件，使用数据的组件监听这个事件，
                   在事件处理函数中触发setState来改变视图或者做其他的操作。使用事件实现组件间沟通脱离了单向数据流机制，
                   不用将数据或者回调函数一层一层地传给子组件，可以避免出现上述的亲戚图。</div>
                <div>事件模块可以使用如EventEmitter或PostalJS这些第三方库，也可以自己简单实现一个</div>
                <div>事件绑定和解绑可以分别放在componentDidMount和componentWillUnMount中。由于事件是全局的，
                    最好保证在componentWillUnMount中解绑事件，否则，下一次初始化组件时事件可能会绑定多次。
                    使用事件模型，组件之间无论是父子关系还是非父子关系都可以直接沟通，从而解决了组件间层层回调传递的问题，
                    但是频繁地使用事件实现组件间沟通会使整个程序的数据流向越来越乱，因此，组件间的沟通还是要尽量遵循单向数据流机制。</div>
                <div>代码示例如下: </div>
                <div className="events">
                    <CurItemPanel />
                    <SelectionButtons/>
                </div>
            </div>
        )
    }
}