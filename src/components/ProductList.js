import React, { Component } from "react";
import ProductsService from "../services/ProductsService";
import { Link } from "react-router-dom";

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
                <div className="col-6">
                    <br />
                        <h4>All Products</h4>

                        <div className="container">
                            <div className="column columns is-multiline">
                            {products &&
                            products.map((product, index) => (
                                <div
                                    className={
                                        "item " +
                                        (index === currentIndex ? "active" : "")
                                    }
                                    onClick={() => this.setActiveProduct(product, index)}
                                    key={index}
                                >
                                    {product.product_name}
                                </div>
                            ))}
                            </div>
                        </div>

                </div>
                <div className="col-6">
                    {currentProduct ? (
                        <div>
                            <h4>Document</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentProduct.title}
                            </div>
                            <div>
                                <label>
                                    <strong>Description:</strong>
                                </label>{" "}
                                {currentProduct.description}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentProduct.published ? "Published" : "Pending"}
                            </div>

                            <Link
                                to={"/docs/" + currentProduct.document_id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <br />
                            <p>Please click on a product...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
