import React, { Component } from 'react';
import Login from './Login';
import faker from 'faker';
import AppStyles from './App.css';

class App extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers = () => {
    fetch('http://localhost:3305/users')
        .then(response => response.json())
        .then(response => this.setState({ users: response.data }))
        .catch(err => console.log(err))
  }

  renderUser = ({id, username}) => <div key={id}>{username}</div>

  render() {
    //const { users } = this.state;

    return (

        <div>

            <header style={{minWidth:100+'%', minHeight: 50+'px',backgroundColor:'navy', color: 'white', display: 'flex', alignItems: 'center', paddingLeft: 16+'px'}}>
                <h1 styles={{color:'white'}}>VandyBank</h1>
            </header>

            <Login onDivClick={this.getUsers} data={this.state.users}/>{/*{ users.map(this.renderUser) }*/}
        </div>

    );
  }
}

export default App;

/*
            <div id="bg">
                <img src={faker.image.city()} alt=""/>
            </div>
*/
