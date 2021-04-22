import React from 'react';
import { Link } from 'react-router-dom';
import ProductsService from "../services/ProductsService";
import BannerAreas from "./BannerAreas";
import * as Icon from "react-bootstrap-icons"

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.buildCart = this.buildCart.bind(this);
        this.state = {
            products: [],
            totals: 0,
            currentproduct: [],
            cartContents: []
        };
    }

    countItemsInCart() {
        let count = 0;
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) return 0;
        Object.keys(cart).forEach(item => count++)
        return count;
    }

    buildCart() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let productid = Object.keys(cart);
        let quantities = Object.values(cart);
        for (let i=0; i<this.countItemsInCart(); i++) {
            let currprodid = productid[i];
            let currqty = quantities[i];
            ProductsService.getForCart(currprodid)
                .then(response => {
                    this.setState( {
                        products: this.state.products.concat([response.data]),
                        cartContents: this.state.cartContents.concat({
                            'id': response.data[0].id,
                            'image_id' : response.data[0].product.id,
                            'product_name': response.data[0].product.productName,
                            'product_price': response.data[0].product.productPrice,
                            'short_desc' : response.data[0].product.shortDesc,
                            'qty' : currqty,
                            'sku' : response.data[0].sku,
                            'has_image' : response.data[0].product.hasImage,
                            'attrOption' : response.data[0].attributeOption.attribute.attributeName + " : " + response.data[0].attributeOption.attributeOptionName
                        }),
                        totals: this.state.totals + (response.data[0].product.productPrice * currqty)
                    })
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    componentDidMount() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        if (!cart) return;
        this.buildCart()
    }

    increaseInCart = (product) => {
        let products = this.state.products.filter((item) => item.id !== product.id);
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart[product.id.toString()] = cart[product.id.toString()]+1
        localStorage.setItem('cart', JSON.stringify(cart));
        let total = this.state.total - (product.qty * product.product_price)
        this.setState({products, total});
    }

    decreaseInCart = (product) => {
        let products = this.state.products.filter((item) => item.id !== product.id);
        let cart = JSON.parse(localStorage.getItem('cart'));
        cart[product.id.toString()] = cart[product.id.toString()]-1
        localStorage.setItem('cart', JSON.stringify(cart));
        let total = this.state.total - (product.qty * product.product_price)
        this.setState({products, total});
    }

    removeFromCart = (product) => {
        let products = this.state.products.filter((item) => item.id !== product.id);
        let cart = JSON.parse(localStorage.getItem('cart'));
        delete cart[product.id.toString()];
        localStorage.setItem('cart', JSON.stringify(cart));
        let total = this.state.total - (product.qty * product.product_price)
        this.setState({products, total});
    }

    clearCart = () => {
        localStorage.removeItem('cart');
        localStorage.removeItem('carts');
        this.setState({products: []});
        this.setState({carts: []});
    }

    render() {
        const { products, totals, cartContents } =  this.state;
        return (
            <div className="container">
                <div className="cart-container">
                    <div className="title-header">
                        Cart contents
                    </div>
             {
                 cartContents.map((product, index) =>
                    <div className="cart" key={index}>
                        <div className="row">
                            <div className="col-2">
                                {product.has_image === true ? (
                                    <img alt={product.product_name} height="100" src={`/images/products/product-${product.image_id}.jpg`} />
                                ):(<img alt={product.product_name} height="100" src="/images/products/imageiscomingsoon.jpg"/>)}
                            </div>
                            <div className="col-4">
                                <span className="product-name">{product.product_name}</span><br/>
                                <span>{product.attrOption}</span><br/>
                                <span>{product.short_desc}</span>
                            </div>
                            <div className="col-3">
                                {product.qty === 1 ? (
                                    <><Link to="#" onClick={() => this.removeFromCart(product) & window.location.reload(true) }><Icon.BagDash size={13} /></Link></>
                                ) : (
                                    <><Link to="#" onClick={() => this.decreaseInCart(product) & window.location.reload(true) }><Icon.BagDash size={13} /></Link></>
                                )}
                                <span className="cart-quantity">{product.qty}</span> <Link to="#" onClick={() => this.increaseInCart(product) & window.location.reload(true) }><Icon.BagPlus size={13}></Icon.BagPlus></Link> x ${product.product_price}
                            </div>
                            <div className="col-1">
                                <Link to="#" onClick={() => this.removeFromCart(product) & window.location.reload(true) }><Icon.BagX size={13} /></Link>
                            </div>
                            <div className="col-2" align="right">
                                <b>${(product.qty * product.product_price).toFixed(2)}</b>
                            </div>
                        </div>
                    </div>
                        )
                    } <br/>
                { products.length ?
                    <div className="cart"><h4>
                        <small>Total Amount: </small>
                        <span className="float-right text-primary">${totals.toFixed(2)}</span>
                    </h4><hr/></div>: ''}
                { !products.length ?<div className="cart"><h5>No items in cart...</h5><br/></div>: ''}
                </div><br/>
            <Link to="/checkout">
                <button className="button-addtocart float-right">Go to checkout</button></Link>
            <button className="button-moreinfo float-right" onClick={() => localStorage.clear() & window.location.reload(true) }
                    style={{ marginRight: "10px" }}>Empty Cart</button><br/><br/><br/>
                <BannerAreas />
            </div>
        );
    }
}
