import React from 'react';

function Home1() {
    return <div  style={{
        height: "700px"
    }}>
    <div className="home-1">
        <div className="container">
            <div className="row">
                <div className="col home-1_a">
                    <h1>welcome to bank of india</h1>
                    <a href="/login">Login</a>
                </div>
                <div className="col home-1_b">
                    <img src="./Images/hero-img.svg" alt="Logo" className="hero-img"></img>
                </div>

            </div>
        </div>
        </div>
    </div>
}

export default Home1;