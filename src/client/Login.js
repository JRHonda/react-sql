import React from 'react';
import Results from './Results';

class Login extends React.Component {
    state = {
        username: '',
        password: '',
    }

    componentDidMount() { }

    onHitSignUp = () => {
        this.props.onDivClick();
    }

    render() {
        return (

            <div style={{display: 'flex', justifyContent: 'flex-end',}}>
                <div className={"ui label"}>
                    <Results result={this.props.data}/>
                </div>

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
                            <div className="ui big button" onClick={this.onHitSignUp}>
                                <i className="signup icon"></i>
                                Sign Up
                            </div>
                        </div>
                    </div>
                    <div className="ui vertical divider">
                        Or
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
