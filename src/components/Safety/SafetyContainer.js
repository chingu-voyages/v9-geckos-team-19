import React from 'react';
import Safety from './Safety';
import teleport from '../../api/teleport';

class SafetyContainer extends React.Component {
    state = { gunCount: 0, gunDeaths: 0, loadedCityURL: ''};

    safetyDetails = async (city) => {
        let chosenCity = city;

        let cityDetails = await teleport.get(chosenCity);
        cityDetails = cityDetails.data["_links"]["ua:details"]["href"];

        let citySafety = await teleport.get(cityDetails);
        console.log(citySafety);

        let gunsOwned = citySafety.data["categories"][16].data[3].int_value;
        console.log(gunsOwned);
        let gunFatalities = citySafety.data["categories"][16].data[1].int_value;
        console.log(gunFatalities);

        this.setState({
            gunCount: gunsOwned,
            gunDeaths: gunFatalities, 
            loadedCityURL: chosenCity
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