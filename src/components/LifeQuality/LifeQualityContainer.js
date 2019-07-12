import React from 'react';
import teleport from '../../api/teleport';
import LifeQuality from './LifeQuality';

class LifeQualityContainer extends React.Component {
    state = {
         cityScores: [], loadedCityURL: ''
    }

    categoryScores = async (city) => {
        const chosenCity = city;
        let cityData = await teleport.get(chosenCity);
        cityData = cityData.data["_links"]["ua:scores"]["href"];

        let cityCategories = await teleport.get(cityData);
        cityCategories = cityCategories.data["categories"];

        const cityScoreList = cityCategories.map(x => x["score_out_of_10"]);
        const cityScoreNames = cityCategories.map(x => x["name"]);
        const cityScoreColors = cityCategories.map(x => x["color"]);

        const dataFormat = {
            score: 0,
            name: '',
            color: ''
        };

        let cityScoreData = [];

        for(let i = 0; i < cityScoreNames.length; i++) {
            let data = Object.create(dataFormat);
            data.score = cityScoreList[i].toPrecision(2);
            data.name = cityScoreNames[i];
            data.color = cityScoreColors[i];
            cityScoreData.push(data);
        }

        console.log(cityScoreData);

        this.setState({
            cityScores: cityScoreData,
            loadedCityURL: chosenCity
        })
    }

    render() {
        if(this.props.city !== this.state.loadedCityURL) {
            this.categoryScores(this.props.city);
        }

        if (this.state.cityScores)
        {
            return(
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="card-title">
                            <h2>Life Quality</h2>
                        </div>
                        <div className="card-text">
                            <LifeQuality 
                            cityScores = {this.state.cityScores}
                            city = {this.state.loadedCityURL}
                        />       
                        </div>
                    </div>
                </div>
            )
        }
        return <div></div>
    }
} 

export default LifeQualityContainer;