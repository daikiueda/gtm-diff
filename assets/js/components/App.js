import React, { Component, PropTypes } from 'react';

import Styles, { Spacing } from 'material-ui/lib/styles/index';
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

    getStyles(){
        return {
            content: {
                padding: Spacing.desktopGutter
            }
        };
    }

    render(){
        const { dispatch } = this.props;

        var styles = this.getStyles(),
            appBarRightUI =
            this.props.selectedConditions.tagManagerContainer ?
                <FlatButton
                    label={this.props.selectedConditions.tagManagerContainer.name}
                    primary={true}
                    onClick={() => dispatch( clearTagManagerContainerSelection() )}
                    />:
                <FlatButton
                    label="Select GTM container"
                    primary={true}
                    />;

        return this.props.isGoogleLoggedIn ?
            (
                <div>
                    <AppBar
                        showMenuIconButton={false}
                        title="Google Tag Manager Diff"
                        iconElementRight={appBarRightUI}
                        />

                    <div style={styles.content}>
                        <TagManagerContainerSelector
                            tagManagerAccountsAndContainers={this.props.tagManagerAccountsAndContainers}
                            selectedContainer={this.props.selectedConditions.tagManagerContainer}
                            selectContainer={( container ) => dispatch( selectTagManagerContainer( container ) )}
                            />

                        <p>
                            Compare&nbsp;
                            <TagManagerContainerVersionSelector
                                role={SET_TAG_MANAGER_CONTAINER_VERSION_AT_LEFT}
                                tagManagerContainerVersions={this.props.tagManagerContainerVersions}
                                selectedVersion={this.props.tagManagerContainerVersionAtLeft}
                                selectVersion={( version, role ) => dispatch( selectTagManagerContainerVersion( version, role ) )}
                                />
                            &nbsp;with&nbsp;
                            <TagManagerContainerVersionSelector
                                role={SET_TAG_MANAGER_CONTAINER_VERSION_AT_RIGHT}
                                tagManagerContainerVersions={this.props.tagManagerContainerVersions}
                                selectedVersion={this.props.tagManagerContainerVersionAtRight}
                                selectVersion={ ( version, role ) => dispatch( selectTagManagerContainerVersion( version, role ) ) }
                                />
                        </p>

                        <DiffResult result={this.props.diffResult} />
                    </div>
                </div>
            ):
            <RequireGoogleLogin loginGoogle={() => dispatch( authGoogle( false ) )} />;
    }
}

App.propTypes = {
    isGoogleLoggedIn: PropTypes.bool.isRequired
};
