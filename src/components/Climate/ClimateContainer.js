import React from 'react';
import teleport from '../../api/teleport';
import Climate from './Climate';

class ClimateContainer extends React.Component {
    state = { weatherType: '', avgHigh: '', avgLow: '', rainDays: 0, sunnyDays: 0, dayLength: 0, loadSuccess: false, loadedCityURL: '' }

    climateDetails = async (city) => {
        let chosenCity = city;
        let weatherType, avgHighTemp, avgLowTemp, rainDayCount, sunnyDayCount, dayHourAvg, success;
        //navigation of teleport API to Safety section for chosen city
        let cityDetails = await teleport.get(chosenCity);
        cityDetails = cityDetails.data["_links"]["ua:details"]["href"];

        let cityClimate = await teleport.get(cityDetails);
        cityClimate = cityClimate.data.categories.find(category => category.id.toUpperCase() === "CLIMATE");

        if(cityClimate) {
            let checkType, checkHighTemp, checkLowTemp, checkRainDays, checkSunDays, checkDayHours;

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

            checkRainDays = cityClimate.data.find(x => x.id === "WEATHER-AV-NUMBER-RAINY-DAYS");
            if (checkRainDays) {
                rainDayCount = checkRainDays.float_value;
            }

            checkSunDays = cityClimate.data.find(x => x.id === "WEATHER-AV-NUMBER-CLEAR-DAYS");
            if (checkSunDays) {
                sunnyDayCount = checkSunDays.float_value;
            }

            checkDayHours = cityClimate.data.find(x => x.id === "");
            if(checkDayHours) {
                dayHourAvg = checkDayHours.float_value;
            }
          
            success = true;
        }

        if (!cityClimate) {
            weatherType = 'N/A';
            avgHighTemp = 'N/A';
            avgLowTemp = 'N/A';
            rainDayCount = 0;
            sunnyDayCount = 0;
            dayHourAvg = 0;
            success = false;
        }

        this.setState({
            weatherType: weatherType, 
            avgHigh: avgHighTemp, 
            avgLow: avgLowTemp, 
            rainDays: rainDayCount, 
            sunnyDays: sunnyDayCount, 
            dayLength: dayHourAvg, 
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
                <div className="card">
                    <Climate 
                        weatherType={this.state.weatherType}
                        avgHigh={this.state.avgHigh}
                        avgLow={this.state.avgLow}
                        rainDays={this.state.rainDays}
                        sunnyChance={this.state.sunnyChance}
                        dayLength={this.state.dayLength} />
                </div>
            )
        }

        return <div>{showClimate}</div>
    }
}

export default ClimateContainer;