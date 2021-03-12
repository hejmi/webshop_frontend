import React from "react";
import withContext from "../withContext";
import ProductsService from "../services/ProductsService";


const ProductsList = props => {
    const { products } = props.context;

    return (
        <>
            <div className="hero is-primary">
                <div className="hero-body container">
                    <h4 className="title">Our Products</h4>
                </div>
            </div>
            <br />
            <div className="container">
                <div className="column columns is-multiline">
                    {products && products.length ? (
                        products.map((products, index) => (
                            <ProductsService
                                products={products}
                                key={index}
                                addToCart={props.context.addToCart}
                            />
                        ))
                    ) : (
                        <div className="column">
              <span className="title has-text-grey-light">
                No products found!
              </span>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default withContext(ProductsList);