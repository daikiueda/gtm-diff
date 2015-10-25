import React, { Component, PropTypes } from 'react';

export default class TagManagerContainerSwitcher extends Component {

    handleOnClear( e ){
        e.preventDefault();
        this.props.clearContainer();
    }

    render(){
        if( !this.props.selectedContainer ){
            return <div></div>;
        }

        return (
            <div className="containerSwitcher">
                <a href="#" onClick={this.handleOnClear.bind( this )}>
                    {this.props.selectedContainer.accountName}
                    &nbsp;/&nbsp;
                    {this.props.selectedContainer.name}
                </a>
            </div>
        );
    }
}