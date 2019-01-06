// Core
import React, { Component } from 'react';
import PropTypes from 'prop-types';
//Components
import { withProfile } from 'components/HOC/withProfile';
//Instructions
//import Styles from './styles.m.css';


export class Composer extends Component {
    static propTypes = {
        _createTask: PropTypes.func.isRequired,
    };

    state = {
        task: '',
    };

    _updateTask = (event) => {
        this.setState({
            task: event.target.value,
        });
    };

    _handleFormSubmit = (event) => {
        event.preventDefault();
        this._submitTask();
    }

    _submitTask = () => {
        const { task } = this.state;

        if (!task) {
            return null;
        }

        this.props._createTask(task);

        this.setState({
            task: '',
        });
    }

    _submitOnEnter = (event) => {
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            event.preventDefault();
            this._submitTask();
        }
    }

    render() {
        const { task } = this.state;

        return (
            <form onSubmit = { this._handleFormSubmit }>
                <input
                    placeholder = "Описaние моей новой задачи"
                    maxLength = { 50 }
                    type = "text"
                    value = { task }
                    onChange = { this._updateTask }
                    onKeyPress = { this._submitOnEnter }
                />
                <button type = 'submit' >
                    Добавить задачу
                </button>
            </form>
        );
    }
}
export default withProfile(Composer);