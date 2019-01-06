// Core
import React, { Component } from 'react';
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';
import { fromTo } from 'gsap';

// Instruments
import Styles from './styles.m.css';
import Spinner from 'components/Spinner';
import Composer from 'components/Composer';
import Task from 'components/task';
import { api } from '../../REST';
import { MAIN_URL, TOKEN } from '../../REST/config'; 
import { withProfile } from 'components/HOC/withProfile';

export class Scheduler extends Component {
    state = {
        tasks:
        [],
        isTaskFetching: false,
    };

    componentDidMount () {
        this._fetchTasks();
    };

    _setTaskFetchingState = (state) => {
        this.setState({
            isTaskFetching: state,
        });
    }

    _fetchTasks = async () => {
        this._setTaskFetchingState(true);

        const response = await fetch (MAIN_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/JSON',
                Authorization: TOKEN,
            },
        });

        const { data: tasks } = await response.json();

        this.setState({
            tasks,
            isTaskFetching: false,
        });
    }

    _createTask = async (message) => {
        this._setTaskFetchingState(true);

        const response = await fetch (MAIN_URL, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify({ message }),

        });

        const { data: task } = await response.json();

        this.setState(({ tasks }) => ({
            tasks: [ task, ...tasks ],
            isTaskFetching: false,
        }));
    }

    _deleteTask = async (id) => {
        this._setTaskFetchingState(true); //по аналогии с созданием поста

        await fetch (`${MAIN_URL}/${id}`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ tasks }) => ({
            tasks:          tasks.filter((task) => task.id !== id),
            isTaskFetching: false,
        }));
    }

    _updateTask = async (task) => {
        this._setTaskFetchingState(true);
        console.log(this.state);
        const response = await fetch (`${MAIN_URL}`, {
            method:  'PUT',
            headers: {
                Authorization: TOKEN,
                'Content-Type': 'application/json',
            },
        });

        const { data: changedTask } = await response.json();

        this.setState(({tasks}) => ({
            posts: tasks.map(
                (task) => task.id === changedTask.id ? changedTask: task,
            ), 
            isTaskFetching: false,
        }));
    }

 //   _animateComposerEnter = ( composer ) => {
 //       fromTo(composer, 1.5 , { opacity: 0 }, { opacity: 1 }); 
 //   }

    render () {
        const { tasks, isTasksFetching } = this.state;

        const tasksJSX = tasks.map((message) => {
            return (
                <Task
                    key = {this.id}
                    { ...message }
                    _updateTask = { this._updateTask }
                    _deleteTask = { this._deleteTask }
                />
            );
        });

/*         let libraries = this.props.items;

        const searchString = this.state.searchString.trim().toLowerCase();

        if (searchString.length > 0) {
            libraries = libraries.filter((filter) => {
                return filter.name.toLowerCase().match(searchString);
            });
        } */
        return (
            <section className = { Styles.scheduler } >
                <Spinner isSpinning = { isTasksFetching } >
                    <div className = "spinner" />
                </Spinner>
                <main>
                    <header>
                        <h1>
                            Планировщик задач
                        </h1>
                        <input
                            onChange = { this._updateTasksFilter }
                            placeholder = "Поиск"
                            type = "search"
                            value = { 'this.state.searchString' }
                        />
                    </header>
                    <section>
                        <Composer _createTask = { this._createTask } />
                        <div>
                            <ul>
                                <div>{ tasksJSX }</div>
                            </ul>
                        </div>
                    </section>
                </main>
            </section>
        );
    }
}

export default withProfile(Scheduler);