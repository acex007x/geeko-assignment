import React, { Component } from 'react';
import AuthHelperMethods from './AuthHelperMethods';

//higher order component
export default function withAuth(AuthComponent) {
    
    const Auth = new AuthHelperMethods();

    return class AuthWrapped extends Component {
       
        state = {
            confirm: null,
            loaded: false
        }

        /*  verify the current users authentication status
        prior to granting them enterance into the app. */
        componentWillMount() {
            if (!Auth.loggedIn()) {
                this.props.history.replace('/login')
            }
            else {
                /* get confirmation message from the Auth helper. */
                try {
                    
                    const confirm = Auth.getConfirm()
                    console.log("confirmation is:", confirm);
                    this.setState({
                        confirm: confirm,
                        loaded: true
                    })
                }
                /* logout redirect to login */
                catch (err) {
                    console.log(err);
                    Auth.logout()
                    this.props.history.replace('/login');
                }
            }
        }

        render() {
            if (this.state.loaded === true) {
                if (this.state.confirm) {
                   
                    return (
                        /* component that is currently being wrapper(App.js) */
                        <AuthComponent history={this.props.history} confirm={this.state.confirm} />
                    )
                }
                else {
                    
                    return null
                }
            }
            else {
                return null
            }

        }
    }
}