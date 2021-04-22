import React, {Component} from "react";
import FeaturedService from "../services/FeaturedService";
import BootstrapCarousel from "./BootstrapCarousel";
import BannerAreas from "./BannerAreas";
import {Link} from "react-router-dom";

export default class FeaturedProducts extends Component {
    constructor(props) {
        super(props);
        this.getFeaturedProducts = this.getFeaturedProducts.bind(this);

        this.state = {
            featuredproducts: [],
            products: [],
            quantity: 1
        };

    }

    componentDidMount() {
        this.getFeaturedProducts();
    }

    getFeaturedProducts() {
        FeaturedService.getAll()
            .then(response => {
                this.setState({
                    featuredproducts: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }
    handleBoxToggle = () => this.setState({ showBox: !this.state.showBox });

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
        const {  featuredproducts } = this.state;
        return (
            <div className="container">
                <BootstrapCarousel />
                <br/>
                <div className="featured-products">
                    <div className="title-header">
                        Featured Products
                    </div>
                    <div className="row">
                        {featuredproducts &&
                        featuredproducts.map((featuredproduct, index) => (
                            <div className="product-container" key={index}>
                            <div className="featured-product col" >
                                {featuredproduct.attributeOption.attribute.id !== 0  ? (
                                    <Link to={`/product/${featuredproduct.product.id}`}>
                                        {featuredproduct.product.hasImage === true ? (
                                            <img alt={featuredproduct.product.productName} height="301" src={`/images/products/product-${featuredproduct.product.id}.jpg`} className="product-image"/>
                                        ):(<img alt={featuredproduct.product.productName} height="301" src="/images/products/imageiscomingsoon.jpg"/>)}
                                    </Link>
                                ) : (
                                    <Link to={`/product/${featuredproduct.product.id}`}>
                                        {featuredproduct.product.hasImage === true ? (
                                            <img alt={featuredproduct.product.productName} height="301" src={`/images/products/product-${featuredproduct.product.id}.jpg`} className="product-image"/>
                                        ):(<img alt={featuredproduct.product.productName} height="301" src="/images/products/imageiscomingsoon.jpg"/>)}
                                    </Link>
                                )}
                                <div className="row">
                                    <div className="product-name">{featuredproduct.product.productName}</div><div className="price-tag"><b>${featuredproduct.product.productPrice}</b></div>
                                </div>
                                <div className="row">
                                    <div className="product-description">{featuredproduct.product.shortDesc}</div>
                                </div>
                            </div><br/>
                                    {featuredproduct.attributeOption.attribute.id !== 0  ? (
                                        <div className="product-info">
                                                        <Link to={`/product/${featuredproduct.product.id}`}><button className="button-moreinfo">More info</button></Link>
                                                        <Link to={`/product/${featuredproduct.product.id}`}><button className="button-addtocart">See Options</button></Link>
                                        </div>
                                    ) : (
                                        <div className="product-info">
                                                        <Link to={`/product/${featuredproduct.product.id}`}><button className="button-moreinfo">More info</button></Link>
                                                        <button onClick={() => this.addToCart(featuredproduct) & window.location.reload(true)} className="button-addtocart">Add to cart</button>
                                        </div>
                                    )}

                                <br/><p>&nbsp;</p>
                            </div>
                        ))}

                    </div>

                </div>
                <BannerAreas />
            </div>
        )
    }
}
