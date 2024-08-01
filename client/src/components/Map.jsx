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
      map.setView(position, 13);
      L.marker(position, {
        icon: customIcon,
      })
        .addTo(map)
        .bindPopup(
          position[0] === 52.384227814645946 &&
            position[1] === 4.903017836026885
            ? "Hack Your Future"
            : "Your current location",
        )
        .openPopup();
    }
  }, [position, map]);
  return null;
};

CurrentLocation.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default function Map() {
  const [locations, setLocations] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(null);
  const [error, setError] = useState(null);

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
          setError(`Failed to parse JSON: ${jsonError.message}`);
        }
      } catch (error) {
        setError("Failed to load locations. Please try again later.");
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const defaultPosition = [52.384227814645946, 4.903017836026885]; // Hack Your Future

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition([
            position.coords.latitude,
            position.coords.longitude,
          ]);
        },
        () => {
          setCurrentPosition(defaultPosition);
        },
      );
    } else {
      setCurrentPosition(defaultPosition);
    }
  }, []);

  return (
    <>
      {error && <div className="error-message">{error}</div>}
      <MapContainer
        center={currentPosition || [52.384227814645946, 4.903017836026885]}
        zoom={currentPosition ? 13 : 13}
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
