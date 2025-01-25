import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./map.css";

interface MapComponentProps {
    title: string;
    coordinates: string;
}

const customIcon = new L.Icon({
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

const MapUpdater: React.FC<{ coordinates: [number, number] }> = ({ coordinates }) => {
    const map = useMap();

    useEffect(() => {
        map.setView(coordinates, map.getZoom());
    }, [coordinates, map]);

    return null;
};

const MapComponent: React.FC<MapComponentProps> = ({ coordinates, title }) => {
    const position: [number, number] = coordinates
        .split(",")
        .map((coord: string) => parseFloat(coord.trim())) as [number, number];

    return (
        <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={false}
            className="map-container"
        >
            <MapUpdater coordinates={position} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position} icon={customIcon}>
                <Popup>
                    {title}
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;