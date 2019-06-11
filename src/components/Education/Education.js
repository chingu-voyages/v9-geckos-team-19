import './Education.css';
import React from 'react';

const Education = ({ happiness, ranking, mathAvg, highMath, lowMath, readingAvg, highReading, lowReading, scienceAvg, highScience, lowScience }) => {
    if (!happiness) {
        return <div></div>
    }

    return (
        <div className="education">
            <h1>Education</h1>
            <h3>Percentage of Student Happiness: {happiness}%</h3>
            <h3>Overall Ranking:  {ranking}</h3>
            <h3>Average Math PISA Score:  {mathAvg}</h3>
            <h3>Percentage of High Performers in Math:  {highMath}%</h3>
            <h3>Percentage of Low Performers in Math:  {lowMath}%</h3>
            <h3>Average Reading PISA Score:  {readingAvg}</h3>
            <h3>Percentage of High Performers in Reading:  {highReading}%</h3>
            <h3>Percentage of Low Performers in Reading:  {lowReading}%</h3>
            <h3>Average Science PISA Score: {scienceAvg}</h3>
            <h3>Percentage of High Performers in Science:  {highScience}%</h3>
            <h3>Percentage of Low Performers in Science:  {lowScience}%</h3>
        </div>
    );
}

export default Education;