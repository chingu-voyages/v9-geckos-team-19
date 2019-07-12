import "./LifeQuality.css";
import React from "react";
import LifeQualityScore from "./LifeQualityScore";

const LifeQuality = ({cityScores}) => {

    const renderList = cityScores.map(score => {
            return (
                <LifeQualityScore
                    key={score.name}
                    name={score.name}
                    score={score.score}
                    color={score.color}
                />
            );
        });

        return <div>{renderList}</div>;
}

export default LifeQuality;