import React from 'react';

//filter method for those variables who are not used to prevent rendering of sentence
//function either not equal to 0 or set to "N/A"


const Climate = ({weatherType, avgHigh, avgLow, loaded}) => {
   
    let content = null;

    if(loaded) {
        content = (
            <div className="card-body">
                <div className="card-title">
                    <h2>Climate</h2>
                </div>
                <div className="card-text">
                    <p><span>{weatherType}</span></p>
                    <p>Average High: <span>{avgHigh} C°</span> </p>
                    <p>Average Low: <span>{avgLow} C°</span></p>
                </div>
        </div>  
        )
    }

    return(
        <div>
            {content}
        </div>
    );
}

export default Climate;