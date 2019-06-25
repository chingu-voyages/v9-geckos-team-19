//takes props from components and map them to create UI
import React from "react";
// import { render } from "react-dom";
import { Table } from "react-bootstrap";
import _ from "lodash";

const VisualizeData = props => {
  let cityData = props.cityData;

  // let selectedData = Object.keys(cityData).filter((key, index) =>
  //   props.selectedIndex.includes(_.startCase(key))
  // );
  let visualizedData = Object.keys(cityData).map((key, index) => (
    <tr>
      <td>{_.startCase(key)}</td>
      <td colSpan="2">
        {/score/i.test(key) ? cityData[key] : "$" + cityData[key]}
      </td>
    </tr>
  ));

  return <tbody>{visualizedData}</tbody>;
};

export default VisualizeData;
