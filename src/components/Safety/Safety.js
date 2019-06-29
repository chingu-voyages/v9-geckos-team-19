import './Safety.css';
import React from 'react';
import CanvasJSReact from '../../canvasjs/canvasjs.react';


const Safety = ({ gunCount, gunDeaths, compareCount, compareDeaths }) => {
    if (!gunCount) {
        return <div></div>
    }

    // const options = {
    //     title: {
    //         text: "Gun Safety Statistics Amongst Cities"
    //     },
    //     axisX: {
    //         title: "Guns Per 100 Residents"
    //     },
    //     axisY: {
    //         title: "Guns Deaths Per 100K Residents Per Year"
    //     },
    //     data: [{
    //         type: "scatter",
    //         markerSize: 15,
    //         toolTipContent: '<b> Guns: </b>{x} <br/> <b>Deaths: </b>{y}',
    //         dataPoints: [
                
    //         ]
    //     }]
    // }
    return (
        <div>
            <div className="card-body">
                <div className="card-title">
                    <h2>Safety</h2>
                </div>
                <div className="card-text">
                    <span>{gunCount}</span>     
                    <p>Guns owned per 100 residents</p>
                    <span>{gunDeaths}</span>
                    <p>Gun deaths per 100,000 residents per year</p>
                    {/* <CanvasJS options = {options}/> */}
                </div>
            </div>           
        </div>
    );
}

export default Safety;