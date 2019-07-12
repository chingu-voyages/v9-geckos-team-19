import './SearchBar.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class SearchBar extends React.Component {
    state = { term: ''};

    onInputChange = e => {
        this.setState({ term: e.target.value });
    }

    onCitySubmit = e => {
        e.preventDefault();

        this.props.onCitySubmit(this.state.term);
    }

    render() {

        let errorText = null;

        if (this.props.searchError) {
            errorText = "Try another search term"
        }


        return (
            <div>
                <Row className="searchBar shadow">
                    <Col md={3}>
                        <Form className="searchForm" onSubmit={this.onCitySubmit}>
                            <InputGroup size="sm" className="mb-3">
                                    <FormControl
                                        placeholder="Search for a city"
                                        value={this.state.term}
                                        onChange={this.onInputChange}
                                    />
                                <InputGroup.Append>
                                    <Button variant="info" onClick={this.onCitySubmit}>Go</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                    </Col>
                    <Col md={4}></Col>
                    <Col md={4}> 
                    </Col>
                </Row>
                <h1>{errorText}</h1>
            </div>
        );
    }
}

export default SearchBar;