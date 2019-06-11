import './CityDisplay.css';
import React from 'react';
import CityChoice from './CityChoice';

class CityDisplay extends React.Component {
    state = {currentCity: '', selectedCity: '', cityDisplay: false, loadedCityURL: ''}

    displayName = (city) => {
        let beforeCity = 'slug:';
        let afterCity = city.replace(new RegExp('.*' + beforeCity), '');
        const cityName = afterCity.toLowerCase()
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
            .replace('/', '');

        this.setState({
            currentCity: cityName, 
            loadedCityURL: this.props.city
        })
    }

    displayList = () => {
        let cityShow = this.state.cityDisplay;
        cityShow = !cityShow;

        this.setState ({
            cityDisplay: cityShow
        })
    }

    onCitySelect = (index) => {
        const cityIndex = index;

        const selectedCityName = this.props.cityList[cityIndex];

        this.setState({
            selectedCity: selectedCityName
        })
        this.props.onCitySubmit(selectedCityName)
    }

    render() {
            if(!this.props.city) {
                return <div></div>
            }
            if (this.props.city && this.state.loadedCityURL !== this.props.city) {
                this.displayName(this.props.city);
            }

            let menuDisplay = this.state.currentCity;

            if(this.state.cityDisplay) {
                menuDisplay = 
                <div>
                    {this.props.cityList.map((city, index) => {
                        return <CityChoice 
                            city = {city}
                            key={index}
                            select={() => this.onCitySelect(index)}
                        />
                    })}
                </div>
                
            }

    return (
        <div className="landingPicDisplay">
            <img src={this.props.images} alt="city selected"/>
            <div onClick={this.displayList}>{menuDisplay}</div>
        </div>
    );
    }

}

export default CityDisplay;