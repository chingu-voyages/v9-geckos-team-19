import './LifeQuality.css'
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LifeQualityScore = ({name, score, color}) => {
    return (
        <Row className="cityScores">
            <Col sm={4}>
                <p className="category">
                    {name}
                </p>
            </Col>
            <Col sm={6}>
                <div className="scoreData">
                    <div className="categoryContainer">
                        <div className="categoryScore" style={{ height: "1rem", width: `${score * 10}%`, backgroundColor: `${color}` }}></div>
                    </div>
                </div>
            </Col>
            <Col sm={2}>
                <p className="shownScore">{score > 0 ? score : "N/A"}</p>
            </Col>
        </Row>
    )
}

export default LifeQualityScore;