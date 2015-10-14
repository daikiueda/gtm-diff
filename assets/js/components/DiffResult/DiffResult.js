import React, { Component, PropTypes } from 'react';

import DiffTagVersions from './DiffTagVersions.js';
import DiffTriggerVersions from './DiffTriggerVersions.js';
import DiffVariableVersions from './DiffVariableVersions.js';

function hasModified( elementDiffs ){
    for( let i = 0, last = elementDiffs.length; i < last; i++ ){
        if( elementDiffs[ i ] && elementDiffs[ i ][ 0 ] ) return true;
    }
    return false;
}

export default class DiffResult extends Component {
    render(){
        if( !this.props.result ){
            return <div></div>;
        }

        var typeSections = [
            [ 'tag', 'タグ', ( contents )=>{ return <DiffTagVersions contents={contents} /> } ],
            [ 'trigger', 'トリガー', ( contents )=>{ return <DiffTriggerVersions contents={contents} /> } ],
            [ 'variable', '変数', ( contents )=>{ return <DiffVariableVersions contents={contents} /> } ]
        ].map( type =>{
                return this.props.result[ type[ 0 ] ] ?
                    (
                        <section className={hasModified( this.props.result[ type[ 0 ] ] )}>
                            <h2>{type[ 1 ]}</h2>
                            {type[ 2 ]( this.props.result[ type[ 0 ] ] )}
                        </section>
                    ): <section></section>
            } );

        return <div>{typeSections}</div>;
    }
}
