import React, { Component, Proptypes } from 'react';
import isEqual from 'lodash.isequal';

export default class DiffVersionsCommon extends Component {

    createParticularRows( params ){
        switch( params[ 0 ] ){
            case 'parameter':
                return this.createParameterRows( params );
            default:
                return null;
        }
    }

    createParameterRows( params ){
        var rows = [ <tr className="complex"><th colSpan="3">{params[ 0 ]}</th></tr> ],
            addedKeys = {};

        function addRow( key, valueA, valueB ){
            rows.push(
                <tr className={'complex ' + ( valueA === valueB ? 'notModified': 'modified' )}>
                    <th>{key}</th>
                    <td>{DiffVersionsCommon.formatValue( valueA )}</td>
                    <td>{DiffVersionsCommon.formatValue( valueB )}</td>
                </tr>
            );
            addedKeys[ key ] = true;
        }

        var searchMethods = [
            () => { ( params[ 1 ] || [] ).forEach( paramA => {
                if( addedKeys[ paramA.key ] ){ return; }
                var key = paramA.key,
                    paramB = params[ 2 ] && params[ 2 ].filter( param => { return param.key === key } )[ 0 ],
                    valueA = paramA.value,
                    valueB = paramB && paramB.value;
                addRow( key, valueA, valueB );
            } ) },

            () => { ( params[ 2 ] || [] ).forEach( paramB => {
                if( addedKeys[ paramB.key ] ){ return; }
                var key = paramB.key,
                    paramA = params[ 1 ] && params[ 1 ].filter( param => { return param.key === key } )[ 0 ],
                    valueA = paramA && paramA.value,
                    valueB = paramB.value;
                addRow( key, valueA, valueB );
            } ) }
        ];

        if( ( params[ 1 ] || [] ).length > ( params[ 2 ] || [] ).length ){
            searchMethods[ 0 ]();
            searchMethods[ 1 ]();
        }
        else {
            searchMethods[ 1 ]();
            searchMethods[ 0 ]();
        }

        return rows;
    }

    createDataBody( content ){
        // ToDo: 一方にしかないキーがある場合、表示漏れの可能性
        return Object.keys( content[ 1 ] || content[ 2 ] ).map( key => {

            if( key.match( DiffVersionsCommon.IGNORE_KEYS ) ){
                return null;
            }

            var valueA = content[ 1 ] && DiffVersionsCommon.flattenSimpleObject( content[ 1 ][ key ] ),
                valueB = content[ 2 ] && DiffVersionsCommon.flattenSimpleObject( content[ 2 ][ key ] ),

                particularData = this.createParticularRows( [ key, valueA, valueB ] );

            if( particularData ){
                return particularData;
            }
            switch( typeof ( valueA || valueB ) ){
                // ToDo: typeof ( false || null ) も、「object」となるので要注意。
                case 'object':
                case 'string':
                case 'number':
                case 'boolean':
                    return (
                        <tr className={ isEqual( valueA, valueB ) ? 'notModified': 'modified' }>
                            <th>{key}</th>
                            <td>{DiffVersionsCommon.formatValue( valueA )}</td>
                            <td>{DiffVersionsCommon.formatValue( valueB )}</td>
                        </tr>
                    );
                default:
                    console.warn( key, typeof ( valueA || valueB ), valueA, valueB );
            }
        } );
    }

    render(){
        var sections = this.props.contents.map( ( content ) => {
            return (
                <section className={content[ 0 ]? 'modified': 'notModified'}>
                    {DiffVersionsCommon.createElementTitle( content )}
                    <table>
                        {this.createDataBody( content )}
                    </table>
                </section>
            );
        } );

        return <div>{sections}</div>;
    }
}

DiffVersionsCommon.IGNORE_KEYS = /^(accountId|containerId|tagId|triggerId|variableId|fingerprint)$/;

DiffVersionsCommon.formatValue = function( value ){
    switch( typeof value ){
        case 'object':
            return ( value === null )? '': JSON.stringify( value );
        case 'boolean':
            return value ? 'true': 'false';
        default:
            return value;
    }
};

DiffVersionsCommon.flattenSimpleObject = function( value ){
    if( !value || typeof value != 'object' || value instanceof Array ){
        return value;
    }
    if( Object.keys( value ).length === 2 && value.hasOwnProperty( 'type' ) && value.hasOwnProperty( 'value' ) ){
        return value.value;
    }
    return value;
};

DiffVersionsCommon.createElementTitle = function( content ){
    var nameA = content[ 1 ] && content[ 1 ].name,
        nameB = content[ 2 ] && content[ 2 ].name;

    if( nameA && nameB ){
        return nameA === nameB ?
            <h3>{nameA}</h3>:
            <h3>{nameA} | {nameB}</h3>;
    }
    else {
        return <h3>{nameA || nameB}</h3>
    }
};
