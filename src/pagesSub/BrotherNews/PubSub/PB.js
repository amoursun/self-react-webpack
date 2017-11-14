import React, { Component } from 'react';
import eventProxy from './eventProxy'

export default class PB extends Component{
    // componentWillMount() {
    //     eventProxy.off('msg');
    //     eventProxy.off('good');
    // }

    render() {
        return (
            <div>
                <Child_1/>
                <Child_2/>
            </div>
        );
    }
}

class Child_1 extends Component{
    componentDidMount() {
        setTimeout(() => {
            // 发布 msg 事件
            eventProxy.trigger('msg', 'Child_2 end => console.log(Child_2 end)');
        }, 3000);
    }

    componentDidUpdate() {
        console.log('Child_1 update');
    }

    render() {
        return <div>
            <p>child_1 component</p>
        </div>
    }
}

class Child_2 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            msg: 'Child_2 start'
        };
    }

    componentDidUpdate() {
        console.log('Child_2 update');
    }

    componentDidMount() {
        // 监听 msg 事件
        eventProxy.one('msg', (msg) => {
            setTimeout(() => {
                // 发布 msg 事件
                eventProxy.trigger('good', 'Child_2_1 end => console.log(Child_2_1 end)');
            }, 3000);
            this.setState({
                msg: msg
            });
        });
    }

    render() {
        return <div>
            <p>child_2 component: {this.state.msg}</p>
            <Child_2_1 />
        </div>
    }
}
class Child_2_1 extends Component{
    constructor(props) {
        super(props);
        this.state = {
            good: 'Child_2_1 start'
        };
    }

    componentDidUpdate() {
        console.log('Child_2_1 update');
    }

    componentDidMount() {
        // 监听 msg 事件
        eventProxy.one('good', (goodMsg) => {
            this.setState({
                good: goodMsg
            });
        });
    }

    render() {
        return <div>
            <p>child_2_1 component: {this.state.good}</p>
        </div>
    }
}
