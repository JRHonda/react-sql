import React from 'react'
import { A, Button, Header, Image, Modal } from 'semantic-ui-react'

const ModalModalExample = () => (
    <Modal trigger={<a href={"#"}>Forgot Password?</a>}>
        <Modal.Header>It's okay, we'll help you get logged in!</Modal.Header>
        <Modal.Content image>
            <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' />
            <Modal.Description>
                <Header>Please enter all information</Header>
                <p>
                    <input placeholder={"email"}></input>
                    <input placeholder={"phone"}></input>
                    <input placeholder={"last 4 SSN"}></input>
                    <button>Submit</button>
                </p>
                <p>Your password will display below:</p>
            </Modal.Description>
        </Modal.Content>
    </Modal>
)

export default ModalModalExample;