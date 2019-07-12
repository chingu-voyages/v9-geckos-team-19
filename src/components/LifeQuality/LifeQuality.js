import './LifeQuality.css';
import React from 'react'; 
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const LifeQuality = ({cityScores}) => {
    let key = new Date();
    const display = cityScores.map(scoreDetail => {
            return (
                <Row key={key} className="cityScores">
                    <Col md={4}>
                        <p>
                            {scoreDetail.name}
                        </p>
                    </Col>
                    <Col md={8}>
                        <div className="scoreData">
                            <div className="categoryContainer">
                                <div className="categoryScore" style={{ height: "1rem", width: `${scoreDetail.score * 10}%`, backgroundColor: `${scoreDetail.color}` }}></div>
                            </div>
                            <p>{scoreDetail.score > 0 ? scoreDetail.score : "N/A"}</p>
                        </div>
                    </Col> 
                </Row>
            )
    })

    if(cityScores) {
        return (
            <div className="card-body">
                <div className="card-title">
                    <h2>Life Quality</h2>
                </div>
                <div className="card-text">
                    {display}
                </div>
            </div>
        );
    }

    return <div></div>;
}

export default LifeQuality;