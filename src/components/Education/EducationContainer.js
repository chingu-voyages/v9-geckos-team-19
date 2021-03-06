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
        currentCity: '',
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

        overallRanking = cityEducation.data.find(x => x.id === "PISA-RANKING-TELESCORE");
        meanMathValue = cityEducation.data.find(x => x.id === "PISA-DETAIL-MATH-MEAN-SCORES");
        meanReadingValue = cityEducation.data.find(x => x.id === "PISA-DETAIL-READING-MEAN-SCORES");
        meanScienceValue = cityEducation.data.find(x => x.id === "PISA-DETAIL-SCIENCE-MEAN-SCORES");

        if(!cityEducation || !overallRanking || !meanMathValue || !meanReadingValue || !meanScienceValue) {
            overallRanking = 0;
            meanMathValue = 0; 
            meanReadingValue = 0;
            meanScienceValue = 0;
            success = false;
        }

        if(cityEducation && overallRanking && meanMathValue && meanReadingValue && meanScienceValue) {
            const statFormat = x => {
                if (!x) return 0;
                return x = x.toPrecision(3);
            }

            //overall ranking of education
            overallRanking = statFormat(overallRanking.float_value * 100);

            //Math score stats
            meanMathValue = statFormat(meanMathValue.float_value);
            //Reading score stats
            meanReadingValue = statFormat(meanReadingValue.float_value);
            //Science score stats
            meanScienceValue = statFormat(meanScienceValue.float_value);

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

    displayName = (city) => {
        let beforeCity = 'slug:';
        let afterCity = city.replace(new RegExp('.*' + beforeCity), '');
        const cityName = afterCity.toLowerCase()
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
            .replace('/', '');

        this.setState({
            currentCity: cityName,
            loadedCityURL: this.props.city
        })
    }

    render() {
        let {loadedCityURL, loadSuccess, ranking, mathAvg, readingAvg, scienceAvg, currentCity} = this.state;
        if(this.props.city && loadedCityURL !== this.props.city)
        {
            this.educationDetails(this.props.city);
            this.displayName(this.props.city);
        }

        let showEducation = null;

        if(loadSuccess) {
            showEducation = (
                <div className="card shadow-sm">
                    <Education 
                        cityName={currentCity}
                        ranking={ranking}
                        mathAvg={mathAvg}
                        readingAvg={readingAvg}
                        scienceAvg={scienceAvg}
                    />
                </div>
                
            )
        }

        return <div>{showEducation}</div>;
    }
}

export default EducationContainer;