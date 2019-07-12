import './LifeQuality.css';
import React from 'react'; 
import LifeQualityScore from './LifeQualityScore';


class LifeQuality extends React.Component {
    state = {scoreList: [], loadedCity: '', renderList: []}

    componentDidMount = async () => {
        const {scores, city} = this.props;
        this.setState({
            scoreList: scores,
            loadedCity: city
        })
    }

    updateScores = (scores, city) => {
        const categoryScores = scores;
        const loadedScores = categoryScores.map((score) => {
            return <LifeQualityScore
                key={score.name}
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