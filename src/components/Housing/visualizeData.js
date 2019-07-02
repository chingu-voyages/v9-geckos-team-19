//------------------------------------------------------//
//takes props from parent components and map them to create UI//
///------------------------------------------------------//
import React from "react";
import _ from "lodash";

const VisualizeData = props => {
  let cityData = props.cityData;
  let selectedKey = Object.keys(cityData).filter(key =>
    props.selectedIndex.includes(_.startCase(key))
  );
  let visualizedData = selectedKey.map(key => (
    <tr className="col-12" key={key + 1}>
      <td className="col-6">{_.startCase(key)}</td>
      <td className="info-value col-6">
        {/score/i.test(key) ? cityData[key] : "$" + cityData[key]}
      </td>
    </tr>
  ));

  return <tbody className="row">{visualizedData}</tbody>;
};

export default VisualizeData;
