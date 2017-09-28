import React, {Component} from 'react';
import PropTypes from 'prop-types';
import wrapWithLoadData from './wrapWithLoadData';

class CommentInput extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: props.data || '',
            content: '',
            date: ''
        };
        this.handleUsernameBlur = this.handleUsernameBlur.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount () {
        this._loadUsername()
    }

    componentDidMount () {
        this.textarea.focus()
    }

    _loadUsername () {
        const username = localStorage.getItem('username')
        if (username) {
            this.setState({ username })
        }
    }

    _saveUsername (username) {
        localStorage.setItem('username', username)
    }

    handleUsernameBlur (event) {
        this._saveUsername(event.target.value)
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleContentChange(event) {
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit() {
        if (this.props.onSubmit) {
            this.props.onSubmit({
                username: this.state.username,
                content: this.state.content,
                date: +new Date(),
                createdTime: +new Date()
            })
        }
        this.setState({
            username: '',
            content: '',
            date: ''
        })
    }

    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input
                            value={this.state.username}
                            onBlur={this.handleUsernameBlur}
                            onChange={this.handleUsernameChange}/>
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea
                            ref={(textarea) => this.textarea = textarea}
                            value={this.state.content}
                            onChange={this.handleContentChange}/>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button
                        onClick={this.handleSubmit}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}

CommentInput.propTypes = {
    onSubmit: PropTypes.func,
    data: PropTypes.any,
    saveData: PropTypes.func
}

CommentInput = wrapWithLoadData(CommentInput, 'username');

export default CommentInput
