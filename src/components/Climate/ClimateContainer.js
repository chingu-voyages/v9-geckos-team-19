import React from 'react';
import teleport from '../../api/teleport';
import Climate from './Climate';

class ClimateContainer extends React.Component {
    state = { weatherType: '', avgHigh: '', avgLow: '', loadSuccess: false, loadedCityURL: '' }

    climateDetails = async (city) => {
        const chosenCity = city;
        let weatherType, avgHighTemp, avgLowTemp, success;
        //navigation of teleport API to Safety section for chosen city
        let cityDetails = await teleport.get(chosenCity);
        cityDetails = cityDetails.data["_links"]["ua:details"]["href"];

        let cityClimate = await teleport.get(cityDetails);
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
        }

        if (!cityClimate) {
            weatherType = 'N/A';
            avgHighTemp = 'N/A';
            avgLowTemp = 'N/A';
            success = false;
        }

        this.setState({
            weatherType: weatherType, 
            avgHigh: avgHighTemp, 
            avgLow: avgLowTemp, 
            loadSuccess: success, 
            loadedCityURL: chosenCity
        })
    }

    render() {
        if (this.props.city && this.state.loadedCityURL !== this.props.city) {
            this.climateDetails(this.props.city);
        }
        let showClimate = null;

        if (this.state.loadSuccess) {
            showClimate = (
                <div className="card shadow-sm">
                    <Climate 
                        weatherType={this.state.weatherType}
                        avgHigh={this.state.avgHigh}
                        avgLow={this.state.avgLow} />
                </div>
            )
        }

        return <div>{showClimate}</div>
    }
}

export default ClimateContainer;