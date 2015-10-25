import React, { Component, PropTypes } from 'react';

import RequireGoogleLogin from './RequireGoogleLogin/RequireGoogleLogin.js';
import TagManagerContainerSwitcher from './TagManagerContainerSwitcher.js';
import TagManagerContainerSelector from './TagManagerContainerSelector.js';
import TagManagerContainerVersionSelector from './Diff/TagManagerContainerVersionSelector.js';
import DiffResult from './Diff/DiffResult.js';

import { authGoogle, signOutFromGoogle } from '../actions/google-core.js';
import {
    selectTagManagerContainer,
    selectTagManagerContainerVersion,
    clearTagManagerContainer,
    SET_TAG_MANAGER_CONTAINER_VERSION_AT_LEFT,
    SET_TAG_MANAGER_CONTAINER_VERSION_AT_RIGHT
} from '../actions/google-tag-manager.js';


export default class App extends Component {
    render(){
        const { dispatch } = this.props;

        var tools = [],
            content = [];

        if( this.props.tagManagerContainerVersions.length ){
            tools.push(
                <li className="versions">
                    Compare&nbsp;
                    <TagManagerContainerVersionSelector
                        role={SET_TAG_MANAGER_CONTAINER_VERSION_AT_LEFT}
                        tagManagerContainerVersions={this.props.tagManagerContainerVersions}
                        selectedVersion={this.props.selectedConditions.tagManagerContainerVersionAtLeft}
                        selectVersion={( version, role ) => dispatch( selectTagManagerContainerVersion( version, role ) )}
                        />
                    &nbsp;with&nbsp;
                    <TagManagerContainerVersionSelector
                        role={SET_TAG_MANAGER_CONTAINER_VERSION_AT_RIGHT}
                        tagManagerContainerVersions={this.props.tagManagerContainerVersions}
                        selectedVersion={this.props.selectedConditions.tagManagerContainerVersionAtRight}
                        selectVersion={ ( version, role ) => dispatch( selectTagManagerContainerVersion( version, role ) ) }
                        />
                </li>
            )
        }

        if( !this.props.isGoogleLoggedIn ){
            content = (
                <RequireGoogleLogin loginGoogle={() => dispatch( authGoogle( false ) )} />
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
                <DiffResult result={this.props.diffResult} />
            );
        }

        if( tools.length ){
            tools = <ul className="settings">{tools}</ul>;
        }

        return (
            <div>
                <header>
                    <h1>Google Tag Manager DIFF</h1>

                    <TagManagerContainerSwitcher
                        selectedContainer={this.props.selectedConditions.tagManagerContainer}
                        clearContainer={() => dispatch( clearTagManagerContainer() )}
                        />
                </header>

                {tools}
                {content}
            </div>
        );
    }
}

App.propTypes = {
    isGoogleLoggedIn: PropTypes.bool.isRequired
};
