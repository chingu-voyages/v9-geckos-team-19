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
        loadedCityURL: '',
        loadSuccess: false
            };

    educationDetails = async (city) => {
        const chosenCity = city;

        let happyStudent, overallRanking, highMathValue, lowMathValue, meanMathValue, highReadingValue, 
        lowReadingValue, meanReadingValue, highScienceValue, lowScienceValue, meanScienceValue, success;

        //navigation of teleport API to desired education sections
        let cityDetails = await teleport.get(chosenCity);
        cityDetails = cityDetails.data["_links"]["ua:details"]["href"];

        let cityEducation = await teleport.get(cityDetails);
        cityEducation = cityEducation.data.categories.find(category => category.id.toUpperCase() === "EDUCATION");

        if(!cityEducation) {
            happyStudent = 0;
            overallRanking = 0;
            highMathValue = 0;
            lowMathValue = 0; 
            meanMathValue = 0; 
            highReadingValue = 0; 
            lowReadingValue = 0; 
            meanReadingValue = 0;
            highScienceValue = 0; 
            lowScienceValue = 0; 
            meanScienceValue = 0;
            success = false;
        }

        if(cityEducation) {
            const percentage = x => {
                if (!x) return 0;
                return x = (x.toPrecision(2) * 100).toFixed(1);
            }

            const statFormat = x => {
                if (!x) return 0;
                return x = x.toPrecision(3);
            }

            //happiness of student stats
            happyStudent = percentage(cityEducation.data[0].percent_value);

            //overall ranking of education
            overallRanking = statFormat(cityEducation.data[12].float_value);


            //Math score stats
            highMathValue = percentage(cityEducation.data[1].percent_value);
            lowMathValue = percentage(cityEducation.data[2].percent_value);
            meanMathValue = statFormat(cityEducation.data[3].float_value);


            //Reading score stats
            highReadingValue = percentage(cityEducation.data[4].percent_value);
            lowReadingValue = percentage(cityEducation.data[5].percent_value);
            meanReadingValue = statFormat(cityEducation.data[6].float_value);


            //Science score stats
            lowScienceValue = percentage(cityEducation.data[7].percent_value);
            highScienceValue = percentage(cityEducation.data[8].percent_value);
            meanScienceValue = statFormat(cityEducation.data[9].float_value);

            success = true;
        }

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
            loadedCityURL: chosenCity, 
            loadSuccess: success
        })
    }

    render() {
        if(this.props.city && this.state.loadedCityURL !== this.props.city)
        {
            this.educationDetails(this.props.city);
        }

        let showEducation = null;

        if(this.state.loadSuccess) {
            showEducation = (
                <div className="card">
                    <Education education={this.state.education}
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
                    />
                </div>
                
            )
        }

        return <div>{showEducation}</div>;
    }
}

export default EducationContainer;