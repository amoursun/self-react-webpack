import React, { Component } from 'react';
import axios from 'axios';

export default class Generate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    };

    componentDidMount() {
            // axios.get(`http://localhost:3000/people`) //mock下 json-server generate.js 启动
            //     .then((res) => {
            //         this.setState({
            //             data: res.data
            //         });
            //     });
            axios.get(`/data/generate.json`) //json-server generate.js 没启动
                .then((res) => {
                    this.setState({
                        data: res.data.data
                    });
                });
    };

    render() {
        const { data } = this.state;
        return (
            <div className="generate">
                { data.map(info =>
                    <span key={info.id}>
                        <img src={info.avatar} alt={info.name}/>
                        {info.name}
                    </span>
                )}
            </div>
        )
    }
}