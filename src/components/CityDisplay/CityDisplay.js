import './CityDisplay.css';
import React from 'react';
import CityChoice from './CityChoice';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class CityDisplay extends React.Component {
    state = {currentCity: '', selectedCity: '', loadedCityURL: ''}

    displayName = (city) => {
        let beforeCity = 'slug:';
        let afterCity = city.replace(new RegExp('.*' + beforeCity), '');
        let cityName = afterCity.toLowerCase()
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
            .join(' ')
            .replace('/', '');

        if(cityName === "Washington Dc") {
            cityName = "Washington DC";
        }

        this.setState({
            currentCity: cityName, 
            loadedCityURL: city
        })
    }

    onCitySelect = (index) => {
        const {cityList} = this.props;
        const cityIndex = index;

        const selectedCityName = cityList[cityIndex];

        this.setState({
            selectedCity: selectedCityName
        })

        this.props.onCitySubmit(selectedCityName)
    }

    render() {
        const {city, cityList, images} = this.props;
        const {currentCity, loadedCityURL} = this.state;
            if(!city) {
                return <div></div>
            }
            if (city && loadedCityURL !== city) {
                this.displayName(city);
            }

            const displayCurrent = currentCity;

            const menuDisplay = 
                <div>
                    {cityList.map((city, index) => {
                        return <CityChoice 
                            city = {city}
                            key={index}
                            select={() => this.onCitySelect(index)}
                        />
                    })}
                </div>
                
            

    return (
        <div >
            <div className="cityPicDisplay">
                <Image src={images} className="cityImage" alt="city selected"/>
                <Dropdown>
                    <DropdownButton 
                        onClick={this.displayList} 
                        variant="cityName" 
                        title={displayCurrent}
                    >
                        <Dropdown.Item className= "dropDownMenu">
                            {menuDisplay}
                        </Dropdown.Item>
                    </DropdownButton>
                </Dropdown>
            </div>
        </div>
    );
    }

}

export default CityDisplay;