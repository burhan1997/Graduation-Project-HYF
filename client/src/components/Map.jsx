import React, { useEffect, useState } from "react";
import { FilterForm } from "./filter/FilterForm";
import PropTypes from "prop-types";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

// Create custom icon
const customIcon = new L.Icon({
  iconUrl: "assets/placeholder.png",
  iconSize: [38, 38], // Size of the icon
});

// Custom cluster icon
const createClusterCustomIcon = (cluster) => {
  return new L.divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: L.point(33, 33, true),
  });
};

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
    const handleMapClick = (e) => {
      L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
      L.Routing.control({
        waypoints: [
          L.latLng(map.getCenter().lat, map.getCenter().lng),
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
      }).addTo(map);
    };

    map.on("click", handleMapClick);

    return () => {
      map.off("click", handleMapClick);
    };
  }, [map]);
  return null;
};

// Current Location Component
const CurrentLocation = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      L.marker(position, {
        icon: new L.Icon({
          iconUrl: "assets/placeholder.png",
          iconSize: [38, 38],
        }),
      })
        .addTo(map)
        .bindPopup("Your current location")
        .openPopup();
      map.setView(position, 13);
    }
  }, [position, map]);
  return null;
};

CurrentLocation.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default function Map() {
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const users = data.users;
        const locationArray = users
          .filter((user) => user.location && user.location.length > 0)
          .map((user) => ({
            name: `${user.firstName} ${user.lastName}`,
            city: user.location[0].city,
            latitude: user.location[0].latitude,
            longitude: user.location[0].longitude,
          }));
        setLocations(locationArray);
      } catch (error) {
        setError("Failed to load locations. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Get the current position
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
          // Handling different error cases
          switch (error.code) {
            case error.PERMISSION_DENIED:
              setError("User denied the request for Geolocation.");
              break;
            case error.POSITION_UNAVAILABLE:
              setError("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              setError("The request to get user location timed out.");
              break;
            case error.UNKNOWN_ERROR:
              setError("An unknown error occurred.");
              break;
            default:
              setError("Unable to retrieve your location.");
          }
        },
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      <FilterForm />
      <MapContainer
        center={currentPosition || [0, 0]}
        zoom={currentPosition ? 13 : 2}
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
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={[location.latitude, location.longitude]}
              icon={customIcon}
            >
              <Popup>
                {location.name} - {location.city}
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>

        {currentPosition && <CurrentLocation position={currentPosition} />}
        <LeafletGeocoder />
        <LeafletRoutingMachine />
      </MapContainer>
    </>
  );
}
