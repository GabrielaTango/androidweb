import { useState, useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import logoImg from "./assets/carrito.png";
import pedidosImg from "./assets/pedidos.png";

const COLORS = {
  primary: "#1B1F3B",
  accent: "#4F6CF7",
  accent2: "#7C5CFC",
  accent3: "#22D3A7",
  warm: "#FF7A5C",
  lightBg: "#F4F5FA",
  textDark: "#1B1F3B",
  textLight: "#6B7194",
  cardBg: "#FFFFFF",
  subtleLine: "#E2E5F1",
};

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible] as const;
}

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

function FadeIn({ children, delay = 0, direction = "up", className = "" }: { children: ReactNode; delay?: number; direction?: "up" | "down" | "left" | "right" | "none"; className?: string }) {
  const [ref, visible] = useInView(0.1);
  const transforms = { up: "translateY(40px)", down: "translateY(-40px)", left: "translateX(40px)", right: "translateX(-40px)", none: "none" };
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "none" : transforms[direction],
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
    }}>{children}</div>
  );
}

function DotPattern({ style }: { style?: CSSProperties }) {
  return (
    <svg style={{ position: "absolute", opacity: 0.07, pointerEvents: "none", ...style }} width="120" height="120">
      {Array.from({ length: 100 }, (_, i) => (
        <circle key={i} cx={(i % 10) * 12 + 6} cy={Math.floor(i / 10) * 12 + 6} r="1.3" fill="currentColor" />
      ))}
    </svg>
  );
}

function PhoneMockup() {
  return (
    <div style={{
      padding: 10
    }}>
      <div style={{
        width: "100%", height: "100%",
      }}>
        <img src={pedidosImg} alt="Pedidos Android" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    </div>
  );
}

function FloatingCard({ children, style, delay = 0 }: { children: ReactNode; style?: CSSProperties; delay?: number }) {
  return (
    <div style={{
      background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)",
      borderRadius: 14, padding: "14px 18px", border: "1px solid rgba(255,255,255,0.08)",
      animation: `float 4s ease-in-out ${delay}s infinite alternate, fadeSlide 0.8s ease ${0.6 + delay}s both`,
      ...style,
    }}>{children}</div>
  );
}

function IconCircle({ icon, color, size = 44 }: { icon: string; color: string; size?: number }) {
  const icons = {
    chart: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="2" y="10" width="3" height="8" rx="1" fill="white"/><rect x="7" y="6" width="3" height="12" rx="1" fill="white"/><rect x="12" y="8" width="3" height="10" rx="1" fill="white"/><rect x="17" y="3" width="3" height="15" rx="1" fill="white" opacity=".7"/></svg>
    ),
    user: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" fill="white"/><path d="M3 18c0-3.87 3.13-7 7-7s7 3.13 7 7" stroke="white" strokeWidth="2" fill="none"/></svg>
    ),
    lightning: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M11 1L4 12h5l-1 7 7-11h-5l1-7z" fill="white"/></svg>
    ),
    shield: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 2L3 5.5v4.5c0 4.14 2.98 8.01 7 9 4.02-.99 7-4.86 7-9V5.5L10 2z" fill="white"/></svg>
    ),
    gear: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="white" strokeWidth="2" fill="none"/><path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.9 3.9l1.4 1.4M14.7 14.7l1.4 1.4M16.1 3.9l-1.4 1.4M5.3 14.7l-1.4 1.4" stroke="white" strokeWidth="1.5"/></svg>
    ),
    phone: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="5" y="1" width="10" height="18" rx="2" stroke="white" strokeWidth="1.8" fill="none"/><line x1="8" y1="16" x2="12" y2="16" stroke="white" strokeWidth="1.5"/></svg>
    ),
    duplicateDocument: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="6" y="1" width="10" height="13" rx="2" stroke="white" strokeWidth="1.5"/><path d="M4 6v9a2 2 0 002 2h7" stroke="white" strokeWidth="1.5" fill="none"/><line x1="9" y1="5" x2="13" y2="5" stroke="white" strokeWidth="1.2"/><line x1="9" y1="7.5" x2="13" y2="7.5" stroke="white" strokeWidth="1.2"/><line x1="9" y1="10" x2="12" y2="10" stroke="white" strokeWidth="1.2"/></svg>
    ),
    cloudArrowDown: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5.5 16A4.5 4.5 0 014 7.2 5.5 5.5 0 0114.6 6 4 4 0 0116 13.8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 10v7M10 17l-2.5-2.5M10 17l2.5-2.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
    database: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><ellipse cx="10" cy="4.5" rx="6.5" ry="2.5" stroke="white" strokeWidth="1.5"/><path d="M3.5 4.5v11c0 1.38 2.91 2.5 6.5 2.5s6.5-1.12 6.5-2.5v-11" stroke="white" strokeWidth="1.5"/><path d="M3.5 10c0 1.38 2.91 2.5 6.5 2.5s6.5-1.12 6.5-2.5" stroke="white" strokeWidth="1.5"/></svg>
    ),
    documentText: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 2h7l4 4v11a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/><path d="M12 2v4h4" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/><line x1="7" y1="10" x2="13" y2="10" stroke="white" strokeWidth="1.2"/><line x1="7" y1="13" x2="13" y2="13" stroke="white" strokeWidth="1.2"/><line x1="7" y1="16" x2="11" y2="16" stroke="white" strokeWidth="1.2"/></svg>
    ),
  };
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: color,
      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
      boxShadow: `0 4px 16px ${color}55`,
    }}>{icons[icon as keyof typeof icons]}</div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: isMobile ? "0 20px" : "0 40px",
      height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(27,31,59,0.92)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img src={logoImg} alt="Pedidos Android" style={{ width: 32, height: 32, borderRadius: 10, objectFit: "contain" }} />
        <span style={{ color: "white", fontWeight: 700, fontSize: 18, fontFamily: "'Outfit', sans-serif" }}>Pedidos Android</span>
      </div>
      {!isMobile && (
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["Inicio", "Funciones", "Pasos", "Contacto"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              color: "rgba(255,255,255,0.65)", textDecoration: "none", fontSize: 13, fontWeight: 500,
              transition: "color 0.3s", fontFamily: "'DM Mono', monospace", letterSpacing: 0.5,
            }} onMouseEnter={e => (e.target as HTMLElement).style.color = COLORS.accent3}
               onMouseLeave={e => (e.target as HTMLElement).style.color = "rgba(255,255,255,0.65)"}>{item}</a>
          ))}
          <a href="/descargas/pedidosandroid.apk" download style={{
            background: COLORS.accent3, color: COLORS.primary, border: "none", borderRadius: 24,
            padding: "10px 22px", fontWeight: 700, fontSize: 13, cursor: "pointer",
            fontFamily: "'Outfit', sans-serif", transition: "transform 0.2s, box-shadow 0.2s",
            textDecoration: "none", display: "inline-block",
          }} onMouseEnter={e => { (e.target as HTMLElement).style.transform = "translateY(-1px)"; (e.target as HTMLElement).style.boxShadow = `0 6px 24px ${COLORS.accent3}44`; }}
             onMouseLeave={e => { (e.target as HTMLElement).style.transform = "none"; (e.target as HTMLElement).style.boxShadow = "none"; }}>
            Descargar
          </a>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <section id="inicio" style={{
      minHeight: "100vh", background: `linear-gradient(160deg, #1B1F3B 0%, #2D3368 60%, #1F2550 100%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: isMobile ? "80px 20px 40px" : "100px 60px 60px", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "15%", right: "-5%", width: 400, height: 400, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.accent}12, transparent 70%)`, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "-3%", width: 280, height: 280, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.accent2}10, transparent 70%)`, pointerEvents: "none",
      }} />
      <DotPattern style={{ top: "20%", left: "5%", color: "white" }} />

      <div style={{
        maxWidth: 1100, width: "100%", display: "flex", alignItems: "center", zIndex: 2, margin: "0 auto",
        flexDirection: isMobile ? "column" : "row",
      }}>
      <div style={{ flex: 1, maxWidth: isMobile ? "100%" : 560 }}>
        <FadeIn delay={0.1}>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.45)",
            letterSpacing: 2, marginBottom: 16,
          }}>GUÍA DE PRODUCTO / 2026</div>
          <div style={{ width: 60, height: 2, background: COLORS.accent3, marginBottom: 32 }} />
        </FadeIn>
        <FadeIn delay={0.2}>
          <h1 style={{
            fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 36 : 64, fontWeight: 800, color: "white",
            lineHeight: 1.05, margin: "0 0 20px",
          }}>Pedidos Android</h1>
        </FadeIn>
        <FadeIn delay={0.3}>
          <p style={{
            fontFamily: "'Instrument Sans', sans-serif", fontSize: isMobile ? 17 : 20, color: "#A8AECE",
            margin: "0 0 12px", fontWeight: 400,
          }}>Guía completa de funcionamiento</p>
        </FadeIn>
        <FadeIn delay={0.4}>
          <p style={{
            fontFamily: "'Instrument Sans', sans-serif", fontSize: 15, color: "#8890B5",
            lineHeight: 1.7, margin: "0 0 36px", maxWidth: 420,
          }}>
            Descubre todas las funcionalidades de nuestra aplicación.
            Esta guía te acompañará paso a paso en tu experiencia.
          </p>
        </FadeIn>
        <FadeIn delay={0.5}>
          <div style={{ display: "flex", gap: 16 }}>
            <a href="#overview" style={{
              background: `linear-gradient(135deg, ${COLORS.accent3}, #1ecfa0)`, color: COLORS.primary,
              border: "none", borderRadius: 28, padding: "14px 32px", fontWeight: 700, fontSize: 15,
              cursor: "pointer", fontFamily: "'Outfit', sans-serif", textDecoration: "none", display: "inline-block",
              transition: "transform 0.2s, box-shadow 0.3s",
            }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 32px ${COLORS.accent3}55`; }}
               onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              Comenzar ahora
            </a>
          </div>
        </FadeIn>
      </div>

      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", position: "relative", marginTop: isMobile ? 32 : 0 }}>
        <FadeIn delay={0.4} direction={isMobile ? "up" : "left"}>
          <div style={{ position: "relative" }}>
            <PhoneMockup />
            {!isMobile && (
              <>
                <FloatingCard style={{ position: "absolute", top: -20, left: -120 }} delay={0}>
                  <div style={{ color: "white", fontWeight: 700, fontSize: 14, fontFamily: "'Outfit', sans-serif" }}>1,234</div>
                  <div style={{ color: COLORS.accent3, fontSize: 10, fontFamily: "'Instrument Sans', sans-serif" }}>↑ +12% esta semana</div>
                </FloatingCard>
                <FloatingCard style={{ position: "absolute", bottom: 40, right: -100 }} delay={0.5}>
                  <div style={{ color: "white", fontWeight: 700, fontSize: 14, fontFamily: "'Outfit', sans-serif" }}>99.9%</div>
                  <div style={{ color: COLORS.accent3, fontSize: 10, fontFamily: "'Instrument Sans', sans-serif" }}>uptime</div>
                </FloatingCard>
              </>
            )}
          </div>
        </FadeIn>
      </div>
      </div>
    </section>
  );
}

function OverviewSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const stats = [
    { value: "20+", label: "Clientes activos", color: COLORS.accent },
    { value: "4.5★", label: "Valoración media", color: COLORS.accent2 },
    { value: "50ms", label: "Tiempo de respuesta", color: COLORS.accent3 },
  ];
  return (
    <section id="overview" style={{ background: COLORS.lightBg, padding: isMobile ? "60px 20px" : "100px 60px", position: "relative" }}>
      <div style={{
        height: 4, background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`,
        position: "absolute", top: 0, left: 0, right: 0,
      }} />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: COLORS.accent, letterSpacing: 2, marginBottom: 8 }}>01</div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 26 : 36, fontWeight: 800, color: COLORS.textDark, margin: "0 0 8px" }}>¿Qué es Pedidos Android?</h2>
          <div style={{ width: 50, height: 2.5, background: COLORS.accent, marginBottom: 24 }} />
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{
            fontFamily: "'Instrument Sans', sans-serif", fontSize: 16, color: COLORS.textLight,
            lineHeight: 1.8, maxWidth: 600, margin: "0 0 48px",
          }}>
            Pedidos Android es una plataforma intuitiva diseñada para simplificar tu día a día. Con una interfaz moderna y funcionalidades potentes, te permite
            Cargar pedidos offline, consultar cuentas corrientes de clientes y consulta de precios.
          </p>
        </FadeIn>

        <div style={{ display: "flex", gap: 20, marginBottom: 48, flexDirection: isMobile ? "column" : "row" }}>
          {stats.map((s, i) => (
            <FadeIn key={s.label} delay={0.15 + i * 0.1} className="stat-card">
              <div style={{
                flex: 1, background: "white", borderRadius: 16, padding: "28px 24px",
                boxShadow: "0 2px 12px rgba(27,31,59,0.04)", transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "default",
              }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(27,31,59,0.08)"; }}
                 onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(27,31,59,0.04)"; }}>
                <div style={{ width: 32, height: 3, background: s.color, borderRadius: 2, marginBottom: 16 }} />
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 30, fontWeight: 800, color: COLORS.textDark }}>{s.value}</div>
                <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.textLight, marginTop: 4 }}>{s.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}

function FeaturesSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const features = [
    { title: "Creación Pedidos", desc: "Permite generar pedidos de manera ágil mediante la selección del cliente y la incorporación de artículos, calculando automáticamente importes y total general.", color: COLORS.accent, icon: "documentText" },
    { title: "Carga de pedidos offline", desc: "Permite cargar pedidos en modo offline, garantizando que los datos se sincronicen cuando haya conexión.", color: "#E84393", icon: "database" },
    { title: "Consulta de Cuenta Corriente", desc: "Proporciona acceso al estado financiero del cliente, incluyendo saldos pendientes y movimientos registrados.", color: COLORS.accent3, icon: "user" },
    { title: "Sincronizacion", desc: "Transfiere los pedidos generados al sistema central para su validación, procesamiento y registro definitivo.", color: "#3498DB", icon: "database" },
    { title: "Duplicación de Pedido", desc: "Facilita la generación de nuevos pedidos a partir de uno existente, optimizando tiempos operativos en operaciones recurrentes.", color: COLORS.accent2, icon: "duplicateDocument" },
    { title: "Actualización de Datos", desc: "Importa información actualizada desde el servidor, asegurando coherencia en clientes, productos y condiciones comerciales.", color: COLORS.warm, icon: "cloudArrowDown" },
    { title: "Anulación de Pedido", desc: "Permite cancelar pedidos previamente registrados, evitando su procesamiento o envío al sistema central.", color: "#E74C3C", icon: "database" },
  ];

  return (
    <section id="funciones" style={{ background: COLORS.lightBg, padding: isMobile ? "60px 20px" : "100px 60px", position: "relative" }}>
      <div style={{
        height: 4, background: `linear-gradient(90deg, ${COLORS.accent2}, ${COLORS.accent3})`,
        position: "absolute", top: 0, left: 0, right: 0,
      }} />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: COLORS.accent2, letterSpacing: 2, marginBottom: 8 }}>02</div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 26 : 36, fontWeight: 800, color: COLORS.textDark, margin: "0 0 8px" }}>Funcionalidades principales</h2>
          <div style={{ width: 50, height: 2.5, background: COLORS.accent2, marginBottom: 48 }} />
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 24 }}>
          {features.map((f, i) => (
            <FadeIn key={f.title} delay={0.1 + i * 0.1}>
              <div style={{
                background: "white", borderRadius: 18, padding: isMobile ? "24px 20px" : "32px 28px",
                boxShadow: "0 2px 12px rgba(27,31,59,0.04)", transition: "transform 0.3s, box-shadow 0.3s",
                cursor: "default", height: "100%",
              }} onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${f.color}18`; }}
                 onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(27,31,59,0.04)"; }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                  <IconCircle icon={f.icon} color={f.color} />
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 17, fontWeight: 700, color: COLORS.textDark, margin: 0 }}>{f.title}</h3>
                </div>
                <p style={{
                  fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, color: COLORS.textLight,
                  lineHeight: 1.7, margin: "0 0 20px",
                }}>{f.desc}</p>
                <div style={{ width: 36, height: 2.5, background: f.color, borderRadius: 2 }} />
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <div style={{
            marginTop: 32, background: COLORS.primary, borderRadius: 14, padding: isMobile ? "16px 20px" : "18px 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12,
          }}>
            <span style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, color: "white" }}>
              Todas las funciones están disponibles en Android.
            </span>
            <svg style={{ flexShrink: 0 }} width="24" height="24" viewBox="0 0 24 24" fill={COLORS.accent3}><path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0012 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31A5.983 5.983 0 006 7h12c0-2.21-1.2-4.15-2.97-5.18-.15-.09-.3-.17-.46-.25-.01-.01-.03-.01-.04-.02zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/></svg>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function StepsSection() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const steps = [
    { title: "Descarga e instala", desc: "La instalación toma menos de 30 segundos.", color: COLORS.accent },
    { title: "Configurar", desc: "Nuestra configuracion es rapida y sencilla. Solo se debe especificar la url del servidor, el vendedor y la lista de precios a utilizar.\n Para realizar una configuracion de prueba ingresar la palabra \"demo\" en el servidor", color: COLORS.accent2 },
    { title: "Comienza a usar", desc: "Explora las funciones, importá los datos desde el servidor, crea Pedidos, sincronizalos, consulta las cuentas corrientes de tus clientes, consultá precios.", color: COLORS.warm },
  ];

  return (
    <section id="pasos" style={{ background: COLORS.lightBg, padding: isMobile ? "60px 20px" : "100px 60px", position: "relative" }}>
      <div style={{
        height: 4, background: `linear-gradient(90deg, ${COLORS.accent3}, ${COLORS.accent})`,
        position: "absolute", top: 0, left: 0, right: 0,
      }} />
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: COLORS.accent3, letterSpacing: 2, marginBottom: 8 }}>03</div>
          <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 26 : 36, fontWeight: 800, color: COLORS.textDark, margin: "0 0 8px" }}>¿Cómo funciona?</h2>
          <div style={{ width: 50, height: 2.5, background: COLORS.accent3, marginBottom: 56 }} />
        </FadeIn>

        <div style={{ position: "relative", paddingLeft: isMobile ? 48 : 60 }}>
          {/* Timeline line */}
          <div style={{
            position: "absolute", left: 22, top: 30, bottom: 30, width: 2,
            background: `repeating-linear-gradient(to bottom, ${COLORS.subtleLine} 0, ${COLORS.subtleLine} 6px, transparent 6px, transparent 12px)`,
          }} />

          {steps.map((s, i) => (
            <FadeIn key={s.title} delay={0.1 + i * 0.12}>
              <div style={{ display: "flex", alignItems: "flex-start", marginBottom: i < steps.length - 1 ? 40 : 0, position: "relative" }}>
                <div style={{
                  position: "absolute", left: -60 + 4, top: 8,
                  width: 38, height: 38, borderRadius: "50%", background: s.color,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: 800, fontSize: 16, fontFamily: "'Outfit', sans-serif",
                  boxShadow: `0 4px 16px ${s.color}44`, zIndex: 2,
                }}>{i + 1}</div>
                <div style={{
                  flex: 1, background: "white", borderRadius: 16, padding: "24px 28px",
                  boxShadow: "0 2px 12px rgba(27,31,59,0.04)", transition: "transform 0.3s",
                }} onMouseEnter={e => e.currentTarget.style.transform = "translateX(4px)"}
                   onMouseLeave={e => e.currentTarget.style.transform = "none"}>
                  <h3 style={{ fontFamily: "'Outfit', sans-serif", fontSize: 16, fontWeight: 700, color: COLORS.textDark, margin: "0 0 8px" }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, color: COLORS.textLight, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        {/*
        <FadeIn delay={0.6}>
          <div style={{
            marginTop: 40, background: "#EDFFF9", border: `1px solid ${COLORS.accent3}`,
            borderRadius: 14, padding: "18px 24px",
          }}>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: 13, fontWeight: 700, color: COLORS.accent3, marginBottom: 4 }}>💡 Consejo Pro</div>
            <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.textLight }}>
              Activa las notificaciones para no perderte ninguna actualización de tu equipo.
            </div>
          </div>
        </FadeIn>
       */}
      </div> 
       
    </section>
  );
}

function CTASection() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const contacts = [
    { label: "EMAIL", value: "contacto.tangodev@gmail.com" },
    { label: "WhatsApp", value: "1164038746" },
  ];

  return (
    <section id="contacto" style={{
      minHeight: "100vh", background: `linear-gradient(160deg, #1B1F3B 0%, #2D3368 60%, #1F2550 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: isMobile ? "80px 20px 80px" : "100px 60px", position: "relative", overflow: "hidden", textAlign: "center",
    }}>
      <div style={{
        position: "absolute", top: "20%", left: "10%", width: 320, height: 320, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.accent}10, transparent 70%)`, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", right: "8%", width: 220, height: 220, borderRadius: "50%",
        background: `radial-gradient(circle, ${COLORS.accent3}0a, transparent 70%)`, pointerEvents: "none",
      }} />
      <DotPattern style={{ bottom: "8%", right: "5%", color: "white" }} />

      <FadeIn>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: COLORS.accent3, letterSpacing: 2.5, marginBottom: 20 }}>
          ¿LISTO PARA EMPEZAR?
        </div>
      </FadeIn>
      <FadeIn delay={0.15}>
        <h2 style={{
          fontFamily: "'Outfit', sans-serif", fontSize: isMobile ? 30 : 48, fontWeight: 800, color: "white",
          lineHeight: 1.15, margin: "0 0 20px",
        }}>
          Transforma tu<br />productividad hoy
        </h2>
      </FadeIn>
      <FadeIn delay={0.25}>
        <p style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 16, color: "#8890B5", marginBottom: 40, maxWidth: 400 }}>
          Únete a usuarios que ya confían en Pedidos Android.
        </p>
      </FadeIn>
      <FadeIn delay={0.35}>
        <a href="/descargas/pedidosandroid.apk" download style={{
          background: `linear-gradient(135deg, ${COLORS.accent3}, #1ecfa0)`, color: COLORS.primary,
          border: "none", borderRadius: 28, padding: "16px 40px", fontWeight: 700, fontSize: 17,
          cursor: "pointer", fontFamily: "'Outfit', sans-serif", marginBottom: 12,
          transition: "transform 0.2s, box-shadow 0.3s", textDecoration: "none", display: "inline-block",
        }} onMouseEnter={e => { (e.target as HTMLElement).style.transform = "translateY(-3px)"; (e.target as HTMLElement).style.boxShadow = `0 12px 40px ${COLORS.accent3}55`; }}
           onMouseLeave={e => { (e.target as HTMLElement).style.transform = "none"; (e.target as HTMLElement).style.boxShadow = "none"; }}>
          Descargar ahora
        </a>
      </FadeIn>

      <FadeIn delay={0.45}>
        <div style={{ display: "flex", gap: 16, flexDirection: isMobile ? "column" : "row" }}>
          {contacts.map(c => (
            <div key={c.label} style={{
              background: "rgba(255,255,255,0.06)", borderRadius: 14, padding: "16px 24px",
              border: "1px solid rgba(255,255,255,0.06)", minWidth: 160, textAlign: "left",
              transition: "background 0.3s",
            }} onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
               onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}>
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 9, color: COLORS.accent3, letterSpacing: 1.5, marginBottom: 6 }}>{c.label}</div>
              <div style={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: "white" }}>{c.value}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      <div style={{
        position: "absolute", bottom: 40, left: isMobile ? 20 : 60, right: isMobile ? 20 : 60,
        borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 20,
        display: "flex", justifyContent: isMobile ? "center" : "space-between",
        flexDirection: isMobile ? "column" : "row", alignItems: "center", gap: isMobile ? 8 : 0,
      }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#6B7194" }}>© 2026 Pedidos Android. Todos los derechos reservados.</span>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#6B7194" }}>05</span>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div style={{ fontFamily: "'Instrument Sans', sans-serif", margin: 0, padding: 0 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        @keyframes float { 0% { transform: translateY(0); } 100% { transform: translateY(-8px); } }
        @keyframes fadeSlide { 0% { opacity: 0; transform: translateY(16px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes slideIn { 0% { opacity: 0; transform: translateX(-12px); } 100% { opacity: 1; transform: translateX(0); } }
        ::selection { background: ${COLORS.accent3}44; color: ${COLORS.primary}; }
      `}</style>
      <Navbar />
      <HeroSection />
      <OverviewSection />
      <FeaturesSection />
      <StepsSection />
      <CTASection />
    </div>
  );
}
