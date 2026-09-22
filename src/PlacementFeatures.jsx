import { ArrowUpRight, Check, Play, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import "./placement-features.css";

const CompanyLogo = ({ logo, name, className = "company-logo" }) => {
  const isImage = typeof logo === "string" && logo.startsWith("/");
  return (
    <span className={className}>
      {isImage ? <img src={logo} alt={`${name} logo`} loading="lazy" /> : logo}
    </span>
  );
};
export const placementCompanies = [
  {
    slug: "bytrix-hub",
    name: "Bytrix Hub",
    field: "Internship provider",
    detail: "Explore internship opportunities with Bytrix Hub.",
    about:
      "Bytrix Hub is a development-stage internship partner profile for learners who want exposure to web, digital marketing and business support workflows.",
    location: "Kannur / Remote friendly",
    contact: "placements@bytrixhub.example",
    logo: "/images/bytrixlogo.png",
    website: "https://www.bytrixhub.com/",
    opportunities: [
      "Digital Marketing Intern",
      "Frontend Development Intern",
      "Business Operations Trainee",
      "Content & SEO Assistant",
    ],
  },
  {
    slug: "northstar-accounts",
    name: "NorthStar Accounts",
    field: "Accounting services",
    detail:
      "Demo recruiter for accounts assistant and Tally operator profiles.",
    about:
      "NorthStar Accounts is dummy data for testing accounting placement flows, company detail pages and opportunity listings.",
    location: "Mahe / Thalassery",
    contact: "hr@northstar-demo.example",
    logo: "NA",
    website: "https://example.com/northstar-accounts",
    opportunities: [
      "Accounts Assistant",
      "Tally Operator",
      "Billing Executive Trainee",
      "Office Accounts Trainee",
    ],
  },
  {
    slug: "pixelcraft-studio",
    name: "PixelCraft Studio",
    field: "Design & multimedia",
    detail: "Placeholder creative studio for design portfolio opportunities.",
    about:
      "PixelCraft Studio is a sample creative company profile for testing multimedia, design and content placement layouts.",
    location: "Calicut / Hybrid",
    contact: "studio@pixelcraft-demo.example",
    logo: "PC",
    website: "https://example.com/pixelcraft-studio",
    opportunities: [
      "Graphic Design Trainee",
      "Video Editing Intern",
      "Motion Graphics Assistant",
      "Creative Content Designer",
    ],
  },
  {
    slug: "urbannest-interiors",
    name: "UrbanNest Interiors",
    field: "Interior design",
    detail: "Sample placement company for junior designer and drafting roles.",
    about:
      "UrbanNest Interiors is dummy company data for interior design students and junior drafting opportunity previews.",
    location: "Kannur / Site visits",
    contact: "careers@urbannest-demo.example",
    logo: "UI",
    website: "https://example.com/urbannest-interiors",
    opportunities: [
      "Junior Interior Designer",
      "Drafting Assistant",
      "3D Visualisation Trainee",
      "Design Presentation Assistant",
    ],
  },
  {
    slug: "brightdesk-solutions",
    name: "BrightDesk Solutions",
    field: "Office administration",
    detail:
      "Dummy company for MS Office, admin and front-office role previews.",
    about:
      "BrightDesk Solutions helps test admin-focused job cards and company pages during development.",
    location: "Mahe",
    contact: "jobs@brightdesk-demo.example",
    logo: "BD",
    website: "https://example.com/brightdesk-solutions",
    opportunities: [
      "Office Admin Executive",
      "Data Entry Operator",
      "Front Desk Trainee",
      "Documentation Assistant",
    ],
  },
  {
    slug: "cloudline-erp",
    name: "CloudLine ERP",
    field: "ERP & software support",
    detail:
      "Dummy partner for SAP, ERP support and software trainee opportunities.",
    about:
      "CloudLine ERP is placeholder data for testing enterprise software placement content and opportunity categories.",
    location: "Remote / Kochi",
    contact: "talent@cloudline-demo.example",
    logo: "CE",
    website: "https://example.com/cloudline-erp",
    opportunities: [
      "ERP Support Trainee",
      "SAP End-user Support",
      "Software Support Associate",
      "Implementation Coordinator Trainee",
    ],
  },
];

const openings = [
  ["Digital Marketing Intern", "Mahe / Hybrid", "Digital Marketing"],
  ["Junior Accounts Assistant", "Kannur", "Accounting"],
  ["Graphic Design Trainee", "Thalassery", "Multimedia"],
  ["Office Admin Executive", "Mahe", "MS Office"],
];

const affiliations = [
  ["G-TEC Certificate", "/images/gTecLogo.png"],
  ["Certification Partner", "/images/aff1.jpg"],
  ["Training Affiliation", "/images/aff2.jpg"],
  ["Skill Certification", "/images/aff3.jpg"],
  ["Technology Learning", "/images/aff4.jpg"],
  ["Career Credential", "/images/aff5.jpg"],
];

const videoTestimonials = [
  [
    "Afsal Rahman",
    "Digital Marketing",
    "How practical sessions helped me present my first campaign.",
  ],
  [
    "Meera Shaji",
    "Accounting",
    "From basic entries to confident accounting practice.",
  ],
  [
    "Nihal P",
    "Software Courses",
    "Building small projects made coding easier to understand.",
  ],
];

const reviews = [
  {
    name: "Safna K.",
    time: "2 months ago",
    rating: 5,
    initial: "S",
    text: "Friendly counsellors, clear course guidance and a comfortable place to learn.",
  },
  {
    name: "Adhil P.",
    time: "3 weeks ago",
    rating: 5,
    initial: "A",
    text: "The team explained the options patiently and helped me choose a practical learning path.",
  },
  {
    name: "Nimisha V.",
    time: "1 month ago",
    rating: 5,
    initial: "N",
    text: "Good support for beginners. The classes and project guidance made the learning easier.",
  },
  {
    name: "Rahul M.",
    time: "4 months ago",
    rating: 4,
    initial: "R",
    text: "A positive experience with helpful staff and useful skill-based training.",
  },
  {
    name: "Hana F.",
    time: "2 weeks ago",
    rating: 5,
    initial: "H",
    text: "I liked the atmosphere and the way the counsellors explained the course details.",
  },
  {
    name: "Vishnu T.",
    time: "5 months ago",
    rating: 5,
    initial: "V",
    text: "Good place to start learning job-oriented skills with proper guidance.",
  },
];

function SectionHead({ eyebrow, title, text }) {
  return (
    <div className="placement-feature-head reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function PlacementCompanies() {
  return (
    <section className="section container placement-feature-section">
      <SectionHead
        eyebrow="PLACEMENT & INTERNSHIP PROVIDERS"
        title="Connect your skills with growing teams."
        text="Explore internship opportunities with Bytrix Hub. Other company profiles below are illustrative examples."
      />
      <div className="placement-company-grid">
        {placementCompanies.map((company) => (
          <Link
            className="placement-company-card reveal"
            key={company.name}
            to={`/placements/companies/${company.slug}`}
          >
            <CompanyLogo logo={company.logo} name={company.name} />
            <div>
              <small>{company.field}</small>
              <h3>{company.name}</h3>
              <p>{company.detail}</p>
            </div>
            <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export function PlacementCompanyDetail() {
  const { slug } = useParams();
  const company = placementCompanies.find((item) => item.slug === slug);
  if (!company) {
    return (
      <section className="section container company-detail-section">
        <span className="eyebrow">COMPANY NOT FOUND</span>
        <h1>Company profile unavailable.</h1>
        <Link className="button primary" to="/placements">
          Back to placements <ArrowUpRight size={18} aria-hidden="true" />
        </Link>
      </section>
    );
  }
  return (
    <section className="section container company-detail-section">
      <div className="company-detail-hero reveal">
        <CompanyLogo logo={company.logo} name={company.name} className="company-logo company-detail-logo" />
        <div>
          <span className="eyebrow">{company.field}</span>
          <h1>{company.name}</h1>
          <p>{company.about || company.detail}</p>
          <div className="company-detail-actions">
            {company.website && (
              <a
                className="button primary"
                href={company.website}
                target="_blank"
                rel="noreferrer"
              >
                Visit company website{" "}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            )}
            <Link className="button outline" to="/placements">
              Back to placements
            </Link>
          </div>
        </div>
      </div>
      <div className="company-detail-grid">
        <article>
          <span className="eyebrow">BASIC DETAILS</span>
          <h2>Company overview</h2>
          <p>{company.detail}</p>
          <div className="company-meta-list">
            <span>
              <strong>Location</strong>
              {company.location}
            </span>
            <span>
              <strong>Contact</strong>
              {company.contact}
            </span>
          </div>
        </article>
        <article>
          <span className="eyebrow">AVAILABLE OPPORTUNITIES</span>
          <h2>Open paths</h2>
          <div className="company-opportunity-list">
            {company.opportunities.map((item) => (
              <span key={item}>
                <Check size={15} /> {item}
              </span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
function JobPortal() {
  return (
    <section className="section placement-portal-section">
      <div className="container placement-portal-grid">
        <div className="placement-portal-copy reveal">
          <span className="eyebrow">JOB PORTAL</span>
          <h2>
            Current openings.
            <br />
            <span className="blue">Shared in one place.</span>
          </h2>
          <p>
            A simple placement board for learners to explore relevant openings,
            apply through the centre and track the next step.
          </p>
          <div className="placement-tags">
            <span>
              <Check size={15} /> Updated by placement team
            </span>
            <span>
              <Check size={15} /> Course matched roles
            </span>
          </div>
        </div>
        <div className="job-list reveal" aria-label="Sample job openings">
          {openings.map(([role, location, course], index) => (
            <article key={role} className="job-card">
              <span className="job-num">0{index + 1}</span>
              <div>
                <h3>{role}</h3>
                <p>{location}</p>
              </div>
              <small>{course}</small>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Affiliations() {
  return (
    <section className="section container affiliations-section">
      <SectionHead
        eyebrow="OUR AFFILIATIONS"
        title="Certificates and learning credentials."
        text="Certification logos are shown as dummy data and can be replaced with approved final assets."
      />
      <div className="affiliation-grid">
        {affiliations.map(([label, image]) => (
          <article className="affiliation-card reveal" key={label}>
            <img src={image} alt={label} loading="lazy" />
            <span>{label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}

function FeedbackForm() {
  return (
    <section className="section container feedback-review-section feedback-review-section--form">
      <div className="feedback-card reveal">
        <span className="eyebrow">STUDENT FEEDBACK</span>
        <h2>Share your learning experience.</h2>
        <form className="student-feedback-form">
          <label>
            Name
            <input type="text" placeholder="Your name" />
          </label>
          <label>
            Course
            <select defaultValue="">
              <option value="" disabled>
                Select course
              </option>
              <option>Digital Marketing</option>
              <option>Accounting</option>
              <option>Multimedia</option>
              <option>Software Courses</option>
            </select>
          </label>
          <label className="feedback-message">
            Feedback
            <textarea rows="4" placeholder="Tell us about your experience" />
          </label>
          <button className="button primary" type="button">
            Submit feedback <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </form>
      </div>
    </section>
  );
}

function GoogleLogo() {
  return (
    <span className="google-word" aria-label="Google">
      <span>G</span>
      <span>o</span>
      <span>o</span>
      <span>g</span>
      <span>l</span>
      <span>e</span>
    </span>
  );
}

function ReviewStars({ rating = 5 }) {
  return (
    <span className="review-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          size={14}
          fill="currentColor"
          aria-hidden="true"
          className={index < rating ? "is-filled" : ""}
        />
      ))}
    </span>
  );
}

function GoogleReviews() {
  return (
    <section className="section container google-reviews-section">
      <div className="google-review-widget reveal">
        <header className="google-review-summary">
          <div>
            <strong>Excellent</strong>
            <div className="google-score-row">
              <ReviewStars rating={5} />
              <b>5.0</b>
            </div>
          </div>
          <div className="google-review-brand">
            <GoogleLogo />
            <small>Based on 123 reviews</small>
          </div>
          <a
            className="google-review-button"
            href="https://www.google.com/search?q=G-TEC+Mahe+reviews"
            target="_blank"
            rel="noreferrer"
          >
            Write a review
          </a>
        </header>
        <div className="google-review-grid">
          {reviews.map((review) => (
            <article className="google-review-card" key={review.name}>
              <div className="google-review-person">
                <span>{review.initial}</span>
                <div>
                  <strong>{review.name}</strong>
                  <small>{review.time}</small>
                </div>
              </div>
              <p>{review.text}</p>
              <div className="google-review-foot">
                <ReviewStars rating={review.rating} />
                <GoogleLogo />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function VideoTestimonials() {
  return (
    <section className="section video-testimonial-section">
      <div className="container">
        <SectionHead
          eyebrow="VIDEO TESTIMONIALS"
          title="Student stories in their own voice."
          text="Placeholder video cards for future student testimonial uploads."
        />
        <div className="video-testimonial-grid">
          {videoTestimonials.map(([name, course, text]) => (
            <article className="video-testimonial-card reveal" key={name}>
              <div className="video-placeholder">
                <span>
                  <Play size={20} fill="currentColor" aria-hidden="true" />
                </span>
              </div>
              <div>
                <small>{course}</small>
                <h3>{name}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function PlacementFeatures({ variant = "all" }) {
  if (variant === "companies") return <PlacementCompanies />;
  if (variant === "affiliations") return <Affiliations />;
  if (variant === "reviews") return <GoogleReviews />;
  if (variant === "feedback") return <FeedbackForm />;
  if (variant === "videos") return <VideoTestimonials />;
  return (
    <>
      <PlacementCompanies />
      <JobPortal />
      <Affiliations />
    </>
  );
}


