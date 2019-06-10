import './Education.css';
import React from 'react';

const Education = ({ city }) => {
    if (!city) {
        return <div></div>
    }

    // let urbanId = city.ua_id;
    return (
        <div className="education">
            Education
        </div>
    );
}

export default Education;