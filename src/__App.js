import React, { Component } from "react"
import { Switch, Route, Link, HashRouter as Router } from "react-router-dom"
import axios from 'axios';

import AddProduct from './components/AddProduct'
import Cart from './components/Cart'
import Login from './components/Login'
import ProductList from './components/ProductList'

import "bootstrap/dist/css/bootstrap.min.css"
import "foundation-sites/dist/css/foundation-prototype.min.css"
import "./App.css"

import Context from "./Context"


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: []
    };
    this.routerRef = React.createRef();
  }

    async componentDidMount() {
        const products = await axios.get('http://localhost:3000/api/products');
        this.setState({products: products.data });
    }

  render() {
    return (
        <Context.Provider
            value={{
              ...this.state,
              removeFromCart: this.removeFromCart,
              addToCart: this.addToCart,
              login: this.login,
              addProduct: this.addProduct,
              clearCart: this.clearCart,
              checkout: this.checkout
            }}
        >
          <Router ref={this.routerRef}>

            <div className="App">
                <div className="jumbotron">
                    <div className="container text-center">
                        <h1>Online Store</h1>
                        <p>#tankesmedjan</p>
                    </div>
                </div>
               <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                  <b className="navbar-item is-size-4 ">think tank e-commerce</b>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                            aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                  <label role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
                      onClick={e => {
                        e.preventDefault();
                        this.setState({ showMenu: !this.state.showMenu });
                      }}
                  >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                  </label>
                </div>

                   <div className="collapse navbar-collapse" id="navbarCollapse">
                       <ul className="navbar-nav mr-auto">
                           <li className={`navbar-menu ${
                               this.state.showMenu ? "is-active" : ""
                           }`}>
                               <Link to="/" className="nav-link">
                                   Home
                               </Link>
                           </li>
                           <li className={`navbar-menu ${
                               this.state.showMenu ? "is-active" : ""
                           }`}>
                               <Link to="/products" className="nav-link">
                                   Products
                               </Link>
                               {this.state.user && this.state.user.accessLevel < 1 && (
                                   <Link to="/add-product" className="nav-link">
                                       Add Product
                                   </Link>
                               )}
                           </li>
                           <li className="nav-item">
                               <Link to="/cart" className="nav-link">
                                   Cart
                                   <span
                                       className="tag is-primary"
                                       style={{ marginLeft: "5px", fontSize: "12px" }}
                                   >
                    ( { Object.keys(this.state.cart).length } items. )
                  </span>
                               </Link>
                           </li>
                           <li className="nav-item float-right">
                               {!this.state.user ? (
                                   <Link to="/login" className="nav-link">
                                       Login
                                   </Link>
                               ) : (
                                   <Link to="/" onClick={this.logout} className="nav-link">
                                       Logout
                                   </Link>
                               )}
                           </li>
                       </ul>
                       <form className="form-inline mt-2 mt-md-0">
                           <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                               <button className="button" type="submit">Search</button>
                       </form>
                   </div>
              </nav>
              <Switch>
                <Route exact path={["/", "/products"]} component={ProductList} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/add-product" component={AddProduct} />
              </Switch>
            </div>
          </Router>
        </Context.Provider>
    );
  }
}
