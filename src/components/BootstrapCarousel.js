import React, {Component} from "react";
import Carousel from "react-bootstrap/Carousel";

export class BootstrapCarousel extends Component {
    render() {
        return (

        <div id="carousel" className="carousel slide" data-ride="carousel">
            <div className="container">
                <Carousel>
                    <Carousel.Item>
                        <img className="d-block w-100" src={'/images/slides/slide1.png'} alt="First slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={'/images/slides/slide3.png'} alt="Second slide" />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="d-block w-100" src={'/images/slides/slide1.png'} alt="Third slide" />
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
        )
    }
}

export default BootstrapCarousel