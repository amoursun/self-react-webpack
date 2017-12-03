import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { testMd, testMd2 } from '../md/index'

const inputs = [
    {id: '1', md: '# This is a header\n\nAnd this is a paragraph'},
    {id: '2', md: testMd},
    {id: '3', md: testMd2}
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
            names.map(name => {
                return name.id === keyIn && keyIn !== 'test' ? <ReactMarkdown key={keyIn} source={inputs[+keyIn - 1].md} /> : '';
            })
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

