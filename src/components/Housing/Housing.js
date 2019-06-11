import "./Housing.css";
import React from "react";
import teleport from "../../api/teleport";
import VisualizeData from "./visualizeData";

class Housing extends React.Component {
  state = { label: "" };
  getData = async (city, datatype) => {
    const chosenCity = city;
    let cityDetails = await teleport.get(chosenCity);
    cityDetailUrl = cityDetails.data["_links"]["ua:details"]["href"];
    let cityDetails = await teleport.get(cityDetailsUrl);

    var cityData = cityDetails.data["categories"].filter(
      item => item.id === datatype
    );
    const label = cityData[0].label;

    let valueData = cityData[0].data;
    let result = {};
    valueData.forEach(i => {
      let valuekey = Object.keys(i)[0];
      let value = i[valuekey];
      if (typeof value === ("number" || "float")) {
        value = Math.round(value * 100) / 100;
      }
      result[i.label] = value;
    });

    this.setState({ result });
    this.setState({ label: label });
  };

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.result) {
      return (
        <div>
          <button onClick={() => this.getData(city, datatype)} /> //change city
          <h4> {this.state.label} </h4>
          <VisualizeData cityData={this.state.result} />
        </div>
      );
    } else {
      return (
        <div>
          <button onClick={() => this.getData(city, datatype)} /> //change city
        </div>
      );
    }
  }
}

export default Housing;
