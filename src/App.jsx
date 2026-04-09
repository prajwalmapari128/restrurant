import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";

/* ─── DATA ─── */
const NAV = ["Home", "Menu", "Contact"];

const DISHES = [
  {
    name: "Wagyu A5",
    desc: "Truffle jus, pomme purée",
    img: "https://images.unsplash.com/photo-1558030006-450675393462",
  },
  {
    name: "Truffle Risotto",
    desc: "Wild mushrooms, parmesan",
    img: "https://images.unsplash.com/photo-1476124369491-e7addf5db371",
  },
  {
    name: "Sea Bass",
    desc: "Yuzu foam, dashi broth",
    img: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
  },
];

/* ─── MAGNETIC BUTTON ─── */
function MagneticButton({ children }) {
  const ref = useRef();

  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    ref.current.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const reset = () => (ref.current.style.transform = "translate(0,0)");

  return (
    <button
      ref={ref}
      onMouseMove={move}
      onMouseLeave={reset}
      className="px-6 py-3 bg-[#E6C36A] text-black rounded-full transition"
    >
      {children}
    </button>
  );
}

/* ─── REVEAL ─── */
function Reveal({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

/* ─── NAVBAR ─── */
function Navbar({ setPage }) {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl flex justify-between items-center px-6 py-3 bg-white/5 backdrop-blur-xl rounded-full border border-white/10">
      <h1 className="text-white font-serif">AURUM.</h1>
      <div className="hidden md:flex gap-6 text-white/70">
        {NAV.map((n) => (
          <button key={n} onClick={() => setPage(n)}>
            {n}
          </button>
        ))}
      </div>
      <MagneticButton>Reserve</MagneticButton>
    </div>
  );
}

/* ─── HERO ─── */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 120]);

  return (
    <section className="h-screen relative overflow-hidden">
      <motion.img
        style={{ y }}
        src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0"
        className="absolute w-full h-full object-cover scale-110 opacity-50"
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl text-white font-serif"
        >
          Fine Dining <br />
          <span className="text-[#E6C36A]">Reimagined</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/60 mt-4"
        >
          A luxury culinary journey
        </motion.p>
      </div>
    </section>
  );
}

/* ─── DISH CARD ─── */
function Dish({ d }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
      className="bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden"
    >
      <img src={d.img} className="h-56 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-white">{d.name}</h3>
        <p className="text-white/60 text-sm">{d.desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── HOME ─── */
function Home() {
  return (
    <div>
      <Hero />

      <Reveal>
        <section className="py-32 max-w-6xl mx-auto px-6">
          <h2 className="text-4xl text-white text-center mb-10 font-serif">
            Featured Dishes
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {DISHES.map((d, i) => (
              <Dish key={i} d={d} />
            ))}
          </div>
        </section>
      </Reveal>
    </div>
  );
}

/* ─── CONTACT ─── */
function Contact() {
  return (
    <div className="py-32 text-center text-white">
      <h2 className="text-4xl font-serif mb-6">Reserve a Table</h2>
      <MagneticButton>Book Now</MagneticButton>
    </div>
  );
}

/* ─── APP ─── */
export default function App() {
  const [page, setPage] = useState("Home");

  const pages = {
    Home: <Home />,
    Contact: <Contact />,
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">
      {/* Glow */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute w-[400px] h-[400px] bg-[#E6C36A]/20 blur-[120px]" />
      </div>

      <Navbar setPage={setPage} />

      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ duration: 0.6 }}
        >
          {pages[page]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}