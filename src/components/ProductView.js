import React, {Component} from "react";
import ProductsService from "../services/ProductsService";
import { Dropdown } from 'semantic-ui-react'

export default class ProductView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProduct: [],
            quantity: 1,
            attributes: []
        };
    }

    componentDidMount() {
        this.getProduct();
        this.getProductAttributes();
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

    getProductAttributes() {
        let { id } = this.props.match.params
        ProductsService.getAttributesFor(id)
            .then(response => {
                this.setState({
                    attributes: response.data
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
        const { currentProduct, attributes } = this.state;
        return (
            <div className="row col-12">
                <div className="container"><br/>
                    <div className="row">
                        {currentProduct &&
                        currentProduct.map((product, index) => (
                            <div className="row products" key={index}>
                                <div className="col">
                                {product.products.has_image === true ? (
                                    <img alt={product.products.product_name} height="600" src={`/images/products/product-${product.sku}.jpg`} className="product-image"/>
                                ):(<img alt={product.products.product_name} height="600" src="/images/products/imageiscomingsoon.jpg"/>)}
                                </div>
                                <div className="col">

                                    <div className="currentproduct-name">{product.products.product_name}</div>
                                    <div className="currentproduct-price">${product.products.product_price}<br/><br/></div>
                                        {attributes &&
                                        attributes.map((attribute, key) => (
                                            <div className="currentproduct-attributes" key={key}>
                                                {attribute.id !== 0 ? (
                                                    <span className="description">{attribute.attribute.attribute_name} : {attribute.attribute_option_name}</span> ) : (
                                                        <small></small>
                                                )}
                                            </div>
                                        ))}


                                    <div className="currentproduct-desc">{product.products.full_desc}</div>
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
