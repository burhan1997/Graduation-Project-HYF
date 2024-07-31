import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Map.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";

// Create custom icon
const customIcon = new L.Icon({
  iconUrl: "assets/placeholder.png",
  iconSize: [38, 38],
});

// Custom cluster icon
const createClusterCustomIcon = (cluster) => {
  return new L.divIcon({
    html: `<span class="cluster-icon">${cluster.getChildCount()}</span>`,
    className: "custom-marker-cluster",
    iconSize: L.point(33, 33, true),
  });
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
        const response = await fetch("http://localhost:3000/api/user");
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`,
          );
        }

        const text = await response.text();
        try {
          const data = JSON.parse(text);

          const users = data.users;
          if (!users || users.length === 0) {
            throw new Error("No users found in the response");
          }

          const locationArray = users
            .filter((user) => user.location && user.location.length > 0)
            .map((user) => ({
              name: `${user.firstName} ${user.lastName}`,
              city: user.location[0].city,
              latitude: user.location[0].latitude,
              longitude: user.location[0].longitude,
            }));

          setLocations(locationArray);
        } catch (jsonError) {
          throw new Error(`Failed to parse JSON: ${jsonError.message}`);
        }
      } catch (error) {
        setError("Failed to load locations. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        (error) => {
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
      </MapContainer>
    </>
  );
}
