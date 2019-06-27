import "./Display.css";
import React from "react";
import teleport from "../../api/teleport";
import VisualizeData from "./visualizeData";
import { Table, Card, Container } from "react-bootstrap";
import _ from "lodash";

class SelectedCityInfo extends React.Component {
  state = {
    label: "",
    result: undefined,
    city: "" //stores the urbanUrl(urbanscores in App.js)
  };

  getData = async (city, datatype) => {
    let urbanInfo = await teleport.get(city);
    let urbanDetailUrl = urbanInfo.data["_links"]["ua:details"]["href"];
    let urbanDetail = await teleport.get(urbanDetailUrl);

    let cityData = urbanDetail.data["categories"].filter(
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

    this.setState(state => {
      return {
        label: label,
        result: result,
        city: city
      };
    });
  };

  render() {
    if (this.props.city && this.state.city !== this.props.city) {
      this.getData(this.props.city, this.props.datatype);
    }
    if (this.state.result) {
      return (
        <Container className="session-container">
          <h2> {_.startCase(this.props.datatype.toLowerCase())} </h2>
          <Card>
            <Card.Body>
              <div class="card-container">
                <h4>{this.props.cityName}</h4>
                <Table borderless>
                  <VisualizeData
                    cityData={this.state.result}
                    selectedIndex={this.props.selectedIndex}
                  />
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Container>
      );
    } else {
      return <div />;
    }
  }
}

export default SelectedCityInfo;
