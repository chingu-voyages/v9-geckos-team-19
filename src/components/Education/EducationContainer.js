import React from 'react';
import Education from './Education';
import teleport from '../../api/teleport';

class EducationContainer extends React.Component {
    state = { happiness: 0, 
        ranking: 0, 
        mathAvg: 0, 
            highMath: 0,
            lowMath: 0,
        readingAvg: 0, 
            highReading: 0,
            lowReading: 0,
        scienceAvg: 0,
            highScience: 0,
            lowScience: 0,
        loadedCityURL: ''
            };

    educationDetails = async (city) => {
        let chosenCity = city;

        let cityDetails = await teleport.get(chosenCity);
        cityDetails = cityDetails.data["_links"]["ua:details"]["href"];

        let cityEducation = await teleport.get(cityDetails);

        let happyStudent = cityEducation.data["categories"][6].data[0].percent_value;
        happyStudent = (happyStudent.toPrecision(2) * 100).toFixed(1);

        let highMathValue = cityEducation.data["categories"][6].data[1].percent_value;
        highMathValue = (highMathValue.toPrecision(2) * 100).toFixed(1);
        let lowMathValue = cityEducation.data["categories"][6].data[2].percent_value;
        lowMathValue = (lowMathValue.toPrecision(2) * 100).toFixed(1);

        let meanMathValue = cityEducation.data["categories"][6].data[3].float_value;
        meanMathValue = meanMathValue.toPrecision(3);

        let highReadingValue = cityEducation.data["categories"][6].data[4].percent_value;
        highReadingValue = (highReadingValue.toPrecision(2) * 100).toFixed(1);
        let lowReadingValue = cityEducation.data["categories"][6].data[5].percent_value;
        lowReadingValue = (lowReadingValue.toPrecision(2) * 100).toFixed(1);

        let meanReadingValue = cityEducation.data["categories"][6].data[6].float_value;
        meanReadingValue = meanReadingValue.toPrecision(3);

        let highScienceValue = cityEducation.data["categories"][6].data[7].percent_value;
        highScienceValue = (highScienceValue.toPrecision(2) * 100).toFixed(1);
        let lowScienceValue = cityEducation.data["categories"][6].data[8].percent_value;
        lowScienceValue = (lowScienceValue.toPrecision(2) * 100).toFixed(1);


        let meanScienceValue = cityEducation.data["categories"][6].data[9].float_value;
        meanScienceValue = meanScienceValue.toPrecision(3);

        let overallRanking = cityEducation.data["categories"][6].data[12].float_value;
        overallRanking = (overallRanking.toPrecision(2) * 100).toFixed(1);

        this.setState({
            happiness: happyStudent, 
            ranking: overallRanking,
            mathAvg: meanMathValue,
            highMath: highMathValue,
            lowMath: lowMathValue,
            readingAvg: meanReadingValue,
            highReading: highReadingValue,
            lowReading: lowReadingValue,
            scienceAvg: meanScienceValue,
            highScience: highScienceValue,
            lowScience: lowScienceValue,
            loadedCityURL: chosenCity
        })
    }

    render() {
        if(this.props.city && this.state.loadedCityURL !== this.props.city)
        {
            this.educationDetails(this.props.city);
        }
        return <Education education={this.state.education}
            happiness={this.state.happiness}
            ranking={this.state.ranking}
            mathAvg={this.state.mathAvg}
            highMath={this.state.highMath}
            lowMath={this.state.lowMath}
            readingAvg={this.state.readingAvg}
            highReading={this.state.highReading}
            lowReading={this.state.lowReading}
            scienceAvg={this.state.scienceAvg}
            highScience={this.state.highScience}
            lowScience={this.state.lowScience}
        />;
    }
}

export default EducationContainer;