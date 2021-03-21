import React from 'react';
import { Link } from 'react-router-dom';
import ProductsService from "../services/ProductsService";

export default class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.buildCart = this.buildCart.bind(this);
        this.state = {
            products: [],
            totals: 0,
            currentproduct: [],
            carts: []
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
            ProductsService.get(currprodid)
                .then(response => {
                    this.setState( {
                        products: this.state.products.concat([response.data]),
                        carts: this.state.carts.concat({
                            'id': response.data.id,
                            'product_name': response.data.product_name,
                            'product_price': response.data.product_price,
                            'short_description' : response.data.short_description,
                            'qty' : currqty
                        }),
                        totals: this.state.totals + (response.data.product_price * currqty)
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
        this.setState({products: []});
    }

    render() {
        const { products, totals, carts } =  this.state;
        return (
            <div className="container">
                <div className="cart-container">
                    <div className="title-header">
                        Cart contents
                    </div>
             {
                carts.map((product, index) =>
                    <div className="cart" key={index}>
                        <div className="row">
                            <div className="col-2">
                                <img alt="Product" src={`/images/products/thumbs/product-${product.id}.jpg`} />
                            </div>
                            <div className="col-4">
                                <span className="product-name">{product.product_name}</span><br/>
                                <span>{product.short_description}</span>
                            </div>
                            <div className="col-3">
                                <input type="button" className="sign-button" value="--" /> {product.qty} <input type="button" className="sign-button" value="+" /> x ${product.product_price}
                            </div>
                            <div className="col-1">
                                <input type="button" className="sign-button" value="x" onClick={() => this.removeFromCart(product) & window.location.reload(true) } />
                            </div>
                            <div className="col-2" align="right">
                                <b>${product.qty * product.product_price}</b>
                            </div>
                        </div>
                    </div>
                        )
                    } <br/></div><hr/>
                { products.length ?
                    <div><h4>
                        <small>Total Amount: </small>
                        <span className="float-right text-primary">${totals.toFixed(2)}</span>
                    </h4><hr/></div>: ''}
                { !products.length ?<h3 className="text-warning">No item on the cart</h3>: ''}
            <Link to="/checkout">
                <button className="button-addtocart float-right">Go to checkout</button></Link>
            <button className="button-moreinfo float-right" onClick={this.clearCart}
                    style={{ marginRight: "10px" }}>Empty Cart</button><br/><br/><br/>
            </div>
        );
    }
}
