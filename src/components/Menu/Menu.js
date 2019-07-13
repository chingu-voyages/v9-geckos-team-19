import "./Menu.css";
import React from "react";

class Menu extends React.Component {
  state = { displayCity: "", loadedCityURL: "" };

  displayName = city => {
    let beforeCity = "slug:";
    let afterCity = city.replace(new RegExp(".*" + beforeCity), "");
    const cityName = afterCity
      .toLowerCase()
      .split("-")
      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ")
      .replace("/", "");

    this.setState({
      currentCity: cityName,
      loadedCityURL: this.props.city
    });
  };

  render() {
    if (this.props.city && this.state.loadedCityURL !== this.props.city) {
      this.displayName(this.props.city);
    }

    let displayCurrent = null;

    if (this.props.city && this.state.loadedCityURL === this.props.city) {
      displayCurrent = <div>{this.state.currentCity}</div>;
    }

    return (
      <div className="menu shadow-lg">
        <p>{displayCurrent}</p>
        <p>Quality Of Life</p>
        <p>Life Quality Scores</p>
        <p>Climate</p>
        <p>Salary</p>
        <p>Cost Of Living</p>
        <p>Education</p>
        <p>Safety</p>
      </div>
    );
  }
}

export default Menu;
