import React, { Component } from 'react';
import Login from './Login';
import Results from './Results';
import faker from 'faker';
import AppStyles from './App.css';
import axios from 'axios';

// TODO - 1. Use data from login form to create query
// TODO - 2. Use class props and state and event listeners like onSubmit and onClick


class App extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    //this.getUsers();
  }

  loginUser = (un, pw) => {
      console.log('User is attempting to login')
      fetch(`http://localhost:3000/user?username=${un}&password=${pw}`)
          .then(response => response.json())
          .then(response => this.setState({ users: response.data }))
          .catch(err => console.log(err))
  }

  getUsers = () => {
    fetch('http://localhost:3000/user?username=&password=anything%27%20OR%20%27x%27=%27x')
        .then(response => response.json())
        .then(response => this.setState({ users: response.data }))
        .catch(err => console.log(err))
    //   axios.get('http://localhost:3000/user?username=jackfrost&password=password', {
    //       //params: {users: 'onepunchman'}
    //   }).then(response => response.json())
    //       .then(response => this.setState({ users: response.data }))
    //       .then(response => console.log(this.state.users))
    //       .catch(e => console.log(e));
    //
  }

  renderUser = ({id, username}) => <div key={id}>{username}</div>

  render() {
    //const { users } = this.state;

    return (

        <div>

            <header style={{minWidth:100+'%', minHeight: '75px', backgroundColor:'navy', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div> <h1 style={{color:'white', marginLeft: '8px'}}>VandyBank</h1></div>

                    <Login onLogin={this.loginUser}/>

            </header>

            <Results result={this.state.users} />
            <div id="bg">
                <img src="/vandybank-cornelius.jpg" alt=""/>
            </div>

            <footer className={"main-footer"} style={{color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{color: 'white', display: 'flex'}}>
                <a href={"#top"}>Back to top &raquo;</a>
            </div>
            </footer>

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
