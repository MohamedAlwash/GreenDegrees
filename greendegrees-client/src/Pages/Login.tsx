import React from 'react'
import { Link } from 'react-router-dom';
import '../Assets/scss/Login.scss'
import logo from '../Assets/scss/Images/logo.png';

export default class Login extends React.Component {
    public render() {
        return (
            <div className="container login_fill">
                <div className="row">
                    <div className="col-2"></div>
                    <div className="col-8">
                        <img src={logo} alt="logo" />
                    </div>
                    <div className="col-2"></div>
                </div>
                <form className="center_div">
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" />
                        {/* <small id="emailHelp" className="form-text">Don't have an account? <a href="#">Sign up</a></small> */}
                    </div>
                    <Link to="/overzicht">
                        <button className="btn btn-succes">Login</button>
                    </Link>
                </form>
            </div>
        );
    }
}