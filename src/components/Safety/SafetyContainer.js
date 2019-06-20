import React from 'react';
import Safety from './Safety';
import teleport from '../../api/teleport';

//TODO: Need to implement better algorithm to ensure that the correct data is being pulled in all containers

class SafetyContainer extends React.Component {
    state = { gunCount: 0, gunDeaths: 0, loadedCityURL: '', compareCount: 0, compareDeath: 0};

    safetyDetails = async (city) => {
        let chosenCity = city;

        let cityDetails = await teleport.get(chosenCity);
        cityDetails = cityDetails.data["_links"]["ua:details"]["href"];

        let citySafety = await teleport.get(cityDetails);

        const gunsOwned = citySafety.data["categories"][16].data[3].int_value;
        const gunFatalities = citySafety.data["categories"][16].data[1].int_value;

        let cityNameList = await teleport.get('urban_areas/');
        cityNameList = cityNameList.data["_links"]["ua:item"];
        cityNameList = cityNameList.map(x => x.href);

        let compareCity = await Promise.all(cityNameList.map(async x => teleport.get(x)));
        compareCity = compareCity.map(x => x.data["_links"]["ua:details"]["href"]);
        const compareCityCrime = await Promise.all(compareCity.map(async x => teleport.get(x)));   

        // const cityCategories = compareCityCrime.map(x => x.data.categories[6].label);
        //     console.log(cityCategories);


        const compareGunCount = compareCityCrime.map(x => {
            debugger;
            if(x.data.categories[16].label === "Safety") {
                return x.data.categories[16].data.int_value;
            }
            
            else {
                return x.data.categories.map(y => {
                    if(x.data.categories[y] === "Safety") {
                        return x.data.categories[y].data.int_value;
                    }
                    else {
                        return "N/A";
                    }
                });
            } 
        })

        console.log(compareGunCount);

        // const compareGunCount = compareCityCrime.map(x => {
        //     try {
        //         return x.data.categories[16].data[3].int_value;
        //     } catch (err) {
        //         return "N/A";
        //     }
        // });

        const compareGunDeaths = compareCityCrime.map(x => {
            try {
                return x.data.categories[16].data[1].int_value;
            } catch (err) {
                return "N/A";
            }
        });

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