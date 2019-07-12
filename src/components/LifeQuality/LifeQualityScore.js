import './LifeQuality.css'
import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const LifeQualityScore = ({name, score, color}) => {
    return (
        <Row className="cityScores">
            <Col md={4}>
                <p>
                    {name}
                </p>
            </Col>
            <Col md={8}>
                <div className="scoreData">
                    <div className="categoryContainer">
                        <div className="categoryScore" style={{ height: "1rem", width: `${score * 10}%`, backgroundColor: `${color}` }}></div>
                    </div>
                    <p>{score > 0 ? score : "N/A"}</p>
                </div>
            </Col>
        </Row>
    )
}

export default LifeQualityScore;