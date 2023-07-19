import React, { useState, useEffect } from 'react';
import axios from 'axios';



function Transfer() {

    const [input, setInput] = useState({
        to: "",
        amount: ""

    });
    const [user, setUser] = useState([{
        id: "",
        name: "",
        email: "",
        contact: "",
        address: "",
        amount: "",
        password: ""
    }]);
    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:27017/account",
        }).then(res => {
            setUser(res.data);
        });
    }, []);
    function handleChange(event) {
        const { name, value } = event.target;
        setInput(prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        });
    }
    function handleSubmit(event) {
        event.preventDefault();
        axios({
            method: "POST",
            data: {
                to: input.to,
                amount: input.amount
            },
            withCredentials: true,
            url: "http://localhost:27017/account/transaction",
        }).then((res) => {
            //   console.log(res);
            window.location.href = "/account/transaction";
        });
    }
    return <div>
        {/* <Navbar user={user.name} /> */}
        <div className="welcome">
            <h1 style={{ textAlign: "center" }}>Make Your tansaction</h1>
        </div>
        <div className="container">
            <div className="row">
                <div className="col">
                    <h3>A/C No.</h3>
                </div>
                <div className="col">
                    <h3>Name</h3>
                </div><div className="col">
                    <h3>Balance</h3>
                </div><div className="col">
                    <h3>Contact</h3>
                </div><div className="col">
                    <h3>Email</h3>
                </div>
            </div>
            <hr></hr>
            <div className="row">
                <div className="col">
                    <h5>{user.account}</h5>
                </div>
                <div className="col">
                    <h5>&ensp;{user.name}</h5>
                </div><div className="col">
                    <h5>&ensp;&ensp;{user.amount}&#x20b9;</h5>
                </div><div className="col">
                    <h5>&ensp;&ensp;&ensp;&ensp;{user.contact} </h5>
                </div><div className="col">
                    <h5>{user.email}</h5>
                </div>
            </div>
        </div>
        <div className="container form " >
            <form className="form-group" style={{ boxShadow: "2px 2px 7px #000000" }} onSubmit={handleSubmit}>
                <h1>Transfer</h1>
                <hr></hr>
                <div className="line">
                    <input type="number" placeholder="To : A/C No." name="to" autoComplete="offF" onChange={handleChange}></input>
                    <span className="line1"></span>
                </div>
                <div className="line">
                    <input type="number" placeholder="Amount" name="amount" onChange={handleChange}></input>
                    <span className="line2"></span>
                </div>
                <button type="submit">Transfer</button>

            </form>
        </div>
        {/* <Footer /> */}
    </div>
}

export default Transfer;