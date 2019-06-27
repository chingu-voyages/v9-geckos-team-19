//compare component, did not show in current version
//for future use, DO NOT DELETE

import React from "react";
import SelectedCityInfo from "./SelectedCityInfo";
import { FormControl, Dropdown, DropdownButton } from "react-bootstrap";
import "./Display.css";
import teleport from "../../api/teleport";
import onCitySubmit from "./teleportUrban";

const CustomToggle = props => {
  const handleClick = e => {
    e.preventDefault(); //does not pass any data, but triggers another function
    props.onClick(e);
  };

  return (
    <DropdownButton
      onClick={handleClick}
      title="Compare Another City"
      variant="info"
      key="Info"
      className="compare-city-button"
    >
      Compare Another City
    </DropdownButton>
  );
};

class CustomMenu extends React.Component {
  state = { value: "" };
  handleChange = e => {
    this.setState({ value: e.target.value.toLowerCase() });
  };

  render() {
    const {
      children,
      style,
      className,
      "aria-labelledby": labeledBy
    } = this.props;

    const { value } = this.state;
    const updatedItems = React.Children.map(
      children,

      child => React.cloneElement(child, { onClick: this.props.onClick })
    );
    const selected = updatedItems.filter(
      child => !value || child.props.eventkey.startsWith(value)
    );
    return (
      <div style={style} className={className} aria-labelledby={labeledBy}>
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={this.handleChange}
          value={value}
        />
        <ul className="list-unstyled">{selected}</ul>
      </div>
    );
  }
}

const DropdownItems = props => {
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle as={CustomToggle} id="dropdown-variants-success">
          Compare Another City
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenu} onClick={e => props.onClick(e)}>
          <Dropdown.Item eventkey="" />
          <Dropdown.Item eventkey="aarhus">Aarhus</Dropdown.Item>
          <Dropdown.Item eventkey="adelaide">Adelaide</Dropdown.Item>
          <Dropdown.Item eventkey="albuquerque">Albuquerque</Dropdown.Item>
          <Dropdown.Item eventkey="almaty">Almaty</Dropdown.Item>
          <Dropdown.Item eventkey="amsterdam">Amsterdam</Dropdown.Item>
          <Dropdown.Item eventkey="anchorage">Anchorage</Dropdown.Item>
          <Dropdown.Item eventkey="andorra">Andorra</Dropdown.Item>
          <Dropdown.Item eventkey="ankara">Ankara</Dropdown.Item>
          <Dropdown.Item eventkey="asheville">Asheville</Dropdown.Item>
          <Dropdown.Item eventkey="asuncion">Asuncion</Dropdown.Item>
          <Dropdown.Item eventkey="athens">Athens</Dropdown.Item>
          <Dropdown.Item eventkey="atlanta">Atlanta</Dropdown.Item>
          <Dropdown.Item eventkey="auckland">Auckland</Dropdown.Item>
          <Dropdown.Item eventkey="austin">Austin</Dropdown.Item>
          <Dropdown.Item eventkey="baku">Baku</Dropdown.Item>
          <Dropdown.Item eventkey="bali">Bali</Dropdown.Item>
          <Dropdown.Item eventkey="baltimore">Baltimore</Dropdown.Item>
          <Dropdown.Item eventkey="bangkok">Bangkok</Dropdown.Item>
          <Dropdown.Item eventkey="barcelona">Barcelona</Dropdown.Item>
          <Dropdown.Item eventkey="beijing">Beijing</Dropdown.Item>
          <Dropdown.Item eventkey="beirut">Beirut</Dropdown.Item>
          <Dropdown.Item eventkey="belfast">Belfast</Dropdown.Item>
          <Dropdown.Item eventkey="belgrade">Belgrade</Dropdown.Item>
          <Dropdown.Item eventkey="belize-city">Belize City</Dropdown.Item>
          <Dropdown.Item eventkey="bengaluru">Bengaluru</Dropdown.Item>
          <Dropdown.Item eventkey="bergen">Bergen</Dropdown.Item>
          <Dropdown.Item eventkey="berlin">Berlin</Dropdown.Item>
          <Dropdown.Item eventkey="bern">Bern</Dropdown.Item>
          <Dropdown.Item eventkey="bilbao">Bilbao</Dropdown.Item>
          <Dropdown.Item eventkey="birmingham">Birmingham</Dropdown.Item>
          <Dropdown.Item eventkey="birmingham-al">Birmingham, AL</Dropdown.Item>
          <Dropdown.Item eventkey="bogota">Bogota</Dropdown.Item>
          <Dropdown.Item eventkey="boise">Boise</Dropdown.Item>
          <Dropdown.Item eventkey="bologna">Bologna</Dropdown.Item>
          <Dropdown.Item eventkey="bordeaux">Bordeaux</Dropdown.Item>
          <Dropdown.Item eventkey="boston">Boston</Dropdown.Item>
          <Dropdown.Item eventkey="boulder">Boulder</Dropdown.Item>
          <Dropdown.Item eventkey="bozeman">Bozeman</Dropdown.Item>
          <Dropdown.Item eventkey="bratislava">Bratislava</Dropdown.Item>
          <Dropdown.Item eventkey="brighton">Brighton</Dropdown.Item>
          <Dropdown.Item eventkey="brisbane">Brisbane</Dropdown.Item>
          <Dropdown.Item eventkey="bristol">Bristol</Dropdown.Item>
          <Dropdown.Item eventkey="brno">Brno</Dropdown.Item>
          <Dropdown.Item eventkey="brussels">Brussels</Dropdown.Item>
          <Dropdown.Item eventkey="bucharest">Bucharest</Dropdown.Item>
          <Dropdown.Item eventkey="budapest">Budapest</Dropdown.Item>
          <Dropdown.Item eventkey="buenos-aires">Buenos Aires</Dropdown.Item>
          <Dropdown.Item eventkey="buffalo">Buffalo</Dropdown.Item>
          <Dropdown.Item eventkey="cairo">Cairo</Dropdown.Item>
          <Dropdown.Item eventkey="calgary">Calgary</Dropdown.Item>
          <Dropdown.Item eventkey="cambridge">Cambridge</Dropdown.Item>
          <Dropdown.Item eventkey="cape-town">Cape Town</Dropdown.Item>
          <Dropdown.Item eventkey="caracas">Caracas</Dropdown.Item>
          <Dropdown.Item eventkey="cardiff">Cardiff</Dropdown.Item>
          <Dropdown.Item eventkey="casablanca">Casablanca</Dropdown.Item>
          <Dropdown.Item eventkey="charleston">Charleston</Dropdown.Item>
          <Dropdown.Item eventkey="charlotte">Charlotte</Dropdown.Item>
          <Dropdown.Item eventkey="chattanooga">Chattanooga</Dropdown.Item>
          <Dropdown.Item eventkey="chennai">Chennai</Dropdown.Item>
          <Dropdown.Item eventkey="chiang-mai">Chiang Mai</Dropdown.Item>
          <Dropdown.Item eventkey="chicago">Chicago</Dropdown.Item>
          <Dropdown.Item eventkey="chisinau">Chisinau</Dropdown.Item>
          <Dropdown.Item eventkey="christchurch">Christchurch</Dropdown.Item>
          <Dropdown.Item eventkey="cincinnati">Cincinnati</Dropdown.Item>
          <Dropdown.Item eventkey="cleveland">Cleveland</Dropdown.Item>
          <Dropdown.Item eventkey="cluj-napoca">Cluj-Napoca</Dropdown.Item>
          <Dropdown.Item eventkey="cologne">Cologne</Dropdown.Item>
          <Dropdown.Item eventkey="colorado-springs">
            Colorado Springs
          </Dropdown.Item>
          <Dropdown.Item eventkey="columbus">Columbus</Dropdown.Item>
          <Dropdown.Item eventkey="copenhagen">Copenhagen</Dropdown.Item>
          <Dropdown.Item eventkey="cork">Cork</Dropdown.Item>
          <Dropdown.Item eventkey="curitiba">Curitiba</Dropdown.Item>
          <Dropdown.Item eventkey="dallas">Dallas</Dropdown.Item>
          <Dropdown.Item eventkey="dar-es-salaam">Dar es Salaam</Dropdown.Item>
          <Dropdown.Item eventkey="delhi">Delhi</Dropdown.Item>
          <Dropdown.Item eventkey="denver">Denver</Dropdown.Item>
          <Dropdown.Item eventkey="des-moines">Des Moines</Dropdown.Item>
          <Dropdown.Item eventkey="detroit">Detroit</Dropdown.Item>
          <Dropdown.Item eventkey="doha">Doha</Dropdown.Item>
          <Dropdown.Item eventkey="dresden">Dresden</Dropdown.Item>
          <Dropdown.Item eventkey="dubai">Dubai</Dropdown.Item>
          <Dropdown.Item eventkey="dublin">Dublin</Dropdown.Item>
          <Dropdown.Item eventkey="dusseldorf">Dusseldorf</Dropdown.Item>
          <Dropdown.Item eventkey="edinburgh">Edinburgh</Dropdown.Item>
          <Dropdown.Item eventkey="edmonton">Edmonton</Dropdown.Item>
          <Dropdown.Item eventkey="eindhoven">Eindhoven</Dropdown.Item>
          <Dropdown.Item eventkey="eugene">Eugene</Dropdown.Item>
          <Dropdown.Item eventkey="florence">Florence</Dropdown.Item>
          <Dropdown.Item eventkey="florianopolis">Florianopolis</Dropdown.Item>
          <Dropdown.Item eventkey="fort-collins">Fort Collins</Dropdown.Item>
          <Dropdown.Item eventkey="frankfurt">Frankfurt</Dropdown.Item>
          <Dropdown.Item eventkey="fukuoka">Fukuoka</Dropdown.Item>
          <Dropdown.Item eventkey="gaillimh">Galway</Dropdown.Item>
          <Dropdown.Item eventkey="gdansk">Gdansk</Dropdown.Item>
          <Dropdown.Item eventkey="geneva">Geneva</Dropdown.Item>
          <Dropdown.Item eventkey="gibraltar">Gibraltar</Dropdown.Item>
          <Dropdown.Item eventkey="glasgow">Glasgow</Dropdown.Item>
          <Dropdown.Item eventkey="gothenburg">Gothenburg</Dropdown.Item>
          <Dropdown.Item eventkey="grenoble">Grenoble</Dropdown.Item>
          <Dropdown.Item eventkey="guadalajara">Guadalajara</Dropdown.Item>
          <Dropdown.Item eventkey="guatemala-city">
            Guatemala City
          </Dropdown.Item>
          <Dropdown.Item eventkey="halifax">Halifax</Dropdown.Item>
          <Dropdown.Item eventkey="hamburg">Hamburg</Dropdown.Item>
          <Dropdown.Item eventkey="hannover">Hannover</Dropdown.Item>
          <Dropdown.Item eventkey="havana">Havana</Dropdown.Item>
          <Dropdown.Item eventkey="helsinki">Helsinki</Dropdown.Item>
          <Dropdown.Item eventkey="ho-chi-minh-city">
            Ho Chi Minh City
          </Dropdown.Item>
          <Dropdown.Item eventkey="hong-kong">Hong Kong</Dropdown.Item>
          <Dropdown.Item eventkey="honolulu">Honolulu</Dropdown.Item>
          <Dropdown.Item eventkey="houston">Houston</Dropdown.Item>
          <Dropdown.Item eventkey="hyderabad">Hyderabad</Dropdown.Item>
          <Dropdown.Item eventkey="indianapolis">Indianapolis</Dropdown.Item>
          <Dropdown.Item eventkey="innsbruck">Innsbruck</Dropdown.Item>
          <Dropdown.Item eventkey="istanbul">Istanbul</Dropdown.Item>
          <Dropdown.Item eventkey="jacksonville">Jacksonville</Dropdown.Item>
          <Dropdown.Item eventkey="jakarta">Jakarta</Dropdown.Item>
          <Dropdown.Item eventkey="johannesburg">Johannesburg</Dropdown.Item>
          <Dropdown.Item eventkey="kansas-city">Kansas City</Dropdown.Item>
          <Dropdown.Item eventkey="karlsruhe">Karlsruhe</Dropdown.Item>
          <Dropdown.Item eventkey="kathmandu">Kathmandu</Dropdown.Item>
          <Dropdown.Item eventkey="kiev">Kiev</Dropdown.Item>
          <Dropdown.Item eventkey="kingston">Kingston</Dropdown.Item>
          <Dropdown.Item eventkey="knoxville">Knoxville</Dropdown.Item>
          <Dropdown.Item eventkey="krakow">Krakow</Dropdown.Item>
          <Dropdown.Item eventkey="kuala-lumpur">Kuala Lumpur</Dropdown.Item>
          <Dropdown.Item eventkey="kyoto">Kyoto</Dropdown.Item>
          <Dropdown.Item eventkey="lagos">Lagos</Dropdown.Item>
          <Dropdown.Item eventkey="la-paz">La Paz</Dropdown.Item>
          <Dropdown.Item eventkey="las-palmas-de-gran-canaria">
            Las Palmas de Gran Canaria
          </Dropdown.Item>
          <Dropdown.Item eventkey="las-vegas">Las Vegas</Dropdown.Item>
          <Dropdown.Item eventkey="lausanne">Lausanne</Dropdown.Item>
          <Dropdown.Item eventkey="leeds">Leeds</Dropdown.Item>
          <Dropdown.Item eventkey="leipzig">Leipzig</Dropdown.Item>
          <Dropdown.Item eventkey="lille">Lille</Dropdown.Item>
          <Dropdown.Item eventkey="lima">Lima</Dropdown.Item>
          <Dropdown.Item eventkey="lisbon">Lisbon</Dropdown.Item>
          <Dropdown.Item eventkey="liverpool">Liverpool</Dropdown.Item>
          <Dropdown.Item eventkey="ljubljana">Ljubljana</Dropdown.Item>
          <Dropdown.Item eventkey="london">London</Dropdown.Item>
          <Dropdown.Item eventkey="los-angeles">Los Angeles</Dropdown.Item>
          <Dropdown.Item eventkey="louisville">Louisville</Dropdown.Item>
          <Dropdown.Item eventkey="luxembourg">Luxembourg</Dropdown.Item>
          <Dropdown.Item eventkey="lviv">Lviv</Dropdown.Item>
          <Dropdown.Item eventkey="lyon">Lyon</Dropdown.Item>
          <Dropdown.Item eventkey="madison">Madison</Dropdown.Item>
          <Dropdown.Item eventkey="madrid">Madrid</Dropdown.Item>
          <Dropdown.Item eventkey="malaga">Malaga</Dropdown.Item>
          <Dropdown.Item eventkey="malmo">Malmo</Dropdown.Item>
          <Dropdown.Item eventkey="managua">Managua</Dropdown.Item>
          <Dropdown.Item eventkey="manchester">Manchester</Dropdown.Item>
          <Dropdown.Item eventkey="manila">Manila</Dropdown.Item>
          <Dropdown.Item eventkey="marseille">Marseille</Dropdown.Item>
          <Dropdown.Item eventkey="medellin">Medellin</Dropdown.Item>
          <Dropdown.Item eventkey="melbourne">Melbourne</Dropdown.Item>
          <Dropdown.Item eventkey="memphis">Memphis</Dropdown.Item>
          <Dropdown.Item eventkey="mexico-city">Mexico City</Dropdown.Item>
          <Dropdown.Item eventkey="miami">Miami</Dropdown.Item>
          <Dropdown.Item eventkey="milan">Milan</Dropdown.Item>
          <Dropdown.Item eventkey="milwaukee">Milwaukee</Dropdown.Item>
          <Dropdown.Item eventkey="minneapolis-saint-paul">
            Minneapolis-Saint Paul
          </Dropdown.Item>
          <Dropdown.Item eventkey="minsk">Minsk</Dropdown.Item>
          <Dropdown.Item eventkey="montevideo">Montevideo</Dropdown.Item>
          <Dropdown.Item eventkey="montreal">Montreal</Dropdown.Item>
          <Dropdown.Item eventkey="moscow">Moscow</Dropdown.Item>
          <Dropdown.Item eventkey="mumbai">Mumbai</Dropdown.Item>
          <Dropdown.Item eventkey="munich">Munich</Dropdown.Item>
          <Dropdown.Item eventkey="nairobi">Nairobi</Dropdown.Item>
          <Dropdown.Item eventkey="nantes">Nantes</Dropdown.Item>
          <Dropdown.Item eventkey="naples">Naples</Dropdown.Item>
          <Dropdown.Item eventkey="nashville">Nashville</Dropdown.Item>
          <Dropdown.Item eventkey="new-orleans">New Orleans</Dropdown.Item>
          <Dropdown.Item eventkey="new-york">New York</Dropdown.Item>
          <Dropdown.Item eventkey="nice">Nice</Dropdown.Item>
          <Dropdown.Item eventkey="nicosia">Nicosia</Dropdown.Item>
          <Dropdown.Item eventkey="oklahoma-city">Oklahoma City</Dropdown.Item>
          <Dropdown.Item eventkey="omaha">Omaha</Dropdown.Item>
          <Dropdown.Item eventkey="orlando">Orlando</Dropdown.Item>
          <Dropdown.Item eventkey="osaka">Osaka</Dropdown.Item>
          <Dropdown.Item eventkey="oslo">Oslo</Dropdown.Item>
          <Dropdown.Item eventkey="ottawa">Ottawa</Dropdown.Item>
          <Dropdown.Item eventkey="oulu">Oulu</Dropdown.Item>
          <Dropdown.Item eventkey="oxford">Oxford</Dropdown.Item>
          <Dropdown.Item eventkey="palo-alto">Palo Alto</Dropdown.Item>
          <Dropdown.Item eventkey="panama">Panama</Dropdown.Item>
          <Dropdown.Item eventkey="paris">Paris</Dropdown.Item>
          <Dropdown.Item eventkey="perth">Perth</Dropdown.Item>
          <Dropdown.Item eventkey="philadelphia">Philadelphia</Dropdown.Item>
          <Dropdown.Item eventkey="phnom-penh">Phnom Penh</Dropdown.Item>
          <Dropdown.Item eventkey="phoenix">Phoenix</Dropdown.Item>
          <Dropdown.Item eventkey="phuket">Phuket</Dropdown.Item>
          <Dropdown.Item eventkey="pittsburgh">Pittsburgh</Dropdown.Item>
          <Dropdown.Item eventkey="portland-me">Portland, ME</Dropdown.Item>
          <Dropdown.Item eventkey="portland-or">Portland, OR</Dropdown.Item>
          <Dropdown.Item eventkey="porto">Porto</Dropdown.Item>
          <Dropdown.Item eventkey="porto-alegre">Porto Alegre</Dropdown.Item>
          <Dropdown.Item eventkey="prague">Prague</Dropdown.Item>
          <Dropdown.Item eventkey="providence">Providence</Dropdown.Item>
          <Dropdown.Item eventkey="quebec">Quebec</Dropdown.Item>
          <Dropdown.Item eventkey="quito">Quito</Dropdown.Item>
          <Dropdown.Item eventkey="raleigh">Raleigh</Dropdown.Item>
          <Dropdown.Item eventkey="reykjavik">Reykjavik</Dropdown.Item>
          <Dropdown.Item eventkey="richmond">Richmond</Dropdown.Item>
          <Dropdown.Item eventkey="riga">Riga</Dropdown.Item>
          <Dropdown.Item eventkey="rio-de-janeiro">
            Rio De Janeiro
          </Dropdown.Item>
          <Dropdown.Item eventkey="riyadh">Riyadh</Dropdown.Item>
          <Dropdown.Item eventkey="rochester">Rochester</Dropdown.Item>
          <Dropdown.Item eventkey="rome">Rome</Dropdown.Item>
          <Dropdown.Item eventkey="rotterdam">Rotterdam</Dropdown.Item>
          <Dropdown.Item eventkey="saint-petersburg">
            Saint Petersburg
          </Dropdown.Item>
          <Dropdown.Item eventkey="salt-lake-city">
            Salt Lake City
          </Dropdown.Item>
          <Dropdown.Item eventkey="san-antonio">San Antonio</Dropdown.Item>
          <Dropdown.Item eventkey="san-diego">San Diego</Dropdown.Item>
          <Dropdown.Item eventkey="san-francisco-bay-area">
            San Francisco Bay Area
          </Dropdown.Item>
          <Dropdown.Item eventkey="san-jose">San Jose</Dropdown.Item>
          <Dropdown.Item eventkey="san-juan">San Juan</Dropdown.Item>
          <Dropdown.Item eventkey="san-luis-obispo">
            San Luis Obispo
          </Dropdown.Item>
          <Dropdown.Item eventkey="san-salvador">San Salvador</Dropdown.Item>
          <Dropdown.Item eventkey="santiago">Santiago</Dropdown.Item>
          <Dropdown.Item eventkey="santo-domingo">Santo Domingo</Dropdown.Item>
          <Dropdown.Item eventkey="sao-paulo">Sao Paulo</Dropdown.Item>
          <Dropdown.Item eventkey="sarajevo">Sarajevo</Dropdown.Item>
          <Dropdown.Item eventkey="saskatoon">Saskatoon</Dropdown.Item>
          <Dropdown.Item eventkey="seattle">Seattle</Dropdown.Item>
          <Dropdown.Item eventkey="seoul">Seoul</Dropdown.Item>
          <Dropdown.Item eventkey="seville">Seville</Dropdown.Item>
          <Dropdown.Item eventkey="shanghai">Shanghai</Dropdown.Item>
          <Dropdown.Item eventkey="singapore">Singapore</Dropdown.Item>
          <Dropdown.Item eventkey="skopje">Skopje</Dropdown.Item>
          <Dropdown.Item eventkey="sofia">Sofia</Dropdown.Item>
          <Dropdown.Item eventkey="st-louis">St. Louis</Dropdown.Item>
          <Dropdown.Item eventkey="stockholm">Stockholm</Dropdown.Item>
          <Dropdown.Item eventkey="stuttgart">Stuttgart</Dropdown.Item>
          <Dropdown.Item eventkey="sydney">Sydney</Dropdown.Item>
          <Dropdown.Item eventkey="taipei">Taipei</Dropdown.Item>
          <Dropdown.Item eventkey="tallinn">Tallinn</Dropdown.Item>
          <Dropdown.Item eventkey="tampa-bay-area">
            Tampa Bay Area
          </Dropdown.Item>
          <Dropdown.Item eventkey="tampere">Tampere</Dropdown.Item>
          <Dropdown.Item eventkey="tartu">Tartu</Dropdown.Item>
          <Dropdown.Item eventkey="tashkent">Tashkent</Dropdown.Item>
          <Dropdown.Item eventkey="tbilisi">Tbilisi</Dropdown.Item>
          <Dropdown.Item eventkey="tehran">Tehran</Dropdown.Item>
          <Dropdown.Item eventkey="tel-aviv">Tel Aviv</Dropdown.Item>
          <Dropdown.Item eventkey="the-hague">The Hague</Dropdown.Item>
          <Dropdown.Item eventkey="thessaloniki">Thessaloniki</Dropdown.Item>
          <Dropdown.Item eventkey="tokyo">Tokyo</Dropdown.Item>
          <Dropdown.Item eventkey="toronto">Toronto</Dropdown.Item>
          <Dropdown.Item eventkey="toulouse">Toulouse</Dropdown.Item>
          <Dropdown.Item eventkey="tunis">Tunis</Dropdown.Item>
          <Dropdown.Item eventkey="turin">Turin</Dropdown.Item>
          <Dropdown.Item eventkey="turku">Turku</Dropdown.Item>
          <Dropdown.Item eventkey="uppsala">Uppsala</Dropdown.Item>
          <Dropdown.Item eventkey="utrecht">Utrecht</Dropdown.Item>
          <Dropdown.Item eventkey="valencia">Valencia</Dropdown.Item>
          <Dropdown.Item eventkey="valletta">Valletta</Dropdown.Item>
          <Dropdown.Item eventkey="vancouver">Vancouver</Dropdown.Item>
          <Dropdown.Item eventkey="victoria">Victoria</Dropdown.Item>
          <Dropdown.Item eventkey="vienna">Vienna</Dropdown.Item>
          <Dropdown.Item eventkey="vilnius">Vilnius</Dropdown.Item>
          <Dropdown.Item eventkey="warsaw">Warsaw</Dropdown.Item>
          <Dropdown.Item eventkey="washington-dc">
            Washington, D.C.
          </Dropdown.Item>
          <Dropdown.Item eventkey="wellington">Wellington</Dropdown.Item>
          <Dropdown.Item eventkey="winnipeg">Winnipeg</Dropdown.Item>
          <Dropdown.Item eventkey="wroclaw">Wroclaw</Dropdown.Item>
          <Dropdown.Item eventkey="yerevan">Yerevan</Dropdown.Item>
          <Dropdown.Item eventkey="zagreb">Zagreb</Dropdown.Item>
          <Dropdown.Item eventkey="zurich">Zurich</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

class CompareCityDisplay extends React.Component {
  state = {
    cityName: "San Francisco",
    city:
      "https://api.teleport.org/api/urban_areas/slug:san-francisco-bay-area/"
  };
  getData = async cityName => {
    let urbanUrl = await onCitySubmit(cityName);
    this.setState({ city: urbanUrl });
  };
  onClick = e => {
    this.setState({ cityName: e.target.innerText });
    this.getData(e.target.innerText);
  };

  render() {
    return (
      <div className="card-container">
        <DropdownItems onClick={this.onClick} />
        <SelectedCityInfo
          datatype={this.props.datatype}
          selectedIndex={this.props.selectedIndex}
          cityName={this.state.cityName}
          city={this.state.city}
        />
      </div>
    );
  }
}
export default CompareCityDisplay;
