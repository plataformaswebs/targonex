import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap, useMapEvent } from "react-leaflet";
import L from "leaflet";

const finalPosition = [-33.4489, -70.6693];
const mapMarkerIcon = L.divIcon({
  className: "golf-map-marker",
  html: `
    <div style="position:relative;width:88px;height:88px;display:flex;align-items:center;justify-content:center;">
      <div style="position:absolute;width:88px;height:88px;border-radius:999px;background:radial-gradient(circle, rgba(31,111,240,0.34) 0%, rgba(31,111,240,0.16) 38%, rgba(59,134,255,0.08) 58%, rgba(31,111,240,0) 74%);animation:golfMarkerPulse 2.2s ease-in-out infinite;"></div>
      <div style="position:absolute;width:58px;height:58px;border-radius:999px;background:linear-gradient(180deg, rgba(255,255,255,0.96), rgba(244,249,255,0.98));box-shadow:0 12px 24px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(31,111,240,0.14);display:flex;align-items:center;justify-content:center;">
        <img src="/candado.png" alt="Targonex" style="width:32px;height:32px;object-fit:contain;display:block;" />
      </div>
    </div>
  `,
  iconSize: [88, 88],
  iconAnchor: [44, 44],
  popupAnchor: [0, -44],
});

function Contacto() {
  const sectionRef = useRef(null);
  const [shouldZoom, setShouldZoom] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldZoom(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={sectionRef}
      sx={{
        width: "100%",
        height: { xs: "42vh", md: "56vh" },
        minHeight: { xs: "42vh", md: "56vh" },
        position: "relative",
        overflow: "hidden",
        mt: "-1px",
      }}
    >
      <Box
        component="style"
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes golfMarkerPulse {
              0%, 100% { transform: scale(0.9); opacity: 0.55; }
              50% { transform: scale(1.12); opacity: 1; }
            }
          `,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: { xs: 12, md: 18 },
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1000,
          background: "rgba(5, 12, 18, 0.58)",
          border: "1px solid rgba(255,255,255,0.18)",
          borderRadius: "18px",
          px: { xs: 1.7, md: 2.3 },
          py: { xs: 0.7, md: 0.9 },
          backdropFilter: "blur(10px)",
          boxShadow: "0 14px 28px rgba(0,0,0,0.18)",
          textAlign: "center",
        }}
      >
        <Typography
          component="h2"
          sx={{
            color: "#ffffff",
            fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
            fontWeight: 900,
            fontSize: { xs: "1.02rem", md: "1.38rem" },
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textShadow: "0 4px 18px rgba(0,0,0,0.65)",
            textAlign: "center",
            lineHeight: 1,
          }}
        >
          Contáctanos
        </Typography>
        <Typography
          component="p"
          sx={{
            margin: "4px 0 0",
            color: "rgba(255,255,255,0.72)",
            fontSize: { xs: "0.62rem", md: "0.7rem" },
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            lineHeight: 1.1,
          }}
        >
          Santiago y cobertura nacional
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 999,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(4,10,16,0.28) 0%, rgba(4,10,16,0.06) 18%, rgba(4,10,16,0) 36%, rgba(4,10,16,0) 64%, rgba(4,10,16,0.08) 82%, rgba(4,10,16,0.26) 100%)",
        }}
      />
      <MapContainer
        center={finalPosition}
        zoom={10}
        style={{ width: "100%", height: "100%" }}
        scrollWheelZoom={false}
        dragging={false}
        touchZoom={false}
        doubleClickZoom={false}
        boxZoom={false}
        keyboard={false}
        zoomControl={false}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={finalPosition} icon={mapMarkerIcon} />
        <MapZoomController active={shouldZoom} />
        <MapClickHandler />
      </MapContainer>
    </Box>
  );
}

const MapZoomController = ({ active }) => {
  const map = useMap();

  useEffect(() => {
    if (!active) return;
    map.flyTo(finalPosition, 13, {
      duration: 2.4,
      easeLinearity: 0.22,
    });
  }, [active, map]);

  return null;
};

const MapClickHandler = () => {
  useMapEvent("click", () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${finalPosition[0]},${finalPosition[1]}`;
    window.open(googleMapsUrl, "_blank");
  });

  return null;
};

export default Contacto;
