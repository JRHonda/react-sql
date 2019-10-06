import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

class ForgotPasswordModal extends React.Component {

    // State management
    state = {
        email: '',
        phone: '',
        ssn: '',
        submitMessage: ''
    };

    // Event handler for retrieving password info from server
    onClickSubmit = async () => {
        // Display alert if user leaves any field blank
        if (this.state.email == '' || this.state.phone == '' || this.state.ssn == '') {
            alert('Please fill all fields');
            return;
        }

        // Create payload to send to server
        const forgotPasswordPayload = {
            email: this.state.email,
            phone: this.state.phone,
            ssn: this.state.ssn
        }

        // Must stringify payload before sending, or can't parse on server side
        let stringifiedObject = JSON.stringify({ forgotPasswordPayload });

        // Sends payload to server for processing
        try {
            const response = await fetch(`http://localhost:3000/forgot?payload=${stringifiedObject}`);
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const json = await response.json(); // Response from server
            this.setState({submitMessage: json.data[0].password}); // Shows user password
        } catch (err) {
            console.log(err);
        }
    };

    // Helper to reset state once user closes modal.
    closeModal = () => {
        this.setState({email: '', phone: '', ssn: '', submitMessage: ''});
    }

    render() {
        return (
            <Modal onClose={this.closeModal} trigger={<a href={"#"}>Forgot Password?</a>} closeIcon>
                <Modal.Header>It's okay, we'll help you get logged in!</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
                    <Modal.Description>
                        <Header>Please enter all information</Header>
                        <div className={"ui input focus"} style={{display: 'flex', flexDirection: 'column'}}>
                            <input placeholder={"email"} value={this.state.email} onChange={e => this.setState({email: e.target.value})}></input>
                            <input placeholder={"phone"} value={this.state.phone} onChange={e => this.setState({phone: e.target.value})}></input>
                            <input placeholder={"last 4 SSN"} value={this.state.ssn} onChange={e => this.setState({ssn: e.target.value})}></input>
                        </div>
                        <button style={{marginTop: '5px'}} className={"ui blue basic button"} onClick={this.onClickSubmit}>
                            Submit
                        </button>
                        <p style={{marginTop: '5px'}}>Your password will display below:</p>
                        <p style={{color: 'green'}}>{this.state.submitMessage}</p>
                    </Modal.Description>
                </Modal.Content>
            </Modal>
        );
    }
}

export default ForgotPasswordModal;