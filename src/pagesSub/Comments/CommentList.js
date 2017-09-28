import React, {Component} from 'react';
import Comment from './Comment';
import PropTypes from 'prop-types';

class CommentList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
    }

    handleDeleteComment (index) {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index);
        };
    }

    render() {
        return (
            <div className="comment-list">
                {this.props.comments.map((comment, i) =>
                    <Comment
                        comment={comment}
                        key={i}
                        index={i}
                        onDeleteComment={this.handleDeleteComment} />
                )}
            </div>
        )
    }
}

CommentList.propTypes = {
    comments: PropTypes.array,
    onDeleteComment: PropTypes.func
};

export default CommentList;
