import React from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import CityDisplay from "./components/CityDisplay/CityDisplay";
import SafetyContainer from "./components/Safety/SafetyContainer";
import EducationContainer from "./components/Education/EducationContainer";
import teleport from "./api/teleport";
import Population from "./components/Population/Population";
import Display from "./components/Housing/SelectedCityInfo";
import SelectedIndex from "./components/Housing/selectedCategory";

class App extends React.Component {
  state = { geoname_id: 0, urbanscores: "", images: [], cityName: "" };

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
      images: image,
      cityName: city.charAt(0).toUpperCase() + city.slice(1)
    });
  };

  render() {
    const datatypes = ["HOUSING", "COST-OF-LIVING"];
    const selectedIndex = datatype =>
      SelectedIndex.categories.find(i => i.datatype == datatype).selectedIndex;
    return (
      <div>
        <SearchBar onCitySubmit={this.onCitySubmit} />
        <CityDisplay images={this.state.images} city={this.state.urbanscores} />
        <Population city={this.state.geoname_id} />
        <EducationContainer city={this.state.urbanscores} />
        <SafetyContainer city={this.state.urbanscores} />
        <Display
          datatype={datatypes[0]}
          cityName={this.state.cityName}
          city={this.state.urbanscores}
          selectedIndex={selectedIndex(datatypes[0])}
        />
        <Display
          datatype={datatypes[1]}
          cityName={this.state.cityName}
          city={this.state.urbanscores}
          selectedIndex={selectedIndex(datatypes[1])}
        />
      </div>
    );
  }
}

export default App;
