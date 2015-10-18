import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/lib/dialog';

export default class TagManagerContainerSelector extends Component {

    handleOnSelect( container ){
        return ( e ) => {
            e.preventDefault();
            this.props.selectContainer( container );
            //this.selectedContainer = container;
            this.refs.dialog.dismiss();
        };
    }

    componentDidMount(){
        if( ( this.props.tagManagerAccountsAndContainers || [] ).length ){
            this.selectedContainer = this.props.selectedContainer;
            this.refs.dialog.show();
            //this.refs.dialog.onDismiss( () => this.props.selectContainer( this.selectedContainer ) );
        }
    }

    render(){
        var listBody = [];
        ( this.props.tagManagerAccountsAndContainers || [] ).forEach( account => {
            listBody.push( <dt key={'account_' + account.accountId}>{account.name}</dt> );
            account.containers.forEach( container => {
                listBody.push(
                    <dd key={'container_' + container.containerId}>
                        <a href="#" onClick={this.handleOnSelect( container )}>{container.name}</a>
                    </dd>
                );
            } );
        } );

        if( listBody.length ){
            return (
                <Dialog
                    title="Select GTM Container"
                    ref="dialog"
                >
                    <dl>{listBody}</dl>
                </Dialog>
            );
        }
        return <div />
    }
}