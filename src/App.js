import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import CityDisplay from "./components/CityDisplay/CityDisplay";
import SafetyContainer from "./components/Safety/SafetyContainer";
import EducationContainer from "./components/Education/EducationContainer";
import teleport from "./api/teleport";
import Display from "./components/Housing/Housing";

class App extends React.Component {
  state = { geoname_id: 0, urbanscores: "", images: [] };

  onCitySubmit = async city => {
    city = city.toLowerCase().replace(/ /g, "%20");
    let citySearch = await teleport.get("cities/?search=" + city);

    let cityResponseURL =
      citySearch.data["_embedded"]["city:search-results"][0]["_links"][
        "city:item"
      ]["href"];

    let idSearch = /[0-9]/g;

    let city_id = cityResponseURL.match(idSearch);
    city_id = city_id.toString().replace(/,/g, "");

    let urbanArea = await teleport.get("cities/geonameid:" + city_id);
    urbanArea = urbanArea.data["_links"]["city:urban_area"]["href"];

    let imageURL = await teleport.get(urbanArea);
    imageURL = imageURL.data["_links"]["ua:images"]["href"];

    let image = await teleport.get(imageURL);
    image = image.data.photos[0].image.web;

    this.setState({
      geoname_id: city_id,
      urbanscores: urbanArea,
      images: image
    });
  };

  render() {
    return (
      <div>
        <SearchBar onCitySubmit={this.onCitySubmit} />
        <CityDisplay images={this.state.images} city={this.state.urbanscores} />
        <EducationContainer city={this.state.urbanscores} />
        <SafetyContainer city={this.state.urbanscores} />
        <Population city={this.state.geoname_id} />
        <Display city={this.state.urbanscores} datatype="HOUSING" />
        <Display city={this.state.urbanscores} datatype="COST-OF-LIVING" />
      </div>
    );
  }
}

export default App;
