import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'

class SignUpModal extends React.Component {

    state = {
        email: '',
        password: '',
        ssn: '',
        phone: '',
        submitMessage: ''
    };

    updateSubmitMessage = () => {
        this.setState({submitMessage: 'Submitted, please log in now.' });
    };

    onClickSubmit = async () => {
        if (this.state.email == '' || this.state.password == '' || this.state.ssn == '' || this.state.phone == '') {
            alert('No fields can be blank');
            return;
        }
        const signUpPayload = {
            email: this.state.email,
            password: this.state.password,
            phone: this.state.phone,
            ssn: this.state.ssn
        }

        console.log('User is attempting to sign up')
        console.log(signUpPayload);

        let stringifiedObject = JSON.stringify({ signUpPayload });
        console.log(stringifiedObject);
        try {
            const response = await fetch(`http://localhost:3000/signup?payload=${stringifiedObject}`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json();
            this.updateSubmitMessage();
        } catch (err) {
            console.log(err);
        }
    };

    closeModal = () => {
        this.setState({email: '', password: '', phone: '', ssn: '', submitMessage: ''});
    }

    render() {
        return (
            <Modal onClose={this.closeModal}
                trigger={<Button className="ui button" href={"#"}>
                    <i className="user icon"></i>
                    Sign Up
                </Button>} closeIcon>
                <Modal.Header>We're excited to serve you!</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
                    <Modal.Description>
                        <Header>Please enter all information</Header>

                        <div className={"ui input focus"} style={{display: 'flex', flexDirection: 'column'}}>
                            <input placeholder={"email"} value={this.state.email} onChange={e => this.setState({email: e.target.value})}></input>
                            <input placeholder={"password"} value={this.state.password} onChange={e => this.setState({password: e.target.value})}></input>
                            <input placeholder={"phone"} value={this.state.phone} onChange={e => this.setState({phone: e.target.value})}></input>
                            <input placeholder={"last 4 SSN"} value={this.state.ssn} onChange={e => this.setState({ssn: e.target.value})}></input>
                            <span style={{marginTop: '5px'}}>
                                <button className={"ui blue basic button"} onClick={this.onClickSubmit}>Submit</button>


                            </span>

                        </div>
                        <p>{ this.state.submitMessage }</p>
                    </Modal.Description>

                </Modal.Content>
            </Modal>
        );
    }
}

export default SignUpModal;