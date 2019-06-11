import './CityDisplay.css';
import React from 'react';

class CityDisplay extends React.Component {
    state = {currentCity: '', loadedCityURL: ''}

    displayName = (city) => {
        debugger;
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

    render() {
            if(!this.props.city) {
                return <div></div>
            }
            if (this.props.city && this.state.loadedCityURL !== this.props.city) {
                this.displayName(this.props.city);
            }

    return (
        <div className="landingPicDisplay">
            <img src={this.props.images} alt="city selected"/>
            <div>{this.state.currentCity}</div>
        </div>
    );
    }

}

export default CityDisplay;