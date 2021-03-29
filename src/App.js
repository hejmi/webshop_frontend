import React, { Component } from "react"
import { Switch, Route, Link } from "react-router-dom"
import * as Icon from "react-bootstrap-icons"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Footer from "./components/Footer";
import FeaturedProducts from "./components/FeaturedProducts";

import AddProduct from './components/AddProduct'
import Cart from './components/Cart'
import Login from './components/Login'
import ProductList from './components/ProductList'
import CategoriesService from "./services/CategoriesService";
import {NavDropdown} from "react-bootstrap";
import BrandsService from "./services/BrandsService";
import ProductView from "./components/ProductView";

class App extends Component {
    constructor(props) {
        super(props);
        this.retriveCategories = this.retriveCategories.bind(this);
        this.state = {
            user: null,
            cart: {},
            categories: [],
            products: [],
            brands: []
        };
    }

    componentDidMount() {
        this.retriveCategories();
        this.retriveBrands();
        let cart = JSON.parse(localStorage.getItem('cart'));
        this.setState({cart})
        this.countItemsInCart()
    }

    countItemsInCart() {
        let count = 0;
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) return 0;
        Object.values(cart).forEach(item => count = count + item)
        return count;
    }

    retriveCategories() {
        CategoriesService.getAll()
            .then(response => {
                this.setState({
                    categories: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    retriveBrands() {
        BrandsService.getAll()
            .then(response => {
                this.setState({
                    brands: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

  render() {
      const { categories, brands } = this.state;
      return (
        <div className="container">
            <div><br/></div>
               <nav className="navbar navbar-expand-md bg-dark col-12 d-none d-md-flex" role="navigation" aria-label="main navigation">
                <div className="navbar-brand" >
                    <div className="navbar-item"><a href="/"><img src="/images/logoandtext.png" alt="logo" className="navbar-logo" width="200" /></a></div>
                </div>
                   <div className="navbar-nav mr-auto col-12">
                       <div className="navbar-collapse col d-none">
                           <li className="navbar-menu first">
                               <NavDropdown title="Shop By Brand" href="/" className="categories-nav-dropdown">
                                   <div className="brands row">
                                   {brands &&
                                   brands.map((brand, index) => (
                                       <div className="col-3" key={index}>
                                       <br/><Link to={`/brands/${brand.id}`}><img src={`/images/brands/${brand.brand_logo}`} height="80" width="80" alt="brand logo" className="brand-logo" /><br/><br/></Link>
                                       </div>
                                       ))}
                                   </div>
                               </NavDropdown>

                           </li>
                           <li className="navbar-menu">
                               <NavDropdown title="Shop By Category" id="categories-nav-dropdown">
                                   {categories &&
                                   categories.map((category, index) => (
                                       <div>
                                       {category.parent_category_id === 0 ? (
                                               <NavDropdown title={category.category_name} key={index} className="navbar-dropdown" href={`/categories/${category.id}`}>
                                                   <div className="submenu">
                                                   {categories &&
                                                   categories.map((subcategory, indx) => (
                                                       <a href="/">
                                                       {subcategory.parent_category_id === category.id ? (<div className="navbar-dropdown-sub"><Link to={`/categories/${subcategory.id}`}>{subcategory.category_name}</Link></div>) : (null)}
                                                       </a>
                                                       ))}
                                                   </div>
                                               </NavDropdown>
                                           ) : (
                                               <span> </span>
                                           )}
                                       </div>
                                   ))}
                               </NavDropdown>
                           </li>
                            &nbsp;&nbsp;&nbsp;
                           <li className="navbar-menu">
                               <a href="/contact">Contact</a>
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
                                       <div className="cart-items">{ this.countItemsInCart() }</div>
                  </span>
                               </Link>
                           </li>
                       </div>
                   </div>
              </nav>
            <Switch>
                <Route exact path="/products" component={ProductList} />
                <Route exact path="/brands" component={ProductList} />
                <Route path="/categories" component={ProductList} />
                <Route path="/brands" component={ProductList} />
                <Route exact path="/" component={FeaturedProducts} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/cart" component={Cart} />
                <Route path="/product" component={ProductView} />
                <Route exact path="/add-product" component={AddProduct} />
              </Switch>
            <Footer></Footer>
      </div>
    );
  }
}
export default App;
