import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  Typography,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Box,
  useTheme,
  useMediaQuery, Dialog, DialogTitle, DialogContent
} from "@mui/material";
import { Menu as MenuIcon, Home, Mail, Close } from "@mui/icons-material"; // Agregamos Close para la "X"
import StorefrontIcon from "@mui/icons-material/Storefront";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { motion, AnimatePresence } from "framer-motion";
import { keyframes } from "@emotion/react";
import ViewListIcon from '@mui/icons-material/ViewList';
import GroupsIcon from '@mui/icons-material/Groups';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import "@fontsource/poppins";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import CloseIcon from "@mui/icons-material/Close";
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { useLocation } from 'react-router-dom';


const socialData = {
  Instagram: { href: "https://www.instagram.com/rar.a.o/?hl=es-la", Icon: InstagramIcon, bgColor: "linear-gradient(45deg, #cf198c, #f41242)", hoverColor: "#cf198c" },
  Facebook: { href: "https://www.facebook.com/profile.php?id=100063452866880", Icon: FacebookIcon, bgColor: "linear-gradient(45deg, #00B5F5, #002A8F)", hoverColor: "#0077b7" },
  LinkedIn: { href: "https://www.linkedin.com/company/plataformas-web/", Icon: LinkedInIcon, bgColor: "linear-gradient(45deg, #00B5F5, #0077b7)", hoverColor: "#0077b7" }
};

const shrinkCircle = keyframes`0%{transform:scale(1);opacity:1;}100%{transform:scale(0);opacity:0;}`;
const expandIcon = keyframes`0%{transform:scale(1);opacity:1;}100%{transform:scale(1.5);opacity:1;}`;
const rotateTwice = keyframes`from{transform:rotate(0deg);}to{transform:rotate(720deg);}`;

const menuItemVariants = {
  hidden: { x: 60, opacity: 0 },
  visible: (i) => ({ x: 0, opacity: 1, transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" } }),
};

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const bienvenidaVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.2 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, x: 40, transition: { duration: 0.3 } },
};



const SocialButton = ({ href, Icon, bgColor, hoverStyles }) => (
  <Box component="a" href={href} target="_blank" rel="noopener" sx={{
    width: 55, height: 55, borderRadius: "50%", position: "relative", display: "flex",
    alignItems: "center", justifyContent: "center", overflow: "hidden",
    "&:hover .circle": { animation: `${shrinkCircle} 300ms forwards` },
    "&:hover .icon": { animation: `${expandIcon} 300ms forwards`, ...hoverStyles },
  }}>
    <Box className="circle" sx={{
      position: "absolute", width: "100%", height: "100%", borderRadius: "50%",
      background: bgColor, transition: "transform 300ms ease-out",
    }} />
    <Icon className="icon" sx={{
      color: "white", fontSize: 37, position: "absolute",
      transition: "color 300ms ease-in, transform 300ms ease-in",
    }} />
  </Box>
);

const menuItems = [
  { name: "Inicio", icon: <Home /> },
  { name: "Servicios", icon: <ViewListIcon /> },
  { name: "Nosotros", icon: <GroupsIcon /> },
  { name: "Proyectos", icon: <StorefrontIcon /> },
  { name: "Contacto", icon: <Mail /> }
];

const blockedMenuItems = new Set();

function Navbar({ contactoRef, informationsRef, videoReady }) {
  const [open, setOpen] = useState(false), [isScrolled, setIsScrolled] = useState(false), [openPDF, setOpenPDF] = useState(false);
  const theme = useTheme(), isMobile = useMediaQuery(theme.breakpoints.down('sm')), navigate = useNavigate();
  const pdfSrc = `/plataformasweb-pdf.pdf#zoom=${isMobile ? 100 : 60}`;
  const location = useLocation();
  const mostrarAnimacion = videoReady || (location.pathname !== '/' && location.pathname !== '');
  const [animacionMostrada, setAnimacionMostrada] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mostrarAnimacion && !animacionMostrada) {
        setAnimacionMostrada(true); // Forzar SIEMPRE a los 5s
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, []);


  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToRef = (ref, offset = -80) => ref?.current && window.scrollTo({ top: ref.current.getBoundingClientRect().top + window.scrollY + offset, behavior: 'smooth' });
  const handleOpenPDF = () => isMobile ? window.open("/plataformasweb-pdf.pdf", "_blank") : setOpenPDF(true);
  const handleClosePDF = () => setOpenPDF(false);

  const handleClick = (item) => {
    if (item.name === "Proyectos") {
      setOpen(false);
      return;
    }

    setOpen(false);
    const actions = {
      Contacto: () => scrollToRef(contactoRef),
      Inicio: () => location.pathname !== "/" ? navigate("/") : scrollToTop(),
      Servicios: () => navigate("/servicios"),
      Nosotros: () => navigate("/nosotros"),
      Presentation: handleOpenPDF
    };
    actions[item.name]?.();
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LogoInicio = () => (navigate("/"), scrollToTop());

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          left: "50%",
          transform: "translateX(-50%)",
          width: "96%",
          zIndex: 1100,
          borderRadius: "50px",
          overflow: "hidden",
          marginTop: { xs: "8px", md: "15px" },
          transition: "margin-top 0.28s ease",
        }}
      >
        <AppBar
          position="relative"
          sx={{
            backgroundColor: isScrolled ? "rgba(0,0,0,0.8)" : "transparent",
            backdropFilter: isScrolled ? "blur(10px)" : "none",
            boxShadow: "none",
            transition: "all 0.3s ease",
            borderRadius: "50px",
            overflow: "hidden",
          }}
        >
          <Container>
            <Toolbar
              sx={{
                minHeight: { xs: "52px", md: "64px" },
                py: { xs: 0, md: 0 },
                display: "flex",
                alignItems: "center",
                transform: "none",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: "50%", md: "calc(15% + 0%)" },
                  transform: "translateX(-50%)",
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <AnimatePresence mode="wait">
                  {(mostrarAnimacion || animacionMostrada) && (
                    <motion.div
                      key={(mostrarAnimacion ? "mostrar" : "forzado")}
                      initial={{ x: -200, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: 1,
                        delay: mostrarAnimacion ? 1 : 0, // âœ… delay segÃºn si fue forzado o no
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      <motion.img
                        src="/logo-oficial.png"
                        alt="Logo"
                        onClick={LogoInicio}
                        initial={{ scale: 1 }}
                        animate={{ scale: isScrolled ? 0.8 : 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        style={{ height: "38px", marginTop: "6px", cursor: "pointer" }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>



              </Box>

              <Box sx={{ flexGrow: 1 }} />

              <Box sx={{ display: { xs: "none", md: "flex" }, gap: 1 }}>
                {menuItems.map((item, index) => (
                  <Button
                    key={item.name}
                    component={motion.button}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={menuItemVariants}
                    onClick={() => handleClick(item)}
                    disabled={blockedMenuItems.has(item.name)}
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      padding: "10px 14px",
                      background: item.name === "Proyectos"
                        ? "linear-gradient(160deg, #FFE082 0%, #FFC43D 38%, #FFB300 62%, #E68A00 100%)"
                        : "transparent",
                      border: "none",
                      borderRadius: item.name === "Proyectos" ? "999px" : 0,
                      fontWeight: item.name === "Proyectos" ? 800 : 500,
                      color: item.name === "Proyectos" ? "#ffffff" : "white",
                      textShadow: item.name === "Proyectos" ? "0 1px 2px rgba(0,0,0,0.35)" : "none",
                      boxShadow: item.name === "Proyectos"
                        ? "0 0 18px rgba(255, 195, 45, 0.52), 0 8px 20px rgba(120, 72, 0, 0.32)"
                        : "none",
                      opacity: blockedMenuItems.has(item.name) ? 0.38 : 1,
                      "&:hover": {
                        backgroundColor: blockedMenuItems.has(item.name)
                          ? "transparent"
                          : item.name === "Proyectos"
                            ? undefined
                            : "rgba(255, 255, 255, 0.1)",
                        transform: item.name === "Proyectos" ? "scale(1.04)" : "none",
                        filter: item.name === "Proyectos" ? "brightness(1.08)" : "none",
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                ))}

              </Box>

              <IconButton color="inherit" edge="end" onClick={() => setOpen(!open)} sx={{ display: { xs: "block", md: "none" } }}>
                <motion.div
                  initial={{ x: 200, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <MenuIcon />
                </motion.div>
              </IconButton>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>

      {/* MenÃº mÃ³vil */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": {
            display: "flex",
            flexDirection: "column",
            height: "100dvh",
            width: { xs: '80vw', sm: '60vw', md: '50vw' },
            maxWidth: '700px',
            minWidth: '300px',
            background: `
        linear-gradient(180deg, rgba(8,8,8,0.82), rgba(18,18,18,0.76)),
        radial-gradient(circle at 20% 18%, rgba(255,255,255,0.045) 0%, transparent 34%),
        radial-gradient(circle at 82% 80%, rgba(255,255,255,0.035) 0%, transparent 40%)`,
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            color: '#ffffff',
            boxShadow: '0 0 30px rgba(0, 0, 0, 0.6)',
            borderLeft: '1px solid rgba(255,255,255,0.05)',
            p: 0,
          },
        }}
      >

        <Box sx={{ overflowY: 'auto', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 0.5 }}>
            <IconButton
              aria-label="Abrir menÃº"
              onClick={() => setOpen(false)}
              sx={{
                animation: open ? `${rotateTwice} 1s ease-in-out` : "none",
              }}
            >
              <Close sx={{ fontSize: 32, color: "white" }} />
            </IconButton>
          </Box>


          {/* ðŸ“‹ MenÃº navegaciÃ³n */}
          <AnimatePresence mode="wait">
            {open && (
              <motion.ul
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={listVariants}
                style={{ listStyle: "none", padding: 0, margin: 0, width: "100%" }}
              >
                {menuItems.map((item, index) => (
                  <ListItem
                    key={item.name}
                    component={motion.li}
                    variants={itemVariants}
                    disablePadding
                  >
                    <ListItemButton
                      onClick={() => handleClick(item)}
                      disabled={blockedMenuItems.has(item.name)}
                      sx={{
                        px: 2,
                        py: 0.5,
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                        borderTop: index === 0 ? "1px solid rgba(255,255,255,0.2)" : "none",
                        ...(item.name === "Proyectos" && {
                          fontWeight: 800,
                          borderRadius: 2,
                          mx: 1,
                          my: 0.5,
                          position: "relative",
                          overflow: "hidden",
                          color: "#fff",
                          textShadow: "0 1px 2px rgba(0,0,0,0.45)",
                          border: "2px solid rgba(255, 230, 120, 0.95)",
                          background:
                            "linear-gradient(160deg, #FFE082 0%, #FFC43D 38%, #FFB300 62%, #E68A00 100%)",
                          boxShadow:
                            "0 0 18px rgba(255, 195, 45, 0.72), 0 8px 20px rgba(120, 72, 0, 0.42), inset 0 2px 6px rgba(255,255,255,0.35), inset 0 -7px 12px rgba(130,80,0,0.28)",
                          "&::before": {
                            content: '""',
                            position: "absolute",
                            top: -28,
                            left: -60,
                            width: 64,
                            height: "165%",
                            background:
                              "linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(255,247,210,0.75) 52%, rgba(255,255,255,0) 100%)",
                            transform: "skewX(-12deg)",
                            animation: "goldSweep 3.1s cubic-bezier(.4,0,.2,1) infinite",
                          },
                          "&::after": {
                            content: '""',
                            position: "absolute",
                            inset: 0,
                            borderRadius: "inherit",
                            background:
                              "radial-gradient(circle at 22% 25%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 44%)",
                            animation: "goldPulse 2.4s ease-in-out infinite",
                            pointerEvents: "none",
                          },
                          "&:hover": {
                            transform: "scale(1.04)",
                            filter: "brightness(1.1)",
                            background:
                              "linear-gradient(160deg, #FFE79A 0%, #FFC94F 35%, #FFB623 62%, #F58B00 100%)",
                            boxShadow:
                              "0 0 26px rgba(255, 210, 85, 0.92), 0 10px 24px rgba(120,72,0,0.54)",
                          },
                        }),
                        opacity: blockedMenuItems.has(item.name) ? 0.38 : 1,
                        "&:hover": {
                          backgroundColor:
                            item.name === "Proyectos"
                              ? undefined
                              : blockedMenuItems.has(item.name)
                                ? "transparent"
                                : "rgba(255,255,255,0.05)",
                        },
                        "@keyframes goldSweep": {
                          "0%": { left: "-70%", opacity: 0 },
                          "28%": { opacity: 0.85 },
                          "55%": { opacity: 0.55 },
                          "100%": { left: "135%", opacity: 0 },
                        },
                        "@keyframes goldPulse": {
                          "0%": { opacity: 0.3 },
                          "50%": { opacity: 0.58 },
                          "100%": { opacity: 0.3 },
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <Box sx={{ color: "#ffffff", fontSize: "1.7rem", marginBottom: "-5px" }}>

                              {item.icon}
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                              <span
                                style={{
                                  color: "#fff",
                                  fontWeight: item.name === "Proyectos" ? "700" : "500",
                                  fontSize: "1.05rem",
                                }}
                              >
                                {item.name}
                              </span>
                            </Box>
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}


              </motion.ul>
            )}
          </AnimatePresence>

          {/* ðŸ§± Espacio flexible para empujar bienvenida y redes al fondo */}
          <Box sx={{ flexGrow: 1 }} />

          <AnimatePresence mode="wait">
            {open && (
              <motion.div
                variants={bienvenidaVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <Box
                  onClick={() => {
                    navigate("/administracion");
                    setOpen(false);
                  }}
                  sx={{
                    background: `
          radial-gradient(circle at top left, rgba(144,202,249,0.1), transparent 70%),
          linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))
        `,
                    borderRadius: 3,
                    px: 2,
                    py: 2,
                    mx: 2,
                    mt: 1,
                    color: "#ffffff",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    boxShadow: "0 0 12px rgba(255,255,255,0.05)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    maxHeight: 45,
                    "&:hover": {
                      backgroundColor: "rgba(255,255,255,0.05)",
                      boxShadow: "0 0 16px rgba(144,202,249,0.2)",
                    },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 600,
                      fontSize: "1rem",
                      letterSpacing: 0.5,
                      textAlign: "center",
                    }}
                  >
                    ⚙️ Administration
                  </Typography>
                </Box>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Redes sociales al final del menÃº mÃ³vil */}
          <AnimatePresence mode="wait">
            {open && (
              <>
                {/* Redes sociales animadas */}

                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={{
                    hidden: {},
                    visible: {
                      transition: {
                        staggerChildren: 0.12,
                        delayChildren: 0.3,
                      },
                    },
                  }}
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "24px",
                    marginBottom: isMobile ? 0 : 90,
                    padding: "20px 0",
                  }}
                >
                  {["Instagram", "Facebook", "LinkedIn"].map((social, index) => {
                    const info = socialData[social];

                    return (
                      <motion.div
                        key={social}
                        variants={{
                          hidden: { opacity: 0, x: 40 },
                          visible: {
                            opacity: 1,
                            x: 0,
                            transition: { duration: 0.5, ease: "easeOut" },
                          },
                          exit: { opacity: 0, x: 30, transition: { duration: 0.3 } },
                        }}
                      >
                        <SocialButton
                          href={info.href}
                          Icon={info.Icon}
                          bgColor={info.bgColor}
                          hoverStyles={{
                            color: info.hoverColor,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        />
                      </motion.div>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </Box>
      </Drawer >
      {/* PDF */}
      <Dialog
        open={openPDF}
        onClose={handleClosePDF}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            backgroundColor: "#f5f7fa",
            color: "#1a1a1a",
            borderRadius: 3,
            boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
            overflow: "hidden",
          }
        }}
        BackdropProps={{
          sx: {
            backgroundColor: "rgba(0,0,0,0.7)"
          }
        }}
        disableScrollLock
      >

        <DialogTitle
          sx={{
            fontWeight: 600,
            fontSize: "1.25rem",
            px: 3,
            py: 2.5,
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            position: "relative",
            background: `linear-gradient(135deg, #e0f2ff 0%, #ffffff 100%)`,
            color: "#1a237e",
          }}
        >
          PresentaciÃ³n Ingsnt.cl - PDF
          <IconButton aria-label="close" onClick={handleClosePDF} sx={{ position: "absolute", right: 12, top: 12, color: "#1a237e" }}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent sx={{ p: 0 }}>
          <Box sx={{ height: { xs: "75vh", sm: "80vh", md: "85vh" }, width: "100%", backgroundColor: "#000", }}>

            <iframe src={pdfSrc} title="PresentaciÃ³n Ingsnt" width="100%" height="100%" style={{ border: 'none' }} />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Navbar;
