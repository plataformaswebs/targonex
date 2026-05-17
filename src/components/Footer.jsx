import { Box, Container, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./css/Footer.css";

const companyLinks = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Contacto", href: "/contacto" },
];

const serviceLinks = [
  { label: "Electricidad industrial", href: "/servicios" },
  { label: "Mantención industrial", href: "/servicios" },
  { label: "Maquinaria gastronómica", href: "/servicios" },
  { label: "Obras civiles", href: "/servicios" },
  { label: "Servicios municipales", href: "/servicios" },
];

const quickLinks = [
  { label: "Solicitar cotización", href: "https://api.whatsapp.com/send?phone=56997199738&text=Hola%2C%20quiero%20una%20cotizaci%C3%B3n%20para%20mi%20proyecto." },
  { label: "Hablar por WhatsApp", href: "https://api.whatsapp.com/send?phone=56997199738" },
  { label: "Cobertura técnica", href: "/nosotros" },
  { label: "Clientes destacados", href: "/nosotros" },
];

const mapsUrl = "https://www.google.com/maps?q=-33.5605546,-70.5838271";

const contactLinks = [
  { label: "WhatsApp: +56 9 9719 9738", href: "https://api.whatsapp.com/send?phone=56997199738" },
  { label: "Fono: +569 22511708", href: "tel:+56922511708" },
  { label: "Dirección: Joaquín Tocornal 10709, La Florida", href: mapsUrl },
  {
    label: "Correos:",
    emails: [
      { label: "jmontoya@targonex.cl", href: "mailto:jmontoya@targonex.cl" },
      { label: "Onoguera@targonex.cl", href: "mailto:Onoguera@targonex.cl" },
    ],
  },
  { label: "Cobertura: empresas y municipalidades", href: "/contacto" },
  { label: "Atención: terreno y coordinación técnica", href: "/contacto" },
];

const socials = [
  { href: "https://www.facebook.com/", label: "Facebook", Icon: FacebookIcon },
  { href: "https://www.instagram.com/", label: "Instagram", Icon: InstagramIcon },
  { href: "https://www.linkedin.com/", label: "LinkedIn", Icon: LinkedInIcon },
  { href: "https://api.whatsapp.com/send?phone=56997199738", label: "WhatsApp", Icon: WhatsAppIcon },
];

function FooterColumn({ title, links }) {
  return (
    <ul className="footer-modern__links">
      <li>
        <Typography component="h3" className="footer-modern__heading">
          {title}
        </Typography>
      </li>
      {links.map((link) => (
        <li key={link.label}>
          {link.emails ? (
            <Box component="div" sx={{ display: "flex", flexDirection: "column", gap: 0.4 }}>
              <Typography component="span" sx={{ color: "rgba(255,255,255,0.82)" }}>
                {link.label}
              </Typography>
              {link.emails.map((email) => (
                <a key={email.label} href={email.href}>
                  {email.label}
                </a>
              ))}
            </Box>
          ) : (
            <a href={link.href}>{link.label}</a>
          )}
        </li>
      ))}
    </ul>
  );
}

function Footer() {
  return (
    <Box component="footer" className="footer-modern">
      <Container maxWidth="lg" className="footer-modern__container">
        <Box className="footer-modern__top">
          <nav className="footer-modern__nav" aria-label="Footer navigation">
            <FooterColumn title="Empresa" links={companyLinks} />
            <FooterColumn title="Servicios" links={serviceLinks} />
            <FooterColumn title="Accesos rápidos" links={quickLinks} />
            <FooterColumn title="Contacto" links={contactLinks} />
          </nav>
        </Box>

        <Box className="footer-modern__social">
          <Typography component="h3" className="footer-modern__social-title">
            Redes y contacto
          </Typography>
          <Typography className="footer-modern__social-copy" sx={{ color: "rgba(255,255,255,0.72)", mb: 2, lineHeight: 1.7 }}>
            Coordinamos visitas, evaluaciones y soporte técnico directo por WhatsApp o correo.
          </Typography>
          <ul className="footer-modern__social-list">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" title={label}>
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
        </Box>

        <Box className="footer-modern__bottom">
          <Typography component="div" className="footer-modern__copyright">
            © Targonex. Todos los derechos reservados.
          </Typography>

          <nav aria-label="Legal navigation">
            <ul className="footer-modern__legal">
              <li>
                <a href="/contacto">Cobertura</a>
              </li>
              <li>
                <a href="/nosotros">Experiencia</a>
              </li>
              <li>
                <a href="/servicios">Soluciones</a>
              </li>
            </ul>
          </nav>
        </Box>

        <Box className="footer-modern__credits">
          <Typography component="div" className="footer-modern__credits-text">
            Desarrollado por{" "}
            <a href="https://www.plataformas-web.cl" target="_blank" rel="noopener noreferrer">
              plataformas-web.cl
            </a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
