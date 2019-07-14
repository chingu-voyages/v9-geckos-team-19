import "./landing.css";
import React from "react";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
//import withRouter to access props history
import { withRouter } from "react-router-dom";
import logo from "../image/CityScope -blue.png";

class LandingPage extends React.Component {
  state = { city: "" };

  handleInput = e => {
    this.setState({
      city: e.target.value
    });
  };

  handleForm = () => {
    this.props.getCity(this.state.city);
    //force the page to transition
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
        <div className="row">
          <div className="landing col-10 mx-auto pt-5 ">
            <div className=" col-md-9 mx-auto row align-items-center landing-content p-5">
              <div className="col-md-7 mx-auto d-flex justify-content-center">
                <Link to="/">
                  <img
                    src={logo}
                    alt="logo"
                    style={{ width: "7rem", height: "7rem" }}
                  />
                </Link>
              </div>
              <div className="col-md-8 mx-auto  ">
                <div>
                  <p className=" landing-head text-center mx-auto">
                    Explore Your City
                  </p>
                </div>

                <div className="col-md-8 mx-auto ">
                  <Form onSubmit={this.handleForm}>
                    <InputGroup className="mb-3 searchform">
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
      </div>
    );
  }
}

const Landing = withRouter(LandingPage);
export default Landing;
