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
    <tr className="row mx-2 " key={key + 1}>
      <td className="col-1 ml-auto" style={{ color: "var(--teal)" }}>
        {props.fa[index]}
      </td>
      <td className="col-5 mr-auto ">{_.startCase(key)}</td>
      <td className="info-value col-3 ml-auto mr-1 text-right">
        <strong>
          {/score/i.test(key) ? cityData[key] : "$" + cityData[key]}
        </strong>
      </td>
    </tr>
  ));

  return <tbody className="row">{visualizedData}</tbody>;
};

export default VisualizeData;
