import React, {Component} from "react";
import Emitter from "./ev"

class Foo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            msg: null
        };
    }

    eventEmitter() {
        Emitter.addListener('callMe',(msg)=>{
            this.setState({
                msg
            })
        });
    }

    componentDidMount(){
        // 声明一个自定义事件
        // 在组件装载完成以后
        this.eventEmitter();

    }
    // 组件销毁前移除事件监听
    componentWillUnmount(){
        Emitter.removeListener('callMe', this.eventEmitter);
    }
    render(){
        const { msg } = this.state;
        Emitter.emit("callU", msg);
        return(
            <div>
                ({ msg }) >> 非嵌套 1 号
            </div>
        );
    }
}

class Boo extends Component{
    eventSave() {
        Emitter.addListener('callU',(info)=>{
            this.showMsg = info;
        });
    }

    componentDidMount(){
        // 声明一个自定义事件
        // 在组件装载完成以后
        this.eventSave();
    }

    // 组件销毁前移除事件监听
    componentWillUnmount(){
        Emitter.removeListener('callU', this.eventSave);
    }

    cb = (msg) => {
        msg = this.showMsg ? null : msg;
        // 触发自定义事件
        Emitter.emit("callMe", msg);
    }
    render(){
        return(
            <div>
                非嵌套 2 号 >> <button onClick={this.cb.bind(this, 'hello')}>点击我</button>
            </div>
        );
    }
}

export default class FooBoo extends Component{
    render(){
        return(
            <div>
                <Foo />
                <Boo />
            </div>
        );
    }
}
