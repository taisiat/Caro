import React, { useEffect, useRef, useState } from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./CarMap.css";

function CarMap({
  cars,
  highlightedCar,
  mapOptions = {},
  mapEventHandlers = {},
  markerEventHandlers = {},
}) {
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const markers = useRef({});
  const history = useHistory();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const coordsParams = urlParams.get("coords");
  const zoomParams = urlParams.get("zoom");
  const viewportParams = urlParams.get("viewport");

  useEffect(() => {
    if (map) {
      if (coordsParams) {
        const coords = coordsParams
          .split(",")
          .map((coord) => parseFloat(coord));
        const newLatLng = new window.google.maps.LatLng(coords[0], coords[1]);
        map.setCenter(newLatLng);

        if (viewportParams) {
          const bounds = new window.google.maps.LatLngBounds();
          const coords = viewportParams
            .split(",")
            .map((coord) => parseFloat(coord.trim()));

          const west = coords[0];
          const east = coords[1];
          const north = coords[2];
          const south = coords[3];

          bounds.extend(new window.google.maps.LatLng(north, west));
          bounds.extend(new window.google.maps.LatLng(south, east));
          map.fitBounds(bounds);
        } else if (zoomParams) {
          map.setZoom(parseInt(zoomParams));
        } else {
          map.setZoom(15);
        }
      }
    }
  }, [coordsParams, zoomParams, viewportParams, map]);

  useEffect(() => {
    if (map && mapOptions.center) {
      const newCenter = new window.google.maps.LatLng(
        mapOptions.center.lat,
        mapOptions.center.lng
      );
      map.panTo(newCenter);
    }
  }, [map, mapOptions.center]);

  useEffect(() => {
    if (!map) {
      setMap(
        new window.google.maps.Map(mapRef.current, {
          center: {
            lat: 39.24140288621095,
            lng: -119.42514550357927,
          },
          zoom: 5,
          clickableIcons: false,
          ...mapOptions,
        })
      );
    }
  }, [mapRef, map, mapOptions]);

  useEffect(() => {
    if (map) {
      const listeners = Object.entries(mapEventHandlers).map(
        ([event, handler]) =>
          window.google.maps.event.addListener(map, event, (...args) =>
            handler(...args, map)
          )
      );

      return () => listeners.forEach(window.google.maps.event.removeListener);
    }
  }, [map, mapEventHandlers]);

  useEffect(() => {
    if (map) {
      cars.forEach((car) => {
        if (markers.current[car.id]) return;
        const marker = new window.google.maps.Marker({
          map,
          position: new window.google.maps.LatLng(
            parseFloat(car.location[0]),
            parseFloat(car.location[1])
          ),
          label: {
            text: `$${car.dailyRate}`,
            fontWeight: "bold",
            color: "darkslateblue",
          },
          icon: {
            path: `
                M 1,0
                L 2,0
                A 1 1 0 0 1 3,1
                A 1 1 0 0 1 2,2
                L 1,2
                A 1 1 0 0 1 0,1
                A 1 1 0 0 1 1,0
                z
              `,
            fillOpacity: 1,
            fillColor: "white",
            strokeColor: "darkslateblue",
            strokeWeight: 1,
            scale: 15,
            labelOrigin: new window.google.maps.Point(1.5, 1),
            anchor: new window.google.maps.Point(1.5, 1),
          },
        });

        Object.entries(markerEventHandlers).forEach(([event, handler]) => {
          marker.addListener(event, () => handler(car));
        });
        markers.current[car.id] = marker;
      });

      Object.entries(markers.current).forEach(([carId, marker]) => {
        if (cars.some((car) => car.id.toString() === carId)) return;

        marker.setMap(null);
        delete markers.current[carId];
      });
    }
  }, [cars, history, map, markerEventHandlers, location]);

  useEffect(() => {
    Object.entries(markers.current).forEach(([carId, marker]) => {
      const label = marker.getLabel();
      const icon = marker.getIcon();

      if (parseInt(carId) === highlightedCar) {
        marker.setLabel({ ...label, color: "white" });
        marker.setIcon({ ...icon, fillColor: "darkslateblue" });
      } else {
        marker.setLabel({ ...label, color: "darkslateblue" });
        marker.setIcon({ ...icon, fillColor: "white" });
      }
    });
  }, [markers, highlightedCar]);

  return (
    <div ref={mapRef} className="map">
      Map
    </div>
  );
}

function CarMapWrapper(props) {
  return (
    <Wrapper apiKey={process.env.REACT_APP_MAPS_API_KEY}>
      <CarMap {...props} />
    </Wrapper>
  );
}

export default CarMapWrapper;
