import React from "react";
import { Events, animateScroll as scroll } from "react-scroll";
import "./CityInfo.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import Menu from "./components/Menu/Menu";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import CityDisplayContainer from "./components/CityDisplay/CityDisplayContainer";
import LifeQualityContainer from "./components/LifeQuality/LifeQualityContainer";
import SalaryContainer from "./components/Salary/SalaryContainer";
import ClimateContainer from "./components/Climate/ClimateContainer";
import SafetyContainer from "./components/Safety/SafetyContainer";
import EducationContainer from "./components/Education/EducationContainer";
import Population from "./components/Population/Population";
import Display from "./components/Housing/SelectedCityInfo";
import SelectedIndex from "./components/Housing/selectedCategory";
import logo from "./image/CityScope -blue.png";

class CityInfo extends React.Component {
  state = {
    geoname_id: 0,
    urbanScores: "",
    images: [],
    displayError: false,
    cityName: "", 
    initalLoad: false,
    loadedCity: ""
  };

  setCityData = () => { 
    this.setState({
      geoname_id: this.props.geoname_id,
      urbanScores: this.props.urbanScores,
      images: this.props.images,
      displayError: this.props.displayError,
      cityName: this.props.cityName,
      loadedCity: this.props.urbanScores
    })
  }

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }

  render() {
    let cityContent = null;
    const {geoname_id, cityName, urbanScores, images, displayError, loadedCity} = this.state;

    const datatypes = ["HOUSING", "COST-OF-LIVING"];
    const selectedIndex = datatype =>
      SelectedIndex.categories.find(i => i.datatype === datatype).selectedIndex;

    if((this.props.urbanScores && !loadedCity) || (loadedCity !== this.props.urbanScores)) {
      this.setCityData();
    }

    if (cityName) {
      cityContent = (
        <Row className="appRow">
          <Col md={2} />
          <Col md={8}>
            <Population
              city={urbanScores}
              geoname={geoname_id}
            />
            <LifeQualityContainer city={urbanScores} />
            <ClimateContainer city={urbanScores} />
            <SalaryContainer city={urbanScores} />
            <Display
              datatype1={datatypes[0]}
              datatype2={datatypes[1]}
              cityName={cityName}
              city={urbanScores}
              selectedIndex1={selectedIndex(datatypes[0])}
              selectedIndex2={selectedIndex(datatypes[1])}
            />
            <EducationContainer city={urbanScores} />
            <SafetyContainer city={urbanScores} />
          </Col>
          <Col md={2}>
            <Menu city={urbanScores} />
          </Col>
        </Row>
      );
      return (
        <div className="App">
          <div className="barContainer">
            <div className="topBar">
              {" "}
              <a className="navbar-brand" href="/">
                <img
                  src={logo}
                  alt="CityScope logo"
                  style={{ width: "5rem", height: "5rem" }}
                />
              </a>
              <p>City Scope</p>
            </div>
          </div>
          <SearchBar onCitySubmit={this.props.onCitySubmit} />
          <CityDisplayContainer
            images={images}
            city={urbanScores}
            onCitySubmit={this.props.onCitySubmit}
          />
          <div onClick={this.scrollToTop} className="mobile-back-to-top">
            <FontAwesomeIcon className="arrow-style" icon={faAngleDoubleUp} />
          </div>
          {cityContent}
        </div>
      );
    } 
    if (displayError) {
      return (
        <div className="App">
          <div className="topBar">
            <a className="navbar-brand" href="/">
              <img
                src={logo}
                alt="CityScope logo"
                style={{ width: "5rem", height: "5rem" }}
              />
            </a>
            <p>City Scope</p>
          </div>
          <SearchBar onCitySubmit={this.props.onCitySubmit} />
          <ErrorMessage searchError={displayError} />
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <div className="topBar">
            <a className="navbar-brand" href="/">
              <img
                src={logo}
                alt="CityScope logo"
                style={{ width: "5rem", height: "5rem" }}
              />
            </a>
            <p>City Scope</p>
          </div>
          <SearchBar onCitySubmit={this.props.onCitySubmit} />
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "80vh" }}
          >
            <div
              className="spinner-border text-secondary"
              style={{ width: "5rem", height: "5rem" }}
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default CityInfo;
