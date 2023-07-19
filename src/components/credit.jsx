import React, { useState, useEffect } from 'react';

import axios from 'axios';
import Row from './row';

function Credit() {

    const [credit, setCredit] = useState([{
        id: "",
        from: "",
        to: "",
        amount: "",
        date: ""
    }]);
    useEffect(() => {
        axios({
            method: "GET",
            withCredentials: true,
            url: "http://localhost:27017/credit",
        }).then(res => {
            setCredit(res.data);
            // console.log(credit);
        });
    }, []);
    const [, setUser] = useState([{
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
    return <div>
        
        <div className="welcome">
            <h1 style={{ textAlign: "center" }}>Credit History</h1>
        </div>
        <div className="row">
            <div className="col">
                <h3>Transaction ID</h3>
            </div>
            <div className="col">
                <h3>Sender</h3>
            </div><div className="col">
                <h3>Reciever</h3>
            </div><div className="col">
                <h3>Amount</h3>
            </div><div className="col">
                <h3>Date</h3>
            </div>

        </div>
        <hr></hr>
        <div style={{
            height: "400px"
        }}>
            {credit.map(el => (
                <Row
                    id={el.id}
                    from={el.from}
                    to={el.to}
                    amount={el.amount}
                    Date={el.Date} />
            ))}
        </div>
        
    </div>
}

export default Credit;