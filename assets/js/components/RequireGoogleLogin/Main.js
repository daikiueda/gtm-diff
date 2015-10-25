import React, { Component, PropTypes } from 'react';

export default class RequireGoogleLogin extends Component {
    render(){
        return (
            <main>
                <button onClick={this.props.loginGoogle}>ログイン</button>
            </main>
        );
    }
}

RequireGoogleLogin.propTypes = {
    loginGoogle: PropTypes.func.isRequired
};
