import React from 'react';

class SearchBar extends React.Component {
    state = { term: '' };

    onInputChange = e => {
        this.setState({ term: e.target.value });
    }

    onCitySubmit = e => {
        e.preventDefault();

        this.props.onCitySubmit(this.state.term);
    }

    

    render() {

        return (
            <div>
                <form onSubmit={this.onCitySubmit}>
                    <input 
                        type="text" 
                        placeholder="Search for a city" 
                        value={this.state.term}
                        onChange={this.onInputChange}
                    />
                </form>               
            </div>
        );
    }

}

export default SearchBar;