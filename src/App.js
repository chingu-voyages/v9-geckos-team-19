import React from 'react';
import './App.css';
import siteLogo from './image/CityScope.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Menu from './components/Menu/Menu';
import SearchBar from './components/SearchBar/SearchBar';
import CityDisplayContainer from './components/CityDisplay/CityDisplayContainer';
import SalaryContainer from './components/Salary/SalaryContainer';
import ClimateContainer from './components/Climate/ClimateContainer';
import SafetyContainer from './components/Safety/SafetyContainer';
import EducationContainer from './components/Education/EducationContainer';
import teleport from './api/teleport';

class App extends React.Component {
  state = { geoname_id: 0, urbanscores: '', images: [], displayError: false, cityLoad: false }

  onCitySubmit = async (city) => {
    try {
      let urbanArea;
      city = city.toLowerCase().replace(/ /g, '%20');
      let citySearch = await teleport.get('cities/?search=' + city);

      let cityResponseURL = citySearch.data["_embedded"]["city:search-results"][0]["_links"
      ]["city:item"]["href"];

      let idSearch = /[0-9]/g;
      
      let city_id = cityResponseURL.match(idSearch);
      city_id = city_id.toString().replace(/,/g, '');

      if(city_id !== "1650527") {
        urbanArea = await teleport.get('cities/geonameid:' + city_id);    
        urbanArea = urbanArea.data["_links"]["city:urban_area"]["href"];
      }
      if(city_id === "1650527") {
        urbanArea = 'https://api.teleport.org/api/urban_areas/slug:bali/';
      }

      let imageURL = await teleport.get(urbanArea);   
      imageURL = imageURL.data["_links"]["ua:images"]["href"];

      let image = await teleport.get(imageURL);
      image = image.data.photos[0].image.web;

      this.setState({
        geoname_id: city_id,
        urbanscores: urbanArea,
        images: image,
        displayError: false,
        cityLoad: true
      })
    }
    catch(error) {
      this.setState({
        displayError: true
      })
    } 

  }

  render() {

    let cityContent = null;

    if(this.state.cityLoad) {
      cityContent = (
        <Row className="appRow">
          <Col md={2}></Col>
          <Col md={8}>
              <ClimateContainer city={this.state.urbanscores} />
              <SalaryContainer  city={this.state.urbanscores} />
              <EducationContainer city={this.state.urbanscores} />
              <SafetyContainer city={this.state.urbanscores} />
          </Col>
          <Col md={2}>
            <Menu city={this.state.urbanscores}/>
          </Col>
        </Row>
      );
    }

    return (
      <div className="App">
          <div className="topBar">
            <img src={siteLogo} alt="CityScope logo"/>
            <p>City Scope</p>
          </div>
          <SearchBar onCitySubmit = {this.onCitySubmit}
                    searchError = {this.state.displayError}/>
          <CityDisplayContainer images={this.state.images}
            city={this.state.urbanscores}
            onCitySubmit={this.onCitySubmit} />
        {cityContent}
      </div>
    );
  }
}

export default App;
