import React, { Component } from 'react';
import ContentBegin from './ContentBegin/ContentBegin';
import MutipleContent from './MutipleContent/MutipleContent';

const names = ['PropTypes检查(PropTypes)', 'Refs & DOM(Refs-DOM)', '非受控组件(Comp-UnControl)', '性能优化(Optimize Update)', 'Reconciliation', 'Context',
               'Web Components', '高阶组件(Higher Components)', '与第三方库协同(Other Libraries)', '可访问性(Accessibility)', '案例-评论高级(demo)'];

class GuidanceContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div>
                { !this.props.contentKey ? <ContentBegin names={names}/> : <MutipleContent contentKey={this.props.contentKey}/>}
            </div>
        )
    }
}

export default GuidanceContent;