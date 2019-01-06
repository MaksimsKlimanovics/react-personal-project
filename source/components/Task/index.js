// Core
import React, { Component } from 'react';

//Components
import { withProfile } from 'components/HOC/withProfile';
import Checkbox from 'theme/assets/checkbox';

// Instruments
import Styles from './styles.m.css';

export class Task extends Component {
    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _deleteTask = () => {
        const { _deleteTask, id } = this.props;

        _deleteTask(id);
    };

    _updateTask = () => {
        const { _updateTask, id, message } = this.props;
        _updateTask(this.state);
    };

    _handleKeyEvent = (event) => {
        const escKey = event.key === 'Esc';
        const enterKey = event.key === 'Enter';

        if (enterKey) {
            event.preventDefault();
            this._updateTask();
        } else if (escKey) {
            event.preventDefault();
        }
    }

    render () {
        const { id, message, favorite, completed } = this.props;

        return (
            <li className = { Styles.task } key = { id }>
                <div className = { Styles.content } >
                    <Checkbox className = { Styles.toggleTaskCompletedState } />
                    <input
                        placeholder = "n/d"
                        maxLength = { 50 }
                        type = "text"
                        value = { message }
                        //onChange = { this._updateTask }
                        onKeyPress = { this._handleKeyEvent }
                    />
                </div>
            </li>
        );
    }
}
export default withProfile(Task);