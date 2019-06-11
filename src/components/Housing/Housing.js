import "./Housing.css";
import React from "react";
import teleport from "../../api/teleport";
import VisualizeData from "./visualizeData";

class Housing extends React.Component {
  state = { label: "" };
  getData = async (city, datatype) => {
    const chosenCity = city;
    let urbanAreaData = await teleport.get(chosenCity);
    let urbanDetailUrl = urbanAreaData.data["_links"]["ua:details"]["href"];
    let UrbanInfo = await teleport.get(urbanDetailUrl);

    var cityData = UrbanInfo.data["categories"].filter(
      item => item.id === datatype
    );
    const label = cityData[0].label;

    let valueData = cityData[0].data;
    let result = {};
    valueData.forEach(i => {
      let valuekey = Object.keys(i).filter(j => j.match(/value$/));
      let value = i[valuekey];
      if (typeof value === ("number" || "float")) {
        value = Math.round(value * 100) / 100;
      }
      result[i.label] = value;
    });

    this.setState({ result });
    this.setState({ label: label });
  };

  componentDidMount() {
    if (!this.state.result) {
      this.getData(this.props.city, this.props.datatype);
    }
  }
  render() {
    if (this.state.result) {
      return (
        <div>
          <h4> {this.state.label} </h4>
          <VisualizeData cityData={this.state.result} />
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Housing;
