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
                        <p>Overall Ranking:  <span className="educationStat">{ranking} out of 100</span>
                        </p>
                        <table className="educationTable">
                            <tr>
                                <th></th>
                                <th></th>
                                <th>International Average PISA Score (2015)</th> 
                            </tr>
                            <tr>
                                <td>Average Math PISA Score:  </td>
                                <td><span className="educationStat">{mathAvg}</span></td>
                                <td><span className="educationStat">490</span></td>
                            </tr>
                            <tr>
                                <td>Average Reading PISA Score:  </td>
                                <td><span className="educationStat">{readingAvg}</span></td>
                                <td><span className="educationStat">493</span></td>
                            </tr>
                            <tr>
                                <td>Average Science PISA Score: </td>
                                <td><span className="educationStat">{scienceAvg}</span></td>
                                <td><span className="educationStat">493</span></td>
                            </tr>
                        </table>
                    </Col>
                </Row>
            {/* add source at bottom */}
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