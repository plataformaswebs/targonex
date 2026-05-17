import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Container, Dialog, DialogContent, IconButton, Typography } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import "./css/Informations.css";

function DetailDialog({ open, onClose, eyebrow, title, description, image, reverse = false }) {
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
              "linear-gradient(135deg, rgba(59,134,255,0.12) 0%, rgba(31,111,240,0.05) 55%, rgba(255,255,255,0.9) 100%)",
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
              lineHeight: 1,
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
            component={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            sx={{
              mt: 2,
              display: "grid",
              gridTemplateColumns: reverse ? "1fr" : "repeat(1, minmax(0, 1fr))",
            }}
          >
            <Box
              component="img"
              src={image}
              alt={title}
              sx={{
                display: "block",
                width: "100%",
                height: { xs: 230, md: 300 },
                objectFit: "cover",
                borderRadius: "18px",
                border: "1px solid rgba(31,60,51,0.12)",
                boxShadow: "0 14px 24px rgba(0,0,0,0.12)",
              }}
            />
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

function Informations() {
  const sectionOneRef = useRef(null);
  const sectionThreeRef = useRef(null);
  const [sectionOneInView, setSectionOneInView] = useState(false);
  const [sectionThreeInView, setSectionThreeInView] = useState(false);
  const [openDialog, setOpenDialog] = useState(null);

  const { ref: sectionTwoRef, inView: sectionTwoInView } = useInView({
    triggerOnce: true,
    threshold: 0.22,
    rootMargin: "0px 0px -8% 0px",
  });
  const { ref: sectionFiveRef, inView: sectionFiveInView } = useInView({
    triggerOnce: true,
    threshold: 0.18,
    rootMargin: "0px 0px -6% 0px",
  });

  useEffect(() => {
    const handleScrollReveal = () => {
      if (!sectionOneInView && sectionOneRef.current) {
        const rect = sectionOneRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.72 && rect.bottom >= window.innerHeight * 0.22) {
          setSectionOneInView(true);
        }
      }

      if (!sectionThreeInView && sectionThreeRef.current) {
        const rect = sectionThreeRef.current.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.72 && rect.bottom >= window.innerHeight * 0.22) {
          setSectionThreeInView(true);
        }
      }
    };

    handleScrollReveal();
    window.addEventListener("scroll", handleScrollReveal, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollReveal);
  }, [sectionOneInView, sectionThreeInView]);

  const gallery = ["/area-10.jpg", "/area-11.jpg", "/area-12.jpg", "/area-13.jpg", "/area-14.jpg", "/area-15.jpg"];
  const galleryLoop = [...gallery, ...gallery];

  return (
    <Box className="tournament-block">
      <Box className="tournament-block__panel tournament-block__panel--full" ref={sectionOneRef}>
        <Container maxWidth="lg" className="tournament-block__container" sx={{ pt: { xs: "18px", md: 0 } }}>
          <Box className={`tournament-block__copy app-section-reveal app-section-reveal--right ${sectionOneInView ? "is-visible" : ""}`}>
            <Typography
              component="h2"
              className="tournament-block__title"
              sx={{
                fontWeight: 900,
                textAlign: "center",
                fontSize: { xs: "1.95rem", sm: "2.3rem", md: "2.8rem" },
                fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
              }}
              >
                <Box component="span" sx={{ display: { xs: "inline", md: "block" } }}>
                INGENIERÍA Y
              </Box>
              <Box component="span" sx={{ display: { xs: "inline", md: "block" } }}>
                DIAGNÓSTICO TÉCNICO
              </Box>
            </Typography>

            <Typography component="p" className="tournament-block__description" sx={{ textAlign: "center", mx: "auto" }}>
              Respondemos con soluciones técnicas claras para empresas, franquicias y sector público. Analizamos, diagnosticamos
              y ejecutamos con foco en continuidad operativa, seguridad y resultados medibles.
            </Typography>

            <Button
              variant="contained"
              className="tournament-block__button"
              sx={{ mt: "32px" }}
              onClick={() => setOpenDialog("ingenieria")}
            >
              Solicitar evaluación
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" className="tournament-block__container">
        <Box
          className={`tournament-block__community app-section-reveal app-section-reveal--left ${sectionTwoInView ? "is-visible" : ""}`}
          ref={sectionTwoRef}
        >
          <Box className="tournament-block__community-image-wrap">
            <img src="/area-16.jpg" alt="Ingeniería industrial" className="tournament-block__community-image" />
          </Box>

          <Box className="tournament-block__community-copy">
            <Typography
              component="h2"
              className="tournament-block__community-title"
              sx={{
                fontWeight: 900,
                fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
                fontSize: { xs: "2rem", sm: "2.25rem", md: "2.7rem" },
              }}
            >
              ELECTRICIDAD INDUSTRIAL
            </Typography>

            <Typography component="p" className="tournament-block__community-description">
              Instalaciones eléctricas, tableros, correcciones y mantención preventiva para instalaciones que no pueden detenerse.
              Diseñamos soluciones seguras y ordenadas para operaciones exigentes.
            </Typography>

            <Button variant="contained" className="tournament-block__button" onClick={() => setOpenDialog("electricidad")}>
              Coordinar visita
            </Button>
          </Box>
        </Box>
      </Container>

      <Box className="tournament-block__premium tournament-block__premium--full" ref={sectionThreeRef}>
        <Container
          maxWidth={false}
          className="tournament-block__container tournament-block__container--premium"
          sx={{ px: { xs: 3, md: 6, lg: 10 } }}
        >
          <Box
            className={`tournament-block__premium-inner app-section-reveal app-section-reveal--right ${sectionThreeInView ? "is-visible" : ""}`}
            sx={{ px: { xs: 1, md: 10, lg: 14 } }}
          >
            <Box className="tournament-block__premium-visual">
              <Box component="img" src="/area-8.jpg" alt="Mantención técnica" className="tournament-block__premium-image" />
            </Box>

            <Box className="tournament-block__premium-content">
              <Box className="tournament-block__premium-copy">
                <Typography
                  component="h2"
                  className="tournament-block__premium-title"
                  sx={{
                    fontWeight: 900,
                    textAlign: { xs: "center", md: "right" },
                    fontSize: { xs: "2rem", sm: "2.35rem", md: "2.05rem" },
                    fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
                    whiteSpace: "normal",
                    maxWidth: { md: "420px" },
                    ml: { md: "auto" },
                    lineHeight: 1.02,
                    mb: "8px",
                  }}
                >
                  MANTENCIÓN PREVENTIVA Y CORRECTIVA
                </Typography>

                <Typography
                  component="p"
                  className="tournament-block__premium-description"
                  sx={{ textAlign: { xs: "center", md: "right" }, mx: { xs: "auto", md: 0 } }}
                >
                  Planes de mantención para asegurar disponibilidad, reducir fallas y prolongar la vida útil de equipos y
                  sistemas. Ejecutamos correcciones en terreno con criterio técnico y trazabilidad.
                </Typography>
              </Box>

              <Box className="tournament-block__premium-action">
                <Button variant="contained" className="tournament-block__button" onClick={() => setOpenDialog("mantencion") }>
                  Ver plan de mantenimiento
                </Button>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
      <Box
        className="tournament-block__premium tournament-block__premium--full"
        ref={sectionFiveRef}
        sx={{
          background: "#ffffff",
        }}
      >
        <Container maxWidth={false} className="tournament-block__container tournament-block__container--premium" sx={{ px: { xs: 3, md: 6, lg: 10 } }}>
          <Box
            className={`tournament-block__premium-inner app-section-reveal app-section-reveal--left ${sectionFiveInView ? "is-visible" : ""}`}
            sx={{ px: { xs: 0, md: 0 }, alignItems: "stretch" }}
          >
            <Box className="tournament-block__premium-copy" />
            <Box className="tournament-block__premium-action" sx={{ pr: { md: "56px", lg: "84px" }, pl: { md: "56px", lg: "84px" } }} />
          </Box>

          <Box
            sx={{
              mt: 0,
              pt: 0,
              pb: 2.5,
              overflow: "hidden",
              borderRadius: "28px",
              background: "transparent",
              border: "none",
              boxShadow: "none",
              px: { xs: 2, md: 3 },
            }}
          >
            <Box
              sx={{
                maxWidth: "860px",
                mx: "auto",
                px: { xs: 0, md: 2 },
                textAlign: "center",
                mb: 2.5,
              }}
            >
              <Typography
                sx={{
                  color: "#1f6ff0",
                  textTransform: "uppercase",
                  letterSpacing: "0.18em",
                  fontSize: "0.72rem",
                  fontWeight: 800,
                  mb: 1,
                }}
              >
                Respaldo en terreno
              </Typography>

              <Typography
                component="h3"
                sx={{
                  color: "#09161d",
                  fontSize: { xs: "1.45rem", sm: "1.85rem", md: "2.2rem" },
                  lineHeight: 1.08,
                  fontWeight: 900,
                  letterSpacing: "0.01em",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Cobertura visual y respaldo de terreno
              </Typography>

              <Typography
                sx={{
                  color: "#60707a",
                  fontSize: { xs: "0.94rem", md: "0.98rem" },
                  lineHeight: 1.72,
                  maxWidth: "720px",
                  mx: "auto",
                }}
              >
                Registros de proyectos, instalación y soporte técnico en terreno que muestran orden de ejecución, presencia
                operativa y respaldo real para empresas y municipalidades.
              </Typography>
            </Box>

            <Box sx={{ overflow: "hidden", pb: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  width: "max-content",
                  animation: "targonex-gallery-marquee-reverse 30s linear infinite",
                  "&:hover": { animationPlayState: "paused" },
                }}
              >
                {galleryLoop.map((image, index) => (
                  <Box
                    key={`${image}-${index}`}
                    component="img"
                    src={image}
                    alt="Cobertura tÃ©cnica"
                    sx={{
                      width: { xs: 178, md: 230 },
                      height: { xs: 118, md: 146 },
                      flex: "0 0 auto",
                      objectFit: "cover",
                      borderRadius: 3.5,
                      border: "none",
                      boxShadow: "none",
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Typography
              sx={{
                color: "#1f6ff0",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontSize: "0.72rem",
                fontWeight: 800,
                textAlign: "center",
                mt: 1.75,
              }}
            >
              Galería técnica
            </Typography>
          </Box>
        </Container>
      </Box>

      <DetailDialog
        open={openDialog === "ingenieria"}
        onClose={() => setOpenDialog(null)}
        eyebrow="Ingeniería y diagnóstico"
        title="Evaluación técnica en terreno"
        description="Revisamos instalaciones, equipos y necesidades de operación para entregar una propuesta técnica clara, priorizada y aterrizada al presupuesto y a los plazos reales del cliente."
        image="/area-10.jpg"
      />

      <DetailDialog
        open={openDialog === "electricidad"}
        onClose={() => setOpenDialog(null)}
        eyebrow="Electricidad industrial"
        title="Continuidad eléctrica y seguridad operativa"
        description="Atención de tableros, circuitos e instalaciones, con correcciones en terreno para mantener la operación segura, ordenada y conforme a los requerimientos del proyecto."
        image="/area-11.jpg"
      />

      <DetailDialog
        open={openDialog === "mantencion"}
        onClose={() => setOpenDialog(null)}
        eyebrow="Mantención técnica"
        title="Planes preventivos y correctivos"
        description="Diseñamos mantenciones que reducen fallas, anticipan detenciones y ayudan a extender la vida útil de equipos e instalaciones industriales."
        image="/area-12.jpg"
      />

      <DetailDialog
        open={openDialog === "obras"}
        onClose={() => setOpenDialog(null)}
        eyebrow="Obras civiles"
        title="Servicios para municipalidades y empresas"
        description="Ejecutamos obras menores, instalaciones urbanas, paraderos y trabajos de terreno con estÃ¡ndares de orden, calidad y seguimiento tÃ©cnico."
        image="/area-14.jpg"
      />
    </Box>
  );
}

export default Informations;
