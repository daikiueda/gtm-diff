import React, { Component, PropTypes } from 'react';

import GlobalHeader from './GlobalHeader.js';
import RequireGoogleLogin from './RequireGoogleLogin/Main.js';
import TagManagerContainerSelector from './ContainerSelector/Main.js';
import Diff from './Diff/Main.js';

import {
    authGoogle,
    signOutFromGoogle
} from '../actions/google-core.js';
import {
    initGoogleTagManagerAPI,
    selectTagManagerContainer,
    selectTagManagerContainerVersion,
    clearTagManagerContainer,
    SET_TAG_MANAGER_CONTAINER_VERSION_AT_LEFT,
    SET_TAG_MANAGER_CONTAINER_VERSION_AT_RIGHT
} from '../actions/google-tag-manager.js';


export default class App extends Component {
    render(){
        const { dispatch } = this.props;

        var content;

        if( !this.props.isGoogleLoggedIn ){
            content = (
                <RequireGoogleLogin loginGoogle={() => {
                    dispatch( authGoogle( false ) )
                        .then( () => dispatch( initGoogleTagManagerAPI() ) );
                }} />
            );
        }
        else if( !this.props.selectedConditions.tagManagerContainer ){
            content = (
                <TagManagerContainerSelector
                    tagManagerAccountsAndContainers={this.props.tagManagerAccountsAndContainers}
                    selectContainer={( container ) => dispatch( selectTagManagerContainer( container ) )}
                    />
            );
        }
        else if( this.props.tagManagerContainerVersions.length ){
            content = (
                <Diff
                    tagManagerContainerVersions={this.props.tagManagerContainerVersions}
                    selectedVersions={ [
                        this.props.selectedConditions.tagManagerContainerVersionAtLeft,
                        this.props.selectedConditions.tagManagerContainerVersionAtRight
                    ] }
                    selectionRoles={ [
                        SET_TAG_MANAGER_CONTAINER_VERSION_AT_LEFT,
                        SET_TAG_MANAGER_CONTAINER_VERSION_AT_RIGHT
                    ] }
                    selectVersion={( version, role ) => dispatch( selectTagManagerContainerVersion( version, role ) )}
                    result={this.props.diffResult}
                    />
            );
        }

        return (
            <div>
                <GlobalHeader
                    selectedContainer={this.props.selectedConditions.tagManagerContainer}
                    clearContainer={() => dispatch( clearTagManagerContainer() )}
                    />

                {content}
            </div>
        );
    }
}

App.propTypes = {
    isGoogleLoggedIn: PropTypes.bool.isRequired
};
