"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  ChevronRight,
  ArrowUp,
  Menu,
  X,
  CheckCircle2,
  Hammer,
  Ruler,
  HardHat,
  Users,
  Star,
} from "lucide-react";

/* ──────────────────── Intersection Observer Hook ──────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ──────────────────── Section Wrapper ──────────────────── */
function Section({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const { ref, inView } = useInView(0.1);
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </section>
  );
}

/* ──────────────────── DATA ──────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const PROJECTS = [
  {
    title: "Luxury Living Spaces",
    category: "Interior",
    image: "/images/photo_luxury_living.png",
    description:
      "Exquisite living spaces featuring premium materials, elegant furnishings, and sophisticated design elements that redefine luxury living.",
  },
  {
    title: "Executive Interiors",
    category: "Interior",
    image: "/images/photo_luxury_office.png",
    description:
      "Refined office and formal spaces with bespoke woodwork, rich leather furnishings, and chandelier-lit ambience.",
  },
  {
    title: "Architectural Landmarks",
    category: "Architecture",
    image: "/images/photo_arched_building.png",
    description:
      "Iconic structures featuring curved facades, arched windows, and distinctive architectural character.",
  },
  {
    title: "Modern Residential Towers",
    category: "Residential",
    image: "/images/photo_apartments_red.png",
    description:
      "Modern residential complexes with striking facades, balconies, and comfortable living in prime locations.",
  },
  {
    title: "Sports Facilities",
    category: "Infrastructure",
    image: "/images/photo_sports_aerial.png",
    description:
      "Professional-grade sports complexes with Olympic-standard tracks, natural and artificial turf fields.",
  },
  {
    title: "Grand Halls & Venues",
    category: "Commercial",
    image: "/images/photo_grand_hall.png",
    description:
      "Stunning event spaces with arched windows, chandeliers, and elegant architectural details.",
  },
  {
    title: "Commercial Buildings",
    category: "Commercial",
    image: "/images/photo_blue_building.png",
    description:
      "Modern commercial and institutional buildings with contemporary design and quality construction.",
  },
];

const SERVICES = [
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Real Estate Development",
    description:
      "From concept to completion, we develop premium residential and commercial properties that exceed expectations and deliver lasting value.",
  },
  {
    icon: <Hammer className="w-8 h-8" />,
    title: "General Contracting",
    description:
      "Full-spectrum construction services backed by decades of experience, ensuring every project is delivered on time and within budget.",
  },
  {
    icon: <Ruler className="w-8 h-8" />,
    title: "Interior Design",
    description:
      "Transforming spaces into breathtaking environments with bespoke interior solutions tailored to each client's unique taste and lifestyle.",
  },
  {
    icon: <HardHat className="w-8 h-8" />,
    title: "Infrastructure Projects",
    description:
      "Building the foundation of communities with roads, sports facilities, utilities, and large-scale public infrastructure projects.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Project Management",
    description:
      "Expert oversight from planning through execution, coordinating every detail to ensure seamless delivery of complex developments.",
  },
  {
    icon: <Star className="w-8 h-8" />,
    title: "Luxury Finishes",
    description:
      "Premium materials and craftsmanship for the finest finishing touches, from Italian marble to custom woodwork and designer fixtures.",
  },
];

const STATS = [
  { value: "200+", label: "Projects Completed" },
  { value: "15+", label: "Years Experience" },
  { value: "500+", label: "Happy Clients" },
  { value: "50+", label: "Expert Team Members" },
];

/* ═══════════════════════ MAIN PAGE ═══════════════════════ */
export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      setShowTop(window.scrollY > 400);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPercent(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ─── NAVBAR ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src="/images/logo.png"
              alt="EL NAGGAR CONTRACTING Logo"
              className="h-10 w-auto object-contain"
            />
            <div className="flex flex-col">
              <span
                className={`text-lg font-bold tracking-wide transition-colors ${
                  scrolled ? "text-[#2d5051]" : "text-white"
                }`}
              >
                EL NAGGAR
              </span>
              <span
                className={`text-[10px] tracking-[0.2em] uppercase transition-colors ${
                  scrolled ? "text-[#987e55]" : "text-[#b89b6a]"
                }`}
              >
                CONTRACTING
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-[#987e55] ${
                  scrolled ? "text-[#2d5051]" : "text-white/90"
                }`}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact">
              <Button
                size="sm"
                className="bg-[#987e55] hover:bg-[#b08840] hover:shadow-lg hover:-translate-y-0.5 text-white font-medium rounded-none transition-all duration-200"
              >
                Get a Quote
              </Button>
            </a>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`md:hidden p-2 ${
              scrolled ? "text-[#2d5051]" : "text-white"
            }`}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-[#e5ddd3] shadow-lg">
            <div className="px-4 py-4 flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#2d5051] font-medium py-2 border-b border-[#e5ddd3]/50"
                >
                  {l.label}
                </a>
              ))}
              <a href="#contact" onClick={() => setMobileOpen(false)}>
                <Button className="w-full bg-[#987e55] hover:bg-[#b08840] hover:shadow-lg text-white font-medium mt-2 rounded-none transition-all duration-200">
                  Get a Quote
                </Button>
              </a>
            </div>
          </div>
        )}
        {/* ── Scroll progress bar ── */}
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#e5ddd3]/30">
          <div
            className="h-full bg-[#987e55] transition-[width] duration-100"
            style={{ width: `${scrollPercent}%` }}
          />
        </div>
      </header>

      {/* ─── HERO ─── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image from the carousel - using the interiors/buildings slide */}
        <div className="absolute inset-0">
          <img
            src="/images/photo_ornate_hall.png"
            alt="EL NAGGAR Project"
            className="w-full h-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img
              src="/images/logo.png"
              alt="EL NAGGAR CONTRACTING Logo"
              className="h-20 sm:h-24 md:h-28 w-auto object-contain drop-shadow-lg"
            />
          </div>

          <div className="inline-block mb-6">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#987e55]" />
              <span className="text-[#b89b6a] text-sm tracking-[0.3em] uppercase font-medium">
                Established Excellence
              </span>
              <div className="h-px w-12 bg-[#987e55]" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            EL NAGGAR
            <span className="block text-[#b89b6a] text-2xl sm:text-3xl md:text-4xl font-normal mt-2 tracking-[0.15em]">
              CONTRACTING
            </span>
          </h1>

          <p className="text-xl sm:text-2xl md:text-3xl text-[#b89b6a] font-light italic mb-8 tracking-wide">
            &ldquo;You Dream..We Build&rdquo;
          </p>

          <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Transforming visions into iconic structures. From luxury residences to
            large-scale commercial developments, EL NAGGAR CONTRACTING delivers
            excellence in every project.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#projects">
              <Button
                size="lg"
                className="bg-[#987e55] hover:bg-[#7a6340] text-white font-semibold px-8 rounded-none text-base"
              >
                Explore Our Projects
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </a>
            <a href="#contact">
              <Button
                size="lg"
                variant="outline"
                className="border-[#b89b6a] text-[#b89b6a] hover:bg-[#b89b6a] hover:text-[#1e3a3b] rounded-none px-8 text-base transition-all duration-200"
              >
                Contact Us
              </Button>
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/50 text-xs tracking-widest uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <Section className="bg-[#2d5051] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#b89b6a] mb-1">
                  {s.value}
                </div>
                <div className="text-white/70 text-sm tracking-wide uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── ABOUT ─── */}
      <Section id="about" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image side */}
            <div className="relative p-3">
              <div className="absolute inset-0 border-2 border-[#987e55]/30" />
              <img
                src="/images/photo_yellow_building.png"
                alt="EL NAGGAR Architectural Projects"
                className="relative z-10 w-full h-[400px] md:h-[500px] object-cover shadow-lg"
              />
            </div>

            {/* Text side */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="section-divider" />
                <span className="text-[#987e55] text-sm tracking-[0.2em] uppercase font-medium">
                  About Us
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-[#2d5051] mb-6">
                Building Egypt&apos;s Future,
                <br />
                <span className="text-[#987e55]">One Project at a Time</span>
              </h2>

              <p className="text-gray-600 leading-relaxed mb-4">
                EL NAGGAR CONTRACTING is a premier real estate development and
                construction company with over 15 years of experience in delivering
                exceptional projects across Egypt. Our portfolio spans residential
                communities, commercial complexes, sports facilities, and luxury
                interior design.
              </p>

              <p className="text-gray-600 leading-relaxed mb-6">
                From the initial architectural concept to the final finishing
                touches, we bring a meticulous attention to detail and an
                unwavering commitment to quality that has earned us the trust of
                hundreds of clients and established our reputation as industry
                leaders.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  "Premium Materials",
                  "On-Time Delivery",
                  "Expert Team",
                  "Client-Focused",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-[#987e55] flex-shrink-0" />
                    <span className="text-sm text-gray-700 font-medium">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <a href="#contact">
                <Button className="bg-[#2d5051] hover:bg-[#1e3a3b] text-white font-medium px-8 rounded-none">
                  Learn More About Us
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── SERVICES ─── */}
      <Section id="services" className="py-20 md:py-28 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="section-divider" />
              <span className="text-[#987e55] text-sm tracking-[0.2em] uppercase font-medium">
                What We Do
              </span>
              <div className="section-divider" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2d5051] mb-4">
              Our Services
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Comprehensive construction and development solutions tailored to meet
              the highest standards of quality and innovation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <Card
                key={i}
                className="group border-[#e5ddd3] hover:border-[#987e55] transition-all duration-300 hover:shadow-lg bg-white rounded-none"
              >
                <CardContent className="p-6 pt-6">
                  <div className="w-14 h-14 bg-[#2d5051]/5 rounded-none flex items-center justify-center mb-4 text-[#2d5051] group-hover:bg-[#2d5051] group-hover:text-white transition-colors duration-300">
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#2d5051] mb-3">
                    {s.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {s.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── FEATURED PROJECTS ─── */}
      <Section id="projects" className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="section-divider" />
              <span className="text-[#987e55] text-sm tracking-[0.2em] uppercase font-medium">
                Portfolio
              </span>
              <div className="section-divider" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2d5051] mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Explore our diverse portfolio of completed projects, each a
              testament to our commitment to quality and innovation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p, i) => (
              <div
                key={i}
                className="project-card group cursor-pointer overflow-hidden"
              >
                <div className="relative overflow-hidden aspect-[4/5]">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="project-image w-full h-full object-cover transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2d5051] via-[#2d5051]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-[#b89b6a] text-xs tracking-[0.2em] uppercase font-medium">
                      {p.category}
                    </span>
                    <h3 className="text-white text-lg font-bold mt-1">
                      {p.title}
                    </h3>
                  </div>
                </div>
                <div className="bg-white p-4 border border-t-0 border-[#e5ddd3]">
                  <span className="text-[#987e55] text-xs tracking-[0.15em] uppercase font-medium">
                    {p.category}
                  </span>
                  <h3 className="text-[#2d5051] text-base font-bold mt-1 mb-2">
                    {p.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── CTA BANNER ─── */}
      <Section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/photo_white_buildings.png"
            alt="Grand Hall"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#2d5051]/85" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Your
            <br />
            <span className="text-[#b89b6a]">Dream Project?</span>
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto">
            Whether you&apos;re planning a luxury residence, a commercial complex, or a
            large-scale development, our team is ready to turn your vision into
            reality.
          </p>
          <a href="#contact">
            <Button
              size="lg"
              className="bg-[#987e55] hover:bg-[#7a6340] text-white font-semibold px-10 text-base rounded-none"
            >
              Start Your Project Today
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </a>
        </div>
      </Section>

      {/* ─── CONTACT ─── */}
      <Section id="contact" className="py-20 md:py-28 bg-[#faf8f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="section-divider" />
              <span className="text-[#987e55] text-sm tracking-[0.2em] uppercase font-medium">
                Get In Touch
              </span>
              <div className="section-divider" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2d5051] mb-4">
              Contact Us
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Have a project in mind? Reach out to us and let&apos;s discuss how we
              can bring your vision to life.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-10">
            {/* Contact Info */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-[#2d5051] mb-6">
                  EL NAGGAR CONTRACTING
                </h3>
                <p className="text-[#987e55] italic text-lg mb-8">
                  &ldquo;You Dream..We Build&rdquo;
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#2d5051] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2d5051] text-sm">
                      Office Address
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">
                      Egypt
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#2d5051] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2d5051] text-sm">
                      Phone
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">
                      +20 123 456 7890
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#2d5051] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#2d5051] text-sm">
                      Email
                    </h4>
                    <p className="text-gray-500 text-sm mt-1">
                      info@elnaggar-contracting.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              <Card className="border-[#e5ddd3] rounded-none shadow-sm">
                <CardContent className="p-6 sm:p-8">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                    className="space-y-5"
                  >
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-[#2d5051] mb-1.5">
                          Full Name
                        </label>
                        <Input
                          placeholder="Your name"
                          className="border-[#e5ddd3] focus:border-[#987e55] rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#2d5051] mb-1.5">
                          Phone Number
                        </label>
                        <Input
                          placeholder="+20 xxx xxx xxxx"
                          className="border-[#e5ddd3] focus:border-[#987e55] rounded-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2d5051] mb-1.5">
                        Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        className="border-[#e5ddd3] focus:border-[#987e55] rounded-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2d5051] mb-1.5">
                        Project Type
                      </label>
                      <select className="w-full h-10 px-3 border border-[#e5ddd3] rounded-none bg-white text-sm text-gray-500 focus:outline-none focus:border-[#987e55]">
                        <option>Select project type</option>
                        <option>Residential Development</option>
                        <option>Commercial Building</option>
                        <option>Interior Design</option>
                        <option>Infrastructure</option>
                        <option>Renovation</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#2d5051] mb-1.5">
                        Message
                      </label>
                      <Textarea
                        rows={4}
                        placeholder="Tell us about your project..."
                        className="border-[#e5ddd3] focus:border-[#987e55] rounded-none resize-none"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-[#2d5051] hover:bg-[#1e3a3b] text-white font-semibold rounded-none"
                    >
                      Send Message
                      <ChevronRight className="ml-2 w-4 h-4" />
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#1e3a3b] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/images/logo.png"
                  alt="EL NAGGAR Logo"
                  className="h-9 w-auto object-contain"
                />
                <div>
                  <span className="text-lg font-bold tracking-wide">
                    EL NAGGAR
                  </span>
                  <br />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#b89b6a]">
                    CONTRACTING
                  </span>
                </div>
              </div>
              <p className="text-[#987e55] italic text-sm mb-3">
                &ldquo;You Dream..We Build&rdquo;
              </p>
              <p className="text-white/60 text-sm leading-relaxed">
                Premier real estate development and construction company,
                delivering excellence since day one.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-sm tracking-wider uppercase mb-4 text-[#b89b6a]">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-white/60 text-sm hover:text-[#b89b6a] transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-sm tracking-wider uppercase mb-4 text-[#b89b6a]">
                Services
              </h4>
              <ul className="space-y-2.5">
                {SERVICES.slice(0, 5).map((s) => (
                  <li key={s.title}>
                    <a
                      href="#services"
                      className="text-white/60 text-sm hover:text-[#b89b6a] transition-colors"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-sm tracking-wider uppercase mb-4 text-[#b89b6a]">
                Contact
              </h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 text-[#987e55] flex-shrink-0" />
                  Egypt
                </li>
                <li className="flex items-center gap-2 text-white/60 text-sm">
                  <Phone className="w-4 h-4 text-[#987e55] flex-shrink-0" />
                  +20 123 456 7890
                </li>
                <li className="flex items-center gap-2 text-white/60 text-sm">
                  <Mail className="w-4 h-4 text-[#987e55] flex-shrink-0" />
                  info@elnaggar-contracting.com
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} EL NAGGAR CONTRACTING. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-white/40 text-sm hover:text-[#b89b6a] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/40 text-sm hover:text-[#b89b6a] transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* ─── BACK TO TOP ─── */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#987e55] hover:bg-[#7a6340] text-white flex items-center justify-center shadow-lg transition-all duration-300 rounded-none"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}