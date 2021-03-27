import React, {Component} from "react";
import FeaturedService from "../services/FeaturedService";
import BootstrapCarousel from "./BootstrapCarousel";
import BannerAreas from "./BannerAreas";

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
                <BootstrapCarousel></BootstrapCarousel>
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
                                {featuredproduct.has_image === true ? (
                                    <img alt={featuredproduct.product_name} height="301" src={`/images/products/product-${featuredproduct.sku.sku}.jpg`} className="product-image"/>
                                ):(<img alt={featuredproduct.product_name} height="301" src="/images/products/imageiscomingsoon.jpg"/>)}
                                <div className="row">
                                    <div className="product-name">{featuredproduct.product_name}</div><div className="price-tag"><b>${featuredproduct.product_price}</b></div>
                                </div>
                                <div className="row">
                                    <div className="product-description">{featuredproduct.sku.attributeOptions.attribute.id === 3 ? ( <span className="description"><small>{featuredproduct.sku.attributeOptions.attribute.attribute_name} : {featuredproduct.sku.attributeOptions.attribute_option_name}</small><br/></span> ) : (
                                        <span className="description"> </span>
                                    )}{featuredproduct.short_desc}</div>
                                </div>
                            </div><br/>
                                <div className="product-info">
                                    <button className="button-moreinfo">More info</button>
                                    <button className="button-addtocart" onClick={() => this.addToCart(featuredproduct) & window.location.reload("/cart") }>Add to cart</button>
                                </div>
                                <br/><p>&nbsp;</p>
                            </div>
                        ))}

                    </div>

                </div>
                <BannerAreas></BannerAreas>
            </div>
        )
    }
}
