import React, {Component} from 'react';
import './Context.less';
import appPng from '../../../static/brotherNews/context-app.png';
import subPng from '../../../static/brotherNews/context-sub.png';
import subSubPng from '../../../static/brotherNews/context-subSub.png';
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
                <div>
                    <h5>在使用 context 时，有两点需要注意：</h5>
                    <ul>
                        <li>父组件需要声明自己支持 context，并提供 context 中属性的 PropTypes</li>
                        <li>子组件需要声明自己需要使用 context，并提供其需要使用的 context 属性的 PropTypes</li>
                        <li>父组件需提供一个 getChildContext 函数，以返回一个初始的 context 对象</li>
                        <li>如果组件中使用构造函数（constructor），还需要在构造函数中传入第二个参数 context，
                            并在 super 调用父类构造函数是传入 context，否则会造成组件中无法使用 context。</li>
                    </ul>
                    <pre>
                        <code>
                            ...
                            constructor(props,context) super(props,context)}
                            ...
                        </code>
                    </pre>
                </div>
                <div>
                    <h5>改变 context 对象：</h5>
                    <p>我们不应该也不能直接改变 context 对象中的属性，要想改变 context 对象，只有让其和父组件的 state 或者 props 进行关联，
                        在父组件的 state 或 props 变化时，会自动调用 getChildContext 方法，返回新的 context 对象，而后子组件进行相应的渲染</p>
                    <ul>
                        <li>
                            <span>修改 App.js，让 context 对象可变：</span>
                            <img src={appPng} alt="App.js"/>
                        </li>
                        <li>
                            <span>此时，在子组件的 cb 方法中，传入相应的颜色参数，就可以改变 context 对象了，进而影响到子组件：</span>
                            <img src={subPng}/>
                        </li>
                        <li>
                            <span>context 同样可以应在无状态组件上，只需将 context 作为第二个参数传入：</span>
                            <img src={subSubPng} alt="SubSub.js"/>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}