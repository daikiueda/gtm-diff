import React, { Component, PropTypes } from 'react';

import AppCanvas from 'material-ui/lib/app-bar';
import AppBar from 'material-ui/lib/app-bar';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';

import RequireGoogleLogin from './RequireGoogleLogin/RequireGoogleLogin.js';
import TagManagerContainerSelector from './TagManagerContainerSelector.js';
import TagManagerContainerVersionSelector from './TagManagerContainerVersionSelector.js';
import DiffResult from './DiffResult/DiffResult.js';

import { authGoogle, signOutFromGoogle } from '../actions/google-core.js';
import {
    selectTagManagerContainer,
    selectTagManagerContainerVersion,
    clearTagManagerContainerSelection,

    SET_TAG_MANAGER_CONTAINER_VERSION_AT_LEFT,
    SET_TAG_MANAGER_CONTAINER_VERSION_AT_RIGHT
} from '../actions/google-tag-manager.js';


export default class App extends Component {
    render(){
        const { dispatch } = this.props;

        var appBarRightUI =
            this.props.selectedConditions.tagManagerContainer ?
                <FlatButton
                    label={this.props.selectedConditions.tagManagerContainer.name}
                    primary={true}
                    />:
                <RaisedButton
                    label="Select GTM container"
                    primary={true}
                    onMouseUp={() => dispatch(clearTagManagerContainerSelection())}
                    />;

        return this.props.isGoogleLoggedIn ?
            (
                <div>
                    <AppBar
                        showMenuIconButton={false}
                        title="Google Tag Manager DIFF"
                        iconElementRight={appBarRightUI}
                        />

                    <TagManagerContainerSelector
                        tagManagerAccountsAndContainers={this.props.tagManagerAccountsAndContainers}
                        selectedContainer={this.props.selectedConditions.tagManagerContainer}
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
