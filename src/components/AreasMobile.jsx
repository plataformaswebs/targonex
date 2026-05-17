import React, { useMemo } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

const clients = [
  { name: "Little Caesars", image: "/little-caesars.png" },
  { name: "Under Pizza", image: "/under-pizza.png" },
  { name: "Melt Pizza", image: "/melt-pizza.png" },
  { name: "Krispy Kreme", image: "/krispy-kreme.png" },
];

function ClientTile({ client, index }) {
  const [src, setSrc] = React.useState(client.image);

  const cardBackgrounds = [
    "linear-gradient(180deg, rgba(245,170,40,0.98), rgba(161,84,0,0.94))",
    "linear-gradient(180deg, rgba(31,111,240,0.96), rgba(17,58,132,0.94))",
    "rgb(245, 0, 21)",
    "linear-gradient(180deg, rgba(180,84,255,0.98), rgba(74,20,140,0.94))",
  ];

  return (
    <Box
      sx={{
        width: { xs: 190, sm: 210 },
        flex: "0 0 auto",
        borderRadius: 5,
        background: cardBackgrounds[index % cardBackgrounds.length],
        border: "1px solid rgba(255,255,255,0.28)",
        boxShadow: "0 10px 18px rgba(0,0,0,0.12)",
        px: 2,
        py: 1.9,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box sx={{ position: "absolute", inset: 0, pointerEvents: "none" }} />
      <Box
        component="img"
        src={src}
        alt={client.name}
        onError={() => setSrc("/melt-pizza.webp")}
        sx={{
          width: index === 2 ? "100%" : 150,
          height: index === 2 ? "100%" : 150,
          objectFit: index === 2 ? "cover" : "contain",
          objectPosition: "center",
          filter: "drop-shadow(0 6px 10px rgba(0,0,0,0.16))",
        }}
      />
    </Box>
  );
}

function AreasMobile() {
  const loopClients = useMemo(() => [...clients, ...clients], []);

  return (
    <Box
      sx={{
        background: 'url("/fondo-18.png") center/cover no-repeat',
        py: { xs: 3.75, sm: 5.25 },
        pb: { xs: 1.75, sm: 3 },
        minHeight: { xs: "450px", sm: "580px" },
        overflow: "hidden",
      }}
    >
      <Container maxWidth={false} sx={{ px: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pt: 1,
            textAlign: "center",
          }}
        >
          <Typography
            component="p"
            sx={{
              mb: 0.8,
              color: "#1f6ff0",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              fontSize: "0.68rem",
              fontWeight: 800,
            }}
          >
            Cobertura técnica
          </Typography>
          <Typography
            component="h2"
            sx={{
              mt: 0,
              textAlign: "center",
              fontWeight: 900,
              fontSize: { xs: "1.95rem", sm: "2.25rem" },
              lineHeight: 1,
              color: "#0b1c24",
              fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
              textTransform: "uppercase",
            }}
          >
            Nuestros Clientes
          </Typography>
          <Typography
            sx={{
              mt: 1,
              maxWidth: 320,
              color: "#53616a",
              fontSize: "0.9rem",
              lineHeight: 1.55,
            }}
          >
            Marcas que confían en una ejecución ordenada, rápida y con respaldo técnico.
          </Typography>
        </Box>
      </Container>

      <Box
        sx={{
          position: "relative",
          mt: 1,
          mb: 0,
          overflow: "hidden",
          width: "100%",
        }}
      >
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 18,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            display: "flex",
            gap: "16px",
            width: "max-content",
            paddingLeft: "16px",
            paddingBottom: "6px",
            willChange: "transform",
          }}
        >
          {loopClients.map((client, index) => (
            <motion.div
              key={`${client.name}-${index}`}
              animate={{
                rotate: [0, index % 2 === 0 ? 2 : -2, 0],
              }}
              transition={{
                duration: 5.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.15,
              }}
              style={{ flex: "0 0 auto" }}
            >
              <ClientTile client={client} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}

export default AreasMobile;
