import React from 'react';
import { login } from '../repositories/LoginAndAuthentication';

export default class Login extends React.Component{
    constructor() {
        super();
        this.state = { username: '', password: '' };
    }

    handleInputChange = (event) =>
        this.setState({[event.target.name]: event.target.value})

    submitLogin = (event) => {
        event.preventDefault();
        login(this.state)
            //.then(token => window.location = '/').catch(err => console.log(err));
    }

    render() {
        return (
            <div className="row">
                <div className="col-2"><br/><br/><hr/></div>
                <div className="col-8"><br/><br/><hr/>
                    <div className="panel panel-primary">
                        <div className="panel-heading"><h3>Log in to Your Account </h3>or <a href="/createuser">create a new account</a><br/><br/></div>
                        <div className="panel-body">
                            <form onSubmit={this.submitLogin}>
                                <div className="form-group">
                                    <label>Username:</label>
                                    <input type="text" placeholder="Enter your username" className="form-control"
                                           name="username" onChange={this.handleInputChange}/>
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input placeholder="Enter your password" type="password" className="form-control"
                                           name="password" onChange={this.handleInputChange}/>
                                </div>
                                <button type="submit" className="btn btn-success">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-2"><br/><br/><hr/> </div>
            </div>
        );
    }
}