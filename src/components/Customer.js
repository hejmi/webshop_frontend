import React, {Component} from "react";
import * as Icon from "react-bootstrap-icons";
import CategoriesService from "../services/CategoriesService";
import CustomersService from "../services/CustomersService";

export class Customer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData: []
        };
    }
    componentDidMount() {
        this.getCustomerData()
    }

    getCustomerData() {
        CustomersService.get(localStorage.getItem('login-user'))
            .then(response => {
                this.setState({
                    userData: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const { userData } = this.state;
        return (
                <div className="container">
                        <div className="col-12">
                                <h5><br/>My Account</h5>
                                <h6><br/>My Information</h6>
                            {userData.map((ud, index) => (
                                <div className="col-12" key={index}>
                                    <div className="col-12">
                                        <span><b>{ud.firstname}</b></span>&nbsp;<span><b>{ud.lastname}</b></span>
                                    </div>
                                    <div className="col-12">
                                        <span>{ud.address}, {ud.postal} {ud.city}</span>
                                    </div>
                                    <div className="col-12">
                                        <span>{ud.email}</span>
                                    </div>
                                    <div className="col-12">
                                        <span>{ud.phone}</span>
                                    </div>
                                </div>
                                ))}
                        </div>
                </div>
        )
    }
}
export default Customer
