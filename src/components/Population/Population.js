import "./Population.css";
import React from "react";
import teleport from "../../api/teleport";

class Population extends React.Component {
  state = { population: "" };
  getData = async city => {
    const chosenCity = "https://api.teleport.org/api/cities/geonameid:" + city;
    let cityDetails = await teleport.get(chosenCity);
    cityData = cityDetails.data["population"];
    this.setState({ population: cityData });
  };

  render() {
    if (this.state.population) {
      return (
        <div>
          <button onClick={() => this.getData(city)} /> //change city
          <h4> Population </h4>
          <p>{this.state.population}</p>
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={() => this.getData(city)} /> //change city
        </div>
      );
    }
  }
}

export default Population;
