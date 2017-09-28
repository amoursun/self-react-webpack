import React, {Component} from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';
import PropTypes from 'prop-types';
import wrapWithLoadData from './wrapWithLoadData';


class CommentsCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            commentDatas: []
        };
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
    }

    componentWillMount () {
        this._loadComments()
    }

    _loadComments () {
        let commentDatas = localStorage.getItem('commentDatas');
        if (commentDatas) {
            commentDatas = JSON.parse(commentDatas);
            this.setState({
                commentDatas: commentDatas
            })
        }
    }

    _saveComments (commentDatas) {
        localStorage.setItem('commentDatas', JSON.stringify(commentDatas));
    }

    handleSubmitComment(commentData) {
        if (!commentData) return;
        if (!commentData.username) return alert('请输入用户名');
        if (!commentData.content) return alert('请输入评论内容');
        const commentDatas = this.state.commentDatas;
        commentDatas.push(commentData);
        this.setState({
            commentDatas: commentDatas
        });
        this._saveComments(commentDatas);
    }

    handleDeleteComment (index) {
        const commentDatas = this.state.commentDatas;
        commentDatas.splice(index, 1);
        this.setState({
            commentDatas: commentDatas
        });
        this._saveComments(commentDatas);
    }

    render() {
        return (
            <div className="comments-center-one">
                <h5>无 Redux 状态管理</h5>
                <CommentInput onSubmit={this.handleSubmitComment}/>
                <CommentList
                    commentDatas={this.state.commentDatas}
                    onDeleteComment={this.handleDeleteComment}/>
            </div>
        )
    }
}
CommentsCenter.propTypes = {
    data: PropTypes.any,
    saveData: PropTypes.func.isRequired
};

CommentsCenter = wrapWithLoadData(CommentsCenter, 'commentDatas');

export default CommentsCenter;