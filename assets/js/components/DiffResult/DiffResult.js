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
            [ 'tag', 'Tag', ( contents )=>{ return <DiffTagVersions contents={contents} /> } ],
            [ 'trigger', 'Trigger', ( contents )=>{ return <DiffTriggerVersions contents={contents} /> } ],
            [ 'variable', 'Variable', ( contents )=>{ return <DiffVariableVersions contents={contents} /> } ]
        ].map( type =>{
                return this.props.result[ type[ 0 ] ] ?
                    (
                        <section className={hasModified( this.props.result[ type[ 0 ] ] )}>
                            <h4>{type[ 1 ]}</h4>
                            {type[ 2 ]( this.props.result[ type[ 0 ] ] )}
                        </section>
                    ): <div></div>
            } );

        return <div className="result">{typeSections}</div>;
    }
}
