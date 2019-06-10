import './LocalReviews.css';
import React from 'react';


const LocalReviews = ({ urbanscore }) => {
    if (!urbanscore) {
        return <div></div>
    }

    return(
        <div>
            Local Reviews
        </div>
    );
}

export default LocalReviews;
