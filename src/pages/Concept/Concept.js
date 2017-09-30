import React, {Component} from 'react';
import './Concept.less';
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

    componentWillMount() {

    }

    select(index) {
        this.setState({
            key: index
        })
    }

    render () {
       return (
           <div className="guidance">
               <div className="side-nav">
                   <SeniorGuidance selectContent={this.state.key} selectChange={this.select}/>
               </div>
               <div className="nav-content">
                   <GuidanceContent content={this.state.key}/>
               </div>
           </div>
       )
    }
};

export default Concept;

