import './Safety.css';
import React from 'react';


const Safety = ({ gunCount, gunDeaths }) => {
    if (!gunCount && !gunDeaths) {
        return <div></div>
    }

    return (
        <div>
            <h1>City Safety</h1>
            {gunCount}
            <p>Guns owned per 100 residents</p>
            {gunDeaths}
            <p>Gun deaths per 100,000 residents per year</p>
        </div>
    );
}

export default Safety;