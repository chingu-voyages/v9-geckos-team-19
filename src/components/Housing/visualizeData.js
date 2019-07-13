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
  let visualizedData = selectedKey.map((key, index) => (
    <tr className="row mx-3 " key={key + 1}>
      <td className="col-6 mr-auto ">
        <span> {props.fa[index]} &emsp;</span>
        {_.startCase(key)}
      </td>
      <td className="info-value col-4 ml-auto text-right">
        <strong>
          {/score/i.test(key) ? cityData[key] : "$" + cityData[key]}
        </strong>
      </td>
    </tr>
  ));

  return <tbody className="row">{visualizedData}</tbody>;
};

export default VisualizeData;
