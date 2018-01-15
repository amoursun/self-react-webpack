import React, { Component } from 'react';
import inMap from 'inmap';
import './Inmap.less';
import mapData from './mapData';

const data = mapData;

let inmap = new inMap.Map({
    id: 'allmap',
    skin: "Blueness",
    center: [105.403119, 38.028658],
    zoom: {
        value: 5,
        show: true,
        max: 18,
        min: 5
    }
})

let overlay = new inMap.DotOverlay({
    tooltip: {
        show: true,
        position: 'top',
        formatter: "{count}"
    },
    legend: {
        show: true,
        title: "标题",
        data: ["描述1", "描述2", "描述3", "描述4"],
        formatter: function (start, end) {
            return start + "万~" + (end || "max") + "万";
        }
    },
    style: {
        normal: {
            backgroundColor: 'rgba(200, 200, 50, 1)',
            borderWidth: 1,
            borderColor: "rgba(255,255,255,1)",
            size: 10,
        },
        mouseOver: {
            backgroundColor: 'rgba(200, 200, 200, 1)',
            borderColor: "rgba(255,255,255,1)",
            borderWidth: 4,
        },
        selected: {
            backgroundColor: 'rgba(184,0,0,1)',
            borderColor: "rgba(255,255,255,1)"
        },
        splitList: [{ //设置区间颜色
            start: 0,
            end: 2,
            size: 3,
        },
            {
                start: 2,
                end: 5,
                size: 6,
            },
            {
                start: 5,
                end: 7,
                size: 9,
            },
            {
                start: 7,
                size: 12,
            }
        ],
    },
    data: data,
    event: {
        onMouseClick: function (item, event) {
            //能获取当前点的信息
        }
    }
});
inmap.add(overlay);

export default class Inmap extends Component{
    constructor(props) {
        super(props);
        this.state = {

        };

    }


    componentDidMount () {

    }
    render () {
        return (
            <div className="in-map">
                <a href="http://www.cnblogs.com/penghuwan/p/6943260.html">当react框架遇上百度地图</a>
                <div id="allmap"></div>
            </div>
        )
    }
}