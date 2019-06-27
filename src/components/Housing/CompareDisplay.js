//compare component, did not show in current version
//for future use, DO NOT DELETE

import React from "react";
import "./Display.css";
import VisualizeData from "./visualizeData";
import { Table, Card, CardDeck, ListGroup, Container } from "react-bootstrap";
import SelectedCityInfo from "./SelectedCityInfo";
import CompareCityInfo from "./CompareCityInfo";
import SelectedIndex from "./selectedCategory";
import _ from "lodash";

const CompareDisplay = props => {
  const selectedIndex = SelectedIndex.categories.find(
    i => i.datatype == props.datatype
  ).selectedIndex;

  if (props.cityName) {
    return (
      <div className="session">
        <Container className="session-container">
          <h2> {_.startCase(props.datatype.toLowerCase())} </h2>
          <CardDeck>
            <Card>
              <Card.Body>
                <br />
                <SelectedCityInfo
                  datatype={props.datatype}
                  selectedIndex={selectedIndex}
                  cityName={props.cityName}
                />
              </Card.Body>
            </Card>
            <span className="vs">VS</span>
            <Card>
              <CompareCityInfo
                datatype={props.datatype}
                selectedIndex={selectedIndex}
              />
            </Card>
          </CardDeck>
        </Container>
      </div>
    );
  } else {
    return <div />;
  }
};
export default CompareDisplay;
