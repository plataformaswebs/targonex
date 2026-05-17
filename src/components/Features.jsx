import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import HandymanRoundedIcon from "@mui/icons-material/HandymanRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import DomainVerificationRoundedIcon from "@mui/icons-material/DomainVerificationRounded";
import { motion } from "framer-motion";
import "./css/Features.css";

const sections = [
  {
    eyebrow: "Núcleo del negocio",
    title: "Reparación y mantención de maquinaria gastronómica industrial",
    titleDesktopLines: [
      "Reparación y mantención",
      "de maquinaria",
      "gastronómica industrial",
    ],
    descriptionDesktopLines: [
      "Atención especializada para cocinas",
      "industriales, líneas de producción y",
      "equipos críticos de cadenas y franquicias.",
      "Reducimos tiempos de detención con",
      "diagnóstico preciso, repuestos adecuados",
      "y soporte en terreno.",
    ],
    description:
      "Atención especializada para cocinas industriales, líneas de producción y equipos críticos de cadenas y franquicias. Reducimos tiempos de detención con diagnóstico preciso, repuestos adecuados y soporte en terreno.",
    image: "/area-1.jpg",
    alt: "Maquinaria gastronómica industrial",
    button: "Solicitar diagnóstico",
    dialogId: "gastronomica",
    icon: <HandymanRoundedIcon />,
    reverse: false,
  },
  {
    eyebrow: "Infraestructura eléctrica",
    title: "Electricidad industrial, instalaciones y mantención técnica",
    description:
      "Desarrollo de instalaciones eléctricas, tableros, correcciones y mantención preventiva y correctiva para operaciones que necesitan continuidad, seguridad y cumplimiento técnico.",
    image: "/area-15.jpg",
    alt: "Electricidad industrial",
    button: "Ver soluciones eléctricas",
    dialogId: "electricidad",
    icon: <BoltRoundedIcon />,
    reverse: false,
  },
  {
    eyebrow: "Obras y territorio",
    title: "Obras civiles, paraderos y servicios para municipalidades",
    description:
      "Ejecución de obras menores, instalación de paraderos, mejoras en infraestructura y trabajos de soporte para empresas y sector público, con foco en orden, plazos y calidad de terminación.",
    image: "/area-2.jpeg",
    alt: "Obras civiles y servicios municipales",
    button: "Conocer cobertura",
    dialogId: "obras",
    icon: <DomainVerificationRoundedIcon />,
    reverse: true,
  },
];

function FeatureDialog({ open, onClose, eyebrow, title, description, images }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "24px",
          overflow: "hidden",
          background: "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,250,251,0.98) 100%)",
          boxShadow: "0 28px 80px rgba(0,0,0,0.22)",
        },
      }}
    >
      <DialogContent sx={{ p: 0 }}>
        <Box
          sx={{
            position: "relative",
            px: { xs: 3, md: 4 },
            py: { xs: 3, md: 4 },
            background:
              "linear-gradient(135deg, rgba(31,111,240,0.12) 0%, rgba(31,111,240,0.05) 55%, rgba(255,255,255,0.9) 100%)",
          }}
        >
          <IconButton
            onClick={onClose}
            sx={{
              position: "absolute",
              top: 14,
              right: 14,
              color: "#18302a",
              backgroundColor: "rgba(255,255,255,0.72)",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.95)" },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>

          <Typography
            component="p"
            sx={{
              m: 0,
              color: "#1f6ff0",
              fontSize: "0.8rem",
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
            }}
          >
            {eyebrow}
          </Typography>

          <Typography
            component="h3"
            sx={{
              mt: 1,
              mb: 1.5,
              color: "#0c1c22",
              fontSize: { xs: "1.8rem", md: "2.2rem" },
              lineHeight: 1.02,
              fontWeight: 900,
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
            }}
          >
            {title}
          </Typography>

          <Typography
            component="p"
            sx={{
              m: 0,
              color: "#5f6f76",
              fontSize: "1rem",
              lineHeight: 1.82,
            }}
          >
            {description}
          </Typography>

          <Box
            sx={{
              mt: 2,
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              gap: 1.5,
            }}
          >
            {images.map((image) => (
              <Box
                key={image}
                component="img"
                src={image}
                alt={title}
                sx={{
                  display: "block",
                  width: "100%",
                  minHeight: { xs: 150, md: 190 },
                  objectFit: "cover",
                  borderRadius: "18px",
                  border: "1px solid rgba(31,60,51,0.12)",
                  boxShadow: "0 14px 24px rgba(0,0,0,0.12)",
                }}
              />
            ))}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function Features() {
  const sectionRefs = useRef([]);
  const [visibleSections, setVisibleSections] = useState([false, false, false]);
  const [openDialog, setOpenDialog] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-feature-index"));
          if (entry.isIntersecting) {
            setVisibleSections((prev) => {
              const next = [...prev];
              next[index] = true;
              return next;
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.28 }
    );

    sectionRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Box className="features-showcase">
      <Container maxWidth="lg" className="features-showcase__container">
        {sections.map((section, index) => (
          <Box
            key={section.title}
            ref={(el) => {
              sectionRefs.current[index] = el;
            }}
            data-feature-index={index}
            className={[
              "features-showcase__secondary",
              "features-showcase__secondary--boxed",
              index === 0 ? "features-showcase__secondary--hero-mobile" : "",
              index === 0 ? "features-showcase__secondary--text-only" : "",
              index === 1 ? "features-showcase__secondary--right-copy" : "",
              index === 2 ? "features-showcase__secondary--lifted" : "",
              section.reverse ? "features-showcase__secondary--reverse" : "",
              visibleSections[index] ? "features-showcase__reveal is-visible" : "features-showcase__reveal",
              section.reverse ? "from-right" : "from-left",
            ].join(" ")}
          >
            {index !== 0 && (
              <Box className="features-showcase__secondary-image-wrap">
                <img
                  src={section.image}
                  alt={section.alt}
                  className="features-showcase__secondary-image features-showcase__secondary-image--full"
                  style={{ maxWidth: "88%", width: index === 1 ? "80%" : "82%", margin: "0 auto", display: "block" }}
                />
              </Box>
            )}

            <Box className="features-showcase__secondary-copy">
              {index !== 0 && section.eyebrow ? (
                <Typography
                  component="p"
                  sx={{
                    color: "#1f6ff0",
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    fontSize: "0.76rem",
                    fontWeight: 800,
                    mb: 1,
                  }}
                >
                  {section.eyebrow}
                </Typography>
              ) : null}

              <Typography
                component="h2"
                className="features-showcase__secondary-title"
                sx={{
                  fontWeight: 900,
                  fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
                  fontSize: { xs: "1.2rem", sm: "1.45rem", md: "1.75rem" },
                  lineHeight: 1.08,
                }}
              >
                {section.titleDesktopLines ? (
                  <>
                    <Box component="span" className="features-showcase__secondary-title-desktop">
                      {section.titleDesktopLines.map((line, lineIndex) => (
                        <Box component="span" key={line} className="features-showcase__secondary-title-line">
                          {index === 0 && lineIndex === 0 ? "#1 " : ""}
                          {line}
                        </Box>
                      ))}
                    </Box>
                    <Box component="span" className="features-showcase__secondary-title-mobile">
                      {index === 0 ? `#1 ${section.title}` : section.title}
                    </Box>
                  </>
                ) : (
                  index === 0 ? `#1 ${section.title}` : section.title
                )}
              </Typography>

              <Typography component="p" className="features-showcase__secondary-description">
                {section.descriptionDesktopLines ? (
                  <>
                    <Box component="span" className="features-showcase__secondary-description-desktop">
                      {section.descriptionDesktopLines.map((line) => (
                        <Box component="span" key={line} className="features-showcase__secondary-description-line">
                          {line}
                        </Box>
                      ))}
                    </Box>
                    <Box component="span" className="features-showcase__secondary-description-mobile">
                      {section.description}
                    </Box>
                  </>
                ) : (
                  section.description
                )}
              </Typography>

              <Button
                className="features-showcase__button"
                variant="contained"
                onClick={() => setOpenDialog(section.dialogId)}
                sx={{
                  minWidth: { xs: "280px", sm: "320px", md: "360px" },
                  height: "54px",
                  borderRadius: "14px",
                  textTransform: "none",
                  fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
                  fontWeight: 700,
                  color: "#fff",
                  background: "linear-gradient(135deg, #2f7cf7, #1f6ff0 45%, #1559cf 85%)",
                  boxShadow: "0 8px 18px rgba(31,111,240,.32)",
                  justifyContent: "center",
                  alignSelf: { xs: "center", md: "flex-start" },
                  maxWidth: { xs: "100%", md: "420px" },
                  border: "2px solid rgba(91, 155, 255, 0.9)",
                }}
              >
                {section.button}
              </Button>
            </Box>
          </Box>
        ))}
      </Container>

      <FeatureDialog
        open={openDialog === "gastronomica"}
        onClose={() => setOpenDialog(null)}
        eyebrow="Maquinaria gastronómica"
        title="Reparación y mantención para cadenas y franquicias"
        description="Diagnosticamos fallas, ejecutamos mantenciones y devolvemos operatividad a equipos críticos de cocinas industriales. Trabajamos con enfoque preventivo, respuesta rápida y soporte técnico confiable para operar sin interrupciones."
        images={["/area-10.jpg", "/area-11.jpg"]}
      />

      <FeatureDialog
        open={openDialog === "electricidad"}
        onClose={() => setOpenDialog(null)}
        eyebrow="Electricidad industrial"
        title="Instalaciones, tableros y continuidad eléctrica"
        description="Diseñamos, corregimos y mantenemos sistemas eléctricos para entornos industriales y comerciales. Priorizamos seguridad, orden de ejecución y continuidad operacional en cada intervención."
        images={["/area-12.jpg", "/area-13.jpg"]}
      />

      <FeatureDialog
        open={openDialog === "obras"}
        onClose={() => setOpenDialog(null)}
        eyebrow="Obras civiles y sector público"
        title="Montaje, paraderos e infraestructura para municipalidades"
        description="Ejecución de obras menores, instalación de elementos urbanos y soporte técnico para proyectos de empresas y municipalidades, con una mirada práctica, ordenada y orientada a resultados."
        images={["/area-14.jpg", "/area-15.jpg"]}
      />
    </Box>
  );
}

export default Features;
