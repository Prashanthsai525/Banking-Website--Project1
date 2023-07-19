import React from 'react';
import { useHistory } from 'react-router';
import axios from 'axios';
import { Link } from "react-router-dom"
function Navbar(props) {
    const history = useHistory()
    let user = props.user;
    function HandleClick() {
        if (user === undefined) {
            history.push("/register");
        } else {
            axios({
                method: "GET",
                withCredentials: true,
                url: "http://localhost:27017/logout",
            }).then(res => {
                history.push("/");
            });
        }
    }

    return (<nav class="navbar navbar-light ">
        <div class="container-fluid">
            <h1> Bank of India</h1>
            <ul class="nav-item">
                <li>
                    <Link to="/account" >
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/Transfer" >
                        Transfer
                    </Link>
                </li>
                
                <li><Link ><a href="./navbar"  className="nav-items" onClick={HandleClick}>{user !== undefined ? "log out" : "sign up"}</a></Link></li>
            </ul>
        </div>
    </nav>
    );
}

export default Navbar;