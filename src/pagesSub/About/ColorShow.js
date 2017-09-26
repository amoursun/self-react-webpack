import React, {Component} from 'react';


function ListItem(props) {
    const colorStyle = {
        listStyle: 'none',
        backgroundColor: props.value,
        height: '55px',
        lineHeight: '55px',
        color: '#fff'
    };
    return <li style={colorStyle}>{props.value}</li>;
}

function SingleList(props) {
    const colorStyle = {
        backgroundColor: props.value,
        height: '600px',
        lineHeight: '600px',
        margin: '0 auto',
        color: '#fff',
        fontSize: '30px',
        fontWeight: 700
    };
    return <div style={colorStyle}>{props.value}</div>;
}

function ColorLists(props) {

    if (!props.showColorId) {
        const colors = props.colors;
        return (
            <div>
                {colors.map((number, index) =>
                    <ListItem key={index} value={number} />
                )}
            </div>
        );
    }
    else {
        return (
            <SingleList value={props.colors[props.showColorId - 1]}/>
        );
    }

};

const colors = ['red', 'orange', 'yellow', 'purple', 'green', 'blue', '#1a498e', '#daa520', 'coral', 'aqua', 'navy'];

class ColorShow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="about-right">
                <ColorLists colors={colors} showColorId={this.props.num}/>
            </div>
        )
    }
}

export default ColorShow;