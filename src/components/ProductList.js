import React, { Component } from "react";
import ProductsService from "../services/ProductsService";
import parse from 'html-react-parser';
import CategoriesService from "../services/CategoriesService";
import BrandsService from "../services/BrandsService";
import {Link} from "react-router-dom";

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.retriveProducts = this.retriveProducts.bind(this);

        this.state = {
            products: [],
            currentProduct: null,
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
        if(prevProps.match.params.id !== this.props.match.params.id){
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
                    //console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                })
            BrandsService.get(id[2])
                .then(response => {
                    this.setState({
                        topMessage: 'Showing all products from "' + response.data[0].brand_name + '"'
                    })
                })
        } else if (id[1] === "products") {
            ProductsService.search(keyword[1])
                .then(response => {
                    this.setState({
                        products: response.data
                    });
                    response.data.forEach(d => console.log(d))
                })
                .catch(e => {
                    console.log(e);
                })
        } else if(id[1] === "products") {
            console.log(keyword[1])
            ProductsService.search(keyword[1])
                .then(response => {
                    this.setState({
                        products: response.data
                    });
                    response.data.forEach(d => console.log(d))
                })
        } else {
                ProductsService.getAllFromCat(id[2])
                    .then(response => {
                        this.setState({
                            products: response.data
                        });
                        //console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    })
                CategoriesService.get(id[2])
                    .then(response => {
                        this.setState({
                            topMessage: 'Showing all products in "' + response.data[0].category_name + '" category'
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
        const { products, currentProduct } = this.state;
        return (
            <div className="row col-12">
                        <div className="container"><br/>
                            <h5>{this.state.topMessage}</h5><br/>
                            <div className="row">
                            {products &&
                            products.map((product, index) => (
                                <div className="col-3 products" key={index}>
                                    {product.attributeOptions.attribute.id !== 0  ? (
                                    <Link to={`/product/${product.products.id}`}>
                                        {product.products.has_image === true ? (
                                            <img alt={product.products.product_name} height="301" src={`/images/products/product-${product.products.id}.jpg`} className="product-image"/>
                                        ):(<img alt={product.products.product_name} height="301" src="/images/products/imageiscomingsoon.jpg"/>)}
                                    </Link>
                                        ) : (
                                    <Link to={`/product/${product.products.id}`}>
                                        {product.products.has_image === true ? (
                                            <img alt={product.products.product_name} height="301" src={`/images/products/product-${product.products.id}.jpg`} className="product-image"/>
                                        ):(<img alt={product.products.product_name} height="301" src="/images/products/imageiscomingsoon.jpg"/>)}
                                    </Link>
                                        )}
                                    <div>
                                        <div className="product-info">
                                            <span className="product-name">{product.products.product_name}</span>
                                            <span className="product-price">${product.products.product_price}</span>
                                        </div>
                                            <div className="description">{product.products.short_desc}</div>
                                        </div>
                                        <div className="product-info">
                                            {product.attributeOptions.attribute.id !== 0  ? (
                                                    <span>
                                                        <Link to={`/product/${product.products.id}`}><button className="button-moreinfo">More info</button></Link>
                                                        <Link to={`/product/${product.products.id}`}><button className="button-addtocart">See Options</button></Link>
                                                    </span>
                                                ) : (
                                                    <span>
                                                        <Link to={`/product/${product.products.id}`}><button className="button-moreinfo">More info</button></Link>
                                                        <button onClick={() => this.addToCart(product) & window.location.reload(true)} className="button-addtocart">Add to cart</button>
                                                    </span>
                                            )}
                                        </div>
                                </div>
                            ))}
                            </div>
                            {currentProduct ? (
                                <div>
                                    <br/>
                                    <h4>Product</h4>
                                    <div>
                                        <label>
                                            <strong>Name:</strong>
                                        </label>{" "}
                                        {currentProduct.product_name}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>Full Description:</strong>
                                        </label>{" "}
                                        {parse(currentProduct.full_desc)}
                                    </div>
                                    <div>
                                        <label>
                                            <strong>Price:</strong>
                                        </label>{" "}
                                        {currentProduct.product_price}
                                    </div>

                                </div>
                            ):( <div> </div> )}
                        </div>
            </div>
        );
    }
};
