import React, { Component } from "react";
import ProductsService from "../services/ProductsService";
import CategoriesService from "../services/CategoriesService";
import BrandsService from "../services/BrandsService";
import {Link} from "react-router-dom";

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.retriveProducts = this.retriveProducts.bind(this);

        this.state = {
            products: [],
            currentIndex: -1,
            quantity: 1,
            searchTitle: "",
            topMessage: ""
        };
    }

    componentDidMount() {
        this.retriveProducts();
    }

    componentDidUpdate(prevProps) {
        if(prevProps.location.pathname !== this.props.location.pathname){
           this.retriveProducts()
        }
        if(prevProps.location.search !== this.props.location.search) {
            this.retriveProducts()
        }
    }

    retriveProducts() {
        let id = this.props.location.pathname.split("/")
        let keyword = this.props.location.search.split("=")
        if (id[1] === "brands") {
            ProductsService.getAllFromBrand(id[2])
                .then(response => {
                    this.setState({
                        products: response.data
                    });
                })
                .catch(e => {
                })
            BrandsService.get(id[2])
                .then(response => {
                    this.setState({
                        topMessage: 'Showing all products from "' + response.data[0].brandName + '"'
                    })
                })
                .catch(e => {
                    this.setState({
                        topMessage: 'Error 404 - The page you\'re looking for doesn\'t exist...'
                    })
                })
        } else if (id[1] === "products") {
            ProductsService.search(keyword[1])
                .then(response => {
                    this.setState({
                        products: response.data
                    });
                })
                .catch(e => {
                })
            this.setState({
                topMessage: 'Search Results for ' + keyword[1]
            })
        } else {
                ProductsService.getAllFromCat(id[2])
                    .then(response => {
                        this.setState({
                            products: response.data
                        });
                    })
                    .catch(e => {
                    })
                CategoriesService.get(id[2])
                    .then(response => {
                        this.setState({
                            topMessage: 'Showing all products in "' + response.data[0].categoryName + '" category'
                        })
                    })
                    .catch(e => {
                        this.setState({
                            topMessage: 'Error 404 - The page you\'re looking for doesn\'t exist...'
                        })
                    })
        }

    }

    refreshList() {
        this.retriveProducts();
        this.setState({
            currentProduct: null,
            currentIndex: -1
        });
    }

    setActiveProduct(product, index) {
        this.setState({
            currentProduct: product,
            currentIndex: index
        });
    }
    addToCart = (data) => {
        let cart = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart')) : {};
        console.log(data);
        let id = data.id.toString();
        cart[id] = (cart[id] ? cart[id]: 0);
        let qty = cart[id] + parseInt(this.state.quantity);
        if (data.stock < qty) {
            cart[id] = data.stock;
        } else {
            cart[id] = qty
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.setState({cart});
        this.forceUpdate();
    }

    render() {
        const { products } = this.state;
        return (
            <div className="row col-12">
                        <div className="container"><br/>
                            <h5>{this.state.topMessage}</h5><br/>
                            <div className="row">
                            {products &&
                            products.map((product, index) => (
                                <div className="col-3 products" key={index}>
                                    {product.attributeOption.attribute.id !== 0  ? (
                                    <Link to={`/product/${product.product.id}`}>
                                        {product.product.hasImage === true ? (
                                            <img alt={product.product.productName} height="301" src={`/images/products/product-${product.product.id}.jpg`} className="product-image"/>
                                        ):(<img alt={product.product.productName} height="301" src="/images/products/imageiscomingsoon.jpg"/>)}
                                    </Link>
                                        ) : (
                                    <Link to={`/product/${product.product.id}`}>
                                        {product.product.hasImage === true ? (
                                            <img alt={product.product.productName} height="301" src={`/images/products/product-${product.product.id}.jpg`} className="product-image"/>
                                        ):(<img alt={product.product.productName} height="301" src="/images/products/imageiscomingsoon.jpg"/>)}
                                    </Link>
                                        )}
                                    <div>
                                        <div className="product-info">
                                            <span className="product-name">{product.product.productName}</span>
                                            <span className="product-price">${product.product.productPrice}</span>
                                        </div>
                                            <div className="description">{product.product.shortDesc}</div>
                                        </div>
                                        <div className="product-info">
                                            {product.attributeOption.attribute.id !== 0  ? (
                                                    <span>
                                                        <Link to={`/product/${product.product.id}`}><button className="button-moreinfo">More info</button></Link>
                                                        <Link to={`/product/${product.product.id}`}><button className="button-addtocart">See Options</button></Link>
                                                    </span>
                                                ) : (
                                                    <span>
                                                        <Link to={`/product/${product.product.id}`}><button className="button-moreinfo">More info</button></Link>
                                                        <button onClick={() => this.addToCart(product) & window.location.reload(true)} className="button-addtocart">Add to cart</button>
                                                    </span>
                                            )}
                                        </div>
                                </div>
                            ))}

                            </div>
                        </div>
            </div>
        );
    }
};
