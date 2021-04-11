import React, {Component} from "react"
import {Switch, Route, Link} from "react-router-dom"
import * as Icon from "react-bootstrap-icons"
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import Footer from "./components/Footer";
import FeaturedProducts from "./components/FeaturedProducts";
import { withRouter } from "react-router-dom";
import ChatBot from 'react-simple-chatbot';

import AddProduct from './components/AddProduct'
import Cart from './components/Cart'
import Login from './components/Login'
import ProductList from './components/ProductList'
import CategoriesService from "./services/CategoriesService";
import {Dropdown, NavDropdown} from "react-bootstrap";
import BrandsService from "./services/BrandsService";
import ProductView from "./components/ProductView";
import {isAdminAuthenticated, isAuthenticated, login} from "./repositories/LoginAndAuthentication";
import Customer from "./components/Customer";
import {Administration} from "./components/Administration";
import Contact from "./components/Contact";


class App extends Component {
    constructor(props) {
        super(props);
        this.retriveCategories = this.retriveCategories.bind(this);
        this.state = {
            user: null,
            cart: {},
            categories: [],
            products: [],
            showUserMenu: "none",
            brands: [],
            keyword: "",
            cartCount: null
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
        if (!cart) {
            this.setState({cartCount: 0});
            return null;
        }
        Object.values(cart).forEach(item => count = count + item)
        this.setState({cartCount: count})
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

    handleChangeInSearchbar(e) {
        this.setState({keyword: e.target.value})
    }

    submitSearch = (event) => {
        event.preventDefault();
        this.props.history.push(`/products/search?keyword=${this.state.keyword}`);
    }
    searchProduct() {
            this.props.history.push(`/products/search?keyword=${this.state.keyword}`);
    }

    logout() {
        localStorage.removeItem('x-access-token-expiration')
        localStorage.removeItem('x-access-token')
        localStorage.removeItem('login-user')
        localStorage.removeItem('role')
    }

    render() {
        const {categories, brands, keyword, cartCount} = this.state;
        return (
            <div className="container">
                <div><br/></div>
                <nav className="navbar navbar-expand-md bg-dark col-12 d-none d-md-flex" role="navigation"
                     aria-label="main navigation">
                    <div className="navbar-brand">
                        <div className="navbar-item"><a href="/"><img src="/images/logoandtext.png" alt="logo"
                                                                      className="navbar-logo" width="200"/></a></div>
                    </div>
                    <div className="navbar-nav mr-auto col-12">
                        <div className="navbar-collapse col d-none">
                            <li className="navbar-menu first">
                                <NavDropdown title="Shop By Brand" href="/" className="categories-nav-dropdown">
                                    <div className="brands row">
                                        {brands &&
                                        brands.map((brand, index) => (
                                            <div className="col-3" key={brand.id}>
                                                <br/><Link to={`/brands/${brand.id}`}><img
                                                src={`/images/brands/${brand.brandLogo}`} height="80" width="80"
                                                alt="brand logo" className="brand-logo"/><br/><br/></Link>
                                            </div>
                                        ))}
                                    </div>
                                </NavDropdown>

                            </li>
                            <li className="navbar-menu">
                                <NavDropdown title="Shop By Category" id="categories-nav-dropdown">
                                    {categories &&
                                    categories.map((category, index) => (
                                        <div key={category.id}>
                                            {category.parentCategoryId === 0 ? (
                                                <NavDropdown title={category.categoryName}
                                                             className="navbar-dropdown"
                                                             href={`/categories/${category.id}`}>
                                                    <div className="submenu">
                                                        {categories &&
                                                        categories.map((subcategory, indx) => (
                                                            <div key={subcategory.id}>
                                                                {subcategory.parentCategoryId === category.id ? (
                                                                    <div className="navbar-dropdown-sub"><Link
                                                                        to={`/categories/${subcategory.id}`}>{subcategory.categoryName}</Link>
                                                                    </div>) : (null)}
                                                            </div>
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
                            <form onSubmit={this.submitSearch} className="form-inline mt-2 mt-md-0">
                                <input className="form-control mr-sm-2"
                                       type="text"
                                       placeholder="Search"
                                       aria-label="Search"
                                       value={this.state.value}
                                       onChange={(e) => this.handleChangeInSearchbar(e)}/>
                                    <button className="button" type="submit">Search</button>
                            </form>
                            <li className="nav-item">
                                {!isAuthenticated() ? (
                                    <Link to="/login" className="nav-link">
                                        <Icon.PersonFill/>
                                    </Link>
                                ) : (
                                    <Dropdown>
                                        <Dropdown.Toggle variant="none" id="dropdown-custom-1">
                                            <Icon.PersonFill/>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu id="dropdown-custom-2">
                                            <Dropdown.Item id="dropdown-item-custom" href="/myprofile"><Icon.HouseDoorFill
                                                size={18}/> My Account</Dropdown.Item>
                                            {isAdminAuthenticated() === "Admin" ? (
                                                <Dropdown.Item id="dropdown-item-custom" href="/administration"><Icon.Clipboard
                                                    size={18}/> Backend</Dropdown.Item>
                                                ) : (
                                            <Dropdown.Item id="dropdown-item-custom" href="/mysettings"><Icon.Clipboard
                                                size={18}/> My Orders</Dropdown.Item>
                                                )}
                                            <Dropdown.Divider></Dropdown.Divider>
                                            <Dropdown.Item id="dropdown-item-custom" href="/"
                                                           onClick={this.logout}><Icon.PersonXFill size={18}/> Logout</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )}
                            </li>

                            <li className="nav-item">
                                <Link to="/cart" className="nav-link">
                                    {this.state.cartCount > 0 ? (
                                        <Icon.BagFill/>
                                    ) : (
                                        <Icon.Bag/>
                                    )}

                                    <span
                                        className="tag is-primary"
                                        style={{marginLeft: "5px", fontSize: "12px"}}
                                    >
                                       <div className="cart-items">{this.state.cartCount}</div>
                  </span>
                                </Link>
                            </li>
                        </div>
                    </div>
                </nav>


                <Switch>
                    <Route path="/products/:id" component={ProductList}/>
                    <Route path="/brands/:id" component={ProductList}/>
                    <Route path="/categories" component={ProductList}/>
                    <Route exact path="/" component={FeaturedProducts}/>
                    <Route path="/login" component={Login}/>
                    <Route exact path="/cart" component={Cart}/>
                    <Route path="/product/:id" component={ProductView}/>
                    <Route exact path="/add-product" component={AddProduct}/>
                    <Route path="/myprofile" component={Customer}/>
                    <Route path="/products" component={ProductList}/>
                    <Route path="/administration" component={Administration} />
                    <Route path="/contact" component={Contact} />
                </Switch>
                <Footer></Footer>

            </div>
        );
    }
}

export default withRouter(App);
