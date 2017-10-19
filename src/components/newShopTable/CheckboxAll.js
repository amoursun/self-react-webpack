import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CheckboxAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckedAll: false
        };
        this.toggleCheckboxAllChange = this.toggleCheckboxAllChange.bind(this);
    };

    toggleCheckboxAllChange() {
        const { handleCheckboxAllChange, labelAll } = this.props;

        this.setState(({ isCheckedAll }) => (
            {
                isCheckedAll: !isCheckedAll
            }
        ));
        // this.setState((prevState) => (
        //     {
        //         isCheckedAll: !prevState.isCheckedAll,
        //     }
        // ));

        handleCheckboxAllChange(labelAll, !this.state.isCheckedAll);
    };



    render() {

        const { labelAll } = this.props;
        const { isCheckedAll } = this.state;

        return (
            <div className="cell__child-container">
                <label>
                    <input
                        type="checkbox"
                        value={labelAll}
                        checked={isCheckedAll}
                        onChange={this.toggleCheckboxAllChange}
                    />

                </label>
            </div>
        );
    }
}
CheckboxAll.propTypes = {
    labelAll: PropTypes.array,
    handleCheckboxAllChange: PropTypes.func
};

export default CheckboxAll;