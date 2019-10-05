import React from 'react';
import ReactDOM from 'react-dom';
import Results from './Results';
import Modal from './Modal';
import {Redirect} from 'react-router';
import { connect } from 'react-redux';
import { selectUser } from "../actions";

class Login extends React.Component {

    state = {
        username: '',
        password: '',
        user: null
    };

    componentDidMount() { }

    loginUser = async (un, pw) => {
        console.log('User is attempting to login')
        try {
            const response = await fetch(`http://localhost:3000/user?username=${un}&password=${pw}`)
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                const json = await response.json();
                this.setState({ user: json })
        } catch (err) {
            console.log(err);
        }
    };

    signUpUser = async (un, pw) => {
        console.log('User is attempting to sign up')
        try {
            const response = await fetch(`http://localhost:3000/signup?username=${un}&password=${pw}`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            this.setState({ user: json })
        } catch (err) {
            console.log(err);
        }
    }

    onHitLogin = async () => {

        await this.loginUser(this.state.username, this.state.password)
        // Waiting for data from database

        // user doesn't exist in database
        if (this.state.user.data.length == 0 ) {
            console.log('no user exists for that login');
            alert('Please sign up for an account');
            return;
            // indicate to user to sign up
            // createBanker
        }
        console.log('will load banker information');
            // loadBankersInformation
        window.location.assign('https://www.google.com');
    };

    onHitSignUp = async () => {
        if (this.state.username === '' || this.state.password === '') {
            alert('Please fill out the username and password field and then click Sign up.');
            return;
        }
        this.setState({user: null})
        await this.signUpUser(this.state.username, this.state.password);
        // Waiting for data from database

        console.log(this.state.user);
        window.location.assign('https://www.google.com');


    };

    onClickForgotPassword = () => {
        return <Modal/>;

    }

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

                        <button className="ui button" onClick={ this.onHitSignUp }>
                            <i className="user icon"></i>
                            Sign Up
                        </button>

                    </div>

                    <div style={{marginTop: '0px'}}>
                        <Modal cursor={'hand'}/>
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
//export default Login;



//export default Login;

//<div style={{display: 'flex', justifyContent: 'flex-end',}}></div>
/*
<div className="ui placeholder segment">
    <div className="ui two column very relaxed stackable grid">
        <div className="column">
            <div className="ui form">
                <div className="field">
                    <label>Username</label>
                    <div className="ui left icon input">
                        <input type="text" placeholder="Username"/>
                        <i className="user icon"></i>
                    </div>
                </div>
                <div className="field">
                    <label>Password</label>
                    <div className="ui left icon input">
                        <input type="password"/>
                        <i className="lock icon"></i>
                    </div>
                </div>
                <div className="ui blue submit button">Login</div>
            </div>
        </div>
        <div className="middle aligned column">
            <div className="ui big button">
                <i className="signup icon"></i>
                Sign Up
            </div>
        </div>
    </div>
    <div className="ui vertical divider">
        Or
    </div>
</div>
*/
