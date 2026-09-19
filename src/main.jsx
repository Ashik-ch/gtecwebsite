import React, {
  useState,
  useEffect,
  useRef,
  createContext,
  useContext,
} from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  useLocation,
  useParams,
} from "react-router-dom";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Plus,
  Check,
  CheckCircle2,
  GraduationCap,
  BookOpen,
  BriefcaseBusiness,
  Users,
  Sparkles,
  Play,
  Menu,
  X,
  Search,
  MessageCircle,
  Send,
  MapPin,
  Megaphone,
  Palette,
  Armchair,
  Calculator,
  Table2,
  Layers3,
  Code2,
  Target,
  Lightbulb,
  Monitor,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { courses, site, faqs } from "./data";
import "./styles.css";
import { Mascot, GioWelcome, GioFinder } from "./Mascot";
import ScrollMotion from "./ScrollMotion";
import TeamDirectory from "./TeamDirectory";
import PlacedStudents from "./PlacedStudents";

const EnquiryContext = createContext();
const icons = {
  Megaphone,
  Palette,
  Armchair,
  Calculator,
  Table2,
  Layers3,
  Code2,
};
const photo = (id, width = 800) => `/images/${id}-${width}.jpg`;
const Arrow = () => <ArrowUpRight size={18} aria-hidden="true" />;
const Linkedin = () => (
  <span
    aria-hidden="true"
    style={{ fontWeight: 700, fontSize: 20, fontFamily: "Arial,sans-serif" }}
  >
    in
  </span>
);
function Enquire({
  children = "Enquire now",
  className = "button primary",
  course = "",
}) {
  const open = useContext(EnquiryContext);
  return (
    <button className={className} onClick={() => open(course)}>
      {children}
      <Arrow />
    </button>
  );
}
function Logo() {
  return (
    <Link to="/" className="logo" aria-label="G-TEC Mahe home">
      <img src="/images/gTec.PNG" alt="G-TEC Education Mahe" />
    </Link>
  );
}
function Header() {
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setMenu(false), [pathname]);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Logo />
        <nav
          aria-label="Main navigation"
          className={menu ? "nav-links open" : "nav-links"}
        >
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/about">About us</NavLink>
          <NavLink to="/courses">
            Courses <ChevronDown size={13} />
          </NavLink>
          <NavLink to="/placements">Placements</NavLink>
          <Link to="/#life">Life at G-TEC</Link>
          <Link to="/#contact">Contact</Link>
        </nav>
        <Enquire className="button primary nav-enquire" />
        <button
          className="menu-button"
          aria-label={menu ? "Close navigation" : "Open navigation"}
          aria-expanded={menu}
          onClick={() => setMenu(!menu)}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
function SectionTitle({ eyebrow, title, text, children }) {
  return (
    <div className="section-title reveal">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {text && <p>{text}</p>}
      </div>
      {children}
    </div>
  );
}
function Hero() {
  return (
    <section className="hero container">
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span /> YOUR NEXT CHAPTER STARTS HERE
        </div>
        <h1>
          Big dreams.
          <br />
          Real skills.
          <br />
          <span>A brighter future.</span>
          <svg className="underline" viewBox="0 0 410 15" aria-hidden="true">
            <path d="M3 10Q180-3 406 8" />
          </svg>
        </h1>
        <p>
          Discover your potential with career-focused learning.
          <br className="desktop-break" /> Build the skills to turn your
          ambition into opportunity
          <br className="desktop-break" /> at G-TEC Mahe.
        </p>
        <div className="hero-actions">
          <Link className="button primary" to="/courses">
            Explore our courses <Arrow />
          </Link>
          <Link className="text-button" to="/about">
            <span className="play-circle">
              <Play size={12} fill="currentColor" />
            </span>
            Get to know us
          </Link>
        </div>
        <div className="hero-bottom">
          <div className="mini-avatars">
            <img src={photo("photo-1500648767791-00dcc994a43e", 80)} alt="" />
            <img src={photo("photo-1534528741775-53994a69daeb", 80)} alt="" />
            <img src={photo("photo-1506794778202-cad84cf45f1d", 80)} alt="" />
            <span>
              <GraduationCap size={17} />
            </span>
          </div>
          <p>
            A place to learn.
            <br />
            <strong>A community to grow.</strong>
          </p>
        </div>
      </div>
      <div
        className="hero-art"
        aria-label="Meet Gio, the G-TEC Mahe learning companion"
      >
        <span className="orbit orbit-one" />
        <span className="orbit orbit-two" />
        <span className="spark spark-one">✳</span>
        <span className="spark spark-two">✧</span>
        <GioWelcome />
        <div className="floating-badge badge-skills">
          <span className="badge-icon">
            <BookOpen size={23} />
          </span>
          <span>
            <strong>Learn by doing</strong>
            <small>Skills beyond the classroom</small>
          </span>
        </div>
        <div className="floating-badge badge-career">
          <span className="badge-icon green">
            <BriefcaseBusiness size={22} />
          </span>
          <span>
            <strong>Your future, in focus</strong>
            <small>Career-oriented learning</small>
          </span>
          <span className="tiny-check">
            <Check size={12} />
          </span>
        </div>
        <div className="image-label">
          <span /> MEET GIO · YOUR LEARNING COMPANION
        </div>
        <span className="vertical-label">INNOVATING YOUR TECH FUTURE</span>
      </div>
    </section>
  );
}
function Benefits() {
  return (
    <div className="container benefits">
      {[
        [BookOpen, "Practical learning", "Build skills that matter"],
        [Users, "Expert guidance", "Learn with a personal touch"],
        [BriefcaseBusiness, "Career support", "Take your next step"],
        [GraduationCap, "Learning for everyone", "Find your starting point"],
      ].map(([Icon, title, desc]) => (
        <div key={title}>
          <span className="benefit-icon">
            <Icon size={23} strokeWidth={1.5} />
          </span>
          <span>
            <strong>{title}</strong>
            <small>{desc}</small>
          </span>
        </div>
      ))}
    </div>
  );
}
function CourseCard({ course }) {
  const Icon = icons[course.icon];
  return (
    <Link to={`/courses/${course.slug}`} className="course-card reveal">
      <div className="course-image" style={{ backgroundColor: course.color }}>
        <img
          src={photo(course.image, 650)}
          alt={`${course.name} learning field`}
          loading="lazy"
        />
        <span className="category-pill">{course.category}</span>
        <span className="course-card-icon">
          <Icon size={20} />
        </span>
      </div>
      <div className="course-body">
        <span className="course-kicker">{course.tag}</span>
        <h3>
          {course.name}
          <span>
            <Arrow />
          </span>
        </h3>
        <p>{course.description}</p>
        <div className="course-foot">
          <BookOpen size={14} /> Career-focused learning{" "}
          <span>
            Explore course <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
function CourseExplorer({ full = false }) {
  const [filter, setFilter] = useState("All courses");
  const [query, setQuery] = useState("");
  const [offset, setOffset] = useState(0);
  const filtered = courses.filter(
    (c) =>
      (filter === "All courses" || c.category === filter) &&
      `${c.name} ${c.description} ${c.tools.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const shown = full ? filtered : filtered.slice(offset, offset + 3);
  return (
    <section
      className={`section courses-section ${full ? "full-courses" : ""}`}
      id="courses"
    >
      <div className="container">
        <SectionTitle
          eyebrow="FIND YOUR DIRECTION"
          title={
            full
              ? "A new skill. A new possibility."
              : "Your ambition. Your course."
          }
          text="From your first step to your next big move, find a path that feels like you."
        >
          {!full && (
            <Link to="/courses" className="button outline">
              View all courses <Arrow />
            </Link>
          )}
        </SectionTitle>
        <div className="course-controls">
          <div className="filters" role="group" aria-label="Course category">
            {[
              "All courses",
              "Technology",
              "Design",
              "Marketing",
              "Business",
            ].map((f) => (
              <button
                key={f}
                aria-pressed={filter === f}
                className={filter === f ? "selected" : ""}
                onClick={() => {
                  setFilter(f);
                  setOffset(0);
                }}
              >
                {f}
                {f === "All courses" && <span>07</span>}
              </button>
            ))}
          </div>
          {full ? (
            <label className="search">
              <Search size={17} />
              <input
                aria-label="Search courses"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Find your course…"
              />
            </label>
          ) : (
            <div className="carousel-buttons">
              <button
                disabled={offset === 0}
                aria-label="Previous courses"
                onClick={() => setOffset(Math.max(0, offset - 3))}
              >
                <ArrowLeft size={18} />
              </button>
              <button
                disabled={offset + 3 >= filtered.length}
                aria-label="Next courses"
                onClick={() => setOffset(offset + 3)}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
        <div className="course-grid">
          {shown.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
        {!shown.length && (
          <div className="empty-state">
            <Mascot pose="curious" />
            <h3>No courses found</h3>
            <p>
              Gio’s tip: try another keyword or explore a different interest.
            </p>
            <button
              className="button outline"
              onClick={() => {
                setFilter("All courses");
                setQuery("");
              }}
            >
              Clear filters
            </button>
          </div>
        )}
        <div className="course-help">
          <Sparkles size={17} />
          <span>Not sure where to start? Let’s find your fit.</span>
          <Enquire className="inline-link">Talk to a course advisor</Enquire>
        </div>
        <GioFinder />
      </div>
    </section>
  );
}
function AboutSection() {
  return (
    <section className="section container about-section">
      <div className="about-image reveal">
        <img
          src={photo("about", 1000)}
          loading="lazy"
          alt="Illustrative photograph of learners collaborating around a table"
        />
        <div className="about-stamp">
          <GraduationCap size={34} />
          <strong>
            More than
            <br />a classroom.
          </strong>
          <span>A space to become.</span>
        </div>
        <span className="photo-caption">
          A shared spirit of learning · illustrative photograph
        </span>
      </div>
      <div className="about-copy reveal">
        <span className="eyebrow eyebrow-highlight">WELCOME TO G-TEC MAHE</span>
        <h2>
          Where potential
          <br />
          meets <span className="blue">possibility.</span>
        </h2>
        <p>
          Your future isn’t one-size-fits-all. Your learning shouldn’t be
          either.
        </p>
        <p>
          At G-TEC Mahe, explore professional training in technology, design,
          marketing and business, with practical learning and personalised
          guidance to help you move forward.
        </p>
        <div className="check-list">
          <span>
            <CheckCircle2 /> Real-world, hands-on learning
          </span>
          <span>
            <CheckCircle2 /> A focus on your individual goals
          </span>
          <span>
            <CheckCircle2 /> Support for your next career step
          </span>
        </div>
        <Link className="button outline" to="/about">
          Discover G-TEC Mahe <Arrow />
        </Link>
      </div>
    </section>
  );
}
function WhyUs() {
  return (
    <section className="section why-section">
      <div className="container">
        <SectionTitle
          eyebrow="THE G-TEC DIFFERENCE"
          title="Learn with purpose. Grow with confidence."
          text="A learning journey built around the possibilities ahead."
        />
        <div className="why-grid">
          {[
            [
              Monitor,
              "01",
              "Turn learning into doing",
              "Explore concepts through practical sessions and real-world projects.",
            ],
            [
              Users,
              "02",
              "Find guidance that matters",
              "Get personalised support as you build confidence in a new field.",
            ],
            [
              Target,
              "03",
              "Keep your future in sight",
              "Connect your learning with career goals and the skills employers value.",
            ],
          ].map(([Icon, n, title, text]) => (
            <article className="why-card reveal" key={n}>
              <div>
                <Icon size={28} strokeWidth={1.5} />
                <span>{n}</span>
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function PlacementSection({ full = false }) {
  return (
    <section className="section container placement-section">
      <div className="placement-copy reveal">
        <span className="eyebrow">BEYOND THE CLASSROOM</span>
        <h2>
          Your next chapter.
          <br />
          <span className="blue">Let’s work towards it.</span>
        </h2>
        <p>
          Learning is just the beginning. Discover how G-TEC Mahe’s career
          guidance and placement assistance can support your transition into the
          workplace.
        </p>
        <div className="placement-tags">
          <span>
            <Check size={15} /> Career guidance
          </span>
          <span>
            <Check size={15} /> Placement assistance
          </span>
          <span>
            <Check size={15} /> Practical skills
          </span>
        </div>
        {full ? (
          <Enquire>Discuss career support</Enquire>
        ) : (
          <Link to="/placements" className="button primary">
            Explore placement support <Arrow />
          </Link>
        )}
        <small className="support-note">
          Support and eligibility vary by programme. Employment is not
          guaranteed.
        </small>
      </div>
      <div className="career-visual reveal">
        <div className="career-top">
          <span className="eyebrow">YOUR GROWTH JOURNEY</span>
          <Mascot pose="guide" />
        </div>
        <h3>
          Small steps.
          <br />
          Meaningful progress.
        </h3>
        {[
          [BookOpen, "Learn", "Build your foundations"],
          [Code2, "Practice", "Put your skills to work"],
          [BriefcaseBusiness, "Progress", "Prepare for new opportunities"],
        ].map(([Icon, title, text], i) => (
          <div className="career-step" key={title}>
            <span>
              <Icon size={21} />
            </span>
            <div>
              <strong>{title}</strong>
              <small>{text}</small>
            </div>
            <span className="step-num">0{i + 1}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
function Stories() {
  return (
    <section className="section stories-section">
      <div className="container">
        <SectionTitle
          eyebrow="THE PEOPLE BEHIND THE PROGRESS"
          title="Every journey starts with a first step."
        />
        <div className="stories-grid">
          <div className="story-intro">
            <span className="quote-mark">“</span>
            <h3>
              Real perspectives.
              <br />
              From our community.
            </h3>
            <p>
              Discover learner experiences and student milestones shared
              publicly by the G-TEC Mahe community.
            </p>
            <a
              className="inline-link"
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              Meet our community <Arrow />
            </a>
          </div>
          <article className="story-card">
            <span className="story-label">LEARNER PERSPECTIVE</span>
            <blockquote>“Growth has no age or limit.”</blockquote>
            <p>
              Lasitha shares her experience of developing digital skills at
              G-TEC Mahe.
            </p>
            <div className="story-person">
              <span>LI</span>
              <div>
                <strong>Lasitha Irfan</strong>
                <small>G-TEC Mahe learner</small>
              </div>
              <a
                aria-label="Read Lasitha’s public LinkedIn profile"
                href="https://in.linkedin.com/in/lasitha-irfan"
                target="_blank"
                rel="noreferrer"
              >
                <Arrow />
              </a>
            </div>
          </article>
          <article className="story-card">
            <span className="story-label">STUDENT SUCCESS STORY</span>
            <h3>
              Recognising dedication.
              <br />
              Celebrating growth.
            </h3>
            <p>
              Fazil Abdul Rahim shares his recognition as Best Student
              (2025–2026) and his digital marketing learning journey.
            </p>
            <div className="story-person">
              <span>FA</span>
              <div>
                <strong>Fazil Abdul Rahim</strong>
                <small>Digital marketing learner</small>
              </div>
              <a
                aria-label="Read Fazil’s public LinkedIn profile"
                href="https://in.linkedin.com/in/fazil-abdul-rahim200"
                target="_blank"
                rel="noreferrer"
              >
                <Arrow />
              </a>
            </div>
          </article>
        </div>
        <p className="source-note">
          Perspectives from public LinkedIn profiles. Individual experiences are
          not placement guarantees.
        </p>
      </div>
    </section>
  );
}
const galleryImages = [
  {
    id: "photo-1523240795612-9a054b0db644",
    title: "Better, together.",
    label: "COLLABORATE",
  },
  {
    id: "photo-1522071820081-009f0129c71c",
    title: "Make room for ideas.",
    label: "CREATE",
  },
  {
    id: "photo-1516321318423-f06f85e504b3",
    title: "Stay curious.",
    label: "DISCOVER",
  },
];
function Gallery() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="life" className="section container">
      <SectionTitle
        eyebrow="THE SPIRIT OF G-TEC"
        title="A place to learn. A place to belong."
        text="Curiosity. Collaboration. The excitement of discovering what you can do."
      />
      <div className="gallery-grid">
        {galleryImages.map((g, i) => (
          <button
            key={g.id}
            className={`gallery-photo reveal photo-${i}`}
            onClick={() => setSelected(g)}
            aria-label={`View ${g.title}`}
          >
            <img
              src={photo(g.id, 900)}
              alt={`Illustrative learning scene: ${g.title}`}
              loading="lazy"
            />
            <span>
              <small>{g.label}</small>
              <strong>{g.title}</strong>
            </span>
            <span className="gallery-plus">
              <Plus />
            </span>
          </button>
        ))}
      </div>
      <p className="source-note">
        Images illustrate the learning experience; official campus photography
        will be added when available.
      </p>
      {selected && (
        <Modal
          title={selected.title}
          onClose={() => setSelected(null)}
          className="lightbox"
        >
          <img
            src={photo(selected.id, 1600)}
            alt={`Illustrative learning scene: ${selected.title}`}
          />
          <p>Illustrative learning photography.</p>
        </Modal>
      )}
    </section>
  );
}
function Team() {
  return (
    <section className="section container team-section">
      <div>
        <span className="eyebrow">PEOPLE WHO HELP YOU GROW</span>
        <h2>
          A little guidance.
          <br />A world of difference.
        </h2>
      </div>
      <div>
        <p>
          Meet the people who guide your learning. Talk to our advisors about
          your course, the teaching team and how practical sessions are
          delivered.
        </p>
        <a
          href={site.linkedin + "people/"}
          target="_blank"
          rel="noreferrer"
          className="inline-link"
        >
          Explore our team on LinkedIn <Arrow />
        </a>
        <p className="source-note">
          Verified faculty biographies and portraits will be added with the
          team’s approval.
        </p>
      </div>
    </section>
  );
}
function FAQs({ course }) {
  const items = course
    ? [
        [
          `What will I learn in ${course.name}?`,
          `${course.description} The themes shown on this page are a guide to the field. Request the approved syllabus for your chosen programme.`,
        ],
        [
          "How long is the programme?",
          "Ask admissions for the current duration, learning hours and batch schedule for your selected programme.",
        ],
        [
          "Am I eligible to apply?",
          "Eligibility depends on the programme level. Share your education and prior experience with a course advisor.",
        ],
        [
          "Which certification will I receive?",
          "Confirm the exact certificate, awarding body, assessments and fees with admissions before enrolling.",
        ],
        [
          "What career opportunities can I explore?",
          `Examples in this field include ${course.careers.join(", ")}. These are career directions, not a promise of employment.`,
        ],
      ]
    : faqs;
  return (
    <section className="section container faq-section">
      <div className="faq-heading">
        <span className="eyebrow">A LITTLE MORE CLARITY</span>
        <h2>
          Good questions.
          <br />
          Helpful answers.
        </h2>
        <p>
          Still have something on your mind?
          <br />
          We’re here to help you take the next step.
        </p>
        <Enquire className="inline-link" course={course?.name}>
          Let’s talk
        </Enquire>
      </div>
      <div className="faq-list">
        {items.map(([q, a], i) => (
          <details key={q}>
            <summary>
              <span className="faq-num">0{i + 1}</span>
              {q}
              <Plus size={18} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function CTA() {
  return (
    <section className="container cta-section">
      <div className="cta-art" aria-hidden="true">
        <Mascot pose="guide" />
      </div>
      <div>
        <span className="eyebrow">YOUR FUTURE IS CALLING</span>
        <h2>
          Let’s make your
          <br />
          next move a great one.
        </h2>
        <p>One conversation could open up a whole new direction.</p>
      </div>
      <Enquire className="button white">Find your path with us</Enquire>
      <span className="cta-spark" aria-hidden="true">
        ✳
      </span>
    </section>
  );
}
function Contact() {
  const [map, setMap] = useState(false);
  return (
    <section id="contact" className="section container contact-section">
      <div>
        <span className="eyebrow">LET’S CONNECT</span>
        <h2>
          Big plans?
          <br />
          Start a conversation.
        </h2>
        <p>Tell us a little about yourself and what you’d like to learn.</p>
        <div className="address">
          <MapPin size={23} />
          <div>
            <strong>Visit G-TEC Mahe</strong>
            <p>{site.address}</p>
            <a
              className="inline-link"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("G-TEC Mahe " + site.address)}`}
              target="_blank"
              rel="noreferrer"
            >
              Get directions <Arrow />
            </a>
          </div>
        </div>
        {map ? (
          <iframe
            title="G-TEC Mahe location on Google Maps"
            className="map"
            loading="lazy"
            src={`https://maps.google.com/maps?q=${encodeURIComponent("G-TEC Mahe " + site.address)}&output=embed`}
          />
        ) : (
          <button className="map-placeholder" onClick={() => setMap(true)}>
            <MapPin size={26} />
            <span>
              Explore our location<small>Load Google Maps</small>
            </span>
            <Arrow />
          </button>
        )}
      </div>
      <EnquiryForm />
    </section>
  );
}
function Footer() {
  return (
    <footer>
      <div className="container footer-main">
        <div>
          <Logo />
          <p>
            Innovating your tech future.
            <br />
            One skill. One opportunity. One you.
          </p>
          <div className="footer-socials" aria-label="Social media">
            <span
              className="social-link social-placeholder"
              role="img"
              aria-label="Instagram — coming soon"
              title="Instagram — coming soon"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </span>
            <span
              className="social-link social-placeholder"
              role="img"
              aria-label="Facebook — coming soon"
              title="Facebook — coming soon"
            >
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M14 22v-9h3l.5-4H14V7c0-1.1.3-2 2-2h2V1.5A25 25 0 0 0 15 1c-3 0-5 1.8-5 5v3H7v4h3v9z" />
              </svg>
            </span>
            <span
              className="social-link social-placeholder"
              role="img"
              aria-label="YouTube — coming soon"
              title="YouTube — coming soon"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <rect x="2" y="5" width="20" height="14" rx="4" />
                <path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <a
              className="social-link"
              href={site.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="G-TEC Mahe on LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
        <div>
          <h3>Explore</h3>
          <Link to="/about">About G-TEC Mahe</Link>
          <Link to="/courses">Our courses</Link>
          <Link to="/placements">Career & placements</Link>
          <Link to="/#life">Life at G-TEC</Link>
        </div>
        <div>
          <h3>Find your course</h3>
          {courses.slice(0, 4).map((c) => (
            <Link key={c.slug} to={`/courses/${c.slug}`}>
              {c.name}
            </Link>
          ))}
        </div>
        <div>
          <h3>Take the next step</h3>
          {courses.slice(4).map((c) => (
            <Link key={c.slug} to={`/courses/${c.slug}`}>
              {c.name}
            </Link>
          ))}
          <Enquire className="inline-link" />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>
          © {new Date().getFullYear()} G-TEC Mahe. All rights reserved.
        </span>
        <span>
          Made for your next chapter. <ArrowUpRight size={13} />
        </span>
      </div>
    </footer>
  );
}
function Modal({ title, children, onClose, className = "" }) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    const previous = document.activeElement;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    ref.current.focus();
    const handle = (e) => {
      if (e.key === "Escape") closeRef.current();
      if (e.key === "Tab") {
        const els = ref.current.querySelectorAll(
          'button, a[href], input, select, textarea, [tabindex="0"]',
        );
        const first = els[0],
          last = els[els.length - 1];
        if (
          e.shiftKey &&
          (document.activeElement === first ||
            document.activeElement === ref.current)
        ) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handle);
    return () => {
      document.body.style.overflow = old;
      document.removeEventListener("keydown", handle);
      previous?.focus();
    };
  }, []);
  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`modal ${className}`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        ref={ref}
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close dialog"
        >
          <X />
        </button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
function EnquiryForm({ initialCourse = "" }) {
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [draft, setDraft] = useState("");
  async function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (data.website) return;
    const message = `Hello G-TEC Mahe, I would like to enquire.\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email || "Not provided"}\nCourse: ${data.course}\nMessage: ${data.message || "Please share course details."}`;
    setDraft(message);
    if (site.enquiryEndpoint) {
      setBusy(true);
      try {
        const response = await fetch(site.enquiryEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, consent: true }),
        });
        if (!response.ok) throw new Error();
        setStatus("sent");
        e.target.reset();
      } catch {
        setStatus("error");
      } finally {
        setBusy(false);
      }
    } else setStatus("draft");
  }
  return (
    <form className="enquiry-form" onSubmit={submit}>
      <span className="eyebrow">LET’S FIND YOUR PATH</span>
      <h3>Tell us what’s next for you.</h3>
      <div className="form-row">
        <label>
          Your name <span>*</span>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="Full name"
            maxLength={100}
          />
        </label>
        <label>
          Phone number <span>*</span>
          <input
            type="tel"
            name="phone"
            required
            autoComplete="tel"
            pattern="[+0-9 ()-]{7,20}"
            placeholder="Your phone number"
          />
        </label>
      </div>
      <label>
        Email address
        <input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
        />
      </label>
      <label>
        Interested in <span>*</span>
        <select name="course" required defaultValue={initialCourse}>
          <option value="" disabled>
            Select a course
          </option>
          {courses.map((c) => (
            <option key={c.slug}>{c.name}</option>
          ))}
          <option>I’d like some guidance</option>
        </select>
      </label>
      <label>
        Your message
        <textarea
          name="message"
          rows={3}
          placeholder="Your goals, questions, or preferred time to talk…"
          maxLength={2000}
        />
      </label>
      <input
        className="honeypot"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
      />
      <label className="consent">
        <input type="checkbox" required />{" "}
        <span>
          I agree to share these details with G-TEC Mahe for my course enquiry.
        </span>
      </label>
      <button type="submit" className="button primary" disabled={busy}>
        {busy
          ? "Sending…"
          : site.enquiryEndpoint
            ? "Send enquiry"
            : "Prepare enquiry"}
        <Arrow />
      </button>
      <p className="form-note">
        {site.enquiryEndpoint
          ? "Your details are used to respond to your enquiry."
          : "Prepare your message, then share it with the admissions team."}
      </p>
      <div aria-live="polite">
        {status === "sent" && (
          <p className="form-status">
            <CheckCircle2 size={18} /> Your enquiry has been sent. Thank you for
            getting in touch.
          </p>
        )}
        {status === "error" && (
          <p className="form-error">
            We couldn’t send your enquiry. Please try again, or use the contact
            links.
          </p>
        )}
        {status === "draft" && (
          <div className="enquiry-draft">
            <strong>Your enquiry is ready — it hasn’t been sent.</strong>
            <p>
              {site.whatsapp
                ? "Open WhatsApp to review and send your message."
                : "Copy your message and contact the team through their official LinkedIn page or visit the centre."}
            </p>
            <textarea
              aria-label="Prepared enquiry message"
              readOnly
              value={draft}
              rows={5}
            />
            {site.whatsapp ? (
              <a
                className="button primary"
                target="_blank"
                rel="noreferrer"
                href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(draft)}`}
              >
                Send via WhatsApp <MessageCircle size={17} />
              </a>
            ) : (
              <div className="draft-actions">
                <button
                  type="button"
                  className="button outline"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(draft);
                      setStatus("copied");
                    } catch {
                      setStatus("copy-error");
                    }
                  }}
                >
                  Copy message
                </button>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-link"
                >
                  Contact team <Arrow />
                </a>
              </div>
            )}
          </div>
        )}
        {status === "copied" && (
          <p className="form-status">
            Copied. Share your message with the admissions team to complete your
            enquiry.
          </p>
        )}
        {status === "copy-error" && (
          <p className="form-error">
            Copy isn’t available in this browser. Submit the form again to
            select and copy the prepared message.
          </p>
        )}
      </div>
    </form>
  );
}
function Chat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi, I’m Gio, your G-TEC Mahe course companion. Choose a topic below and let’s explore your next step. I’m an automated guide; our advisors handle personal course advice.",
    },
  ]);
  const [input, setInput] = useState("");
  const end = useRef(null);
  const enquire = useContext(EnquiryContext);
  useEffect(() => {
    if (open) end.current?.scrollIntoView({ block: "nearest" });
  }, [messages, open]);
  function ask(value) {
    if (!value.trim()) return;
    const q = value.toLowerCase();
    let answer =
      "I can help you explore courses, location and admissions. For fees, schedules or personal advice, please use “Talk to an advisor” below.";
    if (/course|learn|study/.test(q))
      answer =
        "Explore Digital Marketing, Multimedia, Interior Designing, Accounting, MS Office, SAP and Software Courses. Browse the courses page to find your direction.";
    if (/fee|duration|batch|time|cost/.test(q))
      answer =
        "Fees, duration and batch timings need to be confirmed by admissions for your selected programme. Tap “Talk to an advisor” to prepare an enquiry.";
    if (/place|job|career/.test(q))
      answer =
        "G-TEC Mahe offers placement assistance. Support and eligibility vary by programme; employment is not guaranteed. Visit Placements for more context.";
    if (/where|location|address/.test(q))
      answer = `You’ll find G-TEC Mahe at ${site.address}. Directions are in the contact section.`;
    setMessages((m) => [
      ...m,
      { role: "user", text: value },
      { role: "assistant", text: answer },
    ]);
    setInput("");
  }
  return (
    <>
      <button
        className="chat-launcher"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close course guide" : "Open course guide"}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Mascot />}
        <span>{open ? "Close" : "Ask Gio"}</span>
        {!open && <i />}
      </button>
      {open && (
        <aside className="chat-panel" aria-label="Course guide">
          <div className="chat-head">
            <Mascot />
            <div>
              <strong>Gio · Your course companion</strong>
              <small>Automated course information</small>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close guide">
              <X size={18} />
            </button>
          </div>
          <div className="chat-messages" aria-live="polite">
            {messages.map((m, i) => (
              <p key={i} className={m.role}>
                {m.text}
              </p>
            ))}
            <div ref={end} />
          </div>
          <div className="chat-options">
            {["Explore courses", "Fees & duration", "Location"].map((q) => (
              <button key={q} onClick={() => ask(q)}>
                {q}
              </button>
            ))}
          </div>
          <button
            className="chat-advisor"
            onClick={() => {
              setOpen(false);
              enquire("");
            }}
          >
            Talk to an advisor <Arrow />
          </button>
          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              aria-label="Message the course guide"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your next step…"
              maxLength={500}
            />
            <button aria-label="Send message" disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
function Breadcrumbs({ items }) {
  return (
    <div className="breadcrumbs">
      <Link to="/">Home</Link>
      {items.map(([label, url]) => (
        <React.Fragment key={label}>
          <span>/</span>
          {url ? (
            <Link to={url}>{label}</Link>
          ) : (
            <span aria-current="page">{label}</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
function PageHero({ eyebrow, title, text, items }) {
  return (
    <section className="page-hero">
      <div className="container">
        <Breadcrumbs items={items} />
        <span className="eyebrow eyebrow-highlight">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      <Mascot pose="guide" className="page-gio" />
    </section>
  );
}
function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <CourseExplorer />
      <AboutSection />
      <WhyUs />
      <PlacedStudents />
      <PlacementSection />
      <Stories />
      <Gallery />
      <Team />
      <FAQs />
      <CTA />
      <Contact />
    </>
  );
}
function About() {
  return (
    <>
      <PageHero
        eyebrow="GET TO KNOW G-TEC MAHE"
        title={
          <>
            Your potential.
            <br />
            <span className="blue">Our shared purpose.</span>
          </>
        }
        text="A place to discover what you’re capable of — and take the next step towards it."
        items={[["About us"]]}
      />
      <AboutSection />
      <section className="container section vision-grid">
        <article>
          <Lightbulb />
          <span className="eyebrow">OUR VISION</span>
          <h2>
            Open doors
            <br />
            through learning.
          </h2>
          <p>
            Our direction is shaped by a simple idea: practical skills can help
            people discover new possibilities for their future.
          </p>
        </article>
        <article>
          <Target />
          <span className="eyebrow">OUR MISSION</span>
          <h2>
            Help ambition
            <br />
            become ability.
          </h2>
          <p>
            Support learners through relevant professional training, practical
            experience and individual guidance.
          </p>
        </article>
      </section>
      <WhyUs />
      <section className="container section">
        <SectionTitle
          eyebrow="THE LEARNING ENVIRONMENT"
          title="Space to focus. Support to grow."
          text="Explore practical sessions, project-based learning and personalised guidance. Visit the centre to see the facilities and confirm resources for your programme."
        />
        <div className="facility-grid">
          {[
            [
              Monitor,
              "Practical sessions",
              "Ask to see the tools and learning resources used in your chosen course.",
            ],
            [
              Users,
              "A collaborative approach",
              "Discover how learners explore ideas and work through practical projects.",
            ],
            [
              BookOpen,
              "Guided learning",
              "Meet the team and discuss the support available throughout your course.",
            ],
          ].map(([Icon, title, text]) => (
            <article key={title}>
              <Icon />
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <TeamDirectory />
      <Gallery />
      <CTA />
      <Contact />
    </>
  );
}
function Placements() {
  return (
    <>
      <PageHero
        eyebrow="SKILLS TODAY. POSSIBILITIES TOMORROW."
        title={
          <>
            Build your skills.
            <br />
            <span className="blue">Shape your next chapter.</span>
          </>
        }
        text="Explore career support that helps you connect your learning with the working world."
        items={[["Placements"]]}
      />
      <PlacementSection full />
      <section className="container section">
        <SectionTitle
          eyebrow="PLACEMENT HIGHLIGHTS"
          title="A conversation about your future."
          text="Ask our team for verified placement outcomes, recent hiring opportunities and the support available for your selected programme."
        />
        <div className="facility-grid">
          {[
            [
              "Career support",
              "Discuss your goals and understand the next steps relevant to your field.",
            ],
            [
              "Practical experience",
              "Explore how programme projects can help you demonstrate what you’ve learned.",
            ],
            [
              "Placement assistance",
              "Confirm the current placement process, eligibility and opportunities with the team.",
            ],
          ].map(([title, text], i) => (
            <article key={title}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <Stories />
      <FAQs />
      <CTA />
      <Contact />
    </>
  );
}
function CourseDetail() {
  const { slug } = useParams();
  const course = courses.find((c) => c.slug === slug);
  if (!course) return <NotFound />;
  const Icon = icons[course.icon];
  return (
    <>
      <section className="course-detail-hero">
        <div className="container">
          <Breadcrumbs items={[["Courses", "/courses"], [course.name]]} />
          <div className="course-detail-top">
            <div>
              <span className="eyebrow eyebrow-highlight">{course.tag}</span>
              <h1>
                {course.name}
                <span className="blue">.</span>
              </h1>
              <p>{course.description}</p>
              <Enquire course={course.name}>Enquire about this course</Enquire>
              <div className="detail-badges">
                <span>
                  <MapPin size={16} /> Mahe
                </span>
                <span>
                  <BookOpen size={16} /> Professional learning
                </span>
              </div>
            </div>
            <div className="detail-photo" style={{ background: course.color }}>
              <img
                src={photo(course.image, 1000)}
                alt={`${course.name} field of study`}
              />
              <span>
                <Icon size={34} />
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="container course-layout">
        <article>
          <section className="detail-section">
            <span className="eyebrow">THE START OF SOMETHING NEW</span>
            <h2>Course overview</h2>
            <p>
              {course.description} Talk to our team about the programme options
              available at G-TEC Mahe and the learning path that suits your
              goals.
            </p>
          </section>
          <section className="detail-section">
            <h2>Syllabus & learning themes</h2>
            <p>
              These are indicative themes in this field, not a confirmed
              syllabus. Request the current programme brochure for module
              details.
            </p>
            <div className="syllabus-list">
              {course.topics.map((t, i) => (
                <div key={t}>
                  <span>0{i + 1}</span>
                  <h3>{t}</h3>
                  <BookOpen size={18} />
                </div>
              ))}
            </div>
          </section>
          <section className="detail-section">
            <h2>Skills & tools to explore</h2>
            <div className="tool-tags">
              {course.tools.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <p className="source-note">
              Exact tools, versions and practical access depend on your chosen
              programme. Please confirm with admissions.
            </p>
          </section>
          <section className="detail-section">
            <h2>Certification</h2>
            <p>
              Get clarity before you enrol. Ask for the exact certificate title,
              awarding body, assessment requirements and any separate
              examination fees.
            </p>
          </section>
          <section className="detail-section">
            <h2>Where could this take you?</h2>
            <p>Potential career directions in this field include:</p>
            <div className="check-list">
              {course.careers.map((c) => (
                <span key={c}>
                  <CheckCircle2 />
                  {c}
                </span>
              ))}
            </div>
            <p className="source-note">
              Career examples are illustrative. Roles depend on your experience,
              qualifications and employer requirements.
            </p>
          </section>
        </article>
        <aside className="course-sidebar">
          <Mascot pose="guide" className="sidebar-gio" />
          <span className="eyebrow">YOUR COURSE AT A GLANCE</span>
          <h3>
            A little planning.
            <br />A lot of possibility.
          </h3>
          <div>
            <Clock />
            <span>
              <strong>Duration</strong>
              <small>Confirm your programme schedule</small>
            </span>
          </div>
          <div>
            <GraduationCap />
            <span>
              <strong>Eligibility</strong>
              <small>Ask about entry requirements</small>
            </span>
          </div>
          <div>
            <MapPin />
            <span>
              <strong>Location</strong>
              <small>G-TEC Mahe, Parimadam</small>
            </span>
          </div>
          <div>
            <ShieldCheck />
            <span>
              <strong>Certification</strong>
              <small>Confirm qualification and awarding body</small>
            </span>
          </div>
          <Enquire course={course.name}>Get course details</Enquire>
          <p>No pressure. Just a helpful conversation.</p>
        </aside>
      </div>
      <FAQs course={course} />
      <section className="container section">
        <SectionTitle
          eyebrow="KEEP EXPLORING"
          title="More paths. More possibilities."
        />
        <div className="course-grid">
          {courses
            .filter((c) => c.slug !== slug)
            .slice(0, 3)
            .map((c) => (
              <CourseCard key={c.slug} course={c} />
            ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
function NotFound() {
  return (
    <section className="container not-found">
      <Mascot pose="curious" />
      <span className="eyebrow">404 · A SMALL DETOUR</span>
      <h1>
        Let’s get you
        <br />
        back on course.
      </h1>
      <p>The page you’re looking for isn’t here.</p>
      <Link className="button primary" to="/">
        Back to home <Arrow />
      </Link>
    </section>
  );
}
function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const c = courses.find((c) => pathname === `/courses/${c.slug}`);
    const name =
      c?.name ||
      {
        "/": "Innovating Your Tech Future",
        "/about": "About Us",
        "/courses": "Explore Our Courses",
        "/placements": "Career & Placement Support",
      }[pathname] ||
      "Page Not Found";
    document.title =
      pathname === "/" ? `G-TEC Mahe | ${name}` : `${name} | G-TEC Mahe`;
    const description =
      c?.description ||
      `Discover ${name.toLowerCase()} at G-TEC Mahe. Explore professional learning in technology, design, marketing and business.`;
    for (const [key, value, attr] of [
      ["description", description, "name"],
      ["og:title", document.title, "property"],
      ["og:description", description, "property"],
      ["og:type", "website", "property"],
      ["og:url", site.url + pathname, "property"],
      ["og:image", site.url + "/images/gTec.PNG", "property"],
      ["twitter:card", "summary", "name"],
      ["twitter:title", document.title, "name"],
      ["twitter:description", description, "name"],
    ]) {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.append(el);
      }
      el.content = value;
    }
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.append(canonical);
    }
    canonical.href = site.url + pathname;
    const schema = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: site.name,
      url: site.url,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Shams Plaza, Mahe Main Road",
        addressLocality: "Parimadam",
        addressRegion: "Kerala",
        postalCode: "673311",
        addressCountry: "IN",
      },
      sameAs: [site.linkedin],
    };
    let el = document.getElementById("structured-data");
    if (!el) {
      el = document.createElement("script");
      el.id = "structured-data";
      el.type = "application/ld+json";
      document.head.append(el);
    }
    el.textContent = JSON.stringify(schema);
    if (hash) {
      setTimeout(
        () =>
          document.getElementById(hash.slice(1))?.scrollIntoView({
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
              ? "instant"
              : "smooth",
          }),
        100,
      );
    } else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
function App() {
  const [enquiry, setEnquiry] = useState(null);
  return (
    <BrowserRouter>
      <EnquiryContext.Provider value={(course) => setEnquiry({ course })}>
        <RouteEffects />
        <ScrollMotion />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/courses"
              element={
                <>
                  <PageHero
                    eyebrow="FIND YOUR NEXT CHAPTER"
                    title={
                      <>
                        Made for your ambition.
                        <br />
                        <span className="blue">Built around your future.</span>
                      </>
                    }
                    text="Seven course areas. A world of possibilities. Find the field that sparks your curiosity."
                    items={[["Courses"]]}
                  />
                  <CourseExplorer full />
                  <FAQs />
                  <CTA />
                </>
              }
            />
            <Route path="/courses/:slug" element={<CourseDetail />} />
            <Route path="/placements" element={<Placements />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Chat />
        {enquiry && (
          <Modal
            title="Your future starts with a conversation."
            onClose={() => setEnquiry(null)}
          >
            <div className="gio-form-intro">
              <Mascot pose="guide" />
              <p>
                <strong>A little help from Gio.</strong>
                <br />
                Share your interests. The admissions team can help with the next
                step.
              </p>
            </div>
            <EnquiryForm initialCourse={enquiry.course} />
          </Modal>
        )}
      </EnquiryContext.Provider>
    </BrowserRouter>
  );
}
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
