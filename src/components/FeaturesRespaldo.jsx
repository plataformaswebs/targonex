import React, { useEffect, useRef, useState } from "react";
import { Alert, Box, Button, Container, Dialog, DialogContent, IconButton, Snackbar, Typography } from "@mui/material";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import NotificationsActiveRoundedIcon from "@mui/icons-material/NotificationsActiveRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import SyncRoundedIcon from "@mui/icons-material/SyncRounded";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import { motion } from "framer-motion";
import "./css/Features.css";

function Features() {
  const sectionRefs = useRef([]);
  const [visibleSections, setVisibleSections] = useState([false, false, false]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSchedulingDialog, setOpenSchedulingDialog] = useState(false);
  const [openClientDialog, setOpenClientDialog] = useState(false);
  const [openLessonDialog, setOpenLessonDialog] = useState(false);

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

  const handleComingSoon = () => {
    setOpenSnackbar(true);
  };

  return (
    <Box className="features-showcase">
      <Container maxWidth="lg" className="features-showcase__container">
        <Box
          ref={(el) => { sectionRefs.current[0] = el; }}
          data-feature-index="0"
          className={`features-showcase__secondary features-showcase__secondary--hero features-showcase__secondary--hero-clean features-showcase__secondary--hero-mobile ${visibleSections[0] ? "features-showcase__reveal is-visible from-left" : "features-showcase__reveal from-left"}`}
        >
          <Box className="features-showcase__hero-content">
            <Box className="features-showcase__hero-copy">
              <Box className="features-showcase__hero-badge">
                <CalendarMonthRoundedIcon sx={{ fontSize: 18 }} />
                <Typography component="span">SMART SCHEDULE</Typography>
              </Box>

              <Typography component="h2" className="features-showcase__hero-title">
                Book less.
                <br />
                Coach more.
                <br />
                <span>Always organized.</span>
              </Typography>

              <Box className="features-showcase__hero-points">
                <Box className="features-showcase__hero-point">
                  <Box className="features-showcase__hero-point-icon">
                    <CalendarMonthRoundedIcon />
                  </Box>
                  <Box>
                    <Typography component="h3">Professional Calendar</Typography>
                    <Typography component="p">
                      Visual view of your day, time blocks, and every reservation.
                    </Typography>
                  </Box>
                </Box>

                <Box className="features-showcase__hero-point">
                  <Box className="features-showcase__hero-point-icon">
                    <ScheduleRoundedIcon />
                  </Box>
                  <Box>
                    <Typography component="h3">Available &amp; Booked Slots</Typography>
                    <Typography component="p">
                      Show open times clearly and avoid scheduling conflicts.
                    </Typography>
                  </Box>
                </Box>

                <Box className="features-showcase__hero-point">
                  <Box className="features-showcase__hero-point-icon">
                    <NotificationsActiveRoundedIcon />
                  </Box>
                  <Box>
                    <Typography component="h3">Instant Notifications</Typography>
                    <Typography component="p">
                      Get alerts when a lesson is booked, updated, or moved.
                    </Typography>
                  </Box>
                </Box>

                <Box className="features-showcase__hero-point">
                  <Box className="features-showcase__hero-point-icon">
                    <SyncRoundedIcon />
                  </Box>
                  <Box>
                    <Typography component="h3">Easy To Manage</Typography>
                    <Typography component="p">
                      Add, edit, or block time slots with just a few taps.
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Button
                className="features-showcase__hero-button"
                variant="contained"
                onClick={() => setOpenSchedulingDialog(true)}
              >
                Learn More
              </Button>
            </Box>

            <Box className="features-showcase__hero-device">
              <img
                src="/feature-1.png"
                alt="Smart scheduling preview"
                className="features-showcase__hero-phone"
              />
            </Box>
          </Box>
        </Box>
        <Box
          ref={(el) => { sectionRefs.current[1] = el; }}
          data-feature-index="1"
          className={`features-showcase__secondary features-showcase__secondary--connected ${visibleSections[1] ? "features-showcase__reveal is-visible from-right" : "features-showcase__reveal from-right"}`}
        >
          <Box className="features-showcase__connected-content">
            <Box className="features-showcase__connected-copy">
              <Box className="features-showcase__connected-brand">
                <Typography component="span">GOLF COACH</Typography>
                <Typography component="span">LOG</Typography>
              </Box>

              <Box className="features-showcase__connected-badge">
                <ForumRoundedIcon sx={{ fontSize: 18 }} />
                <Typography component="span">STAY CONNECTED</Typography>
              </Box>

              <Typography component="h2" className="features-showcase__connected-title">
                Communicate.
                <br />
                Guide.
                <br />
                <span>Elevate.</span>
              </Typography>

              <Box className="features-showcase__connected-points">
                <Box className="features-showcase__connected-point">
                  <Box className="features-showcase__connected-point-icon">
                    <SendRoundedIcon />
                  </Box>
                  <Box>
                    <Typography component="h3">Send Messages</Typography>
                    <Typography component="p">
                      Chat instantly with your students.
                    </Typography>
                  </Box>
                </Box>

                <Box className="features-showcase__connected-point">
                  <Box className="features-showcase__connected-point-icon">
                    <CampaignRoundedIcon />
                  </Box>
                  <Box>
                    <Typography component="h3">Broadcast Updates</Typography>
                    <Typography component="p">
                      Share news, tournaments or reminders in seconds.
                    </Typography>
                  </Box>
                </Box>

                <Box className="features-showcase__connected-point">
                  <Box className="features-showcase__connected-point-icon">
                    <SupportAgentRoundedIcon />
                  </Box>
                  <Box>
                    <Typography component="h3">Client &amp; Support</Typography>
                    <Typography component="p">
                      Quick, organized communication whenever you need it.
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Button
                className="features-showcase__connected-button"
                variant="contained"
                onClick={() => setOpenClientDialog(true)}
              >
                Read More
              </Button>
            </Box>

            <Box className="features-showcase__connected-device">
              <img
                src="/feature-2.png"
                alt="Client communication preview"
                className="features-showcase__connected-phone"
              />
            </Box>
          </Box>
        </Box>

        <Box
          ref={(el) => { sectionRefs.current[2] = el; }}
          data-feature-index="2"
          className={`features-showcase__secondary features-showcase__secondary--reverse ${visibleSections[2] ? "features-showcase__reveal is-visible from-left" : "features-showcase__reveal from-left"}`}
          sx={{ pb: { xs: "10px", md: 0 } }}
        >
          <Box className="features-showcase__secondary-image-wrap">
            <img
              src="/feature-3.jpeg"
              alt="Golf courses preview"
              className="features-showcase__secondary-image features-showcase__secondary-image--full"
              style={{ transform: "translateY(-18px)", maxWidth: "88%", width: "76%", margin: "0 auto", display: "block" }}
            />
          </Box>

          <Box className="features-showcase__secondary-copy">
            <Typography
              component="h2"
              className="features-showcase__secondary-title"
              sx={{
                fontWeight: 900,
                fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
                fontSize: { xs: "1.8rem", sm: "2.15rem", md: "2.6rem" },
                lineHeight: 1.08,
              }}
            >
              GOLF LESSON MANAGEMENT
            </Typography>

            <Typography component="p" className="features-showcase__secondary-description">
              Plan lessons across every area of the game, keep session records
              organized, and follow each client&apos;s progress with a clear,
              structured coaching system.
            </Typography>

            <Button
              className="features-showcase__button"
              variant="contained"
              onClick={() => setOpenLessonDialog(true)}
            >
              Explore More
            </Button>
          </Box>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2200}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="warning"
          icon={<ConstructionRoundedIcon fontSize="inherit" />}
          sx={{
            alignItems: "center",
            fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
            fontWeight: 700,
          }}
        >
          Under Construction
        </Alert>
      </Snackbar>

      <Dialog
        open={openSchedulingDialog}
        onClose={() => setOpenSchedulingDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            overflow: "hidden",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,250,251,0.98) 100%)",
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
                "linear-gradient(135deg, rgba(31,191,117,0.12) 0%, rgba(20,138,88,0.05) 55%, rgba(255,255,255,0.9) 100%)",
            }}
          >
            <IconButton
              onClick={() => setOpenSchedulingDialog(false)}
              sx={{
                position: "absolute",
                top: 14,
                right: 14,
                color: "#18302a",
                backgroundColor: "rgba(255,255,255,0.72)",
                animation: "dialogCloseSpin 0.8s ease-out 1",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.95)",
                },
                "@keyframes dialogCloseSpin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(720deg)" },
                },
              }}
            >
              <CloseRoundedIcon />
            </IconButton>

            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <Typography
                component="p"
                sx={{
                  m: 0,
                  color: "#1fbf75",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
                }}
              >
                Smart Scheduling
              </Typography>
            </Box>

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
              Scheduling That Works For Coaches
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
              Effortlessly manage your schedule with an intelligent booking system
              designed for modern golf coaches. Clients can check real-time
              availability, book sessions instantly, and prepay for lessons or
              packages all in one place. Seamlessly synced with your personal
              calendar, it keeps your availability always up to date, avoids
              conflicts, and ensures clear, reliable scheduling for both you and
              your clients. Built-in prepayment options, partial or full, ensure
              commitment, protecting your time and reducing no-shows so you can
              focus on coaching with confidence.
            </Typography>

            <Box
              component="img"
              src="/calendar.webp"
              alt="Smart scheduling"
              sx={{
                display: "block",
                width: { xs: "92px", md: "118px" },
                height: "auto",
                mx: "auto",
                mt: 1.5,
                filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.14))",
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openClientDialog}
        onClose={() => setOpenClientDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            overflow: "hidden",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,250,251,0.98) 100%)",
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
                "linear-gradient(135deg, rgba(31,191,117,0.12) 0%, rgba(20,138,88,0.05) 55%, rgba(255,255,255,0.9) 100%)",
            }}
          >
            <IconButton
              onClick={() => setOpenClientDialog(false)}
              sx={{
                position: "absolute",
                top: 14,
                right: 14,
                color: "#18302a",
                backgroundColor: "rgba(255,255,255,0.72)",
                animation: "dialogCloseSpin 0.8s ease-out 1",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.95)",
                },
                "@keyframes dialogCloseSpin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(720deg)" },
                },
              }}
            >
              <CloseRoundedIcon />
            </IconButton>

            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <Typography
                component="p"
                sx={{
                  m: 0,
                  color: "#1fbf75",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
                }}
              >
                Client Management
              </Typography>
            </Box>

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
              Client Management & Communication
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
              Stay connected with your clients through a centralized platform
              designed for seamless communication and better coaching
              relationships. Monitor their activity, track practice progress,
              and keep everything organized in one place. By maintaining direct
              and structured communication, you can guide your clients more
              effectively, keep them engaged, and continuously motivate them to
              improve.
            </Typography>

            <Box
              component="img"
              src="/fondo-3.jpg"
              alt="Client management preview"
              sx={{
                display: "block",
                width: { xs: "255px", md: "325px" },
                height: "auto",
                mx: "auto",
                mt: 2,
                borderRadius: "18px",
                filter: "drop-shadow(0 16px 24px rgba(0,0,0,0.14))",
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog
        open={openLessonDialog}
        onClose={() => setOpenLessonDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            overflow: "hidden",
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(247,250,251,0.98) 100%)",
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
                "linear-gradient(135deg, rgba(31,191,117,0.12) 0%, rgba(20,138,88,0.05) 55%, rgba(255,255,255,0.9) 100%)",
            }}
          >
            <IconButton
              onClick={() => setOpenLessonDialog(false)}
              sx={{
                position: "absolute",
                top: 14,
                right: 14,
                color: "#18302a",
                backgroundColor: "rgba(255,255,255,0.72)",
                animation: "dialogCloseSpin 0.8s ease-out 1",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.95)",
                },
                "@keyframes dialogCloseSpin": {
                  "0%": { transform: "rotate(0deg)" },
                  "100%": { transform: "rotate(720deg)" },
                },
              }}
            >
              <CloseRoundedIcon />
            </IconButton>

            <Box
              component={motion.div}
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <Typography
                component="p"
                sx={{
                  m: 0,
                  color: "#1fbf75",
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontFamily: '"Roboto Condensed", "Roboto-BoldCondensed", sans-serif',
                }}
              >
                Golf Lesson Management
              </Typography>
            </Box>

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
              Golf Lesson Management
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
              Plan, structure, and track your lessons across all areas of the
              game, including swing, fundamentals, short game, putting, and
              course management. Create personalized coaching plans, keep
              detailed session records, and follow each client&apos;s progress,
              ensuring a more organized, consistent, and effective coaching
              experience.
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default Features;
