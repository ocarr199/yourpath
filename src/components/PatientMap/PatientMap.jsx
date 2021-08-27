// ⬇ What dependencies we need to import
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

export default function PatientMap(patient) {
  // ⬇ What variables we need to declare
  const dispatch = useDispatch();
  const location = useLocation();
  const currentLocation = location.pathname;
  const [selected, setSelected] = useState(null);
  let mapContainerStyle = {};
  // ⬇ What we are grabbing from the redux store
  const patientMap = useSelector((store) => store.patient.patientMap);

  if (currentLocation.includes("/recommendation")) {
    mapContainerStyle = {
      width: "85vw",
      height: "50vh",
      margin: "auto"
    };
  } else {
    mapContainerStyle = {
      width: "45vw",
      height: "50vh",
    };
  }

  useEffect(() => {
    dispatch({ type: "FETCH_PATIENT_MAP", payload: patient });
  }, [patient]);

  // ⬇ google maps api
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return "Error loading map";
  if (!isLoaded) return "Loading Map";

  const center = {
    lat: 46.15,
    lng: -94.196,
  };

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={center}
        // options={options}
      >
        {patientMap.map((marker) => (
          <Marker
            position={{ lat: marker?.geo.lat, lng: marker?.geo.lng }}
            onClick={() => {
              setSelected(marker);
            }}
          />
        ))}

        {selected ? (
          <InfoWindow
            position={selected.geo}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <p>{selected.program}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}
