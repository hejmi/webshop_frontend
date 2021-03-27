import React, {Component} from "react";
import Carousel from "react-bootstrap/Carousel";

export class BootstrapCarousel extends Component {
    render() {
        return (

        <div id="carousel" className="carousel slide" data-ride="carousel">
            <div className="container">
                <Carousel>
                    <Carousel.Item>
                        <a href="/brands/3"><img className="d-block w-100" src={'/images/slides/aquaman.jpg'} alt="DC Comics slide" /></a>
                    </Carousel.Item>
                    <Carousel.Item>
                        <a href="/brands/2"><img className="d-block w-100" src={'/images/slides/marvel.jpg'} alt="Marvel slide" /></a>
                    </Carousel.Item>
                    <Carousel.Item>
                        <a href="/brands/10"><img className="d-block w-100" src={'/images/slides/fortnite.png'} alt="Fortnite slide" /></a>
                    </Carousel.Item>
                    <Carousel.Item>
                        <a href="/brands/5"><img className="d-block w-100" src={'/images/slides/strangerthings.jpg'} alt="Stranger Things slide" /></a>
                    </Carousel.Item>
                </Carousel>
            </div>
        </div>
        )
    }
}

export default BootstrapCarousel
