import React, {Component} from 'react';
import './BrotherNews.less';
import PropTypes from 'prop-types';
import { hashHistory} from 'react-router';
import NewsContent from './../../pagesSub/BrotherNews/NewsContent'

const news = [
    {id: 1, content: 'Context(上下文)', name: 'context'},
    {id: 2, content: 'Publish-Subscribe(发布订阅)', name: 'PubSub'},
    {id: 3, content: 'events(自定义事件的方式)', name: 'events'},
    {id: 4, content: 'Redux & transdux', name: 'transduxAndRedux'}
];

// const Item = (props) => {
//     const { id, value, handleChange } = props;
//     let newColor = {
//         color: 'red'
//     };
//     return <li onClick={handleChange.bind(this, id)} style={value.select ? newColor : {}}>{value.content}</li>;
// };

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
        const { key, news } = this.state;
        let name = window.location.hash.substring(window.location.hash.lastIndexOf('/') + 1);
        name === 'brotherNews' ? this.showSingle(news) : this.showMany(news, name);
    };

    showSingle = (news) => {
        news[0].select = true;
        hashHistory.push(`/brotherNews/${news[0].name}`);
    }

    showMany = (news, name) => {
        news.map(value => {
            delete value.select;
            if (name.indexOf(value.name) > -1) {
                value.select = true;
                this.setState({key: value.id});
            }

        });
    };

    // handleChange = (infoIndex) => {
    //     const { key, news } = this.state;
    //     news.map(value => {
    //         delete value.select;
    //         infoIndex === value.id ? value.select = true : ''
    //     });
    //     this.setState({
    //         key: infoIndex
    //     });
    // };
    handleChange = (e) => {
        // e.target 获取当前标签上的信息
        news.map(value => {
            delete value.select;
            +e.target.id === value.id ? this.showHash(value) : '';
        });
        this.setState({
            key: +e.target.id
        });
    };

    showHash = (item) => {
        item.select = true;
        hashHistory.push(`/brotherNews/${item.name}`);
    }

    render() {

        const { news, key } = this.state;
        return (
            <div className="brother-news">
               <div className="brother-left">
                   <h5>兄弟组件之间通信(<span>不包含by父组件</span>)</h5>
                   <ul>
                       {news.map(
                           // value => <Item key={value.id} id={value.id} handleChange={this.handleChange} value={value} />
                           value => <li key={value.id} id={value.id} onClick={this.handleChange} style={value.select ? {color: 'red'} : {}}>{value.content}</li>
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
