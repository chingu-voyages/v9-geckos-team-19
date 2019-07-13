import "./LifeQuality.css";
import React from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
                    <Col></Col>
                    <Col></Col>
                    <Col md={2}>
                        <p className="range">
                            Out of 10
                        </p>
                    </Col>
                </Row>
                    {renderList}                    
            </div>);
}

export default LifeQuality;