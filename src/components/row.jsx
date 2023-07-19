import React from 'react';

function Row(props) {
    return <div>
        <div className="row">
            <div className="col">
                <h5>{props.id}</h5>
            </div>
            <div className="col">
                <h5>{props.from}</h5>
            </div><div className="col">
                <h5>{props.to}</h5>
            </div><div className="col">
                <h5>{props.amount} &#x20b9;</h5>
            </div><div className="col">
                <h5>{props.Date}</h5>
            </div>
        </div>
    </div>
}

export default Row;