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
        this.select = this.select.bind(this);
    }

    select(index) {
        this.props.params.id = index;
        this.setState({
            key: index
        })
    }

    render () {
       return (
           <div className="guidance">
               <SeniorGuidance selectContent={this.state.key} selectChange={this.select}/>
               <GuidanceContent content={this.state.key}/>
           </div>
       )
    }
};

export default Concept;