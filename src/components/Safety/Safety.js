import './Safety.css';
import React from 'react';


const Safety = ({ gunCount, gunDeaths }) => {
    if (!gunCount) {
        return <div></div>
    }

    return (
        <div>
            <h1>Safety</h1>
            <h2>{gunCount}</h2>     
            <p>Guns owned per 100 residents</p>
            <h2>{gunDeaths}</h2>
            <p>Gun deaths per 100,000 residents per year</p>
        </div>
    );
}

export default Safety;