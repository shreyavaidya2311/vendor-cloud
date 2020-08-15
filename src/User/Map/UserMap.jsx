import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { Icon } from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import axios from "axios";
import { Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const marker = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [13, 20],
});

class UserMap extends Component {
  state = {
    cdata: null,
    isLoaded: false,
    selectedShop: null,
    address: this.props.auth.user.address,
    category: "",
    pdata: [],
  };

  southWest = L.latLng(
    this.state.address[0].bounds._southWest.lat,
    this.state.address[0].bounds._southWest.lng
  );
  northEast = L.latLng(
    this.state.address[0].bounds._northEast.lat,
    this.state.address[0].bounds._northEast.lng
  );
  bounds = L.latLngBounds(this.southWest, this.northEast);

  componentDidMount() {
    axios
      .get(`http://localhost:5000/api/stores/getStores`)
      .then((res) => this.setState({ cdata: res.data, isLoaded: true }));

    const map = this.leafletMap.leafletElement;
    new ELG.Geosearch().addTo(map);
    setTimeout(map.invalidateSize.bind(map));
  }

  render() {
    return (
      <Map
        center={[34, 74]}
        zoom={14}
        ref={(m) => {
          this.leafletMap = m;
        }}
        minZoom={10}
        maxBounds={this.bounds}
      >
        <TileLayer
          url="https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}"
          attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          accessToken="6AC281bAgEzzbmuK8Cryu0kmxetSuMsWJvzwAs6hesxy5zRTMDY1p7XYlqZNYJlM"
          noWrap
        />

        {this.state.isLoaded &&
          this.state.cdata.map((data, key) => {
            console.log(data);
            return (
              <Marker
                position={[data.addressData[2].lat, data.addressData[2].lng]}
                onClick={() => {
                  this.setState({ selectedShop: key + 1 });
                }}
                icon={marker}
              />
            );
          })}

        {this.state.selectedShop && (
          <>
            <Popup
              position={[
                this.state.cdata[this.state.selectedShop - 1].addressData[2]
                  .lat,
                this.state.cdata[this.state.selectedShop - 1].addressData[2]
                  .lng,
              ]}
              onClose={() => {
                this.setState({ selectedShop: null });
              }}
            >
              <div>
                <Typography variant="overline" style={{ fontSize: "1rem" }}>
                  {this.state.cdata[
                    this.state.selectedShop - 1
                  ].addressData[0].toUpperCase()}
                </Typography>
                <hr />
                <Typography variant="overline">
                  CATEGORY -{" "}
                  {this.state.cdata[
                    this.state.selectedShop - 1
                  ].category.toUpperCase()}
                </Typography>
                <br />
                <Link
                  className="alink"
                  to={{
                    pathname: `/store/${
                      this.state.cdata[this.state.selectedShop - 1]._id
                    }`,
                    state: {
                      name: this.state.cdata[
                        this.state.selectedShop - 1
                      ].addressData[0].toUpperCase(),
                    },
                  }}
                >
                  <Button color="primary">GO TO STORE</Button>
                </Link>
              </div>
            </Popup>
          </>
        )}
      </Map>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  sort: state.sort,
});

export default connect(mapStateToProps)(UserMap);
