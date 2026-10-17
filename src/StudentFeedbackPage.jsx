import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  CheckCircle2,
  HeartHandshake,
  Lightbulb,

  Sparkles,
  Star,
} from "lucide-react";
import { Mascot } from "./Mascot";
import { courses } from "./data";
import "./student-feedback.css";

const ratingLabels = ["Poor", "Fair", "Good", "Very good", "Excellent"];
const MAX_FEEDBACK = 600;

const reasons = [
  {
    icon: Lightbulb,
    title: "Shapes our courses",
    text: "Your comments help trainers improve lessons, projects and practice sessions.",
  },
  {
    icon: HeartHandshake,
    title: "Helps future students",
    text: "Honest experiences help new learners choose the right path with confidence.",
  },
  {
    icon: Sparkles,
    title: "Gets read by the team",
    text: "Every response goes straight to the G-TEC Mahe team - nothing is ignored.",
  },
];

function StepLabel({ number, children, htmlFor }) {
  const Tag = htmlFor ? "label" : "span";
  return (
    <Tag className="feedback-step-label" htmlFor={htmlFor}>
      <b aria-hidden="true">{number}</b>
      {children}
    </Tag>
  );
}

function FeedbackCollector() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(null);
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (busy) return;
    const form = new FormData(e.currentTarget);
    if (form.get("website")) return;
    const name = String(form.get("name") || "").trim();
    if (!name) return setError("Please enter your name.");
    if (!rating) return setError("Please choose a star rating.");
    if (!form.get("course")) return setError("Please choose your course.");
    if (!message.trim()) return setError("Please enter your feedback.");
    const payload = new FormData();
    payload.set("access_key", "79a77bb9-4b59-4960-b5dd-56ffa438828a");
    payload.set("subject", "New G-TEC Mahe student feedback");
    payload.set("from_name", "G-TEC Mahe Website");
    payload.set("message", [
      `Name: ${name}`,
      `Course: ${form.get("course")}`,
      `Rating: ${rating}/5 (${ratingLabels[rating - 1]})`,
      `Feedback: ${message.trim()}`,
      `OK to feature on website: ${form.get("feature") ? "Yes" : "No"}`,
      `Source: ${window.location.pathname}`,
    ].join("\n"));
    setError("");
    setBusy(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Submission failed");
      setSent({ name: name.split(/\s+/)[0] });
    } catch {
      setError("We couldn't send your feedback. Please try again. Your details have been kept.");
    } finally {
      setBusy(false);
    }
  }

  if (sent)
    return (
      <div className="feedback-collector feedback-thanks" role="status">
        <span className="feedback-thanks-icon">
          <CheckCircle2 size={34} />
        </span>
        <h2>Thank you, {sent.name}!</h2>
        <p>
          Your feedback has been sent to the G-TEC Mahe team.
        </p>
        <div className="feedback-thanks-actions">
          <Link className="button outline" to="/courses">
            Explore courses
          </Link>
        </div>
      </div>
    );

  const shown = hover || rating;

  return (
    <form className="feedback-collector" onSubmit={submit}>
      <div className="feedback-step">
        <StepLabel number="01">How was your experience?</StepLabel>
        <div
          className="feedback-stars"
          role="radiogroup"
          aria-label="Rating"
          onMouseLeave={() => setHover(0)}
        >
          {ratingLabels.map((label, index) => {
            const value = index + 1;
            return (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={rating === value}
                aria-label={`${value} star${value > 1 ? "s" : ""} - ${label}`}
                className={value <= shown ? "is-lit" : ""}
                onMouseEnter={() => setHover(value)}
                onFocus={() => setHover(value)}
                onBlur={() => setHover(0)}
                onClick={() => setRating(value)}
              >
                <Star size={30} fill="currentColor" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="feedback-step">
        <StepLabel number="02" htmlFor="feedback-course">
          Which course did you take?
        </StepLabel>
        <select id="feedback-course" name="course" required defaultValue="">
          <option value="" disabled>
            Select a course
          </option>
          {courses.map((course) => (
            <option key={course.slug} value={course.name}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      <div className="feedback-step">
        <StepLabel number="03" htmlFor="feedback-name">
          Your name
        </StepLabel>
        <input
          id="feedback-name"
          name="name"
          required
          autoComplete="name"
          maxLength={100}
          placeholder="Full name"
        />
      </div>

      <div className="feedback-step">
        <StepLabel number="04" htmlFor="feedback-message">
          Tell us about your experience
        </StepLabel>
        <textarea
          id="feedback-message"
          name="message"
          required
          rows={5}
          maxLength={MAX_FEEDBACK}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="What did you enjoy? What could we do better?"
        />
        <small className="feedback-counter">
          {message.length} / {MAX_FEEDBACK}
        </small>
      </div>

      <input
        className="honeypot"
        name="website"
        tabIndex={-1}
        aria-hidden="true"
        autoComplete="off"
      />

      <label className="feedback-feature">
        <input type="checkbox" name="feature" />
        <span>You can feature my feedback on the G-TEC Mahe website.</span>
      </label>

      {error ? <p className="form-error" role="alert">{error}</p> : null}

      <button className="button primary feedback-submit" type="submit" disabled={busy}>
        {busy ? "Sending..." : "Send feedback"} <ArrowUpRight size={18} aria-hidden="true" />
      </button>
      <p className="feedback-note">
        Your feedback is sent directly to the G-TEC Mahe team by email.
      </p>
    </form>
  );
}

export default function StudentFeedbackPage({ PageHero, CTA }) {
  return (
    <>
      <PageHero
        eyebrow="Student Feedback"
        title={
          <>
            Your voice.
            <br />
            <span className="blue">Our next step.</span>
          </>
        }
        text="Studied at G-TEC Mahe? Tell us how it went - it takes less than a minute and helps us make every course better."
        items={[["Student feedback"]]}
      />
      <section className="section container feedback-page">
        <div className="feedback-page-grid">
          <FeedbackCollector />
          <aside className="feedback-aside">
            <div className="feedback-aside-card">
              <span className="eyebrow">Why It Matters</span>
              <h2>Every response makes G-TEC better.</h2>
              <ul>
                {reasons.map(({ icon: Icon, title, text }) => (
                  <li key={title}>
                    <span className="feedback-aside-icon" aria-hidden="true">
                      <Icon size={20} />
                    </span>
                    <div>
                      <strong>{title}</strong>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <span className="feedback-aside-gio" aria-hidden="true">
                <Mascot variant="mini" mood="happy" />
              </span>
            </div>
          </aside>
        </div>
      </section>
      <CTA />
    </>
  );
}
