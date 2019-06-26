//takes props from components and map them to create UI
import React from "react";
// import { render } from "react-dom";
import { Table } from "react-bootstrap";
import _ from "lodash";

const VisualizeData = props => {
  let cityData = props.cityData;

  let selectedKey = Object.keys(cityData).filter(key =>
    props.selectedIndex.includes(_.startCase(key))
  );
  let visualizedData = selectedKey.map(key => (
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
