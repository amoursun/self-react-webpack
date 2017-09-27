import React, {Component} from 'react';
import ContentBegin from './ContentBegin/ContentBegin';
import MutipleContent from './MutipleContent/MutipleContent';

class GuidanceContent extends Component {
    render() {
        return(
            <div className="nav-content">
                { !this.props.content ? <ContentBegin /> : <MutipleContent />}
            </div>
        )
    }
}

export default GuidanceContent;