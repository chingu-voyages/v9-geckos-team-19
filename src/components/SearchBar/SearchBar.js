import './SearchBar.css';
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

        let errorText = ''; 

        if(this.props.searchError) {
            errorText = "Try another search term"
        }

        return (
            <div>
                <form onSubmit={this.onCitySubmit}>
                    <input 
                        type="text" 
                        placeholder={"Search for a city"}
                        value={this.state.term}
                        onChange={this.onInputChange}
                    />
                    <button onClick={this.onCitySubmit}>Search</button>
                </form>  
                <h1>{errorText}</h1>             
            </div>
        );
    }

}

export default SearchBar;