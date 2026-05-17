import { Box, Typography, Grid, Container, useTheme, useMediaQuery, Card, CardContent } from "@mui/material";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Nosotros = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [scrollY, setScrollY] = useState(0);
  const [subrayadoActivo, setSubrayadoActivo] = useState(false);

  const letterVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: 0.4 + i * 0.1 },
    }),
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    if (isMobile) {
      const handleScroll = () => setScrollY(window.scrollY);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isMobile]);

  useEffect(() => {
    const t = setTimeout(() => setSubrayadoActivo(true), 1000);
    return () => clearTimeout(t);
  }, []);

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        minHeight: "100vh",
        width: "100%",
        py: 14,
        px: 0,
        pb: 3.5,
        position: "relative",
        overflow: "hidden",
        backgroundImage: "url(/fondo-blizz.avif)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          background: "rgba(0, 0, 0, 0.18)",
          pointerEvents: "none",
        },
      }}
    >
      <Box textAlign="center" mb={4} sx={{ position: "relative", zIndex: 1 }}>
        <Typography
          variant={isMobile ? "h5" : "h3"}
          fontWeight={700}
          sx={{
            color: "white",
            display: "inline-flex",
            position: "relative",
            fontSize: { xs: "1.8rem", sm: "2.1rem", md: "2.4rem" },
            letterSpacing: "0.02em",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: -2,
              left: 0,
              width: subrayadoActivo ? "100%" : "0%",
              height: "3px",
              borderRadius: "3px",
              background: "linear-gradient(90deg, #FF9800, #F57C00)",
              transition: "width 0.6s ease-out",
            },
          }}
        >
          {"Nosotros".split("").map((char, index) => (
            <motion.span key={index} custom={index} variants={letterVariants} initial="hidden" animate="visible">
              {char}
            </motion.span>
          ))}
        </Typography>
      </Box>

      <Box maxWidth="1200px" mx="auto" sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box px={{ xs: 2, sm: 0 }}>
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <Card sx={{ backgroundColor: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", borderRadius: 3, p: 2 }}>
                  <CardContent>
                    <Typography variant="h5" color="white" gutterBottom>
                      Soluciones tecnicas e industriales
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#ccc", textAlign: "justify", mb: 2 }}>
                      Especialistas en mantencion industrial, reparacion de maquinaria gastronomica, electricidad,
                      ingenieria y obras civiles para empresas y sector publico.
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#ccc", textAlign: "justify", mb: 2 }}>
                      Entregamos un servicio tecnico especializado, rapido y confiable, con foco en continuidad operativa,
                      seguridad y calidad garantizada.
                    </Typography>

                    <Typography variant="body2" sx={{ color: "#ccc", textAlign: "justify" }}>
                      Acompañamos cada proyecto con evaluacion en terreno, diagnostico claro y respuestas concretas para
                      mantener la operacion en marcha.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <Box textAlign="center">
                <img
                  src="/logo-oficial.png"
                  alt="Targonex"
                  style={{ maxWidth: isMobile ? "83%" : "100%", height: "auto" }}
                />
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          width: "100vw",
          position: "relative",
          mt: 4,
          mb: 4,
          py: 4,
          backgroundImage: "url(/fondo-3.avif)",
          backgroundSize: "cover",
          backgroundPosition: isMobile ? `center ${scrollY * 0.3}px` : "center",
          backgroundAttachment: isMobile ? "scroll" : "fixed",
          textAlign: "right",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          "::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.55)",
            zIndex: 1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ width: "100%", px: 2, position: "relative", zIndex: 2 }}>
          <Typography
            variant={isMobile ? "h6" : "h4"}
            fontWeight={600}
            sx={{
              color: "white",
              textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
              textAlign: "right",
            }}
          >
            Impulsamos la <span style={{ color: "#ffe037" }}>continuidad</span> de tu operacion
          </Typography>
        </Container>
      </Box>

      <Box maxWidth="1200px" mx="auto" mt={2} sx={{ position: "relative", zIndex: 1 }}>
        <Grid container spacing={3} alignItems="flex-start">
          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(10px)",
                  p: 0,
                  mt: isMobile ? -3 : 0,
                }}
              >
                <img
                  src="/mision-empresa.png"
                  alt="Mision corporativa"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              </Box>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box px={{ xs: 2, sm: 0 }}>
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <Card sx={{ backgroundColor: "rgba(255,255,255,0.05)", backdropFilter: "blur(10px)", borderRadius: 3, p: 3 }}>
                  <CardContent>
                    <Typography variant="h5" color="white" gutterBottom>
                      Mision
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ccc", textAlign: "left", mb: 3 }}>
                      Resolver con rapidez y criterio tecnico las necesidades de mantencion, reparacion y soporte en terreno,
                      cuidando la continuidad de la operacion.
                    </Typography>

                    <Typography variant="h5" color="white" gutterBottom>
                      Vision
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#ccc", textAlign: "left" }}>
                      Ser un aliado confiable para empresas y sector publico, reconocido por su respuesta agil, seguridad y
                      calidad garantizada.
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Nosotros;
