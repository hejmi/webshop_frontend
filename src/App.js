import React, { Component } from "react"
import { Switch, Route, Link } from "react-router-dom"
import * as Icon from "react-bootstrap-icons"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import BootstrapCarousel from "./BootstrapCarousel";

import AddProduct from './components/AddProduct'
import Cart from './components/Cart'
import Login from './components/Login'
import ProductList from './components/ProductList'

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            cart: {},
            products: []
        };
    }
  render() {
    return (
        <div className="container">
            <div><br/></div>
               <nav className="navbar navbar-expand-md bg-dark col-12 d-none d-md-flex" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                  <div className="navbar-item is-size-4 "><img src="./images/logo.png" alt="logo" className="navbar-logo" /></div>
                </div>
                   <div className="navbar-nav mr-auto col-12">
                       <div className="navbar-collapse col d-none">
                           <li className="navbar-menu">
                               <Link to="/" className="nav-link">
                                   Home
                               </Link>
                           </li>
                           <li className="navbar-menu">
                               <Link to="/products" className="nav-link">
                                   Categories
                               </Link>
                               {this.state.user && this.state.user.accessLevel < 1 && (
                                   <Link to="/add-product" className="nav-link">
                                       Add Product
                                   </Link>
                               )}
                           </li>
                           <li className="navbar-menu">
                               &nbsp;&nbsp;About
                           </li>&nbsp;&nbsp;&nbsp;&nbsp;
                           <li className="navbar-menu">
                               Contact
                           </li>
                       </div>
                       <div className="navbar-collapse col-md-auto navbar-right">
                       <form className="form-inline mt-2 mt-md-0">
                           <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                               <button className="button" type="submit">Search</button>
                       </form>
                           <li className="nav-item">
                               {!this.state.user ? (
                                   <Link to="/login" className="nav-link">
                                       <Icon.PersonFill />
                                   </Link>
                               ) : (
                                   <Link to="/" onClick={this.logout} className="nav-link">
                                       Logout
                                   </Link>
                               )}
                           </li>
                           <li className="nav-item">
                               <Link to="/cart" className="nav-link">
                                   <Icon.Cart4/>
                                   <span
                                       className="tag is-primary"
                                       style={{ marginLeft: "5px", fontSize: "12px" }}
                                   >
                                       <div className="cart-items">{ Object.keys(this.state.cart).length }</div>
                  </span>
                               </Link>
                           </li>
                       </div>
                   </div>
              </nav>
            <BootstrapCarousel></BootstrapCarousel>
            <Switch>
                <Route exact path="/products" component={ProductList} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/add-product" component={AddProduct} />
              </Switch>
      </div>
    );
  }
}
export default App;