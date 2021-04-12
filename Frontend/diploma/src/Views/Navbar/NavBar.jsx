import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ClientRouter from './../../Network/ClientRouter';

import "bootstrap/dist/css/bootstrap.css";
    
    
class Navbar extends Component {
    state = {  }
    render() { 
        return (
        <nav >
            <div className="navbar-nav">
            <label>
                Navbar
            </label>

            <Link className="nav-item nav-link" to={ClientRouter.home}>Home</Link>
            <Link to={ClientRouter.login}> Login</Link>
            <Link to={ClientRouter.register}>Register </Link>
            </div>
        </nav >
        );
    }
}
 
export default Navbar;