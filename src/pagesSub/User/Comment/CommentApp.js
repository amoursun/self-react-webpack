import React, {Component} from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

// const comments = [
//     {username: 'Jerry', content: '练兵备战强势推进，训战一体疾风劲吹', date: 15000020338353},
//     {username: 'Tomy', content: '聚力打仗主责主业，上下同欲真抓实备', date: 15000020338353},
//     {username: 'Lucy', content: '能力重塑利箭在弦，一声令下战则必胜', date: 15000020338353}
// ];

class CommentApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
            // comments: comments || []
        };
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidMount() {
        //读取文件/接口
        fetch('public/data/Comment.json', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.setState({
                    comments: data
                });
            });
    };

    handleSubmitComment(comment) {
        if (!comment) return;
        if (!comment.username) return alert('请输入用户名');
        if (!comment.content) return alert('请输入评论内容');

        this.state.comments.push(comment);
        this.setState({
            comments: this.state.comments
        });
    }

    handleClose(closeId) {
        this.state.comments.splice(closeId.i, 1);
        this.setState({
            comments: this.state.comments
        });
    }

    render() {
        return (
            <div className="user-right">
                <div className="wrapper">
                    <CommentInput onSubmit={this.handleSubmitComment}/>
                    <CommentList comments={this.state.comments} onClose={this.handleClose}/>
                </div>
            </div>
        )
    }
}

export default CommentApp;
