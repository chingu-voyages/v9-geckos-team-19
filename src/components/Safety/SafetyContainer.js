import React from 'react';
import Safety from './Safety';
import teleport from '../../api/teleport';

//TODO: Need to implement better algorithm to ensure that the correct data is being pulled in all containers

class SafetyContainer extends React.Component {
    state = { gunCount: 0, gunDeaths: 0, loadedCityURL: '', compareCount: 0, compareDeath: 0, loadSuccess: false};

    safetyDetails = async (city) => {
        //for stats specific to city chosen by user
        let chosenCity = city;

        //navigation of teleport API to Safety section for chosen city
        let cityDetails = await teleport.get(chosenCity);
        cityDetails = cityDetails.data["_links"]["ua:details"]["href"];

        let citySafety = await teleport.get(cityDetails);
        citySafety = citySafety.data.categories.find(category => category.id.toUpperCase() === "SAFETY");

        let gunsOwned, gunFatalities, compareGunCount, compareGunDeaths, success;


        if(!citySafety) {
                gunsOwned = 0;
                gunFatalities = 0;
                success = false;
        }

        if(citySafety) {
            const statFormat = x => {
                return x = x.toFixed(2);
            }
            gunsOwned = statFormat(citySafety.data[3].int_value);
            gunFatalities = statFormat(citySafety.data[1].int_value);


            //retrieval of safety data for multiple cities for comparison purposes from teleport API
            let cityNameList = await teleport.get('urban_areas/');
            cityNameList = cityNameList.data["_links"]["ua:item"];
            cityNameList = cityNameList.map(x => x.href);

            let compareCity = await Promise.all(cityNameList.map(async x => teleport.get(x)));
            compareCity = compareCity.map(x => x.data["_links"]["ua:details"]["href"]);
            const compareCityCrime = await Promise.all(compareCity.map(async x => teleport.get(x)));


            //make sure each city for comparison has a safety category and that it is selected properly if present
            compareGunCount = compareCityCrime.map(x => {
                let safetyCategory = x.data.categories.find(category => category.id.toUpperCase() === "SAFETY")

                if (safetyCategory) {
                    return statFormat(safetyCategory.data[3].int_value);
                }

                return 0;
            })
            compareGunDeaths = compareCityCrime.map(x => {
                let safetyCategory = x.data.categories.find(category => category.id.toUpperCase() === "SAFETY")

                if (safetyCategory) {
                    return statFormat(safetyCategory.data[1].int_value);
                }

                return 0;
            })

            success = true
        }


        this.setState({
            gunCount: gunsOwned,
            gunDeaths: gunFatalities, 
            loadedCityURL: chosenCity,
            compareCount: compareGunCount,
            compareDeath: compareGunDeaths, 
            loadSuccess: success
        })
    }

    render() {

        if (this.props.city && this.state.loadedCityURL !== this.props.city) {
            this.safetyDetails(this.props.city);
        }

        let showSafety = null;

        if(this.state.loadSuccess) {
            showSafety = (
                <div className="card shadow-sm">
                    <Safety
                        gunCount={this.state.gunCount}
                        gunDeaths={this.state.gunDeaths}
                        compareCount={this.state.compareCount}
                        compareDeath={this.state.compareDeaths} />
                </div>
            )
        }

        return <div>{showSafety}</div>
    }
}

export default SafetyContainer;