import './CityDisplay.css';
import React from 'react';


const CityDisplay = ({ images }) => {

    return (
        <div className="landingPicDisplay">
            <img src={images} alt="city selected"/>
            <button>City Name</button>
        </div>
    );
}

export default CityDisplay;