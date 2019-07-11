import './Safety.css';
import React, {useRef, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SafetyGraph from './SafetyGraph';


const Safety = ({ gunCount, gunDeaths, compareCount, compareDeaths, cityList, cityName }) => {
    let isLoading = useRef(true);
    let content;

    useEffect(() => {
        isLoading.current = false;
    }, []);


    if (isLoading) {
        content = (
            <div>
                <p>Is Loading</p>
            </div>
        )
    }

    content = (
        <div className="card-body">
            <div className="card-title">
                <h2>Safety</h2>
            </div>
            <div className="card-text">
                <div className="safetyDesktopDisplay">
                    <Row>
                        <Col>
                            <h3>Gun Crimes and Ownership</h3>
                            <div className="gunStats">
                                <span>{gunCount}</span>
                                <p>Guns owned per 100 residents</p>
                                <span>{gunDeaths}</span>
                                <p>Gun deaths per 100,000 residents per year</p>
                            </div>
                        </Col>
                        <Col>
                            <SafetyGraph city={cityName} cityGuns={gunCount} cityDeaths={gunDeaths} guns={compareCount} deaths={compareDeaths} cityList={cityList} />
                        </Col>
                    </Row>
                </div>
                <div className="safetyOtherViewportDisplay">
                    <h3>Gun Crimes and Ownership</h3>
                    <div className="gunStats">
                        <span>{gunCount}</span>
                        <p>Guns owned per 100 residents</p>
                        <span>{gunDeaths}</span>
                        <p>Gun deaths per 100,000 residents per year</p>
                    </div>
                    <SafetyGraph city={cityName} cityGuns={gunCount} cityDeaths={gunDeaths} guns={compareCount} deaths={compareDeaths} cityList={cityList} />
                </div>
            </div>
        </div>   
    )
 

    
    return (
        <div>
            {content}        
        </div>
    );
}

export default Safety;