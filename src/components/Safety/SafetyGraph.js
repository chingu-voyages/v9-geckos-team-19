import React from 'react';
import { VictoryAxis, VictoryChart, VictoryGroup, VictoryVoronoiContainer, VictoryScatter} from 'victory';

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

        let valueOfX = guns.map( x => {
                return x = stringToFloat(x)
            } 
        );

        let valueOfY = deaths.map(x => {
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

        let cityGunCount = parseFloat(this.props.cityGuns)

        if(this.state.calculated && guns !== cityGunCount) {
            this.chartSafetyData();
        }

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
                        <VictoryAxis dependentAxis
                                orientation="left"
                                tickValues={[10,20,30,40,50]}
                                tickFormat={
                                    [`Low 
                                    Crime`,
                                     '',
                                      '',
                                       '',
                                    `High 
                                    Crime`]}                                     
                                />
                            <VictoryAxis 
                                tickValues={[100, 200, 300, 400]}
                                tickFormat={['Few Guns', '', '', 'Many Guns']}    
                                />
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
                                        x: guns,
                                        y: deaths,
                                        name: "(Selected)"
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