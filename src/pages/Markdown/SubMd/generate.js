import React, {Component} from 'react';
import axios from 'axios';
import {
    Alert,
    ButtonToolbar,
    Col,
    DropdownButton,
    MenuItem,
    Pagination,
    Row
} from 'react-bootstrap'; //要index.html 引入bootstrap.min.css样式才起作用
import {filterData, filterTotalNum} from '../../../containers/util';
import {hashHistory} from 'react-router';

// 每页显示数
const sizes = [
    {id: 1, size: 10},
    {id: 2, size: 20},
    {id: 3, size: 30},
    {id: 4, size: 40},
    {id: 5, size: 50}
];

export default class Generate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataNum: [],
            pageTotol: '',
            pageNumber: 1,
            pageSize: 10,
            openBol: false
        };
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangePageSizeSelect = this.handleChangePageSizeSelect.bind(this);
        this.handleChangePageSizeToggle = this.handleChangePageSizeToggle.bind(this);
    };

    componentDidMount() {
        let hash = window.location.hash;
        var isPage = '', name = '', isPageSize = '';
        if (hash.indexOf('?') > -1) {
            name = hash.substring(hash.indexOf('/') + 1, hash.indexOf('?'));
            isPage = +hash.substring(hash.indexOf('=') + 1, hash.indexOf('&'));
            isPageSize = +hash.substring(hash.indexOf('&') + 1);
        }
        else {
            name = hash.substring(hash.indexOf('/') + 1);
        }

        // axios.get(`http://localhost:3000/people`) //mock下 json-server generate.js 启动
        //     .then((res) => {
        //         var result = res.data;
        axios.get(`/data/generate.json`) //json-server generate.js 没启动
            .then((res) => {
                var result = res.data.data;
                result.map(val => val.name = val.name + ' = ' + (++val.id));
                let { pageNumber, pageSize } = this.state;
                if (result.length === 0) {
                    return false;
                }
                else {
                    pageNumber = isPage ? Number(isPage) : 1;
                    pageSize = isPageSize ? Number(isPageSize) : 10;
                }
                let totalNum = filterTotalNum(result, pageSize);
                let dataNum = filterData(result, pageSize, pageNumber);
                isPage === pageNumber ? '' : hashHistory.push(`${name}?page=${pageNumber}&${pageSize}`);
                this.setState({
                    data: result,
                    dataNum: dataNum,
                    pageTotol: totalNum,
                    pageNumber: pageNumber,
                pageSize: pageSize
                });
            });
    };

    handleChangePage(num) {
        const { data, pageNumber, pageSize } = this.state;
        let hash = window.location.hash;
        let name = hash.substring(hash.indexOf('/') + 1, hash.indexOf('?'));
        if (pageNumber === num) {
            return false;
        }
        else {
            let dataNum = filterData(data, pageSize, num);
            hashHistory.push(`${name}?page=${num}&${pageSize}`);
            this.setState({
                dataNum: dataNum,
                pageNumber: num
            });
        }
    }

    handleChangePageSizeSelect(id) {
        const { data, pageSize } = this.state;
        let hash = window.location.hash;
        let isPage = +hash.substring(hash.indexOf('=') + 1);
        let name = hash.substring(hash.indexOf('/') + 1, hash.indexOf('?'));
        if (pageSize !== id) {
            sizes.map(s => {
                if (s.id === id) {
                    let [newData, newPageTotol] = [filterData(data, s.size, 1), filterTotalNum(data, s.size)];
                    isPage === 1 ? '' : hashHistory.push(`${name}?page=1&${s.size}`);
                    this.setState({
                        dataNum: newData,
                        pageTotol: newPageTotol,
                        pageNumber: 1,
                        pageSize: s.size
                    })
                }
            });
        }

        this.handleChangePageSizeToggle(true);
    }

    handleChangePageSizeToggle(bol) {
        this.setState({
            openBol: bol
        });
    }

    render() {
        const { data, dataNum, pageTotol, pageNumber, pageSize, openBol } = this.state;
        const errorMsg = data.length === 0;
        const isEmpty = data.length === 0;
        const container = (
            errorMsg ? <Alert bsStyle="warning"><strong>数据加载失败，真相只有一个！</strong>请检查你的网络状态</Alert> :
                            <Col md={12}>
                                { dataNum.map(info => <span key={info.id}><img src={info.avatar} alt={info.name}/>{info.name}</span>)}
                                {isEmpty ? '' :
                                    <div className="generate-pagination">
                                        <Col md={8}>
                                            <Pagination prev="上一页" next="下一页"
                                                        onSelect={this.handleChangePage}
                                                        maxButtons={6}
                                                        items={pageTotol}
                                                        activePage={pageNumber}/>
                                        </Col>
                                        <Col md={4}>
                                            <ButtonToolbar>
                                                <span className="page-show">每页显示</span>
                                                <DropdownButton bsSize="large" title={pageSize} open={openBol} onToggle={this.handleChangePageSizeToggle} onSelect={this.handleChangePageSizeSelect} id="dropdown-size-large">
                                                    {sizes.map(size => <MenuItem key={size.id} eventKey={size.id}>{size.size}</MenuItem>)}
                                                </DropdownButton>
                                            </ButtonToolbar>
                                        </Col>
                                        <div className="clear"></div>
                                    </div>
                                }
                            </Col>

        );
        return (
            <div className="generate">
                <Row>{container}</Row>
            </div>
        )
    }
}