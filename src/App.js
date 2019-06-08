import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar';
import CityDisplay from './components/CityDisplay/CityDisplay';
import teleport from './api/teleport';

class App extends React.Component {
  state = { cityName: '', images: [], urbanscores: '', geohash: '', population: 0, lat: 0, long: 0 }

  onCitySubmit = async (city) => {
    debugger;
    city = city.toLowerCase();
    let citySearch = await teleport.get('cities/?search=' + city);

    let cityResponseURL = citySearch.data["_embedded"]["city:search-results"][0]["_links"
    ]["city:item"]["href"];

    let urbanResponse = await teleport.get('urban_areas/slug:' + city + '/scores/')
    let image = await teleport.get('urban_areas/slug:' + city + '/images/')

    this.setState({
      cityName: cityResponseURL,
      urbanscores: urbanResponse,
      images: image
    })
  }

  render() {
    return (
      <div>
        <SearchBar onCitySubmit={this.onCitySubmit} />
        <CityDisplay />
      </div>
    );
  }

}

export default App;
