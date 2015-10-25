import React, { Component, PropTypes } from 'react';

import DiffResult from './DiffResult.js';
import TagManagerContainerVersionSelector from './Tools/VersionSelector.js'

export default class Main extends Component {
    render(){
        return (
            <div className="diff">
                <ul className="tools">
                    <li className="versions">
                        Compare&nbsp;
                        <TagManagerContainerVersionSelector
                            role={this.props.selectionRoles[ 0 ]}
                            tagManagerContainerVersions={this.props.tagManagerContainerVersions}
                            selectedVersion={this.props.selectedVersions[ 0 ]}
                            selectVersion={this.props.selectVersion}
                            />
                        &nbsp;with&nbsp;
                        <TagManagerContainerVersionSelector
                            role={this.props.selectionRoles[ 1 ]}
                            tagManagerContainerVersions={this.props.tagManagerContainerVersions}
                            selectedVersion={this.props.selectedVersions[ 1 ]}
                            selectVersion={this.props.selectVersion}
                            />
                    </li>
                </ul>
                <DiffResult result={this.props.result} />
            </div>
        );
    }
}