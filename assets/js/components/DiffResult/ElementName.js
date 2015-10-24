import React, { Component, PropTypes } from 'react';

export default class ElementName extends Component {
    render(){
        var content = this.props.content,
            id = ( content[ 1 ] || content[ 2 ] )[ this.props.elementType + 'Id' ],
            idAttr = [ this.props.elementType, id ].join( '-' ),
            idElm = <a href={'#' + idAttr} id={idAttr}>{id}</a>,
            nameA = content[ 1 ] && content[ 1 ].name,
            nameB = content[ 2 ] && content[ 2 ].name;

        if( nameA && nameB ){
            return nameA === nameB ?
                <h5>{idElm}{nameA}</h5>:
                <h5>{idElm}{nameA} | {nameB}</h5>;
        }
        else {
            return <h5>{idElm}{nameA || nameB}</h5>
        }
    }
}
