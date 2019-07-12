import "./Display.css";
import React from "react";
import teleport from "../../api/teleport";
import VisualizeData from "./visualizeData";
import { Table } from "react-bootstrap";
import _ from "lodash";

class SelectedCityInfo extends React.Component {
  state = {
    label: "",
    result: undefined,
    city: "" //stores the urbanUrl(urbanscores in App.js)
  };

  getData = async (city, datatype1, datatype2) => {
    let urbanInfo = await teleport.get(city);
    let urbanDetailUrl = urbanInfo.data["_links"]["ua:details"]["href"];
    let urbanDetail = await teleport.get(urbanDetailUrl);

    let cityData1 = urbanDetail.data["categories"].filter(
      item => item.id === datatype1
    );
    let cityData2 = urbanDetail.data["categories"].filter(
      item => item.id === datatype2
    );

    const label = cityData2[0].label;

    let valueData1 = cityData1[0].data;
    let valueData2 = cityData2[0].data;
    let result1 = {};
    let result2 = {};
    valueData1.forEach(i => {
      let valuekey = Object.keys(i).filter(j => j.match(/value$/));
      let value = i[valuekey];
      if (typeof value === ("number" || "float")) {
        value = Math.round(value * 100) / 100;
      }
      result1[i.label] = value;
    });
    valueData2.forEach(i => {
      let valuekey = Object.keys(i).filter(j => j.match(/value$/));
      let value = i[valuekey];
      if (typeof value === ("number" || "float")) {
        value = Math.round(value * 100) / 100;
      }
      result2[i.label] = value;
    });

    this.setState(state => {
      return {
        label: label,
        result1: result1,
        result2: result2,
        city: city
      };
    });
  };

  render() {
    const housingdescription =
      "Cost of living is divided into two parts: housing and daily living expenses.The rent are median values of  large, medium, and small apartments in city center.";
    if (this.props.city && this.state.city !== this.props.city) {
      this.getData(this.props.city, this.props.datatype1, this.props.datatype2);
    }
    if (this.state.result1 && this.state.result2) {
      return (
        <div className="card shadow-sm">
          <div className="housing">
            <div className="card-body">
              <div className="card-title">
                <h2> {_.startCase(this.props.datatype2.toLowerCase())} </h2>
              </div>

              <div class="card-text">
                <p> {housingdescription}</p>
                <br />
                <span> Housing </span>
                <Table borderless>
                  <VisualizeData
                    cityData={this.state.result1}
                    selectedIndex={this.props.selectedIndex1}
                  />
                </Table>
                <br />
                <br />
                <span> Daily Life Expenses </span>
                <Table borderless>
                  <VisualizeData
                    cityData={this.state.result2}
                    selectedIndex={this.props.selectedIndex2}
                  />
                </Table>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default SelectedCityInfo;
