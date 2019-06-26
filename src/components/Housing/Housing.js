import "./Housing.css";
import React from "react";
import teleport from "../../api/teleport";
import VisualizeData from "./visualizeData";
import { Table, Card, ListGroup, Container } from "react-bootstrap";
import _ from "lodash";

class Housing extends React.Component {
  state = { label: "", result: undefined };

  getData = async (city, datatype) => {
    const chosenCity = city;

    let urbanAreaData = await teleport.get(chosenCity);
    let urbanDetailUrl = urbanAreaData.data["_links"]["ua:details"]["href"];
    let urbanInfo = await teleport.get(urbanDetailUrl);

    let cityData = urbanInfo.data["categories"].filter(
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

    this.setState({ label: label, result: result });
  };

  render() {
    if (this.props.city && !this.state.result) {
      this.getData(this.props.city, this.props.datatype);
    }

    if (this.state.result) {
      return (
        <div class="session-container">
          <Container>
            <h4> {this.state.label} </h4>
            <p> fdfasdfdsfasdfdsafda</p>
            <Card style={{ width: "18rem" }}>
              <Card.Title>{this.props.cityName}</Card.Title>
              <Table>
                <VisualizeData
                  cityData={this.state.result}
                  selectedIndex={this.props.selectedIndex}
                />
              </Table>
            </Card>
          </Container>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default Housing;
