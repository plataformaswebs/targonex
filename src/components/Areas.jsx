import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

const metrics = [
  {
    value: "30",
    suffix: "+",
    label: "Proyectos ejecutados",
  },
  {
    value: "48",
    suffix: "+",
    label: "Clientes atendidos",
  },
  {
    value: "250",
    suffix: "+",
    label: "Servicios ejecutados",
  },
];

const clients = [
  { name: "Little Caesars", image: "/little-caesars.png" },
  { name: "Under Pizza", image: "/under-pizza.png" },
  { name: "Melt Pizza", image: "/melt-pizza.webp" },
  { name: "Krispy Kreme", image: "/krispy-kreme.png" },
];

function MetricCard({ metric, index, isVisible }) {
  const targetValue = Number.parseInt(metric.value, 10) || 0;
  const [count, setCount] = useState(0);
  const displayValue = metric.suffix ? `${count}${metric.suffix}` : `${count}`;

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return undefined;
    }

    setCount(0);
    let rafId = 0;
    let timeoutId = 0;
    let startTime = 0;
    const duration = 2800 + index * 220;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(targetValue * eased));

      if (progress < 1) {
        rafId = window.requestAnimationFrame(step);
      }
    };

    timeoutId = window.setTimeout(() => {
      rafId = window.requestAnimationFrame(step);
    }, 40);

    return () => {
      window.clearTimeout(timeoutId);
      window.cancelAnimationFrame(rafId);
    };
  }, [index, targetValue, isVisible]);

  return (
    <Box
      sx={{
        flex: { xs: "1 1 auto", md: "1 1 0" },
        width: "100%",
        px: { xs: 0.5, md: 0.8 },
        py: { xs: 2.2, md: 2.8 },
        background: "transparent",
        textAlign: "center",
        borderRight: { md: index < metrics.length - 1 ? "1px solid rgba(255,255,255,0.5)" : "none" },
      }}
    >
        <Typography
          sx={{
            position: "relative",
            zIndex: 1,
            color: "#ffffff",
            fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
            fontSize: { xs: "3.5rem", sm: "4.2rem", md: "6rem" },
            lineHeight: 0.9,
            fontWeight: 900,
            letterSpacing: "0.01em",
            whiteSpace: "nowrap",
          }}
        >
          {displayValue}
        </Typography>

        <Typography
          sx={{
            position: "relative",
            zIndex: 1,
            mt: { xs: 0.3, md: 0.7 },
            color: "rgba(255,255,255,0.82)",
            fontSize: { xs: "0.86rem", md: "0.95rem" },
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
          >
          {metric.label}
        </Typography>
    </Box>
  );
}

function MovingCard({ client, index }) {
  const [imageSrc, setImageSrc] = useState(client.image);

  useEffect(() => {
    setImageSrc(client.image);
  }, [client.image]);

  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
        rotate: [0, index % 2 === 0 ? 0.6 : -0.6, 0],
      }}
      transition={{
        duration: 4.8,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.18,
      }}
      style={{
        width: "100%",
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(180deg, rgba(255,255,255,0.97), rgba(248,250,252,0.96))",
          borderRadius: 4,
          border: "1px solid rgba(17,33,42,0.08)",
          boxShadow: "0 18px 38px rgba(0,0,0,0.12)",
          p: { xs: 2, md: 2.5 },
          minHeight: { xs: 210, md: 250 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at top, rgba(31,111,240,0.14), transparent 55%), radial-gradient(circle at bottom right, rgba(59,134,255,0.09), transparent 45%)",
            pointerEvents: "none",
          }}
        />
        <Box
          component="img"
          src={imageSrc}
          alt={client.name}
          onError={() => setImageSrc("/logo-oficial.png")}
          sx={{
            width: { xs: 160, md: 185 },
            height: { xs: 160, md: 185 },
            objectFit: "contain",
            filter: "drop-shadow(0 12px 18px rgba(0,0,0,0.14))",
            position: "relative",
            zIndex: 1,
          }}
        />
        <Typography
          sx={{
            mt: 1.5,
            position: "relative",
            zIndex: 1,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            fontSize: "0.8rem",
            color: "#0b1c24",
            textAlign: "center",
          }}
        >
          {client.name}
        </Typography>
      </Box>
    </motion.div>
  );
}

function Areas() {
  const statsBoxRef = useRef(null);
  const reviewsBoxRef = useRef(null);
  const [statsInView, setStatsInView] = useState(false);
  const [reviewsInView, setReviewsInView] = useState(false);

  useEffect(() => {
    const element = statsBoxRef.current;
    if (!element) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          window.setTimeout(() => setStatsInView(true), 120);
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const element = reviewsBoxRef.current;
    if (!element) {
      return undefined;
    }

    let rafId = 0;
    let activated = false;

    const checkPosition = () => {
      if (activated) {
        return;
      }

      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= viewportHeight * 0.8) {
        activated = true;
        setReviewsInView(true);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };

    const onScroll = () => {
      window.cancelAnimationFrame(rafId);
      rafId = window.requestAnimationFrame(checkPosition);
    };

    checkPosition();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <Box
      className="app-stats"
        sx={{
          background: 'url("/fondo-18.png") center/cover no-repeat',
        py: { xs: 4.5, md: 7 },
        mt: { xs: 0, md: "-36px" },
        position: "relative",
        zIndex: 1,
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        className="app-stats__container"
        sx={{
          px: 0,
          display: "block",
          width: "100%",
        }}
      >
        <Box
          ref={statsBoxRef}
          sx={{
            width: "100%",
            maxWidth: "100%",
            mx: 0,
            mb: { xs: 2.25, md: 4 },
            background: "#2f93ff",
            borderRadius: 0,
            overflow: "hidden",
            boxShadow: "0 18px 36px rgba(0,0,0,0.14)",
            border: "none",
            minHeight: { xs: "auto", md: 265 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              maxWidth: { md: "980px", lg: "1080px", xl: "1140px" },
              mx: "auto",
              minHeight: { md: 265 },
              px: { xs: 0, md: 2 },
              gap: { xs: 0, md: 0 },
            }}
          >
            {metrics.map((metric, index) => (
              <MetricCard key={metric.label} metric={metric} index={index} isVisible={statsInView} />
            ))}
          </Box>
        </Box>
      </Container>

      <Container
        maxWidth={false}
        className={`app-reviews app-section-reveal app-section-reveal--up ${reviewsInView ? "is-visible" : ""}`}
        sx={{
          px: { xs: 2, md: 6, lg: 10 },
          mt: { xs: "18px", md: "-52px" },
          mb: 0,
          position: "relative",
          zIndex: 3,
        }}
        ref={reviewsBoxRef}
      >
        <Box
          className="app-reviews__panel"
          sx={{
            pt: { xs: "20px", md: "34px" },
            pb: { xs: "18px", md: "24px" },
            backgroundColor: "#ffffff",
            maxWidth: "1180px",
            mx: "auto",
            borderRadius: 0,
            boxShadow: "0 18px 36px rgba(0, 0, 0, 0.06)",
            border: "1px solid rgba(17,33,42,0.08)",
          }}
        >
          <Typography
            component="h2"
            sx={{
              textAlign: "center",
              fontWeight: 900,
              fontSize: { xs: "1.9rem", md: "2.7rem" },
              lineHeight: 1.05,
              color: "#0b1c24",
              fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
              mb: 1.5,
            }}
          >
            Nuestros clientes
          </Typography>

          <Typography
            component="p"
            sx={{
              textAlign: "center",
              maxWidth: 820,
              mx: "auto",
              color: "#51606a",
              mb: 3,
              lineHeight: 1.7,
            }}
          >
            Marcas que confían en una ejecución técnica ordenada, soporte en terreno y respuesta profesional para
            mantener su operación en marcha.
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))", lg: "repeat(4, minmax(0, 1fr))" },
              gap: 2,
            }}
          >
            {clients.map((client, index) => (
              <MovingCard key={client.name} client={client} index={index} />
            ))}
          </Box>

          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "#1f6ff0",
                textTransform: "uppercase",
                letterSpacing: "0.12em",
                fontSize: "0.76rem",
                fontWeight: 800,
              }}
            >
              Atención para empresas, cadenas gastronómicas y sector público
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Areas;
