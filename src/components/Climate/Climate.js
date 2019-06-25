import React from 'react';

//filter method for those variables who are not used to prevent rendering of sentence
//function either not equal to 0 or set to "N/A"


const Climate = ({weatherType, avgHigh, avgLow, rainDays, sunnyChance, dayLength}) => {
    if(!weatherType) {
        return <div></div>
    }

    return(
        <div>
            <div className="card-body">
                <div className="card-title">
                    Climate
                </div>
                <div className="card-text">
                    <p>Type of Climate: {weatherType}</p>
                    <p>Average High: {avgHigh} C°</p>
                    <p>Average Low: {avgLow} C°</p>
                    <p>Average Number of Rainy Days Per Year: {rainDays}</p>
                    <p>Annual Percent Chance of Sunshine: {sunnyChance}%</p>
                    <p>Average Length of Day: {dayLength} Hours</p>
                </div>
            </div>
        </div>
    );
}

export default Climate;