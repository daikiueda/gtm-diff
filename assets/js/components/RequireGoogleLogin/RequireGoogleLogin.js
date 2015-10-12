import React, { Component, PropTypes } from 'react';

export default class RequireGoogleLogin extends Component {
    render(){
        return (
            <div>
                <header><h1>Google Tag Manager DIFF</h1></header>
                <button onClick={this.props.loginGoogle}>ログイン</button>
            </div>
        );
    }
}

RequireGoogleLogin.propTypes = {
    loginGoogle: PropTypes.func.isRequired
};
