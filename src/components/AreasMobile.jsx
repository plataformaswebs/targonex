import React, { useMemo } from "react";
import { Box, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

const clients = [
  { name: "Little Caesars", image: "/little-caesars.png" },
  { name: "Under Pizza", image: "/under-pizza.png" },
  { name: "Melt Pizza", image: "/melt-pizza.png" },
  { name: "Krispy Kreme", image: "/krispy-kreme.png" },
];

function ClientTile({ client }) {
  const [src, setSrc] = React.useState(client.image);

  return (
    <Box
      sx={{
        width: { xs: 190, sm: 210 },
        flex: "0 0 auto",
        borderRadius: 4,
        background: "linear-gradient(180deg, rgba(255,255,255,0.98), rgba(246,248,250,0.95))",
        border: "1px solid rgba(17,33,42,0.08)",
        boxShadow: "0 16px 28px rgba(0,0,0,0.12)",
        px: 2,
        py: 2.2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <Box
        component="img"
        src={src}
        alt={client.name}
        onError={() => setSrc("/logo-targonex.jpeg")}
        sx={{
          width: 150,
          height: 150,
          objectFit: "contain",
          filter: "drop-shadow(0 10px 16px rgba(0,0,0,0.12))",
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
        py: 3,
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
            mb: 2,
            pt: 1,
          }}
        >
          <Box
            component="img"
            src="/logo-targonex.jpeg"
            alt="Targonex"
            sx={{
              width: { xs: 240, sm: 280 },
              maxWidth: "100%",
              height: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 18px 32px rgba(0,0,0,0.18))",
            }}
          />
          <Typography
            component="h2"
            sx={{
              mt: 2,
              textAlign: "center",
              fontWeight: 900,
              fontSize: { xs: "1.9rem", sm: "2.2rem" },
              lineHeight: 1.05,
              color: "#0b1c24",
              fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
              textTransform: "uppercase",
            }}
          >
            Nuestros Clientes
          </Typography>
        </Box>
      </Container>

      <Box
        sx={{
          position: "relative",
          mt: 1,
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
              <ClientTile client={client} />
            </motion.div>
          ))}
        </motion.div>
      </Box>
    </Box>
  );
}

export default AreasMobile;
