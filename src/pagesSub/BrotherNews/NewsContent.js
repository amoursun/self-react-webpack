import React, {Component} from 'react';
import Context from './Context/Context';
import Events from './Events/Events';
import PubSub from './PubSub/PubSub';

export default class NewsContent extends Component {

    render() {
        const { newsData, showKey} = this.props;
        return (
            <div className="brother-content">
                <h5>兄弟组件通信 <span>{newsData[showKey - 1].content}</span> 方法: </h5>
                {
                    showKey === 1 ? <Context /> :
                        showKey === 2 ? <PubSub /> : <Events />
                }
            </div>
        )
    }
}