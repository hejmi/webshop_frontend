import React, {Component} from "react";
import * as Icon from "react-bootstrap-icons";

export class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="container">
                    <div className="footer-block">
                        <div className="row">
                            <div className="col-1"></div>
                            <div className="col-3">
                                <h6>Products</h6><hr />
                                <li>Most Popular</li>
                                <li>Ratings</li>
                            </div>
                            <div className="col-3">
                                <h6>Customer Service</h6><hr />
                                <li>Shipping</li>
                                <li>Order Rules</li>
                                <li>FAQ</li>
                                <li>Contact Us</li>
                            </div>
                            <div className="col-3">
                                <h6>Socialize with us</h6><hr />
                                <span className="footer-social-icon"><Icon.Facebook /> </span> facebook.com/mister.gadget<br/>
                                <span className="footer-social-icon"><Icon.Instagram /> </span> instagr.am/mistergadget<br/>
                               <span className="footer-social-icon"> <Icon.Twitter /> </span> twitter.me/mistergadget
                            </div>
                            <div className="col-auto float-right"><p align="center"><img src="/images/logoonly.png" alt="LogoText" width="55" /><br/><img src="/images/logotextonly.png" alt="LogoText" width="110" /></p></div>
                        </div>
                    </div>
                    <div className="footer-copyright">
                        &copy; &reg; 2021 Copyright. All rights reserved.
                    </div>
                </div>
            </div>
        )
    }
}
export default Footer
