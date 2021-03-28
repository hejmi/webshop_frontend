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
                                <span className="footer-social-icon"><Icon.SuitHeartFill /></span> <a href="/popularproducts" className="footer-link">Most Popular</a><br/>
                                <span className="footer-social-icon"><Icon.Star /></span> <a href="/bestratedproducts" className="footer-link">Best Rated</a><br/>
                                <span className="footer-social-icon"><Icon.Percent /></span> <a href="/sale" className="footer-link">On Sale</a>
                            </div>
                            <div className="col-3">
                                <h6>Customer Service</h6><hr />
                                <span className="footer-social-icon"><Icon.Truck /></span> <a href="/shippinginfo" className="footer-link">Shipping</a><br/>
                                <span className="footer-social-icon"><Icon.Receipt /></span> <a href="/orderrules" className="footer-link">Order Rules</a><br/>
                                <span className="footer-social-icon"><Icon.QuestionCircleFill /></span> <a href="/faq" className="footer-link">Frequently Asked Questions</a><br/>
                                <span className="footer-social-icon"><Icon.InfoCircleFill /></span> <a href="/contact" className="footer-link">Contact Us</a>
                            </div>
                            <div className="col-3">
                                <h6>Socialize with us</h6><hr />
                                <span className="footer-social-icon"><Icon.Facebook /> </span> <a href="https://facebook.com/thegeeksqueek" className="footer-link">facebook.com/thegeeksqueek</a><br/>
                                <span className="footer-social-icon"><Icon.Instagram /> </span> <a href="https://intagr.am/thegeeksqueek" className="footer-link">instagr.am/thegeeksqueek</a><br/>
                                <span className="footer-social-icon"> <Icon.Twitter /> </span> <a href="https://twitter.me/thegeeksqueek" className="footer-link">twitter.me/thegeeksqueek</a><br/>
                                <span className="footer-social-icon"><Icon.Envelope /> </span> <a href="mailto:thegeeksqueek@gmail.com" className="footer-link">thegeeksqueek@gmail.com</a>
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
