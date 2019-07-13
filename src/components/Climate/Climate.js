import './Climate.css';
import Warm from '../../image/WarmTemp.svg';
import Cold from '../../image/ColdTemp.svg';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Climate = ({weatherType, avgHigh, avgLow}) => {

    const content = (
            <div className="card-body">
                <div className="card-title">
                    <h2>Climate</h2>
                </div>
                <div className="card-text">
                    <Row className="desktopIcon">
                        <Col></Col>
                        <Col >
                            <img className="hotWeatherIcon" src={Warm} alt="high temp icon" />
                        </Col>
                        <Col >
                            <img className="coldWeatherIcon" src={Cold} alt="low temp icon" />
                        </Col>
                        <Col></Col>
                    </Row>
                    <Row className="mobileIcon">
                        <Col >
                            <img className="hotWeatherIcon" src={Warm} alt="high temp icon" />
                        </Col>
                        <Col >
                            <img className="coldWeatherIcon" src={Cold} alt="low temp icon" />
                        </Col>
                    </Row>
                    <Row className="desktopSpacing">
                        <Col ></Col>
                        <Col >
                            <p className="tempText">Average High</p> 
                            <span>{avgHigh} C°</span>
                        </Col>
                        <Col md={1}>
                        </Col>
                        <Col >
                            <p className="tempText">Average Low</p>
                            <span>{avgLow} C°</span>                       
                        </Col>
                        <Col ></Col>
                    </Row>
                    <Row className="mobileSpacing">
                        <Col >
                            <p className="tempText">Average High</p>
                            <span>{avgHigh} C°</span>
                        </Col>
                        <Col >
                            <p className="tempText">Average Low</p>
                            <span>{avgLow} C°</span>
                        </Col>
                    </Row>
                    <Row>
                        <p><span className="weatherType">{weatherType}</span></p>
                    </Row>
                </div>
            </div>  
        )


    return <div>{content}</div>;
}

export default Climate;