import "./landing.css";
import React from "react";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

class LandingPage extends React.Component {
  state = { city: "" };

  handleInput = e => {
    this.setState({
      city: e.target.value
    });
  };

  handleForm = () => {
    this.props.getCity(this.state.city);
    this.props.history.push("/citypage");
  };

  componentDidMount = () => {
    document.addEventListener("keypress", e => {
      // Number 13 is the "Enter" key on the keyboard
      if (e.keyCode === 13) {
        e.preventDefault();
        this.handleForm();
      }
    });
  };

  render() {
    return (
      <div className="landing-container">
        <nav className="navbar navbar-expand-sm ">
          <div className="nav-brand">
            <Link to="/">CityScope</Link>
          </div>
        </nav>
        <div />
        <div className="row">
          <div className="landing col-10 mx-auto pt-5 ">
            <div className=" col-md-9 mx-auto row align-items-center landing-content p-5">
              <div className="col-7 mx-auto  ">
                <p className=" landing-head text-center mx-auto">
                  Explore Your City
                </p>
              </div>

              <div className="col-md-6 mx-auto">
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
                      <Button
                        className="landingbutton"
                        variant="outline-secondary"
                        onClick={this.handleForm}
                      >
                        <i class="fas fa-search" />
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Landing = withRouter(LandingPage);
export default Landing;
