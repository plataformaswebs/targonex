import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import { CssBaseline, Box, IconButton, useMediaQuery, Snackbar, Alert } from "@mui/material";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import "@fontsource/poppins";
const Areas = lazy(() => import("./components/Areas"));
const AreasMobile = lazy(() => import("./components/AreasMobile"));
const Informations = lazy(() => import("./components/Informations"));
const Contacto = lazy(() => import("./components/Contacto"));
const Evidencias = lazy(() => import("./components/Evidencias"));
const Evidencias2 = lazy(() => import("./components/Evidencias2"));
const Footer = lazy(() => import("./components/Footer"));
const Navbar = lazy(() => import("./components/Navbar"));

import { WhatsApp as WhatsAppIcon, ArrowUpward as ArrowUpwardIcon } from "@mui/icons-material";
import { useLocation, Outlet } from "react-router-dom";
import Cargando from './components/Cargando';
import { AnimatePresence, motion } from 'framer-motion';
import "./components/css/App.css";
import { initGoogleAnalytics, trackPageView } from "./helpers/HelperAnalytics.js"; //GOOGLE ANALYTICS
import { safeStorageGet, safeStorageSet } from "./utils/storage";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContacto, setShowContacto] = useState(false);
  const [showArrow, setShowArrow] = useState(false);
  const [openBubble, setOpenBubble] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const contactoRef = useRef(null);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const informationsRef = useRef(null);
  const location = useLocation();
  const [videoReady, setVideoReady] = useState(false);
  const isHome = ["/", "/inicio", ""].includes(location.pathname);
  const [showApp, setShowApp] = useState(false);
  const [snackbarVersion, setSnackbarVersion] = useState({ open: false, version: "", });
  const [assetVersion, setAssetVersion] = useState("");

  const [shouldAnimateInformations, setShouldAnimateInformations] = useState(false);
  const triggerInformations = (value) => setShouldAnimateInformations(value);
  const [hasSeenInformations, setHasSeenInformations] = useState(false);
  const [isFading, setIsFading] = useState(false);

  //EFECTO CAMBIAR DE RUTA
  useEffect(() => {
    setIsFading(true);
    const timer = setTimeout(() => setIsFading(false), 400);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  //GOOGLE ANALYTICS
  useEffect(() => {
    initGoogleAnalytics(); // solo una vez
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search); // en cada cambio de ruta
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const areasSection = document.getElementById("areas-section");
      if (areasSection) {
        const rect = areasSection.getBoundingClientRect();
        setShowContacto(rect.top < window.innerHeight * 0.5);
      }
      setShowArrow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenBubble(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (openBubble) {
      const timer = setTimeout(() => {
        setOpenBubble(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [openBubble]);

  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUserInteraction = () => {
    setHasInteracted(true);
  };

  //location.pathname
  useEffect(() => {
    if (location.pathname === "/") {
      // Ejecutar lógica cuando se vuelva a la ruta de inicio
    }
  }, [location.pathname]);

  // ⏳ CARGANDO
  useEffect(() => {

    if (["/dashboard", "/administracion"].includes(location.pathname)) {
      setShowApp(true);
      return;
    }

    let minListo = false;

    const requiereVideo = ["/", "/inicio", ""].includes(location.pathname);

    const minTimeout = setTimeout(() => {
      minListo = true;
      if (!requiereVideo || videoReady) {
        setShowApp(true);
      }
    }, 1500); // mínimo visible

    const maxTimeout = setTimeout(() => {
      setShowApp(true); // fuerza mostrar app
    }, 4000); // máximo espera

    return () => {
      clearTimeout(minTimeout);
      clearTimeout(maxTimeout);
    };
  }, [videoReady, location.pathname]);

  //LIBERAR CARGANDO
  useEffect(() => {
    const body = document.body;
    const html = document.documentElement;

    if (!showApp) {
      body.classList.add('no-scroll');
      html.classList.add('no-scroll');
    } else {
      body.classList.remove('no-scroll');
      html.classList.remove('no-scroll');
    }

    return () => {
      body.classList.remove('no-scroll');
      html.classList.remove('no-scroll');
    };
  }, [showApp]);


  //LIMPIAR CACHE
  useEffect(() => {
    const appendVersionToUrl = (url, version) => {
      if (!url || !version) return url;
      if (/^(blob:|data:|https?:|mailto:|tel:)/i.test(url)) return url;

      try {
        const parsed = new URL(url, window.location.origin);
        if (parsed.origin !== window.location.origin) return url;
        if (parsed.pathname === "/version.json") return url;
        parsed.searchParams.set("v", version);
        return `${parsed.pathname}${parsed.search}${parsed.hash}`;
      } catch {
        return url;
      }
    };

    const checkVersionAndClearCache = async () => {
      try {
        const response = await fetch("/version.json", {
          cache: "no-store",
          headers: {
            "Cache-Control": "no-store",
            "Pragma": "no-cache"
          }
        });

        const data = await response.json();
        const storedVersion = safeStorageGet(() => localStorage, "app_version");
        const currentVersion = data.version;
        setAssetVersion(currentVersion);

        if (!storedVersion) {
          safeStorageSet(() => localStorage, "app_version", currentVersion);
          safeStorageSet(() => sessionStorage, "asset_version", currentVersion);
          return;
        }

        if (storedVersion !== currentVersion) {
          console.log("🆕 Nueva versión detectada. Limpiando caché...");
          console.log("🗂️ Versión anterior:", storedVersion);
          console.log("📄 Versión nueva:", currentVersion);

          setSnackbarVersion({ open: true, version: currentVersion }); // tu Snackbar, si usas uno

          setTimeout(async () => {
            // 🧹 Eliminar todas las caches
            const cacheNames = await caches.keys();
            await Promise.all(cacheNames.map(name => caches.delete(name)));
            console.log("✅ Caches eliminadas:", cacheNames);

            // 🧹 Eliminar todos los Service Workers
            if ("serviceWorker" in navigator) {
              const registrations = await navigator.serviceWorker.getRegistrations();
              for (const registration of registrations) {
                await registration.unregister();
                console.log("🧹 Service Worker eliminado");
              }
            }

            // 💾 Actualizar versión guardada
            safeStorageSet(() => localStorage, "app_version", currentVersion);
            safeStorageSet(() => sessionStorage, "asset_version", currentVersion);

            // 🔁 Recarga completa desde el servidor (no solo pathname)
            window.location.replace(
              appendVersionToUrl(
                window.location.pathname + window.location.search + window.location.hash,
                currentVersion
              )
            );
          }, 1500);
        } else {
          safeStorageSet(() => sessionStorage, "asset_version", currentVersion);
          console.log("✅ App actualizada. Versión:", currentVersion);
        }
      } catch (err) {
        console.warn("⚠️ No se pudo verificar la versión:", err);
      }
    };

    checkVersionAndClearCache();
  }, []);

  useEffect(() => {
    const activeVersion = assetVersion || safeStorageGet(() => sessionStorage, "asset_version");
    if (!activeVersion) return undefined;

    const versionizeAttr = (element, attr) => {
      const currentValue = element.getAttribute(attr);
      if (!currentValue) return;
      if (/^(blob:|data:|https?:|mailto:|tel:)/i.test(currentValue)) return;

      try {
        const parsed = new URL(currentValue, window.location.origin);
        if (parsed.origin !== window.location.origin) return;
        if (parsed.pathname === "/version.json") return;

        parsed.searchParams.set("v", activeVersion);
        const nextValue = `${parsed.pathname}${parsed.search}${parsed.hash}`;
        if (currentValue !== nextValue) {
          element.setAttribute(attr, nextValue);
        }
      } catch {
        // ignorar URLs no parseables
      }
    };

    const versionizeNode = (node) => {
      if (!(node instanceof HTMLElement)) return;

      if (node.matches?.("img[src], video[src], source[src]")) {
        versionizeAttr(node, "src");
      }
      if (node.matches?.("video[poster]")) {
        versionizeAttr(node, "poster");
      }

      node.querySelectorAll?.("img[src], video[src], source[src]").forEach((element) => {
        versionizeAttr(element, "src");
      });
      node.querySelectorAll?.("video[poster]").forEach((element) => {
        versionizeAttr(element, "poster");
      });
    };

    versionizeNode(document.body);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => versionizeNode(node));

        if (
          mutation.type === "attributes" &&
          mutation.target instanceof HTMLElement &&
          (mutation.attributeName === "src" || mutation.attributeName === "poster")
        ) {
          versionizeNode(mutation.target);
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["src", "poster"],
    });

    return () => observer.disconnect();
  }, [assetVersion]);


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {/* Pantalla de carga */}
      <AnimatePresence>
        {!showApp && location.pathname !== "/dashboard" && location.pathname !== "/administracion" && location.pathname !== "/configurar-servicios" && (
          <>
            <motion.div key="cargando" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 9999, }}>
              <Cargando />
            </motion.div>

            {/* Snackbar como overlay global */}
            <Snackbar open={snackbarVersion.open} autoHideDuration={1400} anchorOrigin={{ vertical: "top", horizontal: "center" }} sx={{ zIndex: 20000 }}>
              <Alert
                severity="info"
                icon={false}
                sx={{
                  width: "100%",
                  fontSize: "0.9rem",
                  boxShadow: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center", // ✅ centra horizontalmente el contenido
                  justifyContent: "center",
                  textAlign: "center",  // ✅ centra el texto
                }}
              >
                <Box>
                  ✅ Nueva versión disponible: {snackbarVersion.version}
                  <br />
                  🔄 Actualizando...
                </Box>
              </Alert>
            </Snackbar>

          </>
        )}
      </AnimatePresence>

      {/* Contenido principal, oculto mientras se carga */}
      <Box sx={{ visibility: showApp ? "visible" : "hidden", pointerEvents: showApp ? "auto" : "none", overflowX: 'hidden' }}>
        {/* Navbar solo si no estás en /administracion */}
        {location.pathname !== "/administracion" && (
          <Suspense fallback={null}>
            <Navbar contactoRef={contactoRef} informationsRef={informationsRef} videoReady={videoReady} />
          </Suspense>
        )}

        {/* Transición entre páginas */}
        <Box sx={{ position: "relative" }}>
          <Outlet context={{ showApp, informationsRef }} />
          {isFading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "fixed",
                inset: 0,
                background: "#11737C",
                zIndex: 2000
              }}
            />
          )}
        </Box>

        {/* Secciones visibles solo en la página de inicio */}
        {["/", ""].includes(location.pathname) && (
          <>
            <Suspense fallback={null}>
              <Box id="areas-section">
                {isMobile ? <AreasMobile /> : <Areas />}
              </Box>
            </Suspense>

            <Suspense fallback={null}>
              <div ref={informationsRef}>
                <Informations
                  informationsRef={informationsRef}
                  triggerInformations={triggerInformations}
                  setHasSeenInformations={setHasSeenInformations}
                />
              </div>
            </Suspense>

            <Suspense fallback={null}>
              <Box ref={contactoRef}>
                <Contacto />
              </Box>
            </Suspense>

          </>
        )}

        {/* Footer (excepto en administración) */}
        {location.pathname !== "/administracion" && location.pathname !== "/dashboard" && location.pathname !== "/configurar-servicios" && <Footer />}

        {/* Botón WhatsApp */}
        {location.pathname !== "/administracion" && location.pathname !== "/dashboard" && location.pathname !== "/configurar-servicios" && (
          <Box sx={{ position: "fixed", bottom: "40px", right: "20px", zIndex: 100, transition: "bottom 0.3s ease", }}>
            <IconButton onClick={() => { window.open("https://api.whatsapp.com/send?phone=5699940746", "_blank"); setHasInteracted(true); }} sx={{
              width: 60, height: 60, backgroundColor: "#25d366", color: "#FFF", borderRadius: "50%", boxShadow: "2px 2px 3px #999", "&:hover": { backgroundColor: "#1ebe5d" }, zIndex: 101
            }}>
              <WhatsAppIcon sx={{ fontSize: 30 }} />
            </IconButton>

            {/* Burbuja de mensaje */}
            {openBubble && (
              <Box
                sx={{
                  position: "fixed",
                  bottom: 110,
                  right: 20,
                  backgroundColor: "#fff",
                  color: "#000",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                  borderRadius: "20px",
                  padding: "8px 16px",
                  fontFamily: "Poppins, sans-serif",
                  zIndex: 102,
                  opacity: openBubble ? 1 : 0,
                  transform: openBubble ? "translateX(0)" : "translateX(100%)",
                  transition: "transform 0.5s ease, opacity 0.5s ease",
                }}
                onClick={() => setOpenBubble(false)}
              >
                Escríbenos por WhatsApp
              </Box>
            )}
          </Box>
        )}

        {/* Botón scroll arriba */}
        {showArrow && (
          <IconButton onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            sx={{
              position: "fixed",
              bottom: "120px",
              right: "20px",
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "50%",
              padding: "10px",
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
              zIndex: 101,
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)",
                backgroundColor: "#000",
                color: "#fff",
              },
            }}
          >
            <ArrowUpwardIcon sx={{ fontSize: 30 }} />
          </IconButton>
        )}
      </Box>
    </ThemeProvider>
  );
}

export default App;
