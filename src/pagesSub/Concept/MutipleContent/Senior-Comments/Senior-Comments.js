import React, { Component } from 'react';
import CommentInput from './Senior-Comments/CommentInput';
import CommentList from './Senior-Comments/CommentList';
import wrapWithLoadData from './Senior-Comments/wrapWithLoadData';
import PropTypes from 'prop-types';
import './Senior-Comments.less';

class SeniorComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: props.data || []
        };
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
    };

    handleSubmitComment (comment) {
        if (!comment) return;
        if (!comment.userName) return alert('请输入用户名');
        if (!comment.content) return alert('请输入评论内容');
        const comments = this.state.comments;
        comments.push(comment);
        this.setState({ comments: comments });
        this.props.saveData(comments);
    }

    handleDeleteComment (index) {
        const comments = this.state.comments;
        comments.splice(index, 1);
        this.setState({ comments: comments });
        this.props.saveData(comments);
    }

    render() {
        return (
            <div className="senior-comments">
                <h5>SeniorComments</h5>
                <CommentInput onSubmit={this.handleSubmitComment} />
                <CommentList
                    comments={this.state.comments}
                    onDeleteComment={this.handleDeleteComment} />
            </div>
        )
    }
}

SeniorComments.propTypes = {
    data: PropTypes.any,
    comments: PropTypes.array,
    saveData: PropTypes.func
};

SeniorComments = wrapWithLoadData(SeniorComments, 'comments');

export default SeniorComments;

