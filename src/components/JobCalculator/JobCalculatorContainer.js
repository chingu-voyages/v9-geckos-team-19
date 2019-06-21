import React from 'react';
import teleport from '../../api/teleport';
import JobCalculator from './JobCalculator';

class JobCalculatorContainer extends React.Component {
    state = { loadSuccess: false}


    render() {
        let showCalculator = null;

        if(this.state.loadSuccess) {
            showCalculator =(<div className="card"><JobCalculator /></div>)
        }

        return <div>{showCalculator}</div>
    }
}

export default JobCalculatorContainer;