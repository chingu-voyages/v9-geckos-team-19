import React from 'react';
import teleport from '../../api/teleport';
import Climate from './Climate';

class ClimateContainer extends React.Component {
    state = { weatherType: '', avgHigh: '', avgLow: '', loadSuccess: false, loadedCityURL: '' }

    climateDetails = async (city) => {
        const chosenCity = city;
        let weatherType, avgHighTemp, avgLowTemp, success, systemType;
        //navigation of teleport API to Safety section for chosen city
        const cityDetails = await teleport.get(chosenCity);
        let cityClimate = await teleport.get(cityDetails.data["_links"]["ua:details"]["href"]);

        cityClimate = cityClimate.data.categories.find(category => category.id.toUpperCase() === "CLIMATE");

        if(cityClimate) {
            let checkType, checkHighTemp, checkLowTemp;

            checkType = cityClimate.data.find(x => x.id === "WEATHER-TYPE");            
            if(checkType) {
                weatherType = checkType.string_value;
            }

            checkHighTemp = cityClimate.data.find(x => x.id === "WEATHER-AVERAGE-HIGH");
            if (checkHighTemp) {
                avgHighTemp = checkHighTemp.string_value;
            }

            checkLowTemp = cityClimate.data.find(x => x.id === "WEATHER-AVERAGE-LOW");
            if (checkLowTemp) {
                avgLowTemp = checkLowTemp.string_value;
            }
            
            success = true;
            systemType = 'metric';
        }

        if (!cityClimate) {
            weatherType = 'N/A';
            avgHighTemp = 'N/A';
            avgLowTemp = 'N/A';
            systemType = '';
            success = false;
        }

        this.setState({
            weatherType: weatherType, 
            avgHigh: avgHighTemp, 
            avgLow: avgLowTemp, 
            loadSuccess: success,
            system: systemType, 
            loadedCityURL: chosenCity
        })
    }


    render() {
        let {weatherType, avgHigh, avgLow, loadSuccess, loadedCityURL} = this.state;

        if (this.props.city && loadedCityURL !== this.props.city) {
            this.climateDetails(this.props.city);
        }

        let showClimate;

        if(loadSuccess) {
            showClimate = (
                <div className="card shadow-sm">
                    <Climate 
                        weatherType={weatherType}
                        avgHigh={avgHigh}
                        avgLow={avgLow} 
                        city = {this.props.city}
                    />
                </div>
            )
        }
  

        return <div>{showClimate}</div>
    }
}

export default ClimateContainer;