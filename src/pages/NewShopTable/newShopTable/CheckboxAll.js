import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventEmitter from './EventEmitter';

class CheckboxAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCheckedAll: false
        };
        this.toggleCheckboxAllChange = this.toggleCheckboxAllChange.bind(this);
    };

    componentDidMount = () => {
        let self = this;
        EventEmitter.subscribe('changeItem', (newItem) => {
            self.setState({
                isCheckedAll: newItem
            });
        })
    };

    componentWillUnmount = () => {
        EventEmitter.unSubscribe('changeItem');
    };

    toggleCheckboxAllChange = () => {
        const { handleCheckboxAllChange } = this.props;

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

        handleCheckboxAllChange(!this.state.isCheckedAll);
    };



    render() {

        const { isCheckedAll } = this.state;

        return (
            <div className="cell__child-container">
                <label>
                    <input
                        type="checkbox"
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