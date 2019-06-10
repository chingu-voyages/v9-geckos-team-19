import './CityDisplay.css';
import React from 'react';
// import teleport from '../../api/teleport';

const CityDisplay = ({ images, city }) => {
    if(!city) {
        return <div></div>
    }

    let beforeCity = 'slug:';
    let afterCity = city.replace(new RegExp('.*' + beforeCity), '');
    let cityName = afterCity.charAt(0).toUpperCase() + afterCity.slice(1);
    cityName = cityName.replace('/', '');

    return (
        <div className="landingPicDisplay">
            <img src={images} alt="city selected"/>
            <button>{cityName}</button>
        </div>
    );
}

export default CityDisplay;