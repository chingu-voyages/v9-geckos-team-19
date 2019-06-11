import React from "react";
import teleport from "../../api/teleport";

class Population extends React.Component {
  state = { population: null };
  getData = async city => {
    const chosenCity = "https://api.teleport.org/api/cities/geonameid:" + city;
    let cityDetails = await teleport.get(chosenCity);
    let cityData = cityDetails.data["population"];
    this.setState({ population: cityData });
  };
  componentDidMount() {
    if (!this.state.population) {
      this.getData(this.props.city);
    }
  }
  render() {
    if (this.state.population) {
      return (
        <div>
          <h4> Population </h4>
          <p>{this.state.population}</p>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Population;
