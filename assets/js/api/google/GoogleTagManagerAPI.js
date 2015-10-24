const GOOGLE_LIB_NAME = 'tagmanager',
    GOOGLE_LIB_VERSION = 'v1';

import Q from 'q';

export default class GoogleTagManagerAPI {
    constructor( googleCoreAPI ){
        this.api = null;
        this.googleCoreAPI = googleCoreAPI;
    }

    init(){
        return Q.promise( ( resolve, reject ) => {
            this.googleCoreAPI.gapi.client.load( GOOGLE_LIB_NAME, GOOGLE_LIB_VERSION )
                .then( () => {
                    this.api = this.googleCoreAPI.gapi.client.tagmanager;
                    resolve( this );
                } );
        } );
    }

    fetchAccountsAndContainers(){
        var accountsAndContainers = [],
            requestAccountsList = this.api.accounts.list();

        return Q.promise( ( resolve, reject ) => {
            requestAccountsList.execute( response => {
                if( !response.accounts || !response.accounts.length ){
                    reject( accountsAndContainers );
                    return;
                }

                Q.all( response.accounts.map( account =>{
                    return this.fetchContainersByAccount( account )
                        .then( containers =>{
                            account.containers = containers;
                            accountsAndContainers.push( account );
                        } );
                } ) )
                    .then( () => {
                        resolve( accountsAndContainers );
                    } );
            } );
        } );
    }

    fetchContainersByAccount( account ){
        var { accountId, name } = account,
            requestContainersList = this.api.accounts.containers.list( { accountId } );

        return Q.promise( ( resolve, reject ) => {
            requestContainersList.execute( response => {
                resolve( response.containers.map( container => {
                    // それぞれのコンテナに、アカウント名を付与する
                    container.accountName = name;
                    return container;
                } ) );
            } );
        } );
    }

    fetchContainerVersions( container ){
        var { accountId, containerId } = container,
            requestContainerVersions = this.api.accounts.containers.versions.list( { accountId, containerId } );

        return Q.promise( ( resolve, reject ) => {
            requestContainerVersions.execute( response => {
                resolve( response.containerVersion );
            } );
        } );
    }
}