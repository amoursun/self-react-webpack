import React, {Component} from 'react';
import './About.less';
import ColorShow from '../../pagesSub/About/ColorShow';
import SiderBlog from '../../pagesSub/About/SiderBlog';

class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: ''
        };
        this.show = this.show.bind(this);
    }

    show (key) {
        this.setState({
            key: key
        })
    }

    render() {
        return (
            <div className="about">
                <SiderBlog showId={this.state.key} showChange={this.show}/>
                <ColorShow num={this.state.key} />
            </div>
        );
    }
}

export default About;
