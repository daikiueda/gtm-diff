import React, { Component, Proptypes } from 'react';
import ElementName from './ElementName.js';
import ElementDataRow, { CLASS_NAME } from './ElementDataRow.js';

import union from 'lodash.union';

export default class DiffVersionsCommon extends Component {

    createParticularRows( params ){
        switch( params[ 0 ] ){
            case 'parameter':
                return DiffVersionsCommon.createComplexDataRows( params );
            default:
                return null;
        }
    }

    createDataBody( content ){
        var keys = union( Object.keys( content[ 1 ] || {} ), Object.keys( content[ 2 ] || {} ) );

        return keys.map( key => {

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
                // typeof ( false || null ) も、「object」となるので要注意。
                case 'object':
                case 'string':
                case 'number':
                case 'boolean':
                    return (
                        <ElementDataRow keyName={key} valueA={valueA} valueB={valueB} isComplex={false} />
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
                    <ElementName elementType={this.elementType} content={content} />
                    <table>
                        <tbody>
                            {this.createDataBody( content )}
                        </tbody>
                    </table>
                </section>
            );
        } );

        return <div>{sections}</div>;
    }
}

DiffVersionsCommon.IGNORE_KEYS = /^(accountId|containerId|tagId|triggerId|variableId|fingerprint)$/;

DiffVersionsCommon.flattenSimpleObject = function( value ){
    if( !value || typeof value != 'object' || value instanceof Array ){
        return value;
    }
    if( Object.keys( value ).length === 2 && value.hasOwnProperty( 'type' ) && value.hasOwnProperty( 'value' ) ){
        return value.value;
    }
    return value;
};

DiffVersionsCommon.createComplexDataRows = function( params ){
    var rows = [ <tr className={CLASS_NAME.COMPLEX_DATA_CONTAINER}><th colSpan="3">{params[ 0 ]}</th></tr> ],
        keys = union(
            ( params[ 1 ] || [] ).map( param => { return param.key } ),
            ( params[ 2 ] || [] ).map( param => { return param.key } )
        );

    return keys.reduce( ( rows, key ) => {
        var paramA = params[ 1 ] && params[ 1 ].filter( param => { return param.key && param.key === key } )[ 0 ],
            paramB = params[ 2 ] && params[ 2 ].filter( param => { return param.key && param.key === key } )[ 0 ],
            valueA = paramA && paramA.value,
            valueB = paramB && paramB.value;
        rows.push( <ElementDataRow keyName={key} valueA={valueA} valueB={valueB} isComplex={true} /> );
        return rows;
    }, rows );
};
