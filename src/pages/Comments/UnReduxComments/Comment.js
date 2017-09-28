import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Util from './../../../containers/util';

class Comment extends Component {

    constructor(props) {
        super(props);
        this.state = {
            timeString: ''
        };
        this.handleDeleteComment = this.handleDeleteComment.bind(this);
    }

    componentWillMount() {
        this._updateTimeString()
        this._timer = setInterval(
            this._updateTimeString.bind(this),
            5000
        )
    }

    componentWillUnmount() {
        clearInterval(this._timer);
    }

    _updateTimeString() {
        const commentData = this.props.commentData;
        const duration = (+Date.now() - commentData.createdTime) / 1000;
        this.setState({
            timeString: Util.ChangeTime(duration)
        })
    }

    _getProcessedContent(content) {
        return content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")
            .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }

    handleDeleteComment() {
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(this.props.index)
        }
    }

    render() {
        const commentData = this.props.commentData;
        return (
            <div className='comment'>
                <div className='comment-user'>
                    <span className='comment-username'>
                        {commentData.username}
                    </span> ：
                    <span>{moment(commentData.date).format('DD-MMM-YY HH:mm:ss')}</span>
                </div>
                <p dangerouslySetInnerHTML={{
                    __html: this._getProcessedContent(commentData.content)
                }}/>
                <span className='comment-createdtime'>
                    {this.state.timeString}
                </span>
                <span
                    onClick={this.handleDeleteComment}
                    className='comment-delete'>
                    删除
                </span>
            </div>
        )
    }
}

Comment.propTypes = {
    commentData: PropTypes.object,
    onDeleteComment: PropTypes.func,
    index: PropTypes.number
}

export default Comment
