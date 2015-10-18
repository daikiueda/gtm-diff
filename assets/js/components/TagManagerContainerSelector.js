import React, { Component, PropTypes } from 'react';

export default class TagManagerContainerSelector extends Component {

    handleOnSelect( container ){
        return ( e ) => {
            e.preventDefault();
            this.props.selectContainer( container );
        };
    }

    render(){
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
            <dl>{listBody}</dl>
        )
    }
}