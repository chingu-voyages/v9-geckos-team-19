import './LifeQuality.css';
import React from 'react'; 
import LifeQualityScore from './LifeQualityScore';


class LifeQuality extends React.Component {
    state = {scoreList: [], loadedCity: '', renderList: []}

    componentDidMount = async () => {
        const scores = this.props.cityScores;
        const city = this.props.city; 

        this.setState({
            scoreList: scores,
            loadedCity: city
        })
    }

    updateScores = (scores, city) => {
        const categoryScores = scores;
        const loadedScores = categoryScores.map((score) => {
            let key = new Date();
            return <LifeQualityScore
                key={key}
                name={score.name}
                score={score.score}
                color={score.color}
            />;
        })

        this.setState({
            scoreList: categoryScores, 
            loadedCity: city,
            renderList: loadedScores
        })
    }

    render () {
        const {loadedCity, renderList} = this.state;
        const {cityScores, city} = this.props;

        if(loadedCity !== city) {
            this.updateScores(cityScores, city);
        }
        
        return (
            <div>{renderList}</div>
        )
    }

}

export default LifeQuality;