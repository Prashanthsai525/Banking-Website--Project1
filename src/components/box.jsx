import React from 'react';

function Box(props) {
    return <div className={`box ${props.color}`}>
        <h2>{props.head}</h2>
        <h4> {props.amount} &#x20b9;</h4>
        <hr />
        <p>Details :<br></br>{props.no}<br></br>{props.name}<br></br>{props.date}</p>

    </div>
}

export default Box;