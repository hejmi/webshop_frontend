import React, {Component} from "react";
import FeaturedService from "../services/FeaturedService";

export default class FeaturedProducts extends Component {
    constructor(props) {
        super(props);
        this.getFeaturedProducts = this.getFeaturedProducts.bind(this);

        this.state = {
            featuredproducts: []
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
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    handleBoxToggle = () => this.setState({ showBox: !this.state.showBox });

    render() {
        const {  featuredproducts } = this.state;
        return (
            <div className="container">
                <div className="featured-products">
                    <div className="title-header">
                        Featured Products
                    </div>
                    <div className="row">
                        {featuredproducts &&
                        featuredproducts.map((featuredproduct, index) => (
                            <div className="product-container">
                            <div className="featured-product col" key={index}>
                                <img alt="Product" src={`/images/products/product-${featuredproduct.product_id}.jpg`} />
                                <div className="row">
                                    <div className="product-name">{featuredproduct.product_name}</div><div className="price-tag">{featuredproduct.product_price}</div>
                                </div>
                                <div className="row">
                                    <div className="product-description">{featuredproduct.short_description}</div>
                                </div>
                            </div><br/>
                                <div className="product-info">
                                    <button className="button-moreinfo">More info</button>
                                    <button className="button-addtocart">Add to cart</button>
                                </div><br/>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        )
    }
}