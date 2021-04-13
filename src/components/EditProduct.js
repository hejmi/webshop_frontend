import React, {Component} from "react";
import ProductsService from "../services/ProductsService";
import http from "../http-common";

export class EditProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            productName: '',
            productPrice: '',
            shortDesc: '',
            fullDesc: '',
            isFeatured: '',
            productId: '',
            successMess: ''
        }
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
            })
            .catch(e => {
                console.log(e);
            })
    }
    handleProductChange(e) {
        this.setState({successMess: ''})
        this.setState({productId: this.state.products[e.target.value].id })
        this.setState({productName: this.state.products[e.target.value].productName })
        this.setState({productPrice: this.state.products[e.target.value].productPrice })
        this.setState({shortDesc: this.state.products[e.target.value].shortDesc })
        this.setState({fullDesc: this.state.products[e.target.value].fullDesc })
        this.setState({isFeatured: this.state.products[e.target.value].isFeatured })
    }
    handleFieldChange(e) {
        this.setState({productId: e.target.value })
    }
    handleNameChange(e) {
        this.setState({productName: e.target.value })
    }
    handlePriceChange(e) {
        this.setState({productPrice: e.target.value })
    }
    handleShortDescChange(e) {
        this.setState({shortDesc: e.target.value })
    }
    handleFullDescChange(e) {
        this.setState({fullDesc: e.target.value })
    }
    handleFeaturedChange(e) {
        if(this.state.isFeatured === false)
            this.setState({isFeatured: true })
        else
            this.setState({isFeatured: false })
    }
    saveUpdatedProduct(e) {
        e.preventDefault()
        let data = {"productName": this.state.productName, "shortDesc": this.state.shortDesc, "fullDesc": this.state.fullDesc, "productPrice": this.state.productPrice, "featured": this.state.isFeatured}
        http.put(`/products/edit?id=${this.state.productId}`, data);
        this.setState({successMess: "Product was successfully updated!"})

    }

    render() {
        const {products} = this.state;
        return (
            <div className="container">
                <div className="container">
                    <h5>Edit existing Product</h5>
                    <p>Please chose product you want to edit.</p>
                    <form onSubmit={(e) => this.saveUpdatedProduct(e)}>
                    <select defaultValue={0} name="product" id="product" className="custom-select"  onChange={(e) => this.handleProductChange(e)}>
                        <option value="0" disabled>CHOSE PRODUCT</option>
                        {products && products.map((product, index) => (
                            <option key={index} value={index}>
                                {product.productName}
                            </option>
                        ))}
                    </select>
                        <h6><b><i>{this.state.successMess}</i></b></h6>
                    <p></p>
                    <div className="container">
                        <h5>Edit fields</h5>
                        <p>Product ID:<br/>
                        <input className="custom-text" type="text" onChange={(e) => this.handleFieldChange(e)} value={this.state.productId} name="productId" disabled /><br/></p>
                        <p>Product name:<br/>
                        <input className="custom-text" type="text" onChange={(e) => this.handleNameChange(e)} value={this.state.productName} name="productName" /><br/></p>
                        <p>Product price:<br/>
                        <input className="custom-text" type="text" onChange={(e) => this.handlePriceChange(e)} value={this.state.productPrice} name="productPrice" /><br/></p>
                        <p>Product short description:<br/>
                        <input className="custom-text" type="text" onChange={(e) => this.handleShortDescChange(e)} value={this.state.shortDesc} name="shortDesc" /><br/></p>
                        <p>Product full description:<br/>
                        <input className="custom-text" type="text" onChange={(e) => this.handleFullDescChange(e)} value={this.state.fullDesc} name="fullDesc" /><br/></p>
                        <p>Visible on front page (featured):<br/>
                        <input type="checkbox" checked={this.state.isFeatured === true} onChange={(e) => this.handleFeaturedChange(e)} value={this.state.isFeatured}  /></p>
                        <p><input type="submit"  className="button-post" value="Save changes" />
                        </p>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}
export default EditProduct