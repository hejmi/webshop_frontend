import React, {Component} from "react";
import CustomersService from "../services/CustomersService";
import {isAuthenticated} from "../repositories/LoginAndAuthentication";

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
        CustomersService.get(sessionStorage.getItem('login-user'))
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
                    {isAuthenticated() ? (
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
                    ) : ( <div className="container"><h2>You Are Not Authenticated!</h2><h6>Please <a href='/login' ><small>login</small></a></h6></div>)}
                </div>
        )
    }
}
export default Customer
