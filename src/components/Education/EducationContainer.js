import React from 'react';
import Education from './Education';

class EducationContainer extends React.Component {
    state = { education: [] };

    educationDetails = async(city) => {

    }

    render() {
        return <Education education={this.state.education} />;
    }
}

export default EducationContainer;