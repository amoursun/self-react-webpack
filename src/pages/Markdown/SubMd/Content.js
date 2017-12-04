import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import Generate from './generate';
import { testMd, testMd2, testMd3 } from '../md/index'

const inputs = [
    {id: '1', md: '# This is a header\n\nAnd this is a paragraph'},
    {id: '2', md: testMd},
    {id: '3', md: testMd2},
    {id: '4', md: testMd3}
];

// class ReactMd1 extends Component {
//     render() {
//         return (
//             <h4>
//                 <a href="https://www.npmjs.com/package/react-markdown" target="_blank">react-markdown链接</a>
//             </h4>
//         )
//     }
// }

export default class Content extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const { keyIn, names } = this.props;
        let subList = (
            keyIn === 'test' ? <Generate /> : names.map(name =>  name.id === keyIn ? <ReactMarkdown key={keyIn} source={inputs[+keyIn - 1].md} /> : '')
        );
        let ReactMd = (
            <h4>
                <a href="https://www.npmjs.com/package/react-markdown" target="_blank">react-markdown链接</a>
            </h4>
        );

        return(
            <div className="markdown-right">
                {/*{ keyIn ? subList : <ReactMd1 /> }*/}
                { !keyIn ? ReactMd : subList }
            </div>
        )
    }
}

