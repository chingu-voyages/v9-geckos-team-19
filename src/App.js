import React from "react";
import { Events, animateScroll as scroll } from "react-scroll";
import "./App.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';
import Menu from "./components/Menu/Menu";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import CityDisplayContainer from "./components/CityDisplay/CityDisplayContainer";
import LifeQualityContainer from "./components/LifeQuality/LifeQualityContainer";
import SalaryContainer from "./components/Salary/SalaryContainer";
import ClimateContainer from "./components/Climate/ClimateContainer";
import SafetyContainer from "./components/Safety/SafetyContainer";
import EducationContainer from "./components/Education/EducationContainer";
import teleport from "./api/teleport";
import Population from "./components/Population/Population";
import Display from "./components/Housing/SelectedCityInfo";
import SelectedIndex from "./components/Housing/selectedCategory";
import logo from "./image/CityScope -blue.png";

class App extends React.Component {
  state = {
    geoname_id: 0,
    urbanscores: "",
    images: [],
    displayError: false,
    cityLoad: false,
    cityName: "",
    location: {}
  };

  onCitySubmit = async city => {
    try {
      let urbanArea;
      city = city.toLowerCase().replace(/ /g, "%20");
      let citySearch = await teleport.get("cities/?search=" + city);

      let cityResponseURL =
        citySearch.data["_embedded"]["city:search-results"][0]["_links"][
          "city:item"
        ]["href"];

      let idSearch = /[0-9]/g;

      let city_id = cityResponseURL.match(idSearch);
      city_id = city_id.toString().replace(/,/g, "");

      if (city_id !== "1650527") {
        urbanArea = await teleport.get("cities/geonameid:" + city_id);
        urbanArea = urbanArea.data["_links"]["city:urban_area"]["href"];
      }
      if (city_id === "1650527") {
        urbanArea = "https://api.teleport.org/api/urban_areas/slug:bali/";
      }
      let locationData = await teleport.get("cities/geonameid:" + city_id);
      let location = locationData.data.location.latlon;

      let imageURL = await teleport.get(urbanArea);
      imageURL = imageURL.data["_links"]["ua:images"]["href"];

      let image = await teleport.get(imageURL);
      image = image.data.photos[0].image.web;

      this.setState({
        geoname_id: city_id,
        urbanscores: urbanArea,
        images: image,
        displayError: false,
        cityLoad: true,
        cityName: city.charAt(0).toUpperCase() + city.slice(1),
        location: location
      });
    } catch (error) {
      this.setState({
        displayError: true
      });
    }
  };

  scrollToTop = () => {
    scroll.scrollToTop();
  };

  componentWillUnmount() {
    Events.scrollEvent.remove("begin");
    Events.scrollEvent.remove("end");
  }

  render() {
    if (this.props.landingCity && this.state.cityName === "") {
      this.onCitySubmit(this.props.landingCity);
    }
    let cityContent = null;
    const datatypes = ["HOUSING", "COST-OF-LIVING"];
    const selectedIndex = datatype =>
      SelectedIndex.categories.find(i => i.datatype === datatype).selectedIndex;
    if (this.state.cityLoad) {
      cityContent = (
        <Row className="appRow">
          <Col md={2} />
          <Col md={8}>
            <ErrorMessage searchError={this.state.displayError} />
            <Population
              city={this.state.urbanscores}
              geoname={this.state.geoname_id}
            />
            <LifeQualityContainer city={this.state.urbanscores} />
            <ClimateContainer city={this.state.urbanscores} />
            <SalaryContainer city={this.state.urbanscores} />
            <Display
              datatype1={datatypes[0]}
              datatype2={datatypes[1]}
              cityName={this.state.cityName}
              city={this.state.urbanscores}
              selectedIndex1={selectedIndex(datatypes[0])}
              selectedIndex2={selectedIndex(datatypes[1])}
            />
            <EducationContainer city={this.state.urbanscores} />
            <SafetyContainer city={this.state.urbanscores} />
          </Col>
          <Col md={2}>
            <Menu city={this.state.urbanscores} />
          </Col>
        </Row>
      );
    }

    return (
      <div className="App">
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

        <SearchBar
          onCitySubmit={this.onCitySubmit}
        />
        <CityDisplayContainer
          images={this.state.images}
          city={this.state.urbanscores}
          onCitySubmit={
            this.props.landingCity && !this.state.cityName
              ? () => this.onCitySubmit(this.props.landingCity)
              : this.onCitySubmit
          }
        />
        <div onClick={this.scrollToTop} className="mobile-back-to-top">
          <FontAwesomeIcon className="arrow-style" icon={faAngleDoubleUp} />
        </div>
        {cityContent}
      </div>
    );
  }
}

export default App;
