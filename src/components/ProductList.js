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

    render() {
        const { searchTitle, products, currentProduct, currentIndex } = this.state;
        return (
            <div className="row col-12">
                        <div className="container"><br/>
                            <div className="row">
                            {products &&
                            products.map((product, index) => (
                                <div className="col products">
                                    <img alt="Product" src={`/images/products/product-${product.product_id}.jpg`} />
                                    <div
                                        className={
                                            "item " +
                                            (index === currentIndex ? "active" : "")
                                        }
                                        onClick={() => this.setActiveProduct(product, index)}
                                        key={index}
                                    >
                                        <div className="product-info">
                                            <span className="product-name">{product.product_name}</span>
                                            {product.product_price ? ( <span className="product-price">{product.product_price}</span> ) : (
                                                <span className="product-sale-price">{product.sale_price}</span>
                                                )}
                                        </div>
                                        <div className="product-info">
                                            <div className="description">{product.short_description}</div>
                                        </div>
                                        <div className="product-info">
                                            <button className="button-moreinfo" onClick={() => this.setActiveProduct(product, index)}
                                                    key={index}>More info</button> <button className="button-addtocart">Add to cart</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>


                <div className="container">
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
                                {parse(currentProduct.full_description)}
                            </div>
                            <div>
                                <label>
                                    <strong>Price:</strong>
                                </label>{" "}
                                {currentProduct.product_price}
                            </div>

                            <Link
                                to={"/docs/" + currentProduct.document_id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ):(<div></div>)}
                </div>
            </div>
        );
    }
};
