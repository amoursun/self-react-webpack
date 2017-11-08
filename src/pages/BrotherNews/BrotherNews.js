import React, {Component} from 'react';
import './BrotherNews.less';
import PropTypes from 'prop-types';
import NewsContent from './../../pagesSub/BrotherNews/NewsContent'

const news = [
    {id: 1, content: 'Context(上下文)', name: 'context'},
    {id: 2, content: 'Publish-Subscribe(发布订阅)', name: 'PubSub'},
    {id: 3, content: 'events(自定义事件的方式)', name: 'events'}
];

export default class BrotherNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: news,
            key: 1
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentWillMount = () => {

    };

    handleChange = () => {

    };

    render() {

        const { news, key } = this.state;
        return (
            <div className="brother-news">
               <div className="brother-left">
                   <h5>兄弟组件之间通信(<span>不包含by父组件</span>)</h5>
                   <ul>
                       {news.map(
                           value => <li key={value.id} onClick={this.handleChange}>{value.content}</li>
                       )}
                   </ul>
               </div>
                <div className="brother-right">
                    <h4>React 兄弟组件之间通信方法</h4>
                    <NewsContent newsData={news} showKey={key}/>
                </div>
            </div>
        );
    }
}

BrotherNews.propTypes = {
    news: PropTypes.array
};
