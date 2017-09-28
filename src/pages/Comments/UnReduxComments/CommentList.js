import React, {Component} from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

class CommentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            commentDatas: []
        };
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
    }

    handleDeleteComment (index) {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }

    render() {
        return (
            <div className="comment-list">
                {this.props.commentDatas.map((commentData, i) =>
                    <Comment
                        commentData={commentData}
                        key={i}
                        index={i}
                        onDeleteComment={this.handleDeleteComment} />
                )}
            </div>
        )
    }
}

CommentList.propTypes = {
    commentDatas: PropTypes.array,
    onDeleteComment: PropTypes.func
};

export default CommentList
