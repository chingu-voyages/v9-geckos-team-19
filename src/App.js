import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import CityDisplay from './components/CityDisplay/CityDisplay';
import LocalReviews from './components/LocalReviews/LocalReviews';
import Safety from './components/Safety/Safety';
import Education from './components/Education/Education';
import teleport from './api/teleport';

class App extends React.Component {
  state = { geoname_id: 0, urbanscores: '', images: [] }

  onCitySubmit = async (city) => {
    debugger;
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

    console.log(city_id, urbanArea, image);

    this.setState({
      geoname_id: city_id,
      urbanscores: urbanArea,
      images: image
    })
  }

  render() {
    return (
      <div>
        <SearchBar onCitySubmit = {this.onCitySubmit}/>
        <CityDisplay images = {this.state.images}/>
        <Education city={this.state.urbanscores}/>
        <Safety city={this.state.urbanscores}/>
        <LocalReviews city={this.state.urbanscores}/>
      </div>
    );
  }
}

export default App;
