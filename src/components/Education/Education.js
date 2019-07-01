import './Education.css';
import React, {useRef, useEffect} from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Education = ({ ranking, mathAvg,  readingAvg, scienceAvg }) => {
    let isLoading = useRef(true);
    let content;

    useEffect(() => {
        isLoading.current = false;
    }, []);


    if (isLoading) {
        content = (
            <div>
                <p>Is Loading</p>
            </div>
        )
    }

    content = (
        <div className="card-body">
            <div className="card-title">
                <h2>Education</h2>
            </div>
            <div className="card-text">
                <Row>
                    <h3 className="pisaInfoTitle">What is PISA?</h3>
                    <Row>
                        <Row>
                            <p className="pisaInfo">
                                PISA is an international testing system given to 15 year olds in participating countries
                                as a way of assessing how countries educational systems compare in terms of quality. This test is given at the age of
                                15 as many countries allow students at this age to chose whether to continue proceeding with their education at this point.
        
                        <sup>1</sup>
                            </p>
                        </Row>
                    </Row>
                    <Col>
                        <p>Overall Ranking:  <span>{ranking} out of 100</span></p>
                        <p>Average Math PISA Score:  <span>{mathAvg}</span></p>
                        <p>Average Reading PISA Score:  <span>{readingAvg}</span></p>
                        <p>Average Science PISA Score: <span>{scienceAvg}</span></p>
                    </Col>
                    <Col>
                        <Row>
                            <p >International Average PISA Score (2015)</p>
                        </Row>
                        <p><span>490</span></p>
                        <p><span>493</span></p>
                        <p><span>493</span></p>
                    </Col>
                </Row>

            </div>
        </div>
    )
    return (
        <div className="education">            
            {content}
        </div>
    );
}

export default Education;