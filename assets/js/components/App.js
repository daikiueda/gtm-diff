import React, { Component, PropTypes } from 'react';

import RequireGoogleLogin from './RequireGoogleLogin/RequireGoogleLogin.js';
import TagManagerContainerSelector from './TagManagerContainerSelector.js';
import TagManagerContainerVersionSelector from './TagManagerContainerVersionSelector.js';
import DiffResult from './DiffResult/DiffResult.js';

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
        return this.props.isGoogleLoggedIn ?
            (
                <div>
                    <header>
                        <h1>Google Tag Manager DIFF</h1>
                    </header>

                    <section>
                        <TagManagerContainerSelector
                            tagManagerAccountsAndContainers={this.props.tagManagerAccountsAndContainers}
                            selectedContainer={this.props.selectedConditions.tagManagerContainer}
                            selectContainer={( container ) => dispatch( selectTagManagerContainer( container ) )}
                            clearContainer={() => dispatch( clearTagManagerContainer() )}
                            />

                        { this.props.selectedConditions.tagManagerContainer && (
                            <section className="diff">
                                <h3 className="versionsSelector">
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
                                </h3>
                                <DiffResult result={this.props.diffResult} />
                            </section>
                        ) }
                    </section>
                </div>
            ):
            <RequireGoogleLogin loginGoogle={() => dispatch( authGoogle( false ) )} />;
    }
}

App.propTypes = {
    isGoogleLoggedIn: PropTypes.bool.isRequired
};
