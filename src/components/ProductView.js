import React, {Component} from "react";
import ProductsService from "../services/ProductsService";
import parse from "html-react-parser";
import {Link} from "react-router-dom";

export default class ProductView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProduct: []
        };
    }

    componentDidMount() {
        this.getProduct();
    }

    getProduct() {
        let { id } = this.props.match.params
        ProductsService.get(id)
            .then(response => {
                this.setState({
                    currentProduct: response.data
                });
            })
            .catch(e => {
            });
    }

    addToCart = (data) => {
        let cart = localStorage.getItem('cart')
            ? JSON.parse(localStorage.getItem('cart')) : {};
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
        const { currentProduct } = this.state;
        return (
            <div className="row col-12">
                <div className="container"><br/>
                    <div className="row">
                        {currentProduct &&
                        currentProduct.map((product, index) => (
                            <div className="row products" key={index}>
                                <div className="col">
                                {product.has_image === true ? (
                                    <img alt={product.product_name} height="600" src={`/images/products/product-${product.sku.sku}.jpg`} className="product-image"/>
                                ):(<img alt={product.product_name} height="600" src="/images/products/imageiscomingsoon.jpg"/>)}
                                </div>
                                <div className="col">

                                    <div className="currentproduct-name">{product.product_name}</div>
                                    <div className="currentproduct-price">${product.product_price}<br/><br/></div>

                                    <div className="currentproduct-attributes">
                                        {product.sku.attributeOptions.attribute.id === 3 ? ( <span className="description">{product.sku.attributeOptions.attribute.attribute_name} : {product.sku.attributeOptions.attribute_option_name}</span> ) : (
                                            <span className="description"> </span>
                                        )}
                                    </div>

                                    <div className="currentproduct-desc">{product.full_desc}</div>
                                    <div>
                                       <button onClick={() => this.addToCart(product) & window.location.reload(true)} className="currentbutton-addtocart">Add to cart</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
};
