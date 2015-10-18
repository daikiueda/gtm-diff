import React, { Component, PropTypes } from 'react';

import RequireGoogleLogin from './RequireGoogleLogin/RequireGoogleLogin.js';
import TagManagerContainerSelector from './TagManagerContainerSelector.js';
import TagManagerContainerVersionSelector from './TagManagerContainerVersionSelector.js';
import DiffResult from './DiffResult/DiffResult.js';

import { authGoogle, signOutFromGoogle } from '../actions/google-core.js';
import {
    selectTagManagerContainer, selectTagManagerContainerVersion,
    SET_TAG_MANAGER_CONTAINER_VERSION_AT_LEFT, SET_TAG_MANAGER_CONTAINER_VERSION_AT_RIGHT
} from '../actions/google-tag-manager.js';


export default class App extends Component {
    render(){
        const { dispatch } = this.props;
        return this.props.isGoogleLoggedIn ?
            (
                <div>
                    <header>
                        <h1>Google Tag Manager DIFF</h1>
                        {/* <button onClick={() => dispatch( signOutFromGoogle() )}>ログアウト</button>*/}
                    </header>
                    <TagManagerContainerSelector
                        tagManagerAccountsAndContainers={this.props.tagManagerAccountsAndContainers}
                        selectContainer={( container ) => dispatch( selectTagManagerContainer( container ) )}
                        />
                    <TagManagerContainerVersionSelector
                        role={SET_TAG_MANAGER_CONTAINER_VERSION_AT_LEFT}
                        tagManagerContainerVersions={this.props.tagManagerContainerVersions}
                        selectVersion={( version, role ) => dispatch( selectTagManagerContainerVersion( version, role ) )}
                        />
                    <TagManagerContainerVersionSelector
                        role={SET_TAG_MANAGER_CONTAINER_VERSION_AT_RIGHT}
                        tagManagerContainerVersions={this.props.tagManagerContainerVersions}
                        selectVersion={ ( version, role ) => dispatch( selectTagManagerContainerVersion( version, role ) ) }
                        />
                    <DiffResult result={this.props.diffResult} />
                </div>
            ):
            <RequireGoogleLogin loginGoogle={() => dispatch( authGoogle( false ) )} />;
    }
}

App.propTypes = {
    isGoogleLoggedIn: PropTypes.bool.isRequired
};
