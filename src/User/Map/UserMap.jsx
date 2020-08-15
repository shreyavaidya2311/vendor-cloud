import React, { Component } from "react";
import { Map, TileLayer } from "react-leaflet";
import L from "leaflet";
import * as ELG from "esri-leaflet-geocoder";

const southWest = L.latLng(-89.98155760646617, -180);
const northEast = L.latLng(89.99346179538875, 180);
const bounds = L.latLngBounds(southWest, northEast);

export default class UserMap extends Component {
  componentDidMount() {
    const map = this.leafletMap.leafletElement;
    new ELG.Geosearch().addTo(map);
    new ELG.geocode()
      .text("Mont Vert Finesse")
      .run(function (err, results, response) {
        if (err) {
          console.log(err);
          return;
        }
        console.log(results);
      });
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
      </Map>
    );
  }
}
