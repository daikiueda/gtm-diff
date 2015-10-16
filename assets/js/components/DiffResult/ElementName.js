import React, { Component, PropTypes } from 'react';

export default class ElementName extends Component {
    render(){
        var content = this.props.content,
            id = ( content[ 1 ] || content[ 2 ] )[ this.props.elementType + 'Id' ],
            nameA = content[ 1 ] && content[ 1 ].name,
            nameB = content[ 2 ] && content[ 2 ].name;

        if( nameA && nameB ){
            return nameA === nameB ?
                <h3>[{id}] {nameA}</h3>:
                <h3>[{id}] {nameA} | {nameB}</h3>;
        }
        else {
            return <h3>[{id}] {nameA || nameB}</h3>
        }
    }
}
