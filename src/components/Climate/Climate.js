import './Climate.css';
import Warm from '../../image/WarmTemp.svg';
import Cold from '../../image/ColdTemp.svg';
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';


class Climate extends React.Component {
    state = {high: '', low: '', tempSystem: '', loadedCity: ''}

    componentDidMount = async () => {
        
        this.setTemp();
    }

    setTemp = (city) => {
        this.setState({
            high: this.props.avgHigh,
            low: this.props.avgLow,
            tempSystem: 'C°',
            loadedCity: city
        })
    }

    celsiusToFahrenheit = (highTemp, lowTemp, system) => {
        if (system === 'F°') {
            return;
        }

        let avgHigh = parseFloat(highTemp);
        let avgLow = parseFloat(lowTemp);

        const conversion = (temp) => {
            return temp = (((temp * 9) / 5) + 32).toPrecision(2);
        };

        avgHigh = conversion(avgHigh);
        avgHigh = avgHigh.toString();

        avgLow = conversion(avgLow);
        avgLow = avgLow.toString();

        this.setState({
            high: avgHigh,
            low: avgLow,
            tempSystem: 'F°'
        })
    }

    fahrenheitToCelsius = (highTemp, lowTemp, system) => {
        if (system === 'C°') {
            return;
        }

        let avgHigh = parseFloat(highTemp);
        let avgLow = parseFloat(lowTemp);

        const conversion = (temp) => {
            return temp = ((((temp) - 32) * 5) / 9).toPrecision(2);
        }

        avgHigh = conversion(avgHigh);
        avgHigh = avgHigh.toString();

        avgLow = conversion(avgLow);
        avgLow = avgLow.toString();

        this.setState({
            high: avgHigh,
            low: avgLow,
            tempSystem: 'C°'
        })
    }

    render() {
    
    const {weatherType, city} = this.props;
    const {high, low, tempSystem, loadedCity} = this.state;
    const system = tempSystem;

    if(city !== loadedCity) {
        this.setTemp(city);
    }

    const content = (
        <div className="card-body">
            <div className="card-title">
                <Row>
                    <h2>Climate</h2>
                </Row>
                <Row>
                    <Col>
                    </Col>
                    <Col md={2}>
                        <Dropdown>
                            <DropdownButton
                                variant="climate"
                                title={tempSystem}
                            >
                                <Dropdown.Item as="button" onClick={() => this.fahrenheitToCelsius(high, low, tempSystem)}>
                                    C°
                                    </Dropdown.Item>
                                <Dropdown.Item as="button" onClick={() => this.celsiusToFahrenheit(high, low, tempSystem)}>
                                    F°
                                    </Dropdown.Item>
                            </DropdownButton>
                        </Dropdown>
                    </Col>
                </Row>
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
                        <span>{high} {system}</span>
                    </Col>
                    <Col md={1}>
                    </Col>
                    <Col >
                        <p className="tempText">Average Low</p>
                        <span>{low} {system}</span>
                    </Col>
                    <Col ></Col>
                </Row>
                <Row className="mobileSpacing">
                    <Col >
                        <p className="tempText">Average High</p>
                        <span>{high} {system}</span>
                    </Col>
                    <Col >
                        <p className="tempText">Average Low</p>
                        <span>{low} {system}</span>
                    </Col>
                </Row>
                <Row>
                    <p><span className="weatherType">{weatherType}</span></p>
                </Row>
            </div>
        </div>
    )

        return (
            <div>{content}</div>
        );
    }
}

export default Climate;