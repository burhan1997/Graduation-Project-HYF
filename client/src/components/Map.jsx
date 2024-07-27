import React, { useEffect } from "react";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// create custom icon
const customIcon = new L.Icon({
  iconUrl: "/placeholder.png",
  iconSize: [38, 38], // size of the icon
});

// custom cluster icon
const createClusterCustomIcon = (cluster) => {
  return new L.divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: L.point(33, 33, true),
  });
};

// markers
const markers = [
  { geocode: [48.86, 2.3522], popUp: "Hello, I am pop up 1" },
  { geocode: [48.85, 2.3522], popUp: "Hello, I am pop up 2" },
  { geocode: [48.855, 2.34], popUp: "Hello, I am pop up 3" },
];

// Geocoder Component
const LeafletGeocoder = () => {
  const map = useMap();
  useEffect(() => {
    L.Control.geocoder({
      defaultMarkGeocode: false,
    })
      .on("markgeocode", (e) => {
        const latlng = e.geocode.center;
        L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
        map.fitBounds(e.geocode.bbox);
      })
      .addTo(map);
  }, [map]);
  return null;
};

// Routing Machine Component
const LeafletRoutingMachine = () => {
  const map = useMap();
  useEffect(() => {
    const marker1 = L.marker([48.8566, 2.3522], { icon: customIcon }).addTo(
      map,
    );
    map.on("click", (e) => {
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      L.Routing.control({
        waypoints: [
          L.latLng(48.8566, 2.3522),
          L.latLng(e.latlng.lat, e.latlng.lng),
        ],
        lineOptions: {
          styles: [{ color: "blue", weight: 4, opacity: 0.7 }],
        },
        routeWhileDragging: false,
        geocoder: L.Control.Geocoder.nominatim(),
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: true,
      })
        .on("routesfound", (e) => {
          e.routes[0].coordinates.forEach((c, i) => {
            setTimeout(() => {
              marker1.setLatLng([c.lat, c.lng]);
            }, 1000 * i);
          });
        })
        .addTo(map);
    });
  }, [map]);
  return null;
};

export default function Map() {
  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={13}
      className="leaflet-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterCustomIcon}
      >
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      <LeafletGeocoder />
      <LeafletRoutingMachine />
    </MapContainer>
  );
}
