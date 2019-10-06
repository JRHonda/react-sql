import React from 'react';
import ReactDOM from 'react-dom';
import Results from './Results';
import ForgotPasswordModal from './ForgotPasswordModal';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
import { selectUser } from "../actions";
import SignUpModal from "./SignUpModal";
import AdminPage from "./AdminPage";

class Login extends React.Component {

    state = {
        username: '',
        password: '',
        user: null,
        adminWebsite: '',
        redirect: false
    };

    // Sends request to server to login in user with entered username and password
    loginUser = async (un, pw) => {

        try {
            const response = await fetch(`http://localhost:3000/user?username=${un}&password=${pw}`)
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                const json = await response.json(); // Response from server
            // ************************************************************************** //
            // ************************************************************************** //
            // Vulnerability #2 - Implementation Mistake                                  //
            // The admin account is saved under the main user table contained within the  //
            // the database. This makes it easier for an attacker to access admin account //
            // information since all user information is collected under a single table.  //
            // The secondary implementation mistake here is performing logic to award     //
            // administrative permissions if the user that logged in has the username     //
            // equal to 'admin'.
            // ************************************************************************** //
            // ************************************************************************** //
            if (json.data[0].username == 'admin') {
                alert('Welcome Admin. Please feel free to make any changes.')
                this.setState({adminWebsite: 'http://localhost:3001/admin-page'})
            }
            console.log(json);
                this.setState({ user: json }) // Update state
        } catch (err) {
            console.log(err);
        }
    };

    // Sends request to server to sign up new banker
    // Head to ../server/index.js for underlying implementation mistake
    signUpUser = async (un, pw) => {

        try {
            const response = await fetch(`http://localhost:3000/signup?username=${un}&password=${pw}`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json(); // Response from server
            this.setState({ user: json }) // Update state
        } catch (err) {
            console.log(err);
        }
    }

    // Event handler for initiating login
    onHitLogin = async () => {

        if (this.state.username == '' | this.state.password == '') {
            alert('Please enter your username and password to login');
            return
        }

        await this.loginUser(this.state.username, this.state.password)
        // Waiting for data from database

        // user doesn't exist in database
        if (this.state.user.data.length == 0 ) {
            console.log('no user exists for that login');
            alert('Please sign up for an account'); // indicate to user to sign up
            return;
        }

        // ************************************************************************** //
        // ************************************************************************** //
        // Vulnerability #2 - Implementation Mistake                                  //
        // The admin account is saved under the main user table contained within the  //
        // the database. This makes it easier for an attacker to access admin account //
        // information since all user information is collected under a single table.  //
        // The secondary implementation mistake here is performing logic to award     //
        // administrative permissions if the user that logged in has the username     //
        // equal to 'admin'.
        // ************************************************************************** //
        // ************************************************************************** //
        if (this.state.adminWebsite == '') {
            // go to users account info
        } else {
            window.location.assign(this.state.adminWebsite); // Go to admin page
        }
    };

    // Event handler for initiating sign up
    onHitSignUp = async () => {

        this.setState({user: null});
        await this.signUpUser(this.state.username, this.state.password);
        // Waiting for data from database
        console.log(this.state.user);
    };

    render() {
        return (
            <div className={"login"} >
                <span className={"ui input"}>
                    <input name={"username"}
                           value={this.state.username}
                           type={"text"} placeholder={"username"}
                           onChange={event => this.setState({username: event.target.value})}
                    />
                </span>
                <span className={"ui input"} style={{margin: '5px'}}>
                    <input name={"password"}
                           value={this.state.password}
                           type={"text"}
                           placeholder={"password"}
                           onChange={event => this.setState({password: event.target.value})}
                    />
                </span>
                <div style={{marginTop: '18px', padding: '0px'}}>
                    <div className="ui buttons">
                        <button className="ui button blue" onClick={ this.onHitLogin }>
                            <i className="sign in alternate icon"></i>
                            Login
                        </button>
                        <div className="or"></div>
                        <SignUpModal />
                    </div>
                    <div style={{marginTop: '0px'}}>
                        <ForgotPasswordModal />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { user: state.user };
};

export default connect(mapStateToProps, {
    user: selectUser
})(Login);
