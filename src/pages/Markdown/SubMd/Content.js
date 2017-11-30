import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import { testMd, testMd2 } from '../md/index'


const inputs = [
    {id: '1', md: '# This is a header\n\nAnd this is a paragraph'},
    {id: '2', md: testMd},
    {id: '3', md: testMd2}
];

export default class Content extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const { keyIn, names } = this.props;
        let subList = (
            names.map(name => {
                return name.id === keyIn ? <ReactMarkdown key={keyIn} source={inputs[+keyIn - 1].md} /> : '';
            })
        );
        return(
            <div className="markdown-right">
                {keyIn ? subList : <ReactMarkdown source="This is none" />}
            </div>
        )
    }
}

