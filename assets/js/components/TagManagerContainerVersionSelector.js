import React, { Component, PropTypes } from 'react';

export default class TagManagerContainerVersionSelector extends Component {
    render(){
        var items = this.props.tagManagerContainerVersions.map( ( version ) => {
            var key = [ 'ver', version.containerVersionId, 'of', version.containerId ].join( '_' );
            return (
                <li key={key}><a href="#" onClick={() => this.props.selectVersion( version, this.props.role )}>{version.containerVersionId}</a></li>
            );
        } );

        return this.props.tagManagerContainerVersions.length ?
            (
                <div>
                    <p>{this.props.role}</p>
                    <ol>{items}</ol>
                </div>
            ):
            <div></div>;
    }
}