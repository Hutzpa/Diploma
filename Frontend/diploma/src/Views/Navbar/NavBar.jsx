import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ClientRouter from './../../Network/ClientRouter';
    
    
    
class Navbar extends Component {
    state = {  }
    render() { 
        return (<div>
            <label>
                Navbar
            </label>

            <Link to={ClientRouter.home}>Home</Link>
            <Link to={ClientRouter.login}> Login</Link>
            <Link to={ClientRouter.register}>Register </Link>
        </div>);
    }
}
 
export default Navbar;