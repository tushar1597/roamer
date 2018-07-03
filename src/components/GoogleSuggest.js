import PropTypes from "prop-types"
import React from "react"
import $ from 'jquery';
import ReactGoogleMapLoader from "react-google-maps-loader"
import ReactGooglePlacesSuggest from "react-google-places-suggest"
import "../styles/googleSuggestStyle.css"
const API_KEY = "AIzaSyB8X9GiDl-mPD1j0K6lTEiMhs3D8axW53U"
class GoogleSuggest extends React.Component {
  state = {
    search: "",
    value: "",
  }

  handleInputChange(e) {
    this.setState({search: e.target.value, value: e.target.value})
  }
//this function is called when any location is selected..
  handleSelectSuggest(suggest) {
    console.log(suggest)
    document.getElementById('add-location-id').innerHTML=suggest.formatted_address;
    //$('#google-place-suggest-id').val = '';
    $('#addContentModal').modal('toggle');

    this.setState({search: "", value: suggest.formatted_address})
  }

  render() {
    const {search, value} = this.state
    return (
      <ReactGoogleMapLoader
        params={{
          key: API_KEY,
          libraries: "places,geocode",
        }}
        render={googleMaps =>
          googleMaps && (
            <div className="search-box-container">
            <i className="fa fa-search search-icon"></i>
              <ReactGooglePlacesSuggest
                autocompletionRequest={{input: search}}
                googleMaps={googleMaps}
                onSelectSuggest={this.handleSelectSuggest.bind(this)}
              >
                <input
                  id="google-place-suggest-id"
                  className="google-searchbox"
                  autoFocus={true}
                  type="text"
                  value={value}
                  placeholder="Search"
                  onChange={this.handleInputChange.bind(this)}
                />
              </ReactGooglePlacesSuggest>
            </div>
          )
        }
      />
    )
  }
}

GoogleSuggest.propTypes = {
  googleMaps: PropTypes.object,
}

export default GoogleSuggest
