import "./landing.css";
import axios from "axios";
import { Button, Form, InputGroup, FormControl } from "react-bootstrap";

class LandingPage extends React.Component {
  state = { city: "" };

  handleInput = e => {
    this.setState({
      city: e.target.value
    });
  };

  handleForm = () => {
    axios
      .post("/city", { cityName: this.state.city }) //need to unify the city route
      .then(function(res) {
        console.log(res);
      })
      .catch(function(err) {
        console.log(err);
      });
  };

  render() {
    return (
      <div className="landing container">
        <div className="landing">
          <h4 className="landing-head">
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
                <Button variant="outline-secondary">Button</Button>
              </InputGroup.Append>
            </InputGroup>
          </Form>
        </div>
      </div>
    );
  }
}

export default LandingPage;
