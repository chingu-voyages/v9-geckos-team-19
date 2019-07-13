import "./LifeQuality.css";
import React from "react";
import Row from 'react-bootstrap/Row';
import LifeQualityScore from "./LifeQualityScore";

const LifeQuality = ({cityScores}) => {

    const renderList = cityScores.map(score => {
            return (
                    <LifeQualityScore
                    className="scoresContainer"
                    key={score.name}
                    name={score.name}
                    score={score.score}
                    color={score.color}
                />
            );
        });

        return (
            <div>
                <Row>
                    <p className="range">
                        Scores are on a scale out of 10, and are a result
                        of city's data calculated and comparison to other
                        cities in the database.
                    </p>
                </Row>
                    {renderList}                    
            </div>);
}

export default LifeQuality;