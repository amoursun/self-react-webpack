import React, { Component } from 'react';
import Accessibility from './Accessibility/Accessibility';
import CompUnControl from './Comp-UnControl/Comp-UnControl';
import Context from './Context/Context';
import HigherComponents from './Higher-Components/Higher-Components';
import OptimizeUpdate from './Optimize-Update/Optimize-Update';
import OtherLibraries from './Other-Libraries/Other-Libraries';
import Reconciliation from './Reconciliation/Reconciliation';
import RefsDOM from './Refs-DOM/Refs-DOM';
import WebComponents from './Web-Components/Web-Components';
import SeniorComments from './Senior-Comments/Senior-Comments';
import PropTypeJs from './PropTypes/PropTypes';

const Names = [ PropTypeJs, RefsDOM, CompUnControl, OptimizeUpdate,
                Reconciliation, Context, WebComponents,
                HigherComponents, OtherLibraries, Accessibility, SeniorComments ];

class MutipleContent extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <div>
                {Names.map((Name, index) =>
                    index + 1 === this.props.contentKey ? <Name key={index + 1}/> : null
                )}
            </div>
        )
    }
}

export default MutipleContent;


