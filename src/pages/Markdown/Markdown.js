import React, { Component } from 'react';
import './Markdown.less';
import Lists from './SubMd/Lists';
import Content from './SubMd/Content';
import { hashHistory } from 'react-router';

const mdNames = [
    {id: '1', content: '111.md', name: '111', select: false},
    {id: '2', content: 'testMd.md', name: 'testmd', select: false},
    {id: '3', content: 'testMd2.md', name: 'testmd2', select: false}
];
export default class Markdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: '',
            datas: mdNames
        };
        this.select = this.select.bind(this);
    };

    componentWillMount() {
        let name = this.props.location.pathname;
        this.state.datas.map(value => {
            value.select = false;
            if (value.name === name.substring(name.lastIndexOf('/') + 1)) {
                value.select = true;
                this.setState({ key: value.id });
            }
        });
    }

    select(index) {
        const pathname = this.props.route.path;
        const { datas } =this.state;
        datas.map(value => {
            value.select = false;
            if (value.id === index) {
                value.select = true;
                hashHistory.push(`${pathname}/${value.name}`);
            };
        });
        this.setState({
            key: index
        })
    }

    render() {
        const { key, datas } =this.state;
        return(
            <div className="markdown">
                <Lists nameLists={datas} select={this.select}/>
                <Content keyIn={key} names={datas}/>
            </div>
        )
    }
}