import React, { Component, PropTypes } from 'react';

export default class ElementName extends Component {
    render(){
        var content = this.props.content,
            nameA = content[ 1 ] && content[ 1 ].name,
            nameB = content[ 2 ] && content[ 2 ].name,
            anchorElm = <a href={'#' + this.props.elementIdAttr}>{this.props.elementId}</a>;

        if( nameA && nameB ){
            return nameA === nameB ?
                <h5>{anchorElm} {nameA}</h5>:
                <h5>{anchorElm} {nameA} | {nameB}</h5>;
        }
        else {
            return <h5>{anchorElm} {nameA || nameB}</h5>
        }
    }
}
