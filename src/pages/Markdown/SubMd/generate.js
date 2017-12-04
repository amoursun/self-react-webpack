import React, { Component } from 'react';
import axios from 'axios';

function Item(props) {
    let info = props.value;
    return <span><img src={info.avatar} alt={info.name}/>{info.name}</span>;
}

export default class Generate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    };

    componentDidMount() {
        try {
            axios.get(`http://localhost:3000/people`) //mock下 json-server generate.js 启动
                .then((res) => {
                    this.setState({
                        data: res.data
                    });
                });
        }
        catch (e) {
            axios.get(`/data/generate.json`) //json-server generate.js 没启动
                .then((res) => {
                    this.setState({
                        data: res.data.data
                    });
                });
        }
    };

    render() {
        const { data } = this.state;
        console.log(data)
        // let InfoItem = (
        //     data.map(info => {
        //         <span key={info.id}>
        //             <img src={info.avatar} alt={info.name}/>
        //             {info.name}
        //         </span>
        //     })
        // );
        return (
            <div className="generate">
                {/*{ InfoItem }*/}
                {data.map(info => <Item key={info.id} value={info} />)}
            </div>
        )
    }
}