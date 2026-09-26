import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import "./mascot.css";

// Canonical assets: never recolour, mirror, stretch or substitute a new character.
export const gio = Object.freeze({
  name: "Gio",
  welcome: "/mascot/gio-welcome.png",
  guide: "/mascot/gio-guide.png",
  curious: "/mascot/gio-curious.png",
});

export function Mascot({
  pose = "welcome",
  className = "",
  alt = "",
  priority = false,
}) {
  return (
    <img
      className={`gio ${className}`}
      src={gio[pose] || gio.welcome}
      data-mascot="gio"
      data-pose={pose}
      alt={alt}
      width="1280"
      height="1280"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      draggable="false"
    />
  );
}

export function GioWelcome() {
  const [greeting, setGreeting] = useState(false);
  return (
    <div className="gio-welcome">
      <button
        className="gio-greet"
        onClick={() => setGreeting(!greeting)}
        aria-label="Say hello to Gio"
        aria-expanded={greeting}
        aria-controls="gio-greeting"
      >
        <Mascot
          priority
          alt="Gio, G-TEC Mahe’s blue and white robot mascot, waving hello"
        />
      </button>
      {greeting && (
        <div className="gio-greeting" id="gio-greeting" role="status">
          <strong>Hi, I’m Gio. Stay curious!</strong>
          <span>Let’s find a skill that feels like you.</span>
          <Link to="/courses#gio-finder">
            Find my direction <ArrowUpRight size={14} />
          </Link>
        </div>
      )}
    </div>
  );
}

const directions = [
  {
    name: "Build with technology",
    text: "Programming & problem solving",
    courses: [["Skill Developments", "skill-developments"]],
  },
  {
    name: "Create something new",
    text: "Visuals, media & spaces",
    courses: [
      ["Multimedia", "multimedia"],
      ["Interior Designing", "interior-designing"],
    ],
  },
  {
    name: "Grow a brand",
    text: "Content, campaigns & connections",
    courses: [["Digital Marketing", "digital-marketing"]],
  },
  {
    name: "Understand business",
    text: "Numbers, systems & productivity",
    courses: [
      ["Accounting", "accounting"],
      ["MS Office", "ms-office"],
      ["SAP", "sap"],
    ],
  },
];

export function GioFinder() {
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState(null);
  return (
    <div className="gio-finder" id="gio-finder">
      <div className="gio-finder-intro">
        <Mascot pose={choice ? "guide" : "curious"} />
        <div>
          <span className="eyebrow red-label">A LITTLE HELP FROM GIO</span>
          <h3>Curious is a great place to start.</h3>
          <p>Tell me what you enjoy. Let’s explore a direction together.</p>
        </div>
        <button
          className="button outline"
          aria-expanded={open}
          aria-controls="gio-directions"
          onClick={() => {
            setOpen(!open);
            setChoice(null);
          }}
        >
          {open ? "Close guide" : "Find my direction"}
          {open ? <X size={16} /> : <ArrowUpRight size={16} />}
        </button>
      </div>
      {open && (
        <div id="gio-directions" className="gio-directions">
          <p className="gio-question">What would you like to do more of?</p>
          <div className="gio-choice-grid">
            {directions.map((d) => (
              <button
                key={d.name}
                aria-pressed={choice === d}
                onClick={() => setChoice(d)}
              >
                <strong>{d.name}</strong>
                <span>{d.text}</span>
              </button>
            ))}
          </div>
          {choice && (
            <div className="gio-recommendation" aria-live="polite">
              <strong>A direction worth exploring.</strong>
              <p>
                These course areas match that interest. An advisor can help you
                confirm the right level.
              </p>
              <div>
                {choice.courses.map(([name, slug]) => (
                  <Link
                    className="button primary"
                    key={slug}
                    to={`/courses/${slug}`}
                  >
                    {name}
                    <ArrowUpRight size={16} />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
