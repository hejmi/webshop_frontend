import React, {Component} from "react";
import {isAdminAuthenticated} from "../repositories/LoginAndAuthentication";
import ProductsService from "../services/ProductsService";
import TwitterService from "../services/TwitterService";

export class Administration extends Component {
constructor(props) {
    super(props);
    this.state = {
        products: [],
        twitterhash: [],
        list: [],
        productidToPost: "",
        hashtagToPost: "",
        customtextToPost: "",
        message: ""
    }
}

    componentDidMount() {
        this.retriveProducts();
        this.retrieveTwitterHashtags();
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

    retrieveTwitterHashtags() {
        TwitterService.getAll()
            .then(response => {
                this.setState( {
                    twitterhash: response.data
                });
            })
            .catch(e => {
                console.log(e);
            })
    }
    handleProductChange(e) {
        this.setState({productidToPost: e.target.value})
    }
    handleHashtagChange(e) {
        this.setState({hashtagToPost: e.target.value})
    }
    handleCustomPostTextChange(e) {
        this.setState({customtextToPost: e.target.value})
    }

    postToTwitter(e) {
        e.preventDefault()
        let productid = this.state.productidToPost
        let hashtag = this.state.hashtagToPost
        let customtext = this.state.customtextToPost
        if (productid === "") productid = 1
        if (hashtag === "") hashtag = 1
        let productLink = "http://thegeeksqueek.com/product/" + productid
        let jsonified = {"message":customtext, "url":productLink, "hashtag":hashtag}
        TwitterService.post2Twitter(jsonified)
            .then(r => {
                this.setState( {
                    message: r.data
                })
            })
            .catch(e => {
                console.log(e);
            })
    }

    render() {
        const { products, message } = this.state;
        const hashlist = this.state.twitterhash.map((hashtag, index) =>
            <option key={index} value={hashtag.hashtagId}>{hashtag.hashtagName}</option>
        )
        return (
            <div className="footer">
                {isAdminAuthenticated() === "Admin" ? (
                <div className="container">
                    <div className="row">
                        <h3><br/>Admin Backend</h3>
                    </div>
                    <form onSubmit={(e) => {this.postToTwitter(e)}}>
                    <div className="container">
                        <h5>Post to Twitter</h5>
                        <p>Please chose product, matching hashtag and enter a custom text to post to Twitter.</p>
                        {message ? (<p> Posted to Twitter: <b> {message} </b></p>) : (<p> </p> )}
                        <select name="product" id="product" className="custom-select"  onChange={(e) => this.handleProductChange(e)}>
                            {products && products.map((product, index) => (
                                <option key={index} value={product.id}>
                                    {product.productName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="container">
                        <select name="hashtag" id="hashtag" className="custom-select"  onChange={(e) => this.handleHashtagChange(e)}>
                            {hashlist}
                        </select>
                    </div>
                    <div className="container">
                        <input type="text" className="custom-text" name="customPostText" placeholder="Enter your post message here"  onChange={(e) => this.handleCustomPostTextChange(e)}/>
                    </div>
                    <div className="container">
                        <input type="submit" value="Post it" className="button-post"/><br/><br/>
                    </div>
                </form>
                </div> ) : ( <div className="container"> <h2><br/>Not Authenticated!</h2><h5>You must login as an administrator to access this page</h5></div> )}
            </div>
        )
    }
}
export default Administration
