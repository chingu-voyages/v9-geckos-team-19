import React from 'react';
import Safety from './Safety';
import teleport from '../../api/teleport';

class SafetyContainer extends React.Component {
    state = { gunCount: 0, gunDeaths: 0, loadedCityURL: '', compareCount: 0, compareDeath: 0, cityList: [], cityName: '', loadSuccess: false};

    safetyDetails = async (city) => {
        //for stats specific to city chosen by user
        let chosenCity = city;

        let citySafetyList = await teleport.get('urban_areas/');
        citySafetyList = citySafetyList.data["_links"]["ua:item"];
        citySafetyList = citySafetyList.map(x => x.name);

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

        let beforeCity = 'slug:';
        let afterCity = chosenCity.replace(new RegExp('.*' + beforeCity), '');
        const selectedCity = afterCity.toLowerCase()
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
            .replace('/', '');

        this.setState({
            gunCount: gunsOwned,
            gunDeaths: gunFatalities, 
            loadedCityURL: chosenCity,
            compareCount: compareGunCount,
            compareDeath: compareGunDeaths, 
            cityList: citySafetyList,
            cityName: selectedCity,
            loadSuccess: success
        })
    }

    render() {
        const {gunCount, gunDeaths, compareCount, compareDeath, cityList, cityName, loadedCityURL, loadSuccess} = this.state;
        const {city} = this.props;

        if (city && loadedCityURL !== city) {
            this.safetyDetails(city);
        }

        let showSafety = null;

        if(loadSuccess) {
            showSafety = (
                <div className="card shadow-sm">
                    <Safety
                        gunCount={gunCount}
                        gunDeaths={gunDeaths}
                        compareCount={compareCount}
                        compareDeaths={compareDeath}
                        cityList={cityList} 
                        cityName={cityName}/>
                </div>
            )
        }

        return <div>{showSafety}</div>
    }
}

export default SafetyContainer;