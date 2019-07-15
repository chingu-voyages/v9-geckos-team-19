import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import teleport from "./api/teleport";
import Landing from "./views/landing";
import CityInfo from "./CityInfo";

class App extends React.Component {
  state = {
    geoname_id: 0,
    urbanScores: "",
    images: [],
    displayError: false,
    cityName: ""
  };

  onCitySubmit = async city => {
    try {
      let urbanArea;
      let cityTerm = city.toLowerCase().replace(/ /g, "%20");

      if ((new RegExp("tampa")).test(cityTerm)) {
        cityTerm = "tampa";
      }

      let citySearch = await teleport.get("cities/?search=" + cityTerm);

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

      let imageURL = await teleport.get(urbanArea);
      imageURL = imageURL.data["_links"]["ua:images"]["href"];

      let image = await teleport.get(imageURL);
      image = image.data.photos[0].image.web;

      this.setState({
        geoname_id: city_id,
        urbanScores: urbanArea,
        images: image,
        displayError: false,
        cityName: city.charAt(0).toUpperCase() + city.slice(1)
      });
    } catch (error) {
      this.setState({
        displayError: true
      });
    }
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Landing getCity={this.onCitySubmit} />}
          />
          <Route
            exact
            path="/citypage"
            render={() => <CityInfo 
                onCitySubmit = {this.onCitySubmit}
                geoname_id = {this.state.geoname_id}
                cityName = {this.state.cityName}
                urbanScores = {this.state.urbanScores}
                images = {this.state.images}
                displayError = {this.state.displayError}
               />
              }
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
