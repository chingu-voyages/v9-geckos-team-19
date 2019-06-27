import React from "react";
import "./Population.css";
import teleport from "../../api/teleport";
import { Container } from "react-bootstrap";
import ReactHtmlParser from "react-html-parser";

class Population extends React.Component {
  state = { population: null, cityId: "", description: "" };
  getData = async city => {
    const chosenCity = "https://api.teleport.org/api/cities/geonameid:" + city;
    let cityDetails = await teleport.get(chosenCity);
    let urbanUrl = cityDetails.data["_links"]["city:urban_area"]["href"];

    let urbanInfo = await teleport.get(urbanUrl);
    let urbanScoreUrl = urbanInfo.data["_links"]["ua:scores"]["href"];
    let urbanScore = await teleport.get(urbanScoreUrl);
    let urbanSummary = urbanScore.data["summary"];
    let cityData = cityDetails.data["population"];

    this.setState({
      population: cityData,
      cityId: city,
      description: urbanSummary
    });
  };

  render() {
    if (this.props.city && this.props.city !== this.state.cityId) {
      this.getData(this.props.city);
    }

    if (this.state.population) {
      return (
        <Container className="session-container">
          <div className="intro">
            <br />
            {ReactHtmlParser(this.state.description)}
            <br />
            <h4>Population: {this.state.population}</h4>
          </div>
        </Container>
      );
    } else {
      return <div />;
    }
  }
}

export default Population;
