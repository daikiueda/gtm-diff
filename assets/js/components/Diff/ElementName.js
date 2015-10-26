import React, { Component, PropTypes } from 'react';

export default class ElementName extends Component {
    render(){
        var content = this.props.content,
            nameA = content[ 1 ] && content[ 1 ].name,
            nameB = content[ 2 ] && content[ 2 ].name,
            anchorElm = <a href={'#' + this.props.elementIdAttr}>{this.props.elementId}</a>;

        if( nameA && nameB ){
            return nameA === nameB ?
                <h3>{anchorElm} {nameA}</h3>:
                <h3>{anchorElm} {nameA} | {nameB}</h3>;
        }
        else {
            return <h3>{anchorElm} {nameA || nameB}</h3>
        }
    }
}
