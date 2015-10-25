import React, { Component, PropTypes } from 'react';

export default class GlobalHeader extends Component {

    handleOnClear( e ){
        e.preventDefault();
        this.props.clearContainer();
    }

    render(){
        var containerSwitcher = this.props.selectedContainer &&
            (
                <div className="containerSwitcher">
                    <a href="#" onClick={this.handleOnClear.bind( this )}>
                        {this.props.selectedContainer.accountName}
                        &nbsp;/&nbsp;
                        {this.props.selectedContainer.name}
                    </a>
                </div>
            );

        return (
            <header>
                <h1>Google Tag Manager DIFF</h1>
                {containerSwitcher}
            </header>
        );
    }
}