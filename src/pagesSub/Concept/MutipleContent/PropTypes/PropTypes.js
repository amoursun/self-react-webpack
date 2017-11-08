import React, { Component } from 'react';
import './PropTypes.less';

import PropTypesContent  from './PropTypesContent/PropTypesContent';

export default class PropTypes extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <div className="prop-type">
                <h2>PropTypes</h2>
                <PropTypesContent />
            </div>

        )
    }
}