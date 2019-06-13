import './CityDisplay.css';
import React from 'react';
import CityChoice from './CityChoice';
import Image from 'react-bootstrap/Image';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

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
        debugger;
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

            const displayCurrent = this.state.currentCity;
            let menuDisplay = null;

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
        <div >
            <div className="cityPicDisplay">
                <Image src={this.props.images} fluid alt="city selected"/>
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