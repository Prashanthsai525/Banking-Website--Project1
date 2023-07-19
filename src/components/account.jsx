import React, { useState, useEffect } from 'react';

import Box from './box';

import axios from 'axios';
import { Link } from 'react-router-dom';

function Account() {

    const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()} `
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
    const [trans, setTrans] = useState([{
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
            url: "http://localhost:27017/account/transaction",
        }).then(res => {
            setTrans(res.data);
        });
    }, []);
    const [debit, setDebit] = useState([{
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
            url: "http://localhost:27017/account/debit",
        }).then(res => {
            setDebit(res.data);
            // console.log(debit);
        });
    }, []);
    const [, setCredit] = useState([{
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
            url: "http://localhost:27017/account/credit",
        }).then(res => {
            setCredit(res.data);
            // console.log(credit);
        });
    }, []);
    return <div>
        <div className="welcome">
            <h1>Welcome {user.name}!!</h1>
            <hr></hr>
        </div>
        <div className="container">
            <div className="row">
                <div className="col"><Box
                    color="box-green"
                    head="Current Balance :"
                    amount={user.amount}
                    name={user.name}
                    no={`A/C no : ${user.account}`}
                    date={date}

                /></div>
                <div className="col"><Link to="/account/credit" className="link">
                <Box
                    color="box-blue"
                    
                    head=" Credit :"                   
                />
                </Link></div>

                <div className="col"><Link to="/account/debit" className="link">
                <Box
                    color="box-red"
                    amount={debit.length < 1 ? "NA" : debit[debit.length - 1].amount}
                    head=" Debit :"
                    
                />
                </Link></div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col"><Link to="/account/transaction" className="link">
                <Box
                    color="box-yellow"
                    amount={trans.length < 1 ? "NA" : trans[trans.length - 1].amount}
                    head=" Transaction history:"
                    name={""}
                    no={""}
                    date={trans.length < 1 ? date : trans[trans.length - 1].Date}
                />
                </Link></div>
                
                <div className="col"></div>
            </div>
        </div>
    </div>
}

export default Account;