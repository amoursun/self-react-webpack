import React, {Component} from 'react';
import axios from 'axios';
import {Alert, Col, Pagination, Row} from 'react-bootstrap';
import {filterData, filterTotalNum} from '../../../containers/util';
import {hashHistory} from 'react-router';

export default class Generate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataNum: [],
            pageTotol: '',
            pageNumber: ''
        };
        this.handleChangePage = this.handleChangePage.bind(this);
    };

    componentDidMount() {
        let hash = window.location.hash;
        var isPage = '', name = '';
        if (hash.indexOf('?') > -1) {
            name = hash.substring(hash.indexOf('/') + 1, hash.indexOf('?'));
            isPage = isPage = +hash.substring(hash.indexOf('=') + 1);
        }
        else {
            name = hash.substring(hash.indexOf('/') + 1);
        }
        axios.get(`/data/generate.json`) //json-server generate.js 没启动
            .then((res) => {
                let pageNumber = '';
                if (res.data.data.length === 0) {
                    return false;
                }
                else {
                    // pageNumber =  isPage !== 1 ? isPage : 1;
                    pageNumber =  isPage;
                }
                let totalNum = filterTotalNum(res.data.data, 10);
                let dataNum = filterData(res.data.data, 10, pageNumber);
                isPage === pageNumber ? '' : hashHistory.push(`${name}?page=${pageNumber}`);
                this.setState({
                    data: res.data.data,
                    dataNum: dataNum,
                    pageTotol: totalNum,
                    pageNumber: pageNumber
                });
            });
        // axios.get(`http://localhost:3000/people`) //mock下 json-server generate.js 启动
        //     .then((res) => {
        //         this.setState({
        //             data: res.data
        //         });
        //     });
    };

    handleChangePage(num) {
        const { data, pageNumber } = this.state;
        let hash = window.location.hash;
        let name = hash.substring(hash.indexOf('/') + 1, hash.indexOf('?'));
        if (pageNumber === num) {
            return false;
        }
        else {
            let dataNum = filterData(data, 10, num);
            hashHistory.push(`${name}?page=${num}`);
            this.setState({
                dataNum: dataNum,
                pageNumber: num
            });
        }
    }

    render() {
        const { data, dataNum, pageTotol, pageNumber } = this.state;
        const errorMsg = data.length === 0;
        const isEmpty = data.length === 0;
        const container = (
            errorMsg ? <Alert bsStyle="warning"><strong>数据加载失败，真相只有一个！</strong>请检查你的网络状态</Alert> :
                            <Col md={12}>
                                { dataNum.map(info => <span key={info.id}><img src={info.avatar} alt={info.name}/>{info.name}</span>)}
                                {isEmpty ? '' : <div className="generate-pagination"><Pagination prev="上一页" next="下一页"
                                                                                               onSelect={this.handleChangePage}
                                                                                               maxButtons={6} items={pageTotol}
                                                                                               activePage={pageNumber}/></div>}
                            </Col>

        );
        return (
            <div className="generate">
                <Row>{container}</Row>
            </div>
        )
    }
}