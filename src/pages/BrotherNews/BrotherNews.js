import React, {Component} from 'react';
import { Link, Route, Switch, matchPath } from 'react-router-dom';
import './BrotherNews.less';
import PropTypes from 'prop-types';
import NewsContent from './../../pagesSub/BrotherNews/NewsContent'


// const Category = ({ match }) => {
//     const { value } = this.props;
//     return (
//         <div>
//             <Link to={`${match.url}/${value.name}`}>{value.content}</Link>
//             <Route path={`${match.path}/:name`}
//                    render= {({match}) =>(
//                        <div>
//                            <h3> {match.params.name}</h3>
//                        </div>
//                    )
//             }/>
//         </div>
//     )
// }

const BrotherNews = ({ match }) => {
    const news = [
        {id: 1, content: 'Context(上下文)', name: 'context'},
        {id: 2, content: 'Publish-Subscribe(发布订阅)', name: 'PubSub'},
        {id: 3, content: 'events(自定义事件的方式)', name: 'events'}
    ];

    const linkList = news.map((value, index) => {
        return(
            <li key={value.id}>
                <Link to={`${match.url}/${news[index].name}`}>
                    {value.content}
                </Link>
            </li>
        )
    });

    return(
        <div>
            <div className="brother-news">
                <div className="brother-left">

                    <h5> 兄弟组件之间通信(<span>不包含by父组件</span>)</h5>
                    <ul> {linkList} </ul>
                </div>
            </div>

            <Switch>
                <Route path={`${match.url}/:value`} render={() => (
                    <div style={{ textAlign:'center'}}>Please select a product.</div>
                )}/>
            </Switch>

        </div>

    )

};
export default BrotherNews;

// const news = [
//     {id: 1, content: 'Context(上下文)', name: 'context'},
//     {id: 2, content: 'Publish-Subscribe(发布订阅)', name: 'PubSub'},
//     {id: 3, content: 'events(自定义事件的方式)', name: 'events'}
// ];

// export default class BrotherNews extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             news: news,
//             key: 1
//         };
//         this.handleChange = this.handleChange.bind(this);
//     }
//
//     componentWillMount = () => {
//
//     };
//
//     handleChange = () => {
//
//     };
//
//     render() {
//
//         const { news, key } = this.state;
//         return (
//             <div className="brother-news">
//                <div className="brother-left">
//                    <h5>兄弟组件之间通信(<span>不包含by父组件</span>)</h5>
//                    <ul>
//                        {news.map(
//                            value => <li key={value.id} onClick={this.handleChange}>{value.content}</li>
//                        )}
//                    </ul>
//                </div>
//                 <div className="brother-right">
//                     <h4>React 兄弟组件之间通信方法</h4>
//                     <NewsContent newsData={news} showKey={key}/>
//                 </div>
//             </div>
//         );
//     }
// }
//
// BrotherNews.propTypes = {
//     news: PropTypes.array
// };
