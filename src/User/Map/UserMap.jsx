import React, { Component } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import { Icon } from "leaflet";
import * as ELG from "esri-leaflet-geocoder";
import axios from "axios";

const southWest = L.latLng(-89.98155760646617, -180);
const northEast = L.latLng(89.99346179538875, 180);
const bounds = L.latLngBounds(southWest, northEast);

const corona = new Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [13, 20],
});

export default class UserMap extends Component {
  state = {
    cdata: [],
    selectedShop: null,
  };

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_BACKEND_ROUTE}/api/stores/getStores`)
      .then((res) => this.setState({ cdata: res.data }));

    const map = this.leafletMap.leafletElement;
    new ELG.Geosearch().addTo(map);
    setTimeout(map.invalidateSize.bind(map));
    map.on("drag", function () {
      map.panInsideBounds(bounds, { animate: false });
    });
  }

  render() {
    return (
      <Map
        center={[34, 74]}
        zoom={3}
        ref={(m) => {
          this.leafletMap = m;
        }}
        minZoom={3}
      >
        <TileLayer
          url="https://{s}.tile.jawg.io/jawg-sunny/{z}/{x}/{y}{r}.png?access-token={accessToken}"
          attribution='<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          accessToken={process.env.REACT_APP_MAP_API}
        />

        {this.state.cdata.map((data, key) => {
          return (
            <Marker
              position={[data.addressData[2].lat, data.addressData[2].lng]}
              onclick={() => {
                this.setState({ selectedShop: key });
              }}
              icon={corona}
            />
          );
        })}

        {this.state.selectedShop && (
          <>
            <Popup
              position={[
                this.state.cdata[this.state.selectedShop].addressData[2].lat,
                this.state.cdata[this.state.selectedShop].addressData[2].lng,
              ]}
              onclose={() => {
                this.setState({ selectedShop: null });
              }}
            >
              <div>Hello</div>
            </Popup>
          </>
        )}
      </Map>
    );
  }
}
