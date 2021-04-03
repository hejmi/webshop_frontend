import React, {Component} from "react";
import ProductsService from "../services/ProductsService";

export default class ProductView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProduct: [],
            quantity: 1,
            attributes: [],
            optionid: null
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
        let id = null
        {this.state.optionid === null || this.state.optionid === 0 ? (
            id = data.id.toString()
        ):(
            id = this.state.optionid
        )}

        cart[id] = (cart[id] ? cart[id]: 0);
        let qty = cart[id] + parseInt(this.state.quantity);
        if (data.stock < qty) {
            cart[id] = data.stock;
            this.setState({warningText: 'You already have the last item in your cart!'})
        } else {
            cart[id] = qty
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.setState({cart});
    }

    handleSelectChange (e) {
        this.setState({optionid: e.target.value})

        console.log(e.target.value)
    }

    render() {
        const { currentProduct, attributes, warningText } = this.state;
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
                                            <div className="currentproduct-attributes">
                                                {product.attributeOptions.id !== 0 ? (
                                                    <span className="description">Please Choose {product.attributeOptions.attribute.attribute_name}: <br/>
                                                        <select defaultValue={1} name={product.attributeOptions.attribute.attribute_name} onChange={(e) => this.handleSelectChange(e)} >
                                                         <option disabled value={1}>{product.attributeOptions.attribute.attribute_name}</option>
                                                        {attributes.map((attop, key) => (
                                                            <option key={key} value={attop.id}>{attop.attributeOptions.attribute_option_name}</option>
                                                        ))}
                                                        </select>
                                                        <br/><br/></span> ) : (
                                                        <small></small>
                                                )}

                                            </div>

                                    <div className="currentproduct-desc">{product.products.full_desc}</div>
                                    <div>{product.stock === 1 ? ( <span><i><b><font color='#8b0000'>This is the last item in stock!</font></b></i><br/></span> ):( <span> </span> )}
                                       <button id="submitButton" onClick={(e) => this.addToCart(product) & window.location.reload(true)} className="currentbutton-addtocart">Add to cart</button>
                                        <br/><br/><h5><font color='#8b0000'>{warningText}</font></h5><br/>
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
