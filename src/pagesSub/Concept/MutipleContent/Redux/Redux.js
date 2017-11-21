import React, {Component} from 'react';
import {Grid} from 'react-bootstrap';
import './Redux.less';

export default class ReduxContent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    };

    render() {
        const Redux = (
                <div className="redux">
                    <h4>Redux 内容</h4>
                    <div className="content">
                        <div>
                            <h5>redux 案例</h5>
                            <ul>
                                <li><a target="_blank" href="http://www.redux.org.cn/docs/introduction/Examples.html">示例链接</a></li>
                                <li><a target="_blank" href="https://github.com/xgrommx/awesome-redux">Awesome Redux(更多示例)</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
        );

        return(
            <Grid>
                <div>
                    <h2>ReduxContent</h2>
                    <div className="nav-item">
                        Redux 是 JavaScript 状态容器，提供可预测化的状态管理 ==>
                        <a href="http://www.redux.org.cn/index.html">[Redux 概念链接]</a>
                    </div>
                    {/*Redux组件写在外面class 用<Redux /> ; 写在里面如下*/}
                    {Redux}
                </div>
            </Grid>
        )
    }
};