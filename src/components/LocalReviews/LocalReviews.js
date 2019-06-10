import './LocalReviews.css';
import React from 'react';


const LocalReviews = ({ city }) => {
    if (!city) {
        return <div></div>
    }

    return(
        <div>
            Local Reviews
        </div>
    );
}

export default LocalReviews;
