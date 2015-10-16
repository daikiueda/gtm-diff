import React, { Component, PropTypes } from 'react';
import isEqual from 'lodash.isequal';

export const CLASS_NAME = {
    MODIFIED: 'modified',
    NOT_MODIFIED: 'notModified',
    COMPLEX_DATA_CONTAINER: 'complex'
};

export default class ElementDataRow extends Component {
    render(){
        const { keyName, valueA, valueB, isComplex } = this.props;
        return(
            <tr className={[
                isComplex ? CLASS_NAME.COMPLEX_DATA_CONTAINER: '',
                isEqual( valueA, valueB ) ? CLASS_NAME.NOT_MODIFIED: CLASS_NAME.MODIFIED
            ].join( ' ' )}>
                <th>{keyName}</th>
                <td>{ElementDataRow.formatValue( valueA )}</td>
                <td>{ElementDataRow.formatValue( valueB )}</td>
            </tr>
        );
    }
}

ElementDataRow.formatValue = function( value ){
    switch( typeof value ){
        case 'object':
            return ( value === null )? '': JSON.stringify( value );
        case 'boolean':
            return value ? 'true': 'false';
        default:
            return value;
    }
};

