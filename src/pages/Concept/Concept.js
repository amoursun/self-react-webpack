import React, {Component} from 'react';
import './Concept.less'
import SeniorGuidance from './../../pagesSub/Concept/SeniorGuidance';
import GuidanceContent from './../../pagesSub/Concept/GuidanceContent'

class Concept extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: ''
        };

    }
    render () {
       return (
           <div className="guidance">
               <SeniorGuidance />
               <GuidanceContent content={this.state.key}/>
           </div>
       )
    }
};

export default Concept;