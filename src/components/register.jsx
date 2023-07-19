import React, { useState } from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';


function Register() {
    const history = useHistory();
    const [input, setInput] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
        amount: "",
        password: ""

    });
    function handleChange(event) {
        const { name, value } = event.target;
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        });
    }
    function handleClick(event) {
        event.preventDefault();

        const register = {
            name: input.name,
            email: input.email,
            contact: input.contact,
            address: input.address,
            amount: input.amount,
            password: input.password
        }
        axios.post("http://localhost:27017/register", register).then(res => {
            history.push("/login");
        }).catch((err) => {
            console.log(err);
        });
    }
    return <div>
        <div className="login">
            <div className="container form ">
                <form className="form-group" onSubmit={handleClick}>
                    <h1>Register Your Account</h1>
                    <hr></hr>
                    <div className="line">
                        <input type="text" placeholder="Full Name" name="name" onChange={handleChange}></input>
                        <span className="line1"></span>
                    </div>
                    <div className="line">
                        <input type="email" placeholder="Email" name="email" onChange={handleChange}></input>
                        <span className="line2"></span>
                    </div>
                    <div className="line">
                        <input type="number" placeholder="Contact No." name="contact" onChange={handleChange}></input>
                        <span className="line1"></span>
                    </div>
                    <div className="line">
                        <input type="text" placeholder="Address" name="address" onChange={handleChange}></input>
                        <span className="line2"></span>
                    </div>
                    <div className="line">
                        <input type="number" placeholder="Initial amount" name="amount" onChange={handleChange}></input>
                        <span className="line1"></span>
                    </div>
                    <div className="line">
                        <input type="password" placeholder="Password" name="password" onChange={handleChange}></input>
                        <span className="line2"></span>
                    </div>
                    <button type="submit">Register</button>
                    <p>Already a member? <Link to="/login">Log In</Link></p>
                </form>
            </div>
        </div>
    </div>
}

export default Register;