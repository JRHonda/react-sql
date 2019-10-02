import React from 'react';
import Results from './Results';
import $ from 'jquery';

class Login extends React.Component {
    state = {
        username: '',
        password: '',
    }

    componentDidMount() { }

    onInputChange = event => {
        const {name, value} = event.target;
        this.setState({
            [name]: value
        });
    }

    onHitLogin = () => {
        console.log(this.state);
        this.props.onLogin(this.state.username, this.state.password);
        // this.props.someMethod(this.state.username, this.state.password)
    }

    onHitSignUp = () => {

    }



    render() {
        return (
            <div className={"login"} >

                <span className={"ui input"}>
                    <input name={"username"}
                           value={this.state.username}
                           value={this.state.username}
                           type={"text"} placeholder={"username"}
                           onChange={this.onInputChange}/>
                </span>

                <span className={"ui input"} style={{margin: '5px'}}>
                    <input name={"password"}
                           value={this.state.password}
                           type={"text"}
                           placeholder={"password"}
                           onChange={this.onInputChange}/>
                </span>

                <div style={{margin: '8px', padding: '0px'}}>
                    <div className="ui buttons">

                        <button className="ui button blue" onClick={this.onHitLogin}>
                            <i className="sign in alternate icon"></i>
                            Login
                        </button>

                        <div className="or"></div>

                        <button className="ui button">
                            <i className="user icon"></i>
                            Sign Up
                        </button>

                    </div>
                </div>
            </div>
        );
    }
}


export default Login;



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
