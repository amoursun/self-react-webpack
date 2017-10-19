import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false
        };
        this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this);
    };

    componentWillReceiveProps(props) {
        this.setState({
            isChecked: props.isCheckedAll
        });
    }

    toggleCheckboxChange() {
        const { handleCheckboxChange, label } = this.props;

        this.setState(({ isChecked }) => (
            {
                isChecked: !isChecked
            }
        ));

        handleCheckboxChange(label);
    };



    render() {

        const { label } = this.props;
        const { isChecked } = this.state;

        return (
            <div className="cell__child-container">
                <label>
                    <input
                        type="checkbox"
                        value={label}
                        checked={isChecked}
                        onChange={this.toggleCheckboxChange}
                    />

                    {/*{label}*/}
                </label>
            </div>
        );
    }
}
Checkbox.propTypes = {
    label: PropTypes.string,
    handleCheckboxChange: PropTypes.func
};

export default Checkbox;