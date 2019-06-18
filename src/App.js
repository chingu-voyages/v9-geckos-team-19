import React from 'react';
import './App.css';
import siteLogo from './image/CityScope.png';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SearchBar from './components/SearchBar/SearchBar';
import CityDisplayContainer from './components/CityDisplay/CityDisplayContainer';
import SafetyContainer from './components/Safety/SafetyContainer';
import EducationContainer from './components/Education/EducationContainer';
import teleport from './api/teleport';

class App extends React.Component {
  state = { geoname_id: 0, urbanscores: '', images: [], displayError: false }

  onCitySubmit = async (city) => {
    try {
      city = city.toLowerCase().replace(/ /g, '%20');
      let citySearch = await teleport.get('cities/?search=' + city);

      let cityResponseURL = citySearch.data["_embedded"]["city:search-results"][0]["_links"
      ]["city:item"]["href"];

      let idSearch = /[0-9]/g;
      
      let city_id = cityResponseURL.match(idSearch);
      city_id = city_id.toString().replace(/,/g, '');

      let urbanArea = await teleport.get('cities/geonameid:' + city_id);    
      urbanArea = urbanArea.data["_links"]["city:urban_area"]["href"];

      let imageURL = await teleport.get(urbanArea);   
      imageURL = imageURL.data["_links"]["ua:images"]["href"];

      let image = await teleport.get(imageURL);
      image = image.data.photos[0].image.web;

      this.setState({
        geoname_id: city_id,
        urbanscores: urbanArea,
        images: image,
        displayError: false
      })
    }
    catch(error) {
      this.setState({
        displayError: true
      })
    } 

  }

  render() {
    return (
      <div className="App">
        <div className="topBar">
          <img src={siteLogo} alt="CityScope logo"/>
          <p>CityScope</p>
        </div>
        <SearchBar onCitySubmit = {this.onCitySubmit}
                   searchError = {this.state.displayError}/>
        <CityDisplayContainer images={this.state.images}
          city={this.state.urbanscores}
          onCitySubmit={this.onCitySubmit} />
        <Row className="appRow">
          <Col md={2} className="graySpace"></Col>
          <Col md={8}>
            <div className="card">
                <EducationContainer city={this.state.urbanscores} />
            </div>
            <div className="card">
                <SafetyContainer city={this.state.urbanscores} />
            </div>
          </Col>
          <Col md={2} className="graySpace">
            <div className="menu">
              <p>Life Quality</p>
              <p>Cost of Living</p>
              <p>Salary</p>
              <p>Education</p>
              <p>Safety</p>
              <p>Climate</p>
              <p>Population</p>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
