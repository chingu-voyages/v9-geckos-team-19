import React from 'react';
import Safety from './Safety';
import teleport from '../../api/teleport';

//TODO: Need to implement better algorithm to ensure that the correct data is being pulled in all containers

class SafetyContainer extends React.Component {
    state = { gunCount: 0, gunDeaths: 0, loadedCityURL: '', compareCount: 0, compareDeath: 0};

    safetyDetails = async (city) => {
        //for stats specific to city chosen by user
        let chosenCity = city;

        let cityDetails = await teleport.get(chosenCity);
        cityDetails = cityDetails.data["_links"]["ua:details"]["href"];

        let citySafety = await teleport.get(cityDetails);
        citySafety = citySafety.data.categories.find(category => category.id.toUpperCase() === "SAFETY");

        let gunsOwned, gunFatalities;


        //if chosen city safety data is not available
        if(!citySafety) {
                gunsOwned = "N/A";
                gunFatalities = "N/A"
        }
    
        //allows for proper display of numbers
        const statFormat = x => {
            if (!x) return "N/A";
            return x = x.toFixed(2);
        }

        gunsOwned = statFormat(citySafety.data[3].int_value);
        gunFatalities = statFormat(citySafety.data[1].int_value);

        //for comparing all of the city's crime data
        let cityNameList = await teleport.get('urban_areas/');
        cityNameList = cityNameList.data["_links"]["ua:item"];
        cityNameList = cityNameList.map(x => x.href);

        let compareCity = await Promise.all(cityNameList.map(async x => teleport.get(x)));
        compareCity = compareCity.map(x => x.data["_links"]["ua:details"]["href"]);
        const compareCityCrime = await Promise.all(compareCity.map(async x => teleport.get(x)));   

        
        //make sure each city for comparison has a safety category and that it is selected properly
        const compareGunCount = compareCityCrime.map(x => {
            let safetyCategory = x.data.categories.find(category => category.id.toUpperCase() === "SAFETY")

            if (safetyCategory) {
                return statFormat(safetyCategory.data[3].int_value);
            }

            return "N/A"; 
        })

        const compareGunDeaths = compareCityCrime.map(x => {
            let safetyCategory = x.data.categories.find(category => category.id.toUpperCase() === "SAFETY")

            if (safetyCategory) {
                return statFormat(safetyCategory.data[1].int_value);
            }

            return "N/A"; 
        })


        this.setState({
            gunCount: gunsOwned,
            gunDeaths: gunFatalities, 
            loadedCityURL: chosenCity,
            compareCount: compareGunCount,
            compareDeath: compareGunDeaths
        })
    }

    render() {

        if (this.props.city && this.state.loadedCityURL !== this.props.city) {
            this.safetyDetails(this.props.city);
        }

        return <Safety 
                    gunCount={this.state.gunCount} 
                    gunDeaths={this.state.gunDeaths}/>;
    }
}

export default SafetyContainer;