import React from 'react';
import CityDisplay from'./CityDisplay';
import teleport from '../../api/teleport';

class CityDisplayContainer extends React.Component {
    state = {cityList: [], loadedCityURL: ''};

    cityList = async () => {
        let cityDropDownList = await teleport.get('urban_areas/');
        cityDropDownList = cityDropDownList.data["_links"]["ua:item"];
        cityDropDownList = cityDropDownList.map(x => x.name);
        console.log(cityDropDownList);

        this.setState({
            cityList: cityDropDownList, 
            loadedCityURL: this.props.city
        })
    }

    render() {
        if(this.props.city && this.state.loadedCityURL !== this.props.city) {
            this.cityList();
        }

        return <CityDisplay 
                images={this.props.images}
                city={this.props.city}
                cityList={this.state.cityList}/>;
    }
}

export default CityDisplayContainer;