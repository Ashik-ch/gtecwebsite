import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check,
  ChevronDown,
  Clock,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Mascot } from "./Mascot";
import { placementCompanies } from "./PlacementFeatures";
import { site } from "./data";
import { usePlacementMotion } from "./PlacementMotion";

const whatsappLink = (text) =>
  site.whatsappNumber
    ? `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`
    : site.whatsapp;

const notifyMessage = `Hello G-TEC Mahe,

I'm not a G-TEC Mahe student, but I'm interested in your internship program (3-6 months, live projects with partner companies).

I saw that open internships for outside students are coming soon. Please add me to your notification list and let me know as soon as applications open.

Thank you!`;

const isDriveLink = (value) =>
  /^https:\/\/(drive|docs)\.google\.com\//i.test(value);

function EligibilityForm() {
  const [sent, setSent] = useState(null);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form.get("website")) return;
    const resume = String(form.get("resume") || "").trim();
    if (!isDriveLink(resume))
      return setError("Please paste a Google Drive link to your resume.");
    setError("");
    const message = `Hello G-TEC Mahe, I would like to check my internship eligibility.\nName: ${form.get("name")}\nPhone: ${form.get("phone")}\nEmail: ${form.get("email")}\nResume: ${resume}`;
    const url = whatsappLink(message);
    window.open(url, "_blank", "noopener");
    setSent(url);
  }

  if (sent)
    return (
      <div className="enquiry-draft eligibility-sent">
        <strong>WhatsApp is open with your details.</strong>
        <p>
          Press send in WhatsApp to share your details and resume link with the
          placement cell.
        </p>
        <a
          className="button primary"
          href={sent}
          target="_blank"
          rel="noreferrer"
        >
          Open WhatsApp again
        </a>
      </div>
    );

  return (
    <form className="enquiry-form" onSubmit={submit}>
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
      <div className="form-row">
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
        <label>
          Email address <span>*</span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label>
        Resume Google Drive link <span>*</span>
        <input
          name="resume"
          type="url"
          required
          inputMode="url"
          placeholder="https://drive.google.com/file/d/..."
        />
      </label>
      <input
        className="honeypot"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
      />
      {error ? <p className="form-error">{error}</p> : null}
      <button type="submit" className="button primary">
        Send on WhatsApp
      </button>
      <p className="form-note">
        Set your Drive file's sharing to "Anyone with the link can view" so the
        placement cell can open it.
      </p>
    </form>
  );
}
const countryFlagCodes = {
  IN: "in",
  QA: "qa",
  AE: "ae",
  US: "us",
  GB: "gb",
  AU: "au",
  CA: "ca",
  IE: "ie",
};

const splitMarket = (market) => {
  const [code, ...nameParts] = market.split(" ");
  return { code, name: nameParts.join(" ") };
};

const CountryFlag = ({ code, label }) => {
  const flagCode = countryFlagCodes[code];
  if (!flagCode)
    return (
      <span className="country-globe" aria-hidden="true">
        🌐
      </span>
    );
  return (
    <img
      className="country-flag"
      src={`https://flagcdn.com/24x18/${flagCode}.png`}
      srcSet={`https://flagcdn.com/48x36/${flagCode}.png 2x`}
      width="24"
      height="18"
      alt={`${label || code} flag`}
      loading="lazy"
    />
  );
};

const MarketLabel = ({ market, compact = false }) => {
  if (market.startsWith("+")) return <>{market}</>;
  const { code, name } = splitMarket(market);
  return (
    <span className="country-label">
      <CountryFlag code={code} label={name || code} />
    </span>
  );
};

const PartnerLogo = ({ logo, name }) => {
  const isImage = typeof logo === "string" && logo.startsWith("/");
  return (
    <span className="partner-logo">
      {isImage ? <img src={logo} alt={`${name} logo`} loading="lazy" /> : logo}
    </span>
  );
};
const MarketList = ({ markets, compact = false, separator = null }) => (
  <>
    {markets.map((market, index) => (
      <React.Fragment key={market}>
        {index > 0 && separator ? (
          <span className="country-separator">{separator}</span>
        ) : null}
        <MarketLabel market={market} compact={compact} />
      </React.Fragment>
    ))}
  </>
);
export default function Placements({ SectionTitle, Stories, FAQs, CTA, Modal }) {
  const [eligibilityOpen, setEligibilityOpen] = useState(false);
  const pageRef = useRef(null);
  usePlacementMotion(pageRef);
  const partnerProfiles = placementCompanies
    .slice(0, 5)
    .map((company, index) => {
      const details = [
        {
          presence: ["QA Qatar", "AE UAE", "IN India"],
          markets: [
            "IN India",
            "QA Qatar",
            "AE UAE",
            "US USA",
            "GB UK",
            "AU Australia",
            "CA Canada",
            "IE Ireland",
          ],
          benefits: [
            "Live project experience with real clients",
            "Understanding real client requirements",
            "Professional team and client-oriented communication",
            "Reporting, quality checks and project delivery",
            "Portfolio-ready work from real projects",
            "Placement assistance after completion",
          ],
          domains: [
            "Software & Technology",
            "Digital Marketing",
            "Web & Digital Solutions",
            "AI & Automation",
            "Creative & Content",
          ],
        },
        {
          presence: ["QA Qatar", "AE UAE", "IN India"],
          markets: ["QA Qatar", "AE UAE", "IN India", "GB UK", "AU Australia"],
          benefits: [
            "Website and campaign workflow exposure",
            "Client brief interpretation",
            "Quality review and reporting practice",
            "Presentation-ready project documentation",
          ],
          domains: ["Web Design", "Digital Campaigns", "Content", "SEO"],
        },
        {
          presence: ["AE UAE", "GB UK", "US USA"],
          markets: ["AE UAE", "GB UK", "US USA", "CA Canada", "QA Qatar"],
          benefits: [
            "Data cleaning and dashboard practice",
            "Business report preparation",
            "Spreadsheet and BI workflow exposure",
            "Client insight presentation support",
          ],
          domains: [
            "Data Analytics",
            "MIS",
            "Accounting Support",
            "Dashboards",
          ],
        },
        {
          presence: ["QA Qatar", "US USA", "GB UK"],
          markets: [
            "QA Qatar",
            "US USA",
            "GB UK",
            "IE Ireland",
            "AU Australia",
          ],
          benefits: [
            "Brand identity and campaign design exposure",
            "Social media creative workflow",
            "Portfolio case study development",
            "Review cycles with creative mentors",
          ],
          domains: [
            "Branding",
            "Creative Design",
            "Motion Graphics",
            "Social Media",
          ],
        },
        {
          presence: ["IN India", "US USA", "CA Canada"],
          markets: ["IN India", "US USA", "CA Canada", "QA Qatar", "GB UK"],
          benefits: [
            "Automation process documentation",
            "ERP and workflow support practice",
            "Team communication and delivery tracking",
            "Project handover checklist experience",
          ],
          domains: [
            "AI & Automation",
            "ERP",
            "Business Operations",
            "Process Design",
          ],
        },
      ];

      return {
        ...company,
        duration: "3-6 Months",
        ...(details[index] || details[0]),
      };
    });

  const [activePartner, setActivePartner] = useState(
    partnerProfiles[0]?.slug || "",
  );

  const scrollToPlacementSection = (id) => {
    const section = document.getElementById(id);
    if (!section) return;
    const reduceMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    section.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const stats = [
    { icon: Users, value: "5", label: "Industry hiring partners" },
    { icon: Clock, value: "3-6 Months", label: "Structured internship track" },
    {
      icon: MapPin,
      value: "8 Countries",
      label: "Global project exposure",
      chips: ["IN India", "QA Qatar", "AE UAE", "US USA", "GB UK", "+3 more"],
    },
    { icon: ShieldCheck, value: "2", label: "Certificates on completion" },
  ];

  const internshipBlocks = [
    [
      "Structured 3-6 Month Internships",
      "A clear timeline with defined milestones, so students know exactly what to expect.",
    ],
    [
      "Live Industry Projects",
      "Real company and client work, not simulated exercises - real requirements, real deadlines.",
    ],
    [
      "Global Client Exposure",
      <>Projects connected to companies across the GCC </>,
    ],
    [
      "Mentorship From Professionals",
      "Guidance from experienced practitioners on tools, workflow and communication.",
    ],
    [
      "Placement Assistance",
      "Resume support, interview preparation and career guidance after completion.",
    ],
    [
      "Experience Certificate",
      "A certificate from G-TEC Mahe, plus one from the partner company on completion.",
    ],
  ];

  const journey = [
    ["Explore", "Discover courses and talk to advisors"],
    ["Enroll", "Orientation and course kickoff"],
    ["Learn", "Classes, labs and guided practice"],
    ["Assess", "Assessments and skill checks"],
    ["Certify", "Course completion certificate"],
    ["Intern", "3-6 months with a partner company"],
    ["Graduate", "Complete the full program"],
    ["Career", "Hired by a partner or new employer"],
  ];

  return (
    <div className="placements-page" ref={pageRef}>
      <section className="placement-modern-hero">
        <div className="container">
          <nav className="placement-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Placements</span>
          </nav>
          <div className="placement-hero-copy">
            <p className="eyebrow">CAREERS & INDUSTRY EXPOSURE</p>
            <h1>
              Real projects. Real companies. A career that starts before you
              graduate.
            </h1>
            <p>
              G-TEC Mahe's placement support connects students with structured
              internships and hiring partners, so learning translates into
              practical, industry-ready experience.
            </p>
            <div className="placement-hero-actions">
              <button
                className="button primary"
                type="button"
                onClick={() => scrollToPlacementSection("partner-companies")}
              >
                Explore partner companies
              </button>
              <button
                className="button secondary dark"
                type="button"
                onClick={() => scrollToPlacementSection("student-journey")}
              >
                See the student journey
              </button>
            </div>
          </div>
          <div className="placement-hero-stats">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <article className="placement-stat-card reveal" key={stat.label}>
                  <span className="placement-stat-icon">
                    <Icon size={18} />
                  </span>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                  {stat.chips ? (
                    <div className="placement-market-chips">
                      {stat.chips.map((chip) => (
                        <small key={chip}>
                          <MarketLabel market={chip} />
                        </small>
                      ))}
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="container section internship-program-section">
        <SectionTitle
          eyebrow="GTEC MAHE INTERNSHIP PROGRAM"
          title="Why intern with G-TEC Mahe"
          text="Every G-TEC Mahe internship is built around the same idea: move from classroom knowledge to real, portfolio-ready industry experience - with structured support at every step."
        />
        <div className="internship-reason-grid">
          {internshipBlocks.map(([title, text], index) => (
            <article className="internship-reason-card reveal" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container section eligibility-section">
        <SectionTitle
          eyebrow="ELIGIBILITY"
          title="Who can apply"
          text="The internship program currently runs for G-TEC Mahe students - and we're building toward opening it up more widely."
        />
        <div className="eligibility-grid">
          <article className="eligibility-card reveal is-open">
            <span>OPEN NOW</span>
            <h3>G-TEC Mahe course graduates</h3>
            <ul>
              <li>Have completed a certified course at G-TEC Mahe</li>
              <li>Apply through the G-TEC Mahe placement cell</li>
              <li>Priority access to live openings from partner companies</li>
              <li>Certificate and placement assistance included</li>
            </ul>
            <button
              className="button primary"
              type="button"
              onClick={() => setEligibilityOpen(true)}
            >
              Check my eligibility
            </button>
          </article>
          <article className="eligibility-card reveal is-soon">
            <span>COMING SOON</span>
            <h3>Open internships for outside students</h3>
            <p>
              We're expanding our internship network so students and graduates
              outside G-TEC Mahe can also apply - with the same live-project
              structure and global exposure.
            </p>
            <ul>
              <li>Same partner companies, same 3-6 month structure</li>
              <li>Applications will open in phases as capacity allows</li>
            </ul>
            <a
              className="button gold"
              href={whatsappLink(notifyMessage)}
              target="_blank"
              rel="noreferrer"
            >
              Notify me when this opens
            </a>
          </article>
        </div>
      </section>

      <section className="container section certificate-section">
        <SectionTitle
          eyebrow="CERTIFIED EXPERIENCE"
          title="Two certificates, one internship"
          text="Every completed internship is recognised twice over - once by G-TEC Mahe, and once by the company you worked with."
        />
        <div className="certificate-grid">
          <article className="certificate-card reveal">
            <div className="certificate-frame">
              <span className="certificate-no">CERTIFICATE 01</span>
              <h3>Certificate of Internship Completion</h3>
              <p className="certificate-kicker">This is to certify that</p>
              <div className="certificate-name">Student Name</div>
              <p>
                Issued by G-TEC Mahe, confirming the duration, domain and
                structured training completed by the student.
              </p>
              <footer className="certificate-foot">
                <div className="certificate-sign">
                  <strong>G-TEC Mahe</strong>
                  <small>Issued by</small>
                </div>
                <div className="certificate-seal" aria-hidden="true">
                  <span>Verified</span>
                </div>
                <div className="certificate-sign">
                  <strong>On completion</strong>
                  <small>Date</small>
                </div>
              </footer>
            </div>
          </article>
          <article className="certificate-card reveal">
            <div className="certificate-frame">
              <span className="certificate-no">CERTIFICATE 02</span>
              <h3>Company Experience Certificate</h3>
              <p className="certificate-kicker">This is to certify that</p>
              <div className="certificate-name">Student Name</div>
              <p>
                Issued directly by the partner company, confirming the live
                projects and practical work completed.
              </p>
              <footer className="certificate-foot">
                <div className="certificate-sign">
                  <strong>Your internship partner</strong>
                  <small>Issued by</small>
                </div>
                <div className="certificate-seal" aria-hidden="true">
                  <span>Verified</span>
                </div>
                <div className="certificate-sign">
                  <strong>On completion</strong>
                  <small>Date</small>
                </div>
              </footer>
            </div>
          </article>
        </div>
        <blockquote className="internship-quote reveal">
          <p>
            Working on a live client project during my internship taught me more
            about deadlines and communication than any classroom ever could.
          </p>
          <cite>
            - Placeholder student quote, to be replaced with a real intern's
            story
          </cite>
        </blockquote>
      </section>

      <section
        className="container section partner-exposure-section"
        id="partner-companies"
      >
        <SectionTitle
          eyebrow="COMPANY PARTNERS"
          title="Companies & Global Work Exposure"
          text="Five partner companies currently work with G-TEC Mahe students on live projects and structured internships. Tap any card to see the full profile - presence, client markets, benefits and domains."
        />
        <p className="partner-list-label">PARTNER COMPANIES</p>
        <div className="partner-list">
          {partnerProfiles.map((company) => {
            const isOpen = activePartner === company.slug;
            return (
              <article
                className={`partner-card reveal ${isOpen ? "is-open" : ""}`}
                key={company.slug}
              >
                <button
                  className="partner-card-head"
                  type="button"
                  onClick={() => setActivePartner(isOpen ? "" : company.slug)}
                  aria-expanded={isOpen}
                >
                  <PartnerLogo logo={company.logo} name={company.name} />
                  <span className="partner-name-block">
                    <strong>{company.name}</strong>
                    <small>
                      {company.field} - {company.duration}
                    </small>
                  </span>
                  <ChevronDown size={18} />
                </button>
                {isOpen ? (
                  <div className="partner-card-details">
                    <p>{company.about || company.detail}</p>
                    <div className="partner-meta-grid">
                      <div>
                        <span>DURATION</span>
                        <strong>{company.duration}</strong>
                      </div>
                      <div>
                        <span>COMPANY PRESENCE</span>
                        <strong>
                          <MarketList
                            markets={company.presence}
                            separator="-"
                          />
                        </strong>
                      </div>
                    </div>
                    <div className="partner-market-panel">
                      <span>CLIENT & PROJECT MARKETS</span>
                      <div>
                        {company.markets.map((market) => (
                          <small key={market}>
                            <MarketLabel market={market} />
                          </small>
                        ))}
                      </div>
                      <p>
                        {company.name}'s widest-reaching partner markets and
                        client exposure.
                      </p>
                    </div>
                    <div className="partner-benefit-grid">
                      {company.benefits.map((benefit) => (
                        <p key={benefit}>
                          <Check size={16} /> {benefit}
                        </p>
                      ))}
                    </div>
                    <div className="partner-tags">
                      {company.domains.map((domain) => (
                        <span key={domain}>{domain}</span>
                      ))}
                    </div>
                    <Link
                      className="button primary"
                      to={`/placements/companies/${company.slug}`}
                    >
                      Contact {company.name}
                    </Link>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>

      <section
        className="container section journey-map-section"
        id="student-journey"
      >
        <div className="journey-map-card">
          <span className="journey-main-mascot">
            <Mascot variant="mini" mood="celebrate" />
          </span>
          <div className="journey-map-copy">
            <p className="eyebrow">STUDENT JOURNEY</p>
            <h2>
              Meet your G-TEC guide - here's the path from day one to placed
            </h2>
          </div>
          <div className="journey-steps">
            {journey.map(([title, text], index) => (
              <article className="reveal" key={title}>
                <span className="journey-step-mascot">
                  <Mascot variant="mini" mood={index % 2 ? "wave" : "happy"} />
                </span>
                <strong>{title}</strong>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQs />
      <CTA />
      {eligibilityOpen ? (
        <Modal
          title="Check my eligibility"
          onClose={() => setEligibilityOpen(false)}
        >
          <EligibilityForm />
        </Modal>
      ) : null}
    </div>
  );
}
