import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import comments from '../../../reducers/comments'
import CommentInput from './CommentInput';
import CommentList from './CommentList';

let store = createStore(comments);

class CommentsCenterApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className='comments-center-two'>
                    <h5>Redux 状态管理</h5>
                    <CommentInput />
                    <CommentList />
                </div>
            </Provider>
        )
    }
}

export default CommentsCenterApp;
