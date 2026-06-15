import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, Github } from "lucide-react";
import ParticleCanvas from "../../components/home/ParticleCanvas.jsx";
import Navbar from "../../components/layout/Navbar.jsx";

function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (el.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 h-24 w-[2px] bg-border-subtle hidden md:block z-40">
      <div
        className="w-[2px] bg-indigo-400 absolute top-0 left-0 transition-[height] duration-75"
        style={{ height: `${progress}%` }}
      />
    </div>
  );
}

function Label({ children }) {
  return (
    <h3 className="font-mono text-[13px] font-bold text-indigo-400 mb-4 uppercase tracking-wider">
      {children}
    </h3>
  );
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

const PlaceholderImage = ({ text }) => (
  <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] border border-white/5 rounded-lg text-white/20">
    <svg className="w-16 h-16 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
    <span className="font-mono text-sm tracking-widest uppercase">{text}</span>
  </div>
);

const SLIDER_IMAGES = [
  { url: "/images/iaif/home.png", caption: "Public Portal - Homepage" },
  { url: "/images/iaif/about.png", caption: "Public Portal - About Us" },
  { url: "/images/iaif/news.png", caption: "Public Portal - News" },
  { url: "/images/iaif/survey.png", caption: "Public Portal - Tracer Study Survey" },
  { url: "/images/iaif/discovery.png", caption: "Public Portal - Alumni Articles" },
  { url: "/images/iaif/userprofile.png", caption: "Dashboard - User Profile" },
  { url: "/images/iaif/artikel saya.png", caption: "Dashboard - My Articles" },
  { url: "/images/iaif/buat artikel.png", caption: "Dashboard - Create Article" },
  { url: "/images/iaif/admin dashboard.png", caption: "Admin Dashboard - Overview" },
  { url: "/images/iaif/kepengurusan.png", caption: "Admin Dashboard - Organization Structure Management" },
  { url: "/images/iaif/gallery.png", caption: "Admin Dashboard - Gallery Management" },
  { url: "/images/iaif/admin manager.png", caption: "Admin Dashboard - Admin Management" },
  { url: "/images/iaif/news manager.png", caption: "Admin Dashboard - News Management" },
  { url: "/images/iaif/discovery manager.png", caption: "Admin Dashboard - Discovery Management" },
  { url: "/images/iaif/kelola survey.png", caption: "Admin Dashboard - Survey Management" },
  { url: "/images/iaif/kelola respon survey.png", caption: "Admin Dashboard - Survey Responses" },
  { url: "/images/iaif/data alumni.png", caption: "Admin Dashboard - Alumni Data" },
];

function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(129,140,248,0.1)] group">
      <div 
        className="flex transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {SLIDER_IMAGES.map((img, i) => (
          <figure key={i} className="relative shrink-0 w-full flex flex-col items-center bg-[#181716]">
            <div className="w-full h-[320px] sm:h-[460px] p-8">
              <img src={img.url} alt={img.caption} className="w-full h-full object-contain block rounded-lg" draggable={false} />
            </div>
            <figcaption className="absolute bottom-0 w-full bg-black/80 backdrop-blur-md border-t border-white/10 font-mono text-[12px] text-white/80 px-4 py-4 text-center">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      
      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md opacity-0 transition-all duration-300 hover:bg-indigo-500/50 hover:scale-110 hover:border-indigo-400 group-hover:opacity-100">
        <ChevronLeft size={20} className="mr-0.5" />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md opacity-0 transition-all duration-300 hover:bg-indigo-500/50 hover:scale-110 hover:border-indigo-400 group-hover:opacity-100">
        <ChevronRight size={20} className="ml-0.5" />
      </button>

      <div className="absolute top-4 right-4 flex gap-2">
        {SLIDER_IMAGES.map((_, idx) => (
          <div key={idx} className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-4 bg-indigo-400" : "w-1.5 bg-white/30"}`} />
        ))}
      </div>
    </div>
  );
}

export default function WebsiteIAIF() {
  const navigate = useNavigate();
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <>
      <div className="relative min-h-screen bg-bg text-white selection:bg-neon selection:text-black">
        <ParticleCanvas spacing={20} bgColor="#121110" />
        <Navbar />
        <ScrollProgress />

        <header className="fixed top-4 left-4 md:top-8 md:left-8 z-50">
          <button onClick={() => navigate(-1)} className="group flex items-center gap-3 rounded-full border border-white/10 bg-black/40 px-5 py-2.5 backdrop-blur-md text-white/80 transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-500/20 hover:text-white hover:shadow-[0_0_20px_rgba(129,140,248,0.2)]">
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-mono text-[14px] font-bold uppercase tracking-widest">Back</span>
          </button>
        </header>

        <main className="relative z-10 pt-32 pb-24 flex flex-col gap-0">
          <FadeIn delay={0} className="px-6 md:px-20 mx-auto w-full max-w-[1000px]">
            <section className="w-full max-w-[800px] mx-auto flex flex-col gap-3">
              <div className="flex flex-col items-start gap-6">
                <h1 className="font-anton text-[4.5rem] md:text-[6.5rem] text-white uppercase tracking-normal leading-[0.85]">
                  WEBSITE IAIF UIN SGD
                </h1>
                
                <a href="https://github.com/Adtymm/Alumni-IAIF" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-6 py-3 font-mono text-[12px] font-bold uppercase tracking-widest text-indigo-300 transition-all hover:border-indigo-400 hover:bg-indigo-500/20 hover:text-white hover:shadow-[0_0_20px_rgba(129,140,248,0.2)] w-fit">
                  <Github size={18} className="transition-transform group-hover:scale-110" />
                  <span>View on Github</span>
                </a>
              </div>
            </section>
          </FadeIn>

          <FadeIn delay={120} className="px-6 md:px-20 mx-auto w-full max-w-[1000px] mt-8 mb-14">
            <div className="w-full max-w-[800px] mx-auto">
              <ImageSlider />
            </div>
          </FadeIn>

          <div className="px-6 md:px-20 mx-auto w-full max-w-[1000px]">
            <section className="grid grid-cols-1 md:grid-cols-12 gap-y-12 gap-x-16 w-full max-w-[800px] mx-auto">
              {/* LEFT */}
              <div className="md:col-span-4 flex flex-col gap-8">
                <FadeIn delay={70}>
                  <div>
                    <Label>Year</Label>
                    <p className="font-sans text-[16px] text-white/90">2024</p>
                  </div>
                </FadeIn>

                <FadeIn delay={140}>
                  <div>
                    <Label>Tech &amp; Technique</Label>
                    <p className="font-mono text-[13px] text-white/75 leading-relaxed">
                      React.js, Firebase,<br />
                      Tailwind CSS,<br />
                      REST API Integration
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={210}>
                  <div>
                    <Label>My Role</Label>
                    <p className="font-sans text-[15px] text-white font-semibold mb-4">
                      Solo Developer · Internship · Fullstack Developer
                    </p>
                    <ul className="flex flex-col gap-4 text-[14px] text-white/80">
                      {[
                        { title: "UI Redesign", text: "Completely overhauled the visual design — responsive layout, modern look, consistent design system built from scratch." },
                        { title: "Frontend Development", text: "Rebuilt the entire site using React.js with two distinct user-facing sides — a public alumni/user view and a private admin panel." },
                        { title: "Backend & Database", text: "Built a Firebase backend to manage alumni data, organizational board data, news content, and other IAIF-related records." },
                        { title: "API Integration", text: "Integrated the Informatics student/alumni data API so that only verified UIN SGD Informatics students or alumni can register or log in." },
                      ].map((item) => (
                        <li key={item.title} className="flex items-start gap-3">
                          <span className="text-neon mt-0.5 shrink-0 bg-indigo-400/20 rounded-sm w-5 h-5 flex items-center justify-center text-[10px] font-bold">✓</span>
                          <span><strong className="text-white">{item.title}:</strong> {item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </FadeIn>
              </div>

              {/* RIGHT */}
              <div className="md:col-span-8 flex flex-col gap-12">
                <FadeIn delay={100}>
                  <div>
                    <Label>Description</Label>
                    <p className="font-sans text-[18px] text-white/90 leading-relaxed">
                      A full redesign and redevelopment of the official IAIF (Informatics Student Association) website at UIN Sunan Gunung Djati Bandung — modernizing the UI, adding missing features, and building a complete admin backend, all as part of an internship.
                    </p>
                  </div>
                </FadeIn>

                <FadeIn delay={170}>
                  <div>
                    <Label>How It Works — Key Features</Label>
                    <div className="overflow-x-auto mt-4">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr>
                            <th className="font-mono text-[12px] text-white/40 uppercase tracking-wider py-3 border-b border-border-subtle">Feature</th>
                            <th className="font-mono text-[12px] text-white/40 uppercase tracking-wider py-3 border-b border-border-subtle">Detail</th>
                          </tr>
                        </thead>
                        <tbody className="text-[15px]">
                          <tr>
                            <td className="py-5 border-b border-border-subtle text-white pr-4">
                              <div className="font-bold">News Feed</div>
                              <div className="text-[10px] text-white/40 font-mono mt-1 uppercase tracking-widest">Internal</div>
                            </td>
                            <td className="py-5 border-b border-border-subtle text-white/80 leading-relaxed">
                              Displays IAIF-related news, manageable through the admin panel.
                            </td>
                          </tr>
                          <tr>
                            <td className="py-5 border-b border-border-subtle text-white pr-4">
                              <div className="font-bold">Verified Auth</div>
                              <div className="text-[10px] text-white/40 font-mono mt-1 uppercase tracking-widest">Security</div>
                            </td>
                            <td className="py-5 border-b border-border-subtle text-white/80 leading-relaxed">
                              Login restricted to verified Informatics students/alumni via university API.
                            </td>
                          </tr>
                          <tr>
                            <td className="py-5 border-b border-border-subtle text-white pr-4">
                              <div className="font-bold">Admin Dashboard</div>
                              <div className="text-[10px] text-white/40 font-mono mt-1 uppercase tracking-widest">Management</div>
                            </td>
                            <td className="py-5 border-b border-border-subtle text-white/80 leading-relaxed">
                              Full backend CMS to manage alumni data, board members, news, and articles.
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={240}>
                  <div>
                    <Label>What I Learned</Label>
                    <div className="p-5 border-l-2 border-indigo-400 bg-indigo-400/[0.03] rounded-r-lg">
                      <p className="font-sans text-[16px] text-white/80 italic leading-relaxed">
                        "This was my first real internship experience — and it taught me that <strong className="text-white not-italic">working for a real client is completely different from building personal projects.</strong> Requirements evolve, stakeholders have opinions, and the developer has to navigate all of it professionally. I learned what it means to <strong className="text-white not-italic">own a product end-to-end.</strong>"
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
