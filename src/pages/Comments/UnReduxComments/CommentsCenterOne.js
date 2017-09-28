import React, {Component} from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import PropTypes from 'prop-types';
import wrapWithLoadData from './wrapWithLoadData';


class CommentsCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
    }

    componentWillMount () {
        this._loadComments()
    }

    _loadComments () {
        let comments = localStorage.getItem('comments');
        if (comments) {
            comments = JSON.parse(comments);
            this.setState({
                comments: comments
            })
        }
    }

    _saveComments (comments) {
        localStorage.setItem('comments', JSON.stringify(comments));
    }

    handleSubmitComment(comment) {
        if (!comment) return;
        if (!comment.username) return alert('请输入用户名');
        if (!comment.content) return alert('请输入评论内容');
        const comments = this.state.comments;
        comments.push(comment);
        this.setState({
            comments: comments
        });
        this._saveComments(comments);
    }

    handleDeleteComment (index) {
        const comments = this.state.comments;
        comments.splice(index, 1);
        this.setState({
            comments: comments
        });
        this._saveComments(comments);
    }

    render() {
        return (
            <div className="comments-center-one">
                <h5>无 Redux 状态管理</h5>
                <CommentInput onSubmit={this.handleSubmitComment}/>
                <CommentList
                    comments={this.state.comments}
                    onDeleteComment={this.handleDeleteComment}/>
            </div>
        )
    }
}
CommentsCenter.propTypes = {
    data: PropTypes.any,
    saveData: PropTypes.func.isRequired
};

CommentsCenter = wrapWithLoadData(CommentsCenter, 'comments');

export default CommentsCenter;