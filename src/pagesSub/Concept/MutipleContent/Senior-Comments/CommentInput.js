import React, { Component } from 'react';
import wrapWithLoadData from './wrapWithLoadData';
import PropTypes from 'prop-types';

class CommentInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: props.data || '',
            comment: '',
            date: ''
        };
        this.handleUsernameBlur = this.handleUsernameBlur.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleContentChange = this.handleContentChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount () {
        this.textarea.focus()
    };

    handleUsernameBlur (e) {
        this.props.saveData(e.target.value);
    };

    handleUsernameChange (e) {
        this.setState({
            userName: e.target.value
        })
    }

    handleContentChange (e) {
        this.setState({
            content: e.target.value
        })
    }

    handleSubmit () {
        if (this.props.onSubmit) {
            this.props.onSubmit({
                userName: this.state.userName,
                content: this.state.content,
                date: +new Date(),
                createdTime: +new Date()
            })
        }
        this.setState({
            content: '',
            date: ''
        })
    }

    render () {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input
                            value={this.state.userName}
                            onBlur={this.handleUsernameBlur}
                            onChange={this.handleUsernameChange} />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
             <textarea
                 ref={(textarea) => this.textarea = textarea}
                 value={this.state.content}
                 onChange={this.handleContentChange} />
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

CommentInput = wrapWithLoadData(CommentInput, 'userName');

CommentInput.propTypes = {
    onSubmit: PropTypes.func,
    data: PropTypes.any,
    saveData: PropTypes.func
};

export default CommentInput;
