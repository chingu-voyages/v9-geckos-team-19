import React from 'react';
import { VictoryChart, VictoryGroup, VictoryVoronoiContainer, VictoryScatter} from 'victory';

class SafetyGraph extends React.Component {
    state = {chosenCityGuns: '', chosenCityDeaths: '', dataPoints: [], calculated: false}

    chartSafetyData = () => {
        const {guns, deaths, cityList} = this.props;
        let {cityGuns, cityDeaths} = this.props;

        const coordinate = {
            x: 0,
            y: 0,
            name: ''
        }
        let dataPointsArray = [];

        const stringToFloat = (x) => {
            return x = parseFloat(x);
        }

        let valueOfX = deaths.map( x => {
                return x = stringToFloat(x)
            } 
        );

        let valueOfY = guns.map(x => {
            return x = stringToFloat(x)
            }
        );

        for(let i=0; i < valueOfX.length; i++) {
            let coord = Object.create(coordinate);
            coord.x = valueOfX[i];
            coord.y = valueOfY[i];
            coord.name = cityList[i];
            dataPointsArray.push(coord);
        }

        cityGuns = stringToFloat(cityGuns);
        cityDeaths = stringToFloat(cityDeaths);

        this.setState(
            { 
                dataPoints: dataPointsArray,
                chosenCityGuns: cityGuns,
                chosenCityDeaths: cityDeaths,
                calculated: true
            }
        )
    } 

    componentDidMount = async () => (
        this.chartSafetyData()
    )

    render() {
        const data = this.state.dataPoints;
        const guns = this.state.chosenCityGuns;
        const deaths = this.state.chosenCityDeaths;
    
        if(this.state.calculated) {
            return (
                <div>
                    <VictoryChart 
                        containerComponent={
                            <VictoryVoronoiContainer
                                    labels={(point) =>
                                        `${point.name}`}
                                />
                            }
                        >
                        <VictoryGroup >
                            <VictoryScatter 
                                style={{
                                    data: { fill: "#A49FD3" }
                                }}
                                data={data}
                            />
                            <VictoryScatter 
                                style={{
                                    data: { 
                                        fill: "#17A2B8",
                                        stroke: "#72e9fc",
                                        strokeWidth: 3 
                                    }
                                }}
                                size={10}
                                data={[
                                { 
                                        x: deaths,
                                        y: guns,
                                        name: this.props.cityName
                                    }
                                ]}
                            />
                        </VictoryGroup>
                    </VictoryChart>
                </div>
            )
        }

        return <div></div>
    }
}

export default SafetyGraph;