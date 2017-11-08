import React, {Component} from 'react';
import { hashHistory} from 'react-router';


function ListItem(props) {
    return <li
                onClick={props.changeItem.bind(this,props.id)}
                style={props.isSelect ? {color: '#00ff3d'} : {}}>
                {props.value}
            </li>
};

class GuidanceLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.handleListItemChange = this.handleListItemChange.bind(this);
    };

    handleListItemChange(index) {
        this.props.select(index);
    }

    render() {
        const names = this.props.names;
        return (
            <ul className="side-ul">
                {names.map((name) =>
                    <ListItem key={name.id}
                              id={name.id}
                              value={name.name}
                              isSelect={name.select}
                              changeItem={this.handleListItemChange}/>
                )}
            </ul>
        )
    }
}

const names = [
    {id: 1, name: 'PropTypes检查(PropTypes)', title: 'propType'},
    {id: 2, name: 'Refs & DOM(Refs-DOM)', title: 'RefsDom'},
    {id: 3, name: '非受控组件(Comp-UnControl)', title: 'unControl'},
    {id: 4, name: '性能优化(Optimize Update)', title: 'update'},
    {id: 5, name: 'Reconciliation', title: 'reconciliation'},
    {id: 6, name: 'Context', title: 'context'},
    {id: 7, name: 'Web Components', title: 'web-components'},
    {id: 8, name: '高阶组件(Higher Components)', title: 'higher-components'},
    {id: 9, name: '与第三方库协同(Other Libraries)', title: 'other-libraries'},
    {id: 10, name: '可访问性(Accessibility)', title: 'accessibility'},
    {id: 11, name: '案例-评论高级(demo)', title: 'commentDemo'}
];

class SeniorGuidance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            names: names
        };
        this.initChange = this.initChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
        let title = window.location.hash;

        this.state.names.map((name, index) => {
            delete name.select;
            if (title.indexOf(name.title) > -1) {
                name.select = true;
                this.props.selectChange(index + 1);
            }
        })
    }

    handleSelect = (key) => {
        this.props.selectChange(key);
        this.state.names.map((nameSelect, index) => {
            if (key - 1 === index) {
                nameSelect.select = true;
                hashHistory.push(`/concept/${nameSelect.title}`);
            }
            else {
                delete nameSelect.select;
            }
        });
        this.setState({
            names: this.state.names
        });
    };

    initChange = () => {
        this.props.selectChange();
        hashHistory.push('/concept');
        this.state.names.map((name) => {
            delete name.select;
        });
        this.setState({
            names: this.state.names
        });
    };

    render() {
        const { names } = this.state;
        return(
            <div>
                <a onClick={this.initChange}><h3>高级指引</h3></a>
                <GuidanceLists
                    names={names}
                    select={this.handleSelect}
                />
            </div>
        )
    }
}

export default SeniorGuidance;

