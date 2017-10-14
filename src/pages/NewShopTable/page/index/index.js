import React, { Component } from 'react';
import { fromJS, Map } from 'immutable';
import './index.less';
import Perf from 'react-addons-perf';
import { Link, withRouter } from 'react-router-dom';
import { Data, dataGenerate} from './../../../TablePage/data';
import NewShopTable from '../../../../components/newShopTable/NewShopTable';

window.Perf = Perf;
class Footer extends Component {
  render() {
    const { showLoading, loading } = this.props;
    return (
      <div>
        <Link to="/newShopTable/add"><button>add</button></Link>
        <button onClick={showLoading}>{loading ? '是' : '否'}</button>
      </div>
    );
  } 
}
export default class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            data: fromJS(Data.dataSets)
            // data: Data.dataSets
        };
        this.deleteById = this.deleteById.bind(this);
        this.updateWidth = this.updateWidth.bind(this);
        this.showLoading = this.showLoading.bind(this);
    }

    componentWillMount() {

    }

    deleteById(name) {
        console.log(name);
    }

    updateWidth(data) {
        console.log(data);
    }

    showLoading() {
        this.setState((prevState, props) => ({
            loading: !prevState.loading
        }));
    }

    render() {
        const data = this.state.data;
        return (
            <div className="new-shop-table">
                <NewShopTable
                    onDelete={this.deleteById}
                    onWidthChange={this.updateWidth}
                    data={data}/>
                {withRouter(<Footer showLoading={this.showLoading} loading={this.state.loading}/>)}
            </div>
        );
    }
}

