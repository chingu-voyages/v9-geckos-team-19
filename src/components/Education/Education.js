import './Education.css';
import React from 'react';

const Education = ({ urbanscores }) => {
    if(!urbanscores) {
        return <div></div>
    }

    let urbanId = urbanscores.ua_id;
    console.log(urbanId);

    return (
        <div className="education">
            Education
        </div>
    );
}

export default Education;