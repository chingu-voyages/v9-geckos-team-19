import React from 'react';
import teleport from '../../api/teleport';
import Climate from './Climate';

class ClimateContainer extends React.Component {
    state = { loadSuccess: false }

    render() {
        let showClimate = null;

        if (this.state.loadSuccess) {
            showClimate = (<div className="card"><Climate /></div>)
        }

        return <div>{showClimate}</div>
    }
}

export default ClimateContainer;