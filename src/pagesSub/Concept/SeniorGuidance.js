import React, {Component} from 'react';


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
    {id: 1, name: 'Refs & DOM(Refs-DOM)', title: 'one'},
    {id: 2, name: '非受控组件(Comp-UnControl)', title: 'two'},
    {id: 3, name: '性能优化(Optimize Update)', title: 'three'},
    {id: 4, name: 'Reconciliation', title: 'four'},
    {id: 5, name: 'Context', title: 'five'},
    {id: 6, name: 'Web Components', title: 'six'},
    {id: 7, name: '高阶组件(Higher Components)', title: 'seven'},
    {id: 8, name: '与第三方库协同(Other Libraries)', title: 'eight'},
    {id: 9, name: '可访问性(Accessibility)', title: 'nine'},
    {id: 10, name: '案例-评论高级(demo)', title: 'ten'}
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

    // componentWillMount() {
    //     this.state.names.map((name) => {
    //
    //     })
    // }

    handleSelect(key) {
        this.props.selectChange(key);
        this.state.names.map((nameSelect, index) => {
            if (key - 1 === index) {
                nameSelect.select = true;
            }
            else {
                delete nameSelect.select;
            }
        });
        this.setState({
            names: this.state.names
        });
    }

    initChange() {
        this.props.selectChange();
        this.state.names.map((name) => {
            name.select = false;
        })
        this.setState({
            names: this.state.names
        });
    }

    render() {
        return(
            <div>
                <a onClick={this.initChange}><h3>高级指引</h3></a>
                <GuidanceLists
                    names={this.state.names}
                    select={this.handleSelect}
                />
            </div>
        )
    }
}

export default SeniorGuidance;

