import React, {Component} from "react";

export default class BannerAreas extends Component {
    render() {
        return (
            <div className="BannerArea">
                <div className="container">
                    <div className="row">
                    <div className="col">
                        <div><img src="/images/banner.png" width="300" alt="banner" className="banner-image-holder" /></div>
                    </div>
                    <div className="col">
                        <div><img src="/images/banner.png" width="300" alt="banner" className="banner-image-holder"/></div>
                    </div>
                    <div className="col">
                        <div><img src="/images/banner.png" width="300" alt="banner" className="banner-image-holder"/></div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}