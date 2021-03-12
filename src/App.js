import React, { Component } from "react"
import { Switch, Route, Link } from "react-router-dom"
import * as Icon from "react-bootstrap-icons"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import BootstrapCarousel from "./components/BootstrapCarousel";
import Footer from "./components/Footer";

import AddProduct from './components/AddProduct'
import Cart from './components/Cart'
import Login from './components/Login'
import ProductList from './components/ProductList'
import CategoriesService from "./services/CategoriesService";
import {NavDropdown} from "react-bootstrap";

class App extends Component {
    constructor(props) {
        super(props);
        this.retriveCategories = this.retriveCategories.bind(this);
        this.state = {
            user: null,
            cart: {},
            categories: [],
            products: []
        };
    }

    componentDidMount() {
        this.retriveCategories();
    }

    retriveCategories() {
        CategoriesService.getAll()
            .then(response => {
                this.setState({
                    categories: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

  render() {
      const { categories } = this.state;
      return (
        <div className="container">
            <div><br/></div>
               <nav className="navbar navbar-expand-md bg-dark col-12 d-none d-md-flex" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                  <div className="navbar-item is-size-4 "><img src="/images/logo2.png" alt="logo" className="navbar-logo" /></div>
                </div>
                   <div className="navbar-nav mr-auto col-12">
                       <div className="navbar-collapse col d-none">
                           <li className="navbar-menu">
                               &nbsp;&nbsp;Mr Gadget&nbsp;&nbsp;
                           </li>
                           <li className="navbar-menu">
                               <Link to="/" className="nav-link">
                                   Home
                               </Link>
                           </li>
                           <li className="navbar-menu">
                               <NavDropdown title="Categories" id="categories-nav-dropdown">
                                   {categories &&
                                   categories.map((category, index) => (
                                   <NavDropdown.Item key={index} className="navbar-dropdown" href={`/categories/${category.category_id}`}>
                                       {category.category_name}
                                   </NavDropdown.Item>
                                   ))}
                               </NavDropdown>
                           </li>
                            &nbsp;&nbsp;&nbsp;
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
                                   <Icon.Cart2/>
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
                <Route exact path="/" component={ProductList} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/add-product" component={AddProduct} />
              </Switch>
            <Footer></Footer>
      </div>
    );
  }
}
export default App;