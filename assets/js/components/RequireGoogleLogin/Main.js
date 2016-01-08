import React, { Component, PropTypes } from 'react';

export default class RequireGoogleLogin extends Component {

    handleOnLogin( e ){
        e.preventDefault();
        this.props.loginGoogle();
    }

    render(){
        return (
            <main>
                <h1>Google Tag Manager <em>Diff</em></h1>
                <p>Show changes between two versions of Google Tag Manager Container.</p>
                <div className="login">
                    <a href="#" onClick={this.handleOnLogin.bind(this)}>
                        <img
                            src="./img/btn_google_signin_light_normal_web.png"
                            srcSet="./img/btn_google_signin_light_normal_web@2x.png 2x"
                            alt="Sign on with Google"
                        />
                    </a>
                </div>
            </main>
        );
    }
}

RequireGoogleLogin.propTypes = {
    loginGoogle: PropTypes.func.isRequired
};
