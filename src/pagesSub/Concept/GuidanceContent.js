import React, {Component} from 'react';
import ContentBegin from './ContentBegin/ContentBegin';
import MutipleContent from './MutipleContent/MutipleContent';

class GuidanceContent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="nav-content">
                { !this.props.content ? <ContentBegin /> : <MutipleContent contentKey={this.props.content}/>}
            </div>
        )
    }
}

export default GuidanceContent;