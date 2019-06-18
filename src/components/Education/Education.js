import './Education.css';
import React from 'react';

const Education = ({ happiness, ranking, mathAvg, highMath, lowMath, readingAvg, highReading, lowReading, scienceAvg, highScience, lowScience }) => {
    if (!happiness) {
        return <div></div>
    }

    return (
        <div className="education">            
            <div className="card-body">
                <div className="card-title">
                    <h4>Education</h4>
                </div>
                <div className="card-text">
                    <p>Percentage of Student Happiness: {happiness}%</p>
                    <p>Overall Ranking:  {ranking}</p>
                    <p>Average Math PISA Score:  {mathAvg}</p>
                    <p>Percentage of High Performers in Math:  {highMath}%</p>
                    <p>Percentage of Low Performers in Math:  {lowMath}%</p>
                    <p>Average Reading PISA Score:  {readingAvg}</p>
                    <p>Percentage of High Performers in Reading:  {highReading}%</p>
                    <p>Percentage of Low Performers in Reading:  {lowReading}%</p>
                    <p>Average Science PISA Score: {scienceAvg}</p>
                    <p>Percentage of High Performers in Science:  {highScience}%</p>
                    <p>Percentage of Low Performers in Science:  {lowScience}%</p>
                </div>           
            </div>
        </div>
    );
}

export default Education;