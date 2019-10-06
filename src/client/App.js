import React, { Component } from 'react';
import Login from './Login';
import Content from './Content';
import Router from 'react-router';
import { connect } from 'react-redux';
import { selectUser } from "../actions";
import Results from './Results';
import AppStyles from './App.css';

class App extends Component {

  state = { }

  render() {
    return (
        <div>
            <header className={"ui segment yellow"} style={{minHeight: '75px', backgroundColor:'navy', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <div className={"ui container"} style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                    <h1 style={{color:'white', fontSize: '32px'}}>VandyBank</h1>
                    <Login />
                </div>
            </header>
            <div id="bg">
                <img src="/vandybank-cornelius.jpg" alt=""/>
            </div>
            <Content />
            <footer className={"main-footer"} style={{borderBottom: '4px gold solid', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <div style={{color: 'white', display: 'flex'}}>
                <a href={"#top"}>Back to top &raquo;</a>
            </div>
            </footer>
        </div>

    );
  }
}

export default App;
