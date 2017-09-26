import React, {Component} from 'react';


function UserGreeting(props) {
    if (props.isChange) {
        return <div className="sub-info" style={props.isSelect ? {color: '#00ff3d'} : {}} onClick={props.select.bind(this,props.selectId)}>{props.content}</div>;
    }
    else {
        return null;
    }
}

class Blog extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id: ''
        }
        this.change = this.change.bind(this);
    };

    change () {
        this.props.change(this.props.id);
    }

    render() {
        const post = this.props.post;
        return (
            <a onClick={this.change}>
                {post.title}
            </a>
        )
    }
}


const posts = [
    {id: 1, spot: false, title: 'One', content: 'Welcome Red'},
    {id: 2, spot: false, title: 'Two', content: 'Welcome Orange'},
    {id: 3, spot: false, title: 'Three', content: 'Welcome Yellow'},
    {id: 4, spot: false, title: 'Four', content: 'Welcome Purple'},
    {id: 5, spot: false, title: 'Five', content: 'Welcome Green'},
    {id: 6, spot: false, title: 'Six', content: 'Welcome blue'},
    {id: 7, spot: false, title: 'Seven', content: 'Welcome #1a498e'},
    {id: 8, spot: false, title: 'Eight', content: 'Welcome #daa520'},
    {id: 9, spot: false, title: 'Nine', content: 'Welcome Coral'},
    {id: 10, spot: false, title: 'Ten', content: 'Welcome Aqua'},
    {id: 11, spot: false, title: 'Eleven', content: 'Welcome Navy'}
];

class SiderBlog extends Component {
    constructor (props) {
        super(props);
        this.state = {
            postsState: posts,
            all: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.changeAll = this.changeAll.bind(this);
    };

    componentWillMount() {
        this.state.postsState.map((post) => {
            post.spot = this.state.all;
        })
    }

    handleChange(index) {
        this.state.postsState[index - 1].spot = !this.state.postsState[index - 1].spot;
        // if (this.state.postsState[index - 1].select) {
        //     this.state.postsState[index - 1].select = !this.state.postsState[index - 1].spot;
        // }
        this.setState({
            postsState: this.state.postsState
        });
    }

    handleSelect(key) {
        this.props.showChange(key);
        this.state.postsState.map((postSelect, index) => {
            if (key - 1 === index) {
                postSelect.select = true;
            }
            else {
                delete postSelect.select;
            }
        });
        this.setState({
            postsState: this.state.postsState
        });
    }

    changeAll() {
        this.state.postsState.map((post) => {
            post.spot = !this.state.all;
        })
        this.setState((prevState) => ({
            all: !prevState.all
        }));
    }

    render() {
        const posts = this.state.postsState;
        return (
            <div className="about-left">
                <a className="a" onClick={this.changeAll}>Adjust all</a>
                <ul>
                    {posts.map((post) =>
                        <li key={post.id}>
                            <Blog id={post.id}
                                  post={post}
                                  change={this.handleChange}/>
                            <UserGreeting
                                isChange={post.spot}
                                content={post.content}
                                selectId={post.id}
                                isSelect={post.select}
                                select={this.handleSelect}/>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

export default SiderBlog;