import "./landing.css";
import React from "react";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";

class LandingPage extends React.Component {
  state = { city: "" };

  handleInput = e => {
    this.setState({
      city: e.target.value
    });
  };

  handleForm = () => {
    this.props.getCity(this.state.city);
  };

  render() {
    return (
      <div className="landing-container">
        <div className="row">
          <div className="landing col-6 mx-auto pt-5 text-center">
            <h4 className="landing-head ">
              Know About A City with <span className="landing-one">ONE </span>
              Click
            </h4>

            <Form onSubmit={this.handleForm}>
              <InputGroup className="mb-3">
                <FormControl
                  onChange={this.handleInput}
                  name="cityName"
                  placeholder="Type the Name of the City"
                  aria-label="CityName"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Link
                    to="/citypage"
                    className="d-flex justify-content-center"
                  >
                    <Button
                      variant="outline-secondary"
                      onClick={this.handleForm}
                    >
                      Button
                    </Button>
                  </Link>
                </InputGroup.Append>
              </InputGroup>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default LandingPage;
