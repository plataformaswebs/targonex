import { useEffect, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import EngineeringRoundedIcon from "@mui/icons-material/EngineeringRounded";
import { motion } from "framer-motion";
import "./css/Hero.css";

const highlights = [
  {
    icon: <BuildRoundedIcon />,
    title: "Servicio\ntécnico\nespecializado",
  },
  {
    icon: <VerifiedRoundedIcon />,
    title: "Atención\nrápida\ny confiable",
  },
  {
    icon: <GroupsRoundedIcon />,
    title: "Experiencia\nen grandes\nempresas",
  },
  {
    icon: <EngineeringRoundedIcon />,
    title: "Seguridad\ny calidad\ngarantizada",
  },
];

function FadeInText({ text, active }) {
  const lines = text.split("\n");

  return (
    <Box component="span" sx={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      {lines.map((line, index) => (
        <Box
          key={`${text}-${index}-${line}`}
          component={motion.span}
          initial={{ opacity: 0, y: 10 }}
          animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            delay: active ? index * 0.08 : 0,
            duration: 0.28,
            ease: [0.22, 1, 0.36, 1],
          }}
          sx={{
            display: "block",
            color: "inherit",
            font: "inherit",
            lineHeight: "inherit",
            letterSpacing: "inherit",
            textShadow: "inherit",
            whiteSpace: "nowrap",
          }}
        >
          {line}
        </Box>
      ))}
    </Box>
  );
}

function Hero({ informationsRef, setVideoReady }) {
  const [heroReveal, setHeroReveal] = useState(false);

  useEffect(() => {
    if (setVideoReady) setVideoReady(true);
  }, [setVideoReady]);

  useEffect(() => {
    const timer = window.setTimeout(() => setHeroReveal(true), 250);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <Box
      className="hero-landing"
      sx={{
        backgroundImage:
          "linear-gradient(90deg, rgba(1, 4, 8, 0.94) 0%, rgba(1, 4, 8, 0.88) 34%, rgba(1, 4, 8, 0.42) 66%, rgba(1, 4, 8, 0.18) 100%), url('/fondo.avif')",
        pt: { xs: "128px", md: 0 },
        pb: { xs: "44px", md: 0 },
        minHeight: { xs: "auto", md: "100vh" },
        height: { xs: "auto", md: "100vh" },
      }}
    >
      <Container
        maxWidth="xl"
        className="hero-landing__container"
        sx={{ maxWidth: { md: "1320px !important" } }}
      >
        <Box className={`hero-landing__panel ${heroReveal ? "hero-landing__panel--revealed" : ""}`}>
          <Typography
            component="h1"
            className="hero-landing__title"
            sx={{
              fontSize: { xs: "2.1rem !important", sm: "2.55rem !important", md: "4.45rem !important" },
              lineHeight: { xs: "0.9 !important", md: "0.84 !important" },
              fontWeight: "900 !important",
              letterSpacing: "-0.055em !important",
              fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif !important',
              textTransform: "uppercase",
              "& span": {
                display: "block",
                whiteSpace: "nowrap",
              },
            }}
          >
            <span>Soluciones técnicas</span>
            <span>e industriales</span>
          </Typography>

          <Typography
            component="p"
            className="hero-landing__subtitle"
            sx={{
              mt: { xs: "18px !important", md: "24px !important" },
            }}
          >
            Para empresas y sector público
          </Typography>

          <Typography
            component="p"
            className="hero-landing__description"
            sx={{
              mt: { xs: "24px !important", md: "30px !important" },
            }}
          >
            Especialistas en mantención industrial, reparación de maquinaria gastronómica, electricidad, ingeniería y obras civiles.
          </Typography>

          <Box className="hero-landing__highlights">
            {highlights.map((item, index) => (
              <Box key={item.title} className="hero-landing__highlight">
                <Box className={`hero-landing__highlight-icon ${index === 0 ? "is-primary" : ""}`}>
                  {item.icon}
                </Box>
                <Typography component="p" className="hero-landing__highlight-text">
                  <FadeInText text={item.title} active={heroReveal} />
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Hero;
