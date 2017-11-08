import React, {Component} from 'react';
import logo from './logo.png';
import {IndexLink, Link} from 'react-router';
import './App.css';

class App extends Component {
  render() {
    return (
        <div className="App">
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <h3>React Router Tutorial</h3>
                <ul className="nav">
                    <li>
                        <IndexLink to="/" activeClassName="active">
                            Home
                        </IndexLink>
                    </li>
                    <li>
                        <Link to="/about" activeStyle={{color: 'green'}}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/user" activeStyle={{color: 'red'}}>
                            User
                        </Link>
                    </li>
                    <li>
                        <Link to="/contacts" activeClassName="active">
                            Contacts
                        </Link>
                    </li>
                    <li>
                        <Link to="/cast" activeStyle={{color: 'yellow'}}>
                            Cast
                        </Link>
                    </li>
                    <li>
                        <Link to={{pathname: 'concept'}} activeStyle={{color: 'purple'}}>
                            Concept
                        </Link>
                    </li>
                    <li>
                        <Link to="/comments" activeStyle={{color: 'coral'}}>
                            Comments
                        </Link>
                    </li>
                    <li>
                        <Link to="/brothernews" activeStyle={{color: '#fd5624'}}>
                            BrotherNews
                        </Link>
                    </li>
                    <li>
                        <Link to="/newShopTable" activeStyle={{color: '#1d5624'}}>
                            NewShopTable
                        </Link>
                    </li>
                </ul>
            </div>
            {this.props.children}
        </div>
    );
  }
}

export default App;
