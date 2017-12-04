import React, {Component} from 'react';
import axios from 'axios';

function OptionsList(props) {

    return (
        <div>
            <label>
                <select value={props.initValue} onChange={props.optionChange}>
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
        this.state.options.map(value => {
            value.optionName === e.target.value ? value.name = e.target.value : delete value.name;
        });
        this.setState({
            options: this.state.options
        });
    }

    handleSubmit(e) {
        const { options, userName } = this.state;
        this.value = '';
        options.map(option => {
            option.name ? this.value = option.optionName : '';
        });
        if (this.value) {
            alert(userName + ', Your favorite flavor is: ' + this.value);
        }
        else {
            alert('Warning: ' + userName + ', please select your favorite city');
        }
        e.preventDefault();
    }

    render() {
        const { options, userName } = this.state;
        let valueName = '';
        options.map(option => option.name ? valueName = option.optionName : '');
        return (
            <div className="user-left">
                <h3>UserName: { userName }</h3>
                <form onSubmit={this.handleSubmit}>
                    <OptionsList options={options} optionChange={this.handleSelectChange} initValue={options.length > 0 ? (valueName || options[0].optionName) : ''}/>
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
