import React, { Component, PropTypes } from 'react';

export default class TagManagerContainerVersionSelector extends Component {

    handleOnSelect( e ){
        e.preventDefault();
        var select = e.target,
            versionId = select.options[ select.selectedIndex ].value,
            versionObj = this.props.tagManagerContainerVersions.filter( version => {
                return version.containerVersionId === versionId;
            } )[ 0 ];
        this.props.selectVersion( versionObj, this.props.role );
    }

    render(){
        var currentSelected = this.props.selectedVersion,
            items = [ <option value="">-</option> ];

        this.props.tagManagerContainerVersions.reduceRight( ( items, version ) => {
            items.push(
                <option
                    value={version.containerVersionId}
                    selected={version === currentSelected}
                    >
                    {version.containerVersionId}
                </option>
            );
            return items;
        }, items );

        return this.props.tagManagerContainerVersions.length ?
            <select onChange={ e => this.handleOnSelect( e )}>{items}</select>:
            <span>?</span>;
    }
}