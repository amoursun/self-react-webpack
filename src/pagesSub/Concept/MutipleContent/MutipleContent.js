import React, { Component } from 'react';
import Accessibility from './Accessibility';
import CompUnControl from './Comp-UnControl';
import Context from './Context';
import HigherComponents from './Higher-Components';
import OptimizeUpdate from './Optimize-Update';
import OtherLibraries from './Other-Libraries';
import Reconciliation from './Reconciliation';
import RefsDOM from './Refs-DOM';
import WebComponents from './Web-Components';
import SeniorComments from './SeniorComments';

const Names = [ RefsDOM, CompUnControl, OptimizeUpdate,
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


