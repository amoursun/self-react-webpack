import React, {Component} from 'react';
import axios from 'axios';

function OptionsList(props) {

    return (
        <div>
            <label>
                <select value={props.value} onChange={props.handleChange}>
                    {
                        props.options.map((option) =>
                            <option value={option.optionName} key={option.id}>{option.optionName}</option>
                        )
                    }
                </select>
            </label>
        </div>
    );
};

class UserSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: [],
            optionName: '',
            userName: 'ganyanlin'
        }
        ;
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios.get(`/data/userSelect.json`)
            .then((res) => {
                let data = res.data;
                this.setState({
                    options: data.options,
                    optionName: '',
                    userName: data.userName
                });
            });
    };

    handleInputChange(e) {
        this.setState({
            userName: e.target.value
        });
    }
    handleSelectChange(e) {
        this.setState({
            optionName: e.target.value
        });
    }

    handleSubmit(e) {
        const { optionName, userName } = this.state;
        if (optionName && optionName !== '请选择') {
            alert(userName + ', Your favorite flavor is: ' + optionName);
        }
        else {
            alert('Warning: ' + userName + ', please select your favorite city');
        }
        e.preventDefault();
    }

    render() {
        const { options, optionName, userName } = this.state;
        return (
            <div className="user-left">
                <h3>UserName: { userName }</h3>
                <form onSubmit={this.handleSubmit}>
                    <OptionsList options={options} handleChange={this.handleSelectChange} value={options.length > 0 ? (optionName || options[0].optionName) : ''}/>
                    <label>
                        Name:
                        <input type="text" value={ userName } onChange={this.handleInputChange} />
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }
}

export default UserSelect;
