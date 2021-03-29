import React, { Component } from "react";
import ProductsService from "../services/ProductsService";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';

export default class ProductList extends Component {
    constructor(props) {
        super(props);
        this.retriveProducts = this.retriveProducts.bind(this);

        this.state = {
            products: [],
            currentProduct: null,
            currentIndex: -1,
            quantity: 1,
            searchTitle: ""
        };
    }

    componentDidMount() {
        this.retriveProducts();
    }

    retriveProducts() {
        ProductsService.getAll()
            .then(response => {
                this.setState({
                    products: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
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
    }

    render() {
        const { products, currentProduct, currentIndex } = this.state;
        return (
            <div className="row col-12">
                        <div className="container"><br/>
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
                            ):(
                            <div className="row">
                            {products &&
                            products.map((product, index) => (
                                <div className="col-3 products" key={index}>
                                    {product.has_image === true ? (
                                    <img alt={product.product_name} height="301" src={`/images/products/product-${product.sku.sku}.jpg`} className="product-image"/>
                                        ):(<img alt={product.product_name} height="301" src="/images/products/imageiscomingsoon.jpg"/>)}
                                    <div>
                                        <div className="product-info">
                                            <span className="product-name">{product.product_name}</span>
                                            <span className="product-price">${product.product_price}</span>
                                        </div>
                                        <div className="product-info">
                                            {product.sku.attributeOptions.attribute.id === 3 ? ( <span className="description"><small>{product.sku.attributeOptions.attribute.attribute_name} : {product.sku.attributeOptions.attribute_option_name}</small></span> ) : (
                                                <span className="description"> </span>
                                            )}
                                            <div className="description">{product.short_desc}</div>
                                        </div>
                                        <div className="product-info">
                                            <button className="button-moreinfo" onClick={() => this.setActiveProduct(product, index)} key={index}>More info</button> <button onClick={() => this.addToCart(product) & window.location.reload(true)} className="button-addtocart">Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                                )}
                        </div>
            </div>
        );
    }
};
