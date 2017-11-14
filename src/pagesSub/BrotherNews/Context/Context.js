import React, {Component} from 'react';
import './Context.less';
import MyContainer from './MyContainer';

export default class Context extends Component {

    render() {
        return (
            <div className="brother-context">
                <h4><a href="https://doc.react-china.org/docs/context.html" target="_blank">[链接]</a> 不建议使用Context</h4>
                <div>使用上下文可以让子组件直接访问祖先的数据或函数，无需从祖先组件一层层地传递数据到子组件中</div>
                <div>childContextTypes用于验证上下文的数据类型，这个属性是必须要有的，否则会报错。
                    getChildContext用于指定子组件可直接访问的上下文数据</div>
                <div>在&lt;CurItemPanel />通过this.context.curItem属性访问curItem，无需让&lt;CurItemWrapper />将curItem传递过来。
                    必须在contextTypes中设置curItem的验证类型，否则this.context是访问不了curItem的。</div>
                <div>同上，&lt;List />可以通过this.context.changeItem获取&lt;MyContainer />的改变curItem的changeItem函数。</div>
                <MyContainer />
            </div>
        )
    }
}