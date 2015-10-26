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
        var sections = this.props.tagManagerAccountsAndContainers.map( account => {
            var accountItems = account.containers.map( container => {
                return (
                    <li key={'container_' + container.containerId}>
                        <a href="#" onClick={this.handleOnSelect( container )}>{container.name}</a>
                    </li>
                );
            } );
            return (
                <section key={'account_' + account.accountId}>
                    <h3>{account.name}</h3>
                    <ul>{accountItems}</ul>
                </section>
            )
        } );

        return (
            <div className="containerSelector">
                <main>
                    <h2>Select Google Tag Manager Container.</h2>
                    {sections}
                </main>
            </div>
        );
    }
}