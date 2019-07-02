import React from "react";
import ReactDOM from "react-dom";
import ReactStreetview from "react-streetview";

// const apikey = process.env.REACT_APP_STREET_VIEW_API_KEY;

class StreetView extends React.Component {
  render() {
    const lat = this.props.location["latitude"];
    const lng = this.props.location["longitude"];
    const googleMapsApiKey = apikey;

    const streetViewPanoramaOptions = {
      position: { lat: lat ? lat : 46.9171876, lng: lng ? lng : 17.8951832 },
      pov: { heading: 100, pitch: 0 },
      zoom: 1
    };

    return (
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h2>Google Street View</h2>
          </div>
          <div className="card-text mx-auto d-flex justify-content-center">
            <div
              style={{
                width: "800px",
                height: "450px",
                backgroundColor: "#eeeeee"
              }}
            >
              <ReactStreetview
                apiKey={googleMapsApiKey}
                streetViewPanoramaOptions={streetViewPanoramaOptions}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default StreetView;
