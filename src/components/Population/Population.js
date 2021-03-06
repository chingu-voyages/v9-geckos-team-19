import React from "react";
import "./Population.css";
import teleport from "../../api/teleport";
import ReactHtmlParser from "react-html-parser";

class Population extends React.Component {
  state = { population: null, cityId: "", description: "" };
  getData = async (city, geoname) => {
    const urban = city;
    const geoname_id = geoname;

    let urbanInfo = await teleport.get(urban);
    let urbanScoreUrl = urbanInfo.data["_links"]["ua:scores"]["href"];
    let urbanScore = await teleport.get(urbanScoreUrl);
    let urbanSummary = urbanScore.data["summary"];


    const numberWithCommas = (x) => {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    let cityPop = await teleport.get("cities/geonameid:" + geoname_id);
    cityPop = numberWithCommas(cityPop.data["population"]);

    this.setState({
      population: cityPop,
      cityId: city,
      description: urbanSummary
    });
  };

  render() {
    if (this.props.city && this.props.city !== this.state.cityId) {
      this.getData(this.props.city, this.props.geoname);
    }

    if (this.state.population) {
      return (
        <div className="card">
          <div className="intro">
            <div className="card-body">
              <div className="card-title">
                <h2>Quality Of Life</h2>
              </div>
              <div className="card-text">
                <br />
                <p className="cityDescription">{ReactHtmlParser(this.state.description)}</p>
                <br />
                <p>
                  <span className="popSpan">Population: </span><span>{this.state.population}</span>
                </p>
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

export default Population;
