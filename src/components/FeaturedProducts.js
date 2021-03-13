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
                                {featuredproduct.product_name}<div className="price-tag">{featuredproduct.product_price}</div>
                            </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        )
    }
}