import './Climate.css';
import React, {useRef, useEffect} from 'react';

const Climate = ({weatherType, avgHigh, avgLow}) => {
    let isLoading = useRef(true);
    let content;

    useEffect(() => {
        isLoading.current = false;
    }, []); 


    if(isLoading) {
        content = (
            <div>
                <p>Is Loading</p>
            </div>
        )
    }

        content = (
            <div className="card-body">
                <div className="card-title">
                    <h2>Climate</h2>
                </div>
                <div className="card-text">
                    <p><span className="weatherType">{weatherType}</span></p>
                    <p>Average High: <span>{avgHigh} C°</span> </p>
                    <p>Average Low: <span>{avgLow} C°</span></p>
                </div>
            </div>  
        )


    return(
        <div>
            {content}
        </div>
    );
}

export default Climate;