import React from 'react';
import CityDisplay from'./CityDisplay';
import teleport from '../../api/teleport';

class CityDisplayContainer extends React.Component {
    state = {cityList: [], loadedCityURL: ''};

    cityList = async () => {
        const {city} = this.props;
        let cityDropDownList = await teleport.get('urban_areas/');
        cityDropDownList = cityDropDownList.data["_links"]["ua:item"];
        cityDropDownList = cityDropDownList.map(x => x.name);

        this.setState({
            cityList: cityDropDownList, 
            loadedCityURL: city
        })
    }

    render() {
        const {images, city, onCitySubmit} = this.props;
        if(city && this.state.loadedCityURL !== city) {
            this.cityList();
        }

        return <CityDisplay 
                images={images}
                city={city}
                cityList={this.state.cityList}
                onCitySubmit={onCitySubmit}/>;
    }
}

export default CityDisplayContainer;