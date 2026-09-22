import {
  ArrowUpRight,
  Check,
  Play,
  Star,
} from "lucide-react";
import "./placement-features.css";

const companies = [
  {
    name: "Bytrix Hub",
    field: "Internship provider",
    detail: "Explore internship opportunities with Bytrix Hub.",
    logo: "BH",
    website: "https://www.bytrixhub.com/",
  },
  {
    name: "NorthStar Accounts",
    field: "Accounting services",
    detail: "Demo recruiter for accounts assistant and Tally operator profiles.",
    logo: "NA",
  },
  {
    name: "PixelCraft Studio",
    field: "Design & multimedia",
    detail: "Placeholder creative studio for design portfolio opportunities.",
    logo: "PC",
  },
  {
    name: "UrbanNest Interiors",
    field: "Interior design",
    detail: "Sample placement company for junior designer and drafting roles.",
    logo: "UI",
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
  ["Afsal Rahman", "Digital Marketing", "How practical sessions helped me present my first campaign."],
  ["Meera Shaji", "Accounting", "From basic entries to confident accounting practice."],
  ["Nihal P", "Software Courses", "Building small projects made coding easier to understand."],
];

const reviews = [
  ["4.9", "Google review sample", "Friendly team, clear guidance and a comfortable place to learn."],
  ["5.0", "Google review sample", "The counsellors explained the course options patiently."],
  ["4.8", "Google review sample", "Good support for beginners and practical classroom sessions."],
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
        {companies.map((company) => (
          <article className="placement-company-card reveal" key={company.name}>
            <span className="company-logo">{company.logo}</span>
            <div>
              <small>{company.field}</small>
              <h3>
                {company.website ? (
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    {company.name}
                  </a>
                ) : company.name}
              </h3>
              <p>{company.detail}</p>
            </div>
            <ArrowUpRight size={18} aria-hidden="true" />
          </article>
        ))}
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


function GoogleReviews() {
  return (
    <section className="section container google-reviews-section">
      <div className="review-stack reveal">
        <span className="eyebrow">GOOGLE BUSINESS REVIEWS</span>
        <h2>What students are saying.</h2>
        {reviews.map(([rating, name, text]) => (
          <article className="review-card" key={text}>
            <span className="review-rating">
              <Star size={14} fill="currentColor" aria-hidden="true" />
              {rating}
            </span>
            <div>
              <strong>{name}</strong>
              <p>{text}</p>
            </div>
          </article>
        ))}
        <p className="source-note">
          Dummy review content for preview. Replace with live Google Business
          reviews after approval.
        </p>
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







