import React, { Component, PropTypes } from 'react';

import Dialog from 'material-ui/lib/dialog';

export default class TagManagerContainerSelector extends Component {

    componentWillReceiveProps( nextProps ){
        if( !nextProps.selectedContainer ){
            this.selectedContainer = this.props.selectedContainer;
            this.refs.dialog.show();
        }
    }

    componentDidMount(){
        if( !this.props.selectedContainer ){
            this.selectedContainer = this.props.selectedContainer;
            this.refs.dialog.show();
        }
    }

    handleOnDismiss(){
        this.props.selectContainer( this.selectedContainer );
    }

    handleOnSelect( container ){
        return ( e ) => {
            e.preventDefault();
            this.props.selectContainer( container );
            this.selectedContainer = container;
            this.refs.dialog.dismiss();
        };
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
            {/* ToDo: modal=false が有効でない？ライブラリのアップデートまでtrueにしておく。 */}
            return (
                <Dialog
                    title="Select GTM Container"
                    ref="dialog"
                    modal={true}
                    autoScrollBodyContent={true}
                    onDismiss={this.handleOnDismiss.bind(this)}
                >
                    <dl>{listBody}</dl>
                </Dialog>
            );
        }
        return <div />
    }
}