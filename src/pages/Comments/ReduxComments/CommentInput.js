import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CommentInput from '../../../pagesSub/Comments/CommentInput'
import { addComment } from '../../../reducers/comments'

class CommentInputContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: props.comments || '',
            content: '',
            date: ''
        };
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this._saveUsername = this._saveUsername.bind(this);
    }

    componentWillMount () {
        this._loadUsername()
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

    handleSubmitComment (comment) {
        if (!comment) return;
        if (!comment.username) return alert('请输入用户名');
        if (!comment.content) return alert('请输入评论内容');
        const { comments } = this.props;
        const newComments = [...comments, comment];
        localStorage.setItem('comments', JSON.stringify(newComments));
        if (this.props.onSubmit) {
            this.props.onSubmit(comment)
        }
    }

    render () {
        return (
            <CommentInput
                username={this.state.username}
                onUserNameInputBlur={this._saveUsername}
                onSubmit={this.handleSubmitComment} />
        )
    }
}

CommentInputContainer.propTypes = {
    onSubmit: PropTypes.func,
    data: PropTypes.any,
    saveData: PropTypes.func
};
const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onSubmit: (comment) => {
            dispatch(addComment(comment))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentInputContainer);

