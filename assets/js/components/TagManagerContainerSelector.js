import React, { Component, PropTypes } from 'react';

export default class TagManagerContainerSelector extends Component {

    handleOnSelect( container ){
        return ( e ) => {
            e.preventDefault();
            this.props.selectContainer( container );
        };
    }

    handleOnClear( e ){
        e.preventDefault();
        this.props.clearContainer();
    }

    render(){
        if( this.props.selectedContainer ){
            return (
                <div className="containerSelector selected">
                    <a href="#" onClick={this.handleOnClear.bind( this )}>
                        {this.props.selectedContainer.accountName}
                        &nbsp;/&nbsp;
                        {this.props.selectedContainer.name}
                    </a>
                </div>
            );
        }

        var listBody = [];
        this.props.tagManagerAccountsAndContainers.forEach( account => {
            listBody.push( <dt key={'account_' + account.accountId}>{account.name}</dt> );
            account.containers.forEach( container => {
                listBody.push(
                    <dd key={'container_' + container.containerId}>
                        <a href="#" onClick={this.handleOnSelect( container )}>{container.name}</a>
                    </dd>
                );
            } );
        } );

        return (
            <div className="containerSelector">
                <h2>Select Google Tag Manager Container.</h2>
                <dl>{listBody}</dl>
            </div>
        );
    }
}