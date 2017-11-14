import React, {Component} from 'react';
import './PubSub.less';
import PB from './PB';


export default class PubSub extends Component {

    render() {
        return (
            <div  className="brother-pubsub">
                <h5>观察者模式也叫 发布者-订阅者模式</h5>
                <div>
                    <h6>eventProxy 中，总共有 on、one、off、trigger 这 4 个函数: </h6>
                    <ul>
                        <li>on、one：on 与 one 函数用于订阅者监听相应的事件，并将事件响应时的函数作为参数，on 与 one 的唯一区别就是，
                            使用 one 进行订阅的函数，只会触发一次，而 使用 on 进行订阅的函数，每次事件发生相应时都会被触发。</li>
                        <li>trigger：trigger 用于发布者发布事件，将除第一参数（事件名）的其他参数，作为新的参数，触发使用 one 与 on 进行订阅的函数。</li>
                        <li>off：用于解除所有订阅了某个事件的所有函数。</li>
                    </ul>
                    <p>我们在 child_2 组件的 componentDidMount 中订阅了 msg 事件，并在 child_1 componentDidMount 中，
                        在 3s 后发布了 msg 事件，child_2 组件对 msg 事件做出相应，更新了自身的 state; child_2_1同理. </p>
                </div>
                <PB />
            </div>
        )
    }
}