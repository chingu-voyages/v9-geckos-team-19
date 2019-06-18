import './Safety.css';
import React from 'react';


const Safety = ({ gunCount, gunDeaths }) => {
    if (!gunCount) {
        return <div></div>
    }

    return (
        <div>
            <div className="card-body">
                <div className="card-title">
                    <h4>Safety</h4>
                </div>
                <div className="card-text">
                    <h5>{gunCount}</h5>     
                    <p>Guns owned per 100 residents</p>
                    <h5>{gunDeaths}</h5>
                    <p>Gun deaths per 100,000 residents per year</p>
                </div>
            </div>           
        </div>
    );
}

export default Safety;