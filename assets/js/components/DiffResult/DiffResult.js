import React, { Component, PropTypes } from 'react';

export default class DiffResult extends Component {
    render(){
        return this.props.result ?
            (
                <p>{JSON.stringify( this.props.result )}</p>
            ):
            <div></div>;
    }
}