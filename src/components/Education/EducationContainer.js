import React from 'react';
import Education from './Education';
import teleport from '../../api/teleport';

class EducationContainer extends React.Component {
    state = {  
        ranking: 0, 
        mathAvg: 0, 
        readingAvg: 0, 
        scienceAvg: 0,
        loadedCityURL: '',
        loadSuccess: false
            };

    educationDetails = async (city) => {
        const chosenCity = city;

        let overallRanking, meanMathValue, meanReadingValue, meanScienceValue, success;

        //navigation of teleport API to desired education sections
        let cityDetails = await teleport.get(chosenCity);
        cityDetails = cityDetails.data["_links"]["ua:details"]["href"];

        let cityEducation = await teleport.get(cityDetails);
        cityEducation = cityEducation.data.categories.find(category => category.id.toUpperCase() === "EDUCATION");

        if(!cityEducation) {
            overallRanking = 0;
            meanMathValue = 0; 
            meanReadingValue = 0;
            meanScienceValue = 0;
            success = false;
        }

        if(cityEducation) {
            const statFormat = x => {
                if (!x) return 0;
                return x = x.toPrecision(3);
            }

            //overall ranking of education
            overallRanking = statFormat(cityEducation.data[12].float_value);
            overallRanking = overallRanking * 100;

            //Math score stats
            meanMathValue = statFormat(cityEducation.data[3].float_value);
            //Reading score stats
            meanReadingValue = statFormat(cityEducation.data[6].float_value);
            //Science score stats
            meanScienceValue = statFormat(cityEducation.data[9].float_value);

            success = true;
        }

        this.setState({
            ranking: overallRanking,
            mathAvg: meanMathValue,
            readingAvg: meanReadingValue,
            scienceAvg: meanScienceValue,
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
                <div className="card shadow-sm">
                    <Education 
                        ranking={this.state.ranking}
                        mathAvg={this.state.mathAvg}
                        readingAvg={this.state.readingAvg}
                        scienceAvg={this.state.scienceAvg}
                    />
                </div>
                
            )
        }

        return <div>{showEducation}</div>;
    }
}

export default EducationContainer;