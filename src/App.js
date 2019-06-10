import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import CityDisplay from './components/CityDisplay/CityDisplay';
import teleport from './api/teleport';

class App extends React.Component {
  state = { geoname_id: 0, urbanscores: '', images: [] }

  onCitySubmit = async (city) => {
    city = city.toLowerCase();
    let citySearch = await teleport.get('cities/?search=' + city);

    let cityResponseURL = citySearch.data["_embedded"]["city:search-results"][0]["_links"
    ]["city:item"]["href"];

    let idSearch = /[0-9]/g;
    
    let city_id = cityResponseURL.match(idSearch);
     city_id = city_id.toString().replace(/,/g, '');

    let urbanResponse = await teleport.get('urban_areas/slug:' + city + '/scores/')
    let image = await teleport.get('urban_areas/slug:' + city + '/images/')

    console.log(city_id, urbanResponse, image);
    this.setState({
      geoname_id: city_id,
      urbanscores: urbanResponse,
      images: image
    })
  }

  render() {
    return (
      <div>
        <SearchBar onCitySubmit = {this.onCitySubmit}/>
        <CityDisplay image = {this.state.images}/>
      </div>
    );
  }

}

export default App;
