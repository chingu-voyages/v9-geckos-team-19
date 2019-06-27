//------------------------------------------------------//
//takes props from parent components and map them to create UI//
///------------------------------------------------------//
import React from "react";
import { Table } from "react-bootstrap";
import _ from "lodash";

const VisualizeData = props => {
  let cityData = props.cityData;
  let selectedKey = Object.keys(cityData).filter(key =>
    props.selectedIndex.includes(_.startCase(key))
  );
  let visualizedData = selectedKey.map(key => (
    <tr key={key + 1}>
      <td>{_.startCase(key)}</td>
      <td className="info-value">
        {/score/i.test(key) ? cityData[key] : "$" + cityData[key]}
      </td>
    </tr>
  ));

  return <tbody>{visualizedData}</tbody>;
};

export default VisualizeData;
