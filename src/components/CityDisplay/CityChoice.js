import React from 'react';

const CityChoice = ({city, select}) => {
    return(
        <div>
            <div onClick={select}>{city}</div>
        </div>
    )
}

export default CityChoice;