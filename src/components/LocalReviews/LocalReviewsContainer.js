import React from 'react';
import LocalReviews from './LocalReviews';

class LocalReviewsContainer extends React.Component {
    state = {  reviews: [] };

    reviewDetails = async (city) => {

    }

    render() {
        return  <LocalReviews reviews={this.state.reviews} />;
    }
}

export default LocalReviewsContainer;