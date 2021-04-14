import React, {Component} from "react";
import ProductsService from "../services/ProductsService";

export default class ProductView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProduct: [],
            quantity: 1,
            attributes: [],
            optionid: null,
            topMessage: 'Error 404 - The product you\'re looking for doesn\'t exist...',
            rating: 'No ratings yet'
        };
    }

    componentDidMount() {
        this.getProduct();
        this.getProductAttributes();
        this.getProductRating();
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

    getProductRating() {
        let { id } = this.props.match.params
        ProductsService.getRating(id)
            .then(response => {
                if (response.data[0].rating>0) {
                    this.setState({
                        rating: response.data[0].rating
                    });
                }
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
    }

    render() {
        const { currentProduct, attributes, warningText } = this.state;
        return (
            <div className="row col-12">
                <div className="container">
                    {currentProduct.length < 1 ? ( <div className="container"><p><img src="/images/sad_pig.png" width="50"/></p><h5> {this.state.topMessage} </h5></div> ):( null ) }<br/><br/>
                    <div className="row">
                        {currentProduct &&
                        currentProduct.map((product, index) => (
                            <div className="row products" key={index}>
                                <div className="col">
                                {product.product.hasImage === true ? (
                                    <img alt={product.product.productName} height="600" src={`/images/products/product-${product.product.id}.jpg`} className="product-image"/>
                                ):(<img alt={product.product.productName} height="600" src="/images/products/imageiscomingsoon.jpg"/>)}
                                </div>
                                <div className="col">

                                    <div className="currentproduct-name">{product.product.productName}</div>
                                    <div className="currentproduct-price">${product.product.productPrice}<br/><br/></div>
                                            <div className="currentproduct-attributes">
                                                {product.attributeOption.id !== 0 ? (
                                                    <span className="description">Please Choose {product.attributeOption.attribute.attributeName}: <br/>
                                                        <select defaultValue={1} name={product.attributeOption.attribute.attributeName} onChange={(e) => this.handleSelectChange(e)} >
                                                         <option disabled value={1}>{product.attributeOption.attribute.attributeName}</option>
                                                        {attributes.map((attop, key) => (
                                                            <option key={key} value={attop.id}>{attop.attributeOption.attributeOptionName}</option>
                                                        ))}
                                                        </select>
                                                        <br/><br/></span> ) : (
                                                        <small></small>
                                                )}

                                            </div>

                                    <div className="currentproduct-desc">{product.product.fullDesc}</div>
                                    <div className="currentproduct-attributes"><i>Rating: {this.state.rating}</i></div>
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
