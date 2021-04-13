import React, {Component} from "react";
import {isAdminAuthenticated} from "../repositories/LoginAndAuthentication";
import ProductsService from "../services/ProductsService";
import TwitterService from "../services/TwitterService";
import {Switch, Route, Link} from "react-router-dom";
import AddProduct from "./AddProduct";
import PostToTwitter from "./PostToTwitter";
import EditProduct from "./EditProduct";
import Countdown from 'react-countdown';

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
            <div className="administration">
                {isAdminAuthenticated() === "Admin" ? (
                <div className="container">
                    <div className="row">
                        <h3><br/>Admin Backend</h3>
                    </div>
                    <div className="container">
                        <p>Welcome to the backend system! <span className="float-right"> Session time left: <Countdown date={Date.now() + 20 * 60 * 1000} /></span></p>
                        <li><Link to="/administration/addproduct">Add new product to shop</Link></li>
                        <li><Link to="/administration/editproduct">Edit existing product in shop</Link></li>
                        <li><Link to="/administration/posttotwitter">Post to Twitter</Link></li>
                    </div>

                    <Switch>
                        <Route path="/administration/addproduct" component={AddProduct} />
                        <Route path="/administration/editproduct" component={EditProduct} />
                        <Route path="/administration/posttotwitter" component={PostToTwitter} />
                    </Switch>

                </div> ) : ( <div className="container"> <h2><br/>Not Authenticated!</h2><h5>You must login as an administrator to access this page</h5></div> )}
            </div>
        )
    }
}
export default Administration
