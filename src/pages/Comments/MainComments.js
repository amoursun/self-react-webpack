import React, {Component} from 'react';
import './MainComments.less';
import CommentsCenterOne from './UnReduxComments/CommentsCenterOne';
import CommentsCenterTwo from './ReduxComments/CommentsCenterTwo';
import { hashHistory } from 'react-router';


class ShowComment extends Component {
    constructor(props) {
        super(props);
    };
    render() {
        return (
            <div className="main-right">
                {this.props.id === 1 ? <CommentsCenterOne /> :
                            (this.props.id === 2 ? <CommentsCenterTwo /> : null)}
            </div>
        )
    }
}

function List(props) {
    return <li
        onClick={props.handleSelect.bind(this, props.id)}
        style={props.isSelect ? {color: '#979c12'} : {}}>
            {props.value}
        </li>;
}

const reduxCodes = [
    {id: 1, content: '无 Redux 状态管理', name: 'unredux'},
    {id: 2, content: 'Redux 状态管理', name: 'redux'}
];

class MainComments extends Component {

    constructor(props) {
        super(props);
        this.state = {
            reduxs: reduxCodes,
            id: 1
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    componentWillMount() {
        const { reduxs } = this.state;
        let name = window.location.hash;
        let id = '';

        reduxs.map((redux) => {
            redux.select = '';
            if (name.indexOf(redux.name) > -1) {
                redux.select = true;
                id = redux.id;
                this.setState({ id: redux.id });
            }
        })

        id ? '' : reduxs[0].select = true;
        id ? '' : hashHistory.push(`/comments/${reduxs[0].name}`);
    }

    handleSelect(index) {
        this.state.reduxs.map((redux) => {
            if (redux.id === index) {
                redux.select = true;
                hashHistory.push(`/comments/${redux.name}`);
            }
            else {
                redux.select = '';
            }
        });
        this.setState({
            reduxs: this.state.reduxs,
            id: index
        })
    }

    render() {
        const reduxs = this.state.reduxs;
        return (
            <div className="main-comments">
                <div className="main-left">
                    <h3>Redux管理</h3>
                    <ul>
                        {reduxs.map((redux) =>
                            <List key={redux.id}
                                  id={redux.id}
                                  isSelect={redux.select}
                                  handleSelect={this.handleSelect} value={redux.content} />
                        )}
                    </ul>
                </div>
                <ShowComment id={this.state.id}/>
                <div className="clear"></div>
            </div>
        )
    }
}

export default MainComments;
