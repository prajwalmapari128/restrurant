import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

/* ── Inject Tailwind CDN once ── */
function useTailwind() {
  useEffect(() => {
    if (document.getElementById("tw-cdn")) return;
    const s = document.createElement("script");
    s.id = "tw-cdn";
    s.src = "https://cdn.tailwindcss.com";
    s.onload = () => {
      window.tailwind?.config({
        theme: {
          extend: {
            fontFamily: {
              display: ["'Cormorant Garamond'", "serif"],
              sans: ["'DM Sans'", "sans-serif"],
            },
            colors: {
              gold: {
                DEFAULT: "#C9A96E",
                light: "#E8D5A3",
                dark: "#9C7A3C",
              },
              charcoal: "#111010",
              smoke: "#1C1B1A",
              ash: "#2A2926",
            },
            letterSpacing: {
              widest2: "0.3em",
            },
          },
        },
      });
    };
    document.head.appendChild(s);

    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(font);
  }, []);
}

/* ─── DATA ─── */
const MENU_CATEGORIES = [
  {
    label: "Entrées",
    items: [
      {
        name: "Foie Gras Torchon",
        desc: "Sauternes gelée · brioche · Marcona almonds",
        price: "42",
        tag: "Chef's Signature",
      },
      {
        name: "Hokkaido Scallop",
        desc: "Dashi butter · ikura · microgreens",
        price: "38",
        tag: null,
      },
      {
        name: "Black Truffle Velouté",
        desc: "Jerusalem artichoke · crispy sage · hazelnut oil",
        price: "34",
        tag: "Seasonal",
      },
    ],
  },
  {
    label: "Mains",
    items: [
      {
        name: "Wagyu A5 Striploin",
        desc: "Pomme purée · truffle jus · watercress",
        price: "145",
        tag: "Chef's Signature",
      },
      {
        name: "Wild Sea Bass",
        desc: "Yuzu beurre blanc · fennel · dashi broth",
        price: "88",
        tag: null,
      },
      {
        name: "Rack of Lamb",
        desc: "Pistachio crust · merguez jus · charred leek",
        price: "96",
        tag: "Seasonal",
      },
    ],
  },
  {
    label: "Desserts",
    items: [
      {
        name: "Valrhona Chocolate Sphere",
        desc: "Caramel coulant · smoked salt · crème fraîche",
        price: "22",
        tag: null,
      },
      {
        name: "Yuzu Tart",
        desc: "Meringue · compressed lychee · vanilla",
        price: "20",
        tag: "Seasonal",
      },
      {
        name: "Cheese Selection",
        desc: "Affinage du jour · quince · walnut levain",
        price: "28",
        tag: null,
      },
    ],
  },
];

const FEATURED = [
  {
    name: "Wagyu A5",
    desc: "Truffle jus · pomme purée",
    img: "https://images.unsplash.com/photo-1558030006-450675393462?w=800&q=80",
  },
  {
    name: "Truffle Risotto",
    desc: "Wild mushrooms · aged parmesan",
    img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=800&q=80",
  },
  {
    name: "Wild Sea Bass",
    desc: "Yuzu foam · dashi broth",
    img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=800&q=80",
  },
];

const TEAM = [
  {
    name: "Éric Fontaine",
    role: "Executive Chef",
    bio: "Three Michelin stars. Trained under Ducasse and Robuchon.",
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80",
  },
  {
    name: "Nadia Sato",
    role: "Pastry Chef",
    bio: "World Pastry Champion 2019. Known for architectural desserts.",
    img: "https://images.unsplash.com/photo-1607631568010-a87245c0daf7?w=400&q=80",
  },
];

/* ─── GOLD DIVIDER ─── */
const GoldLine = () => (
  <div className="flex items-center gap-4 my-8">
    <div className="flex-1 h-px bg-gold/20" />
    <div className="w-1.5 h-1.5 rotate-45 bg-gold/60" />
    <div className="flex-1 h-px bg-gold/20" />
  </div>
);

/* ─── MAGNETIC BUTTON ─── */
function MagneticButton({ children, onClick, outlined = false }) {
  const ref = useRef();
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.25;
    ref.current.style.transform = `translate(${x}px,${y}px)`;
  };
  const reset = () => (ref.current.style.transform = "translate(0,0)");
  return (
    <button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      onClick={onClick}
      className={`
        relative px-8 py-3 font-sans text-xs tracking-widest2 uppercase
        transition-all duration-300 cursor-pointer
        ${
          outlined
            ? "border border-gold/50 text-gold hover:bg-gold/10"
            : "bg-gold text-charcoal hover:bg-gold-light"
        }
      `}
    >
      {children}
    </button>
  );
}

/* ─── REVEAL ─── */
function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

/* ─── NAVBAR ─── */
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-charcoal/95 backdrop-blur-xl border-b border-gold/10" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => setPage("Home")}
          className="font-display text-2xl text-white tracking-[0.15em] italic"
        >
          Aurum
        </button>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-10">
          {["Home", "Menu", "Team", "Contact"].map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className={`font-sans text-xs tracking-widest uppercase transition-colors duration-200 ${
                page === n ? "text-gold" : "text-white/50 hover:text-white/90"
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <MagneticButton onClick={() => setPage("Contact")}>
          Reserve
        </MagneticButton>
      </div>
    </nav>
  );
}

/* ─── HERO ─── */
function Hero({ setPage }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 160]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Parallax image */}
      <motion.div style={{ y }} className="absolute inset-0 scale-110">
        <img
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=85"
          className="w-full h-full object-cover"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-charcoal/40 to-charcoal" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.3em" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="font-sans text-gold text-xs tracking-widest2 uppercase mb-8"
        >
          Established 2018 · Paris
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-white text-6xl md:text-8xl leading-none mb-6"
        >
          Fine Dining<br />
          <span className="italic text-gold">Reimagined</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-sans text-white/50 text-sm tracking-wide mb-12 max-w-md mx-auto"
        >
          A three-Michelin-starred sanctuary where classical technique meets
          avant-garde imagination.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex gap-4 justify-center"
        >
          <MagneticButton onClick={() => setPage("Contact")}>
            Reserve a Table
          </MagneticButton>
          <MagneticButton outlined onClick={() => setPage("Menu")}>
            Explore Menu
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-gold/50" />
      </motion.div>
    </section>
  );
}

/* ─── FEATURED DISHES ─── */
function FeaturedDishes() {
  return (
    <section className="py-32 max-w-7xl mx-auto px-6">
      <Reveal>
        <div className="text-center mb-16">
          <p className="font-sans text-gold text-xs tracking-widest2 uppercase mb-4">
            Culinary Artistry
          </p>
          <h2 className="font-display text-white text-5xl md:text-6xl italic">
            Featured Dishes
          </h2>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-3 gap-6">
        {FEATURED.map((d, i) => (
          <Reveal key={i} delay={i * 0.15}>
            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden cursor-pointer"
            >
              <div className="overflow-hidden aspect-[4/5]">
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  src={d.img}
                  className="w-full h-full object-cover"
                  alt={d.name}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <GoldLine />
                <h3 className="font-display text-white text-2xl italic mb-1">
                  {d.name}
                </h3>
                <p className="font-sans text-white/50 text-xs tracking-wider">
                  {d.desc}
                </p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── EXPERIENCE STRIP ─── */
function ExperienceStrip() {
  const stats = [
    { value: "3", label: "Michelin Stars" },
    { value: "12", label: "Course Tasting Menu" },
    { value: "800+", label: "Wine Labels" },
    { value: "20", label: "Years of Excellence" },
  ];
  return (
    <section className="border-y border-gold/15 py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="text-center">
              <p className="font-display text-gold text-5xl italic mb-2">
                {s.value}
              </p>
              <p className="font-sans text-white/40 text-xs tracking-widest uppercase">
                {s.label}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ─── QUOTE ─── */
function Quote() {
  return (
    <section className="py-32 px-6 text-center max-w-3xl mx-auto">
      <Reveal>
        <p className="font-display text-white/80 text-3xl md:text-4xl italic leading-relaxed">
          "We do not simply cook — we compose experiences that linger long after
          the last course."
        </p>
        <p className="font-sans text-gold text-xs tracking-widest2 uppercase mt-8">
          — Éric Fontaine, Executive Chef
        </p>
      </Reveal>
    </section>
  );
}

/* ─── HOME ─── */
function Home({ setPage }) {
  return (
    <>
      <Hero setPage={setPage} />
      <FeaturedDishes />
      <ExperienceStrip />
      <Quote />
    </>
  );
}

/* ─── MENU PAGE ─── */
function MenuPage() {
  const [active, setActive] = useState(0);
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
      <Reveal>
        <div className="text-center mb-16">
          <p className="font-sans text-gold text-xs tracking-widest2 uppercase mb-4">
            À La Carte
          </p>
          <h2 className="font-display text-white text-5xl md:text-6xl italic">
            Our Menu
          </h2>
        </div>
      </Reveal>

      {/* Category Tabs */}
      <div className="flex justify-center gap-0 mb-16 border border-gold/20">
        {MENU_CATEGORIES.map((c, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`flex-1 py-3 font-sans text-xs tracking-widest uppercase transition-all duration-300 ${
              active === i
                ? "bg-gold text-charcoal"
                : "text-white/40 hover:text-white/70"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
          className="space-y-0"
        >
          {MENU_CATEGORIES[active].items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group py-7 border-b border-white/8 flex items-start justify-between gap-6 hover:border-gold/30 transition-colors duration-300"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-display text-white text-xl italic">
                    {item.name}
                  </h3>
                  {item.tag && (
                    <span className="font-sans text-[10px] text-gold border border-gold/30 px-2 py-0.5 tracking-wider uppercase">
                      {item.tag}
                    </span>
                  )}
                </div>
                <p className="font-sans text-white/40 text-xs tracking-wide">
                  {item.desc}
                </p>
              </div>
              <p className="font-display text-gold text-xl mt-0.5">
                €{item.price}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <Reveal>
        <p className="font-sans text-white/25 text-xs text-center mt-12 tracking-wide">
          All prices include taxes. Tasting menu available for the full table only.
        </p>
      </Reveal>
    </div>
  );
}

/* ─── TEAM PAGE ─── */
function TeamPage() {
  return (
    <div className="pt-32 pb-24 max-w-5xl mx-auto px-6">
      <Reveal>
        <div className="text-center mb-20">
          <p className="font-sans text-gold text-xs tracking-widest2 uppercase mb-4">
            The Artists
          </p>
          <h2 className="font-display text-white text-5xl md:text-6xl italic">
            Our Team
          </h2>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 gap-12">
        {TEAM.map((t, i) => (
          <Reveal key={i} delay={i * 0.2}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="group"
            >
              <div className="overflow-hidden mb-6 aspect-[3/2]">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={t.img}
                  className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition-all duration-700"
                  alt={t.name}
                />
              </div>
              <GoldLine />
              <h3 className="font-display text-white text-2xl italic mb-1">
                {t.name}
              </h3>
              <p className="font-sans text-gold text-xs tracking-widest uppercase mb-3">
                {t.role}
              </p>
              <p className="font-sans text-white/45 text-sm leading-relaxed">
                {t.bio}
              </p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ─── CONTACT PAGE ─── */
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", date: "", guests: "2", note: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.date) return;
    setSent(true);
  };

  return (
    <div className="pt-32 pb-24 max-w-2xl mx-auto px-6">
      <Reveal>
        <div className="text-center mb-16">
          <p className="font-sans text-gold text-xs tracking-widest2 uppercase mb-4">
            Join Us
          </p>
          <h2 className="font-display text-white text-5xl md:text-6xl italic">
            Reserve a Table
          </h2>
        </div>
      </Reveal>

      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20"
          >
            <div className="w-16 h-16 border border-gold/40 rotate-45 mx-auto mb-8 flex items-center justify-center">
              <div className="-rotate-45 text-gold text-2xl">✓</div>
            </div>
            <h3 className="font-display text-white text-3xl italic mb-4">
              Reservation Received
            </h3>
            <p className="font-sans text-white/45 text-sm">
              We will confirm your table within 24 hours.
            </p>
          </motion.div>
        ) : (
          <motion.div key="form" initial={{ opacity: 1 }} className="space-y-6">
            {[
              { label: "Full Name", key: "name", type: "text", placeholder: "Jean-Pierre Morel" },
              { label: "Email Address", key: "email", type: "email", placeholder: "jp.morel@email.com" },
              { label: "Preferred Date", key: "date", type: "date", placeholder: "" },
            ].map((f) => (
              <Reveal key={f.key}>
                <div>
                  <label className="block font-sans text-xs text-white/40 tracking-widest uppercase mb-2">
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                    className="w-full bg-transparent border-b border-white/15 hover:border-gold/40 focus:border-gold text-white font-sans text-sm py-3 outline-none transition-colors duration-300 placeholder-white/20"
                  />
                </div>
              </Reveal>
            ))}

            <Reveal>
              <div>
                <label className="block font-sans text-xs text-white/40 tracking-widest uppercase mb-2">
                  Number of Guests
                </label>
                <select
                  value={form.guests}
                  onChange={(e) => setForm({ ...form, guests: e.target.value })}
                  className="w-full bg-charcoal border-b border-white/15 hover:border-gold/40 focus:border-gold text-white font-sans text-sm py-3 outline-none transition-colors duration-300"
                >
                  {[1,2,3,4,5,6,7,8].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "Guest" : "Guests"}</option>
                  ))}
                </select>
              </div>
            </Reveal>

            <Reveal>
              <div>
                <label className="block font-sans text-xs text-white/40 tracking-widest uppercase mb-2">
                  Special Requests
                </label>
                <textarea
                  placeholder="Dietary requirements, special occasions…"
                  value={form.note}
                  rows={3}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="w-full bg-transparent border-b border-white/15 hover:border-gold/40 focus:border-gold text-white font-sans text-sm py-3 outline-none transition-colors duration-300 resize-none placeholder-white/20"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="pt-4">
                <MagneticButton onClick={handleSubmit}>
                  Confirm Reservation
                </MagneticButton>
              </div>
            </Reveal>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info strip */}
      <GoldLine />
      <Reveal>
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: "Address", val: "14 Rue de la Paix, Paris" },
            { label: "Hours", val: "Tue – Sat · 19:00 – 23:00" },
            { label: "Phone", val: "+33 1 42 00 00 00" },
          ].map((i) => (
            <div key={i.label}>
              <p className="font-sans text-gold text-xs tracking-widest uppercase mb-1">
                {i.label}
              </p>
              <p className="font-sans text-white/45 text-xs leading-relaxed">
                {i.val}
              </p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

/* ─── FOOTER ─── */
function Footer({ setPage }) {
  return (
    <footer className="border-t border-gold/10 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="font-display text-white/30 text-xl italic">Aurum</p>
        <div className="flex gap-8">
          {["Home", "Menu", "Team", "Contact"].map((n) => (
            <button
              key={n}
              onClick={() => setPage(n)}
              className="font-sans text-white/25 text-xs tracking-widest uppercase hover:text-gold transition-colors"
            >
              {n}
            </button>
          ))}
        </div>
        <p className="font-sans text-white/20 text-xs">
          © {new Date().getFullYear()} Aurum · All rights reserved
        </p>
      </div>
    </footer>
  );
}

/* ─── APP ─── */
export default function App() {
  useTailwind();
  const [page, setPage] = useState("Home");

  const pages = {
    Home: <Home setPage={setPage} />,
    Menu: <MenuPage />,
    Team: <TeamPage />,
    Contact: <ContactPage />,
  };

  // Scroll to top on page change
  useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), [page]);

  return (
    <div
      style={{ fontFamily: "'DM Sans', sans-serif" }}
      className="bg-charcoal min-h-screen text-white overflow-x-hidden"
    >
      {/* Ambient glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.04]"
          style={{ background: "#C9A96E", filter: "blur(160px)" }}
        />
        <div
          className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.03]"
          style={{ background: "#C9A96E", filter: "blur(180px)" }}
        />
      </div>

      <Navbar page={page} setPage={setPage} />

      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {pages[page]}
        </motion.main>
      </AnimatePresence>

      <Footer setPage={setPage} />
    </div>
  );
}