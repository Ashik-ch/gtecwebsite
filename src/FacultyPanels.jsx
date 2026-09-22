import { useState } from "react";
import { Plus, Minus, Clock } from "lucide-react";
import "./faculty-panels.css";
const colors = ["#ffffff", "#ffffff", "#ffffff", "#ffffff", "#ffffff"];

function FacultyRow({ members, offset }) {
  const [active, setActive] = useState(null);
  return (
    <div
      className="faculty-panel-row"
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setActive(null);
      }}
    >
      {members.map((member, index) => {
        const expanded = active === index;
        return (
          <article
            key={member.id}
            className={
              "faculty-panel reveal" + (expanded ? " is-expanded" : "")
            }
            style={{
              "--faculty-color": colors[(index + offset) % colors.length],
            }}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(index);
            }}
          >
            <div className="faculty-panel-art">
              <span className="faculty-panel-number" aria-hidden="true">
                {String(offset + index + 1).padStart(2, "0")}
              </span>
              <img
                src={member.photo || "/images/team-placeholder.svg"}
                alt={
                  member.photo ? member.name : "Faculty portrait placeholder"
                }
                loading="lazy"
                width="480"
                height="560"
              />
              {!member.photo && (
                <span className="faculty-panel-photo-note">
                  Photo to be added
                </span>
              )}
              <button
                type="button"
                className="faculty-panel-toggle"
                aria-expanded={expanded}
                aria-controls={member.id + "-details"}
                aria-label={"Experience details for " + member.name}
                onClick={() => setActive(expanded ? null : index)}
              >
                {expanded ? <Minus size={18} /> : <Plus size={18} />}
              </button>
            </div>
            <div className="faculty-panel-caption">
              <span className="faculty-panel-role">{member.designation}</span>
              <h4>{member.name}</h4>
              <div
                id={member.id + "-details"}
                className="faculty-panel-details"
                hidden={!expanded}
              >
                <p>
                  <Clock size={14} aria-hidden="true" />
                  {member.experience || "Experience to be added"}
                </p>
                {member.pending && <small>Faculty details coming soon</small>}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
export default function FacultyPanels({ members }) {
  return (
    <div className="faculty-showcase">
      <p className="faculty-showcase-hint">
        Meet your mentors <span aria-hidden="true">/</span> Select + to explore
        each profile
      </p>
      <FacultyRow offset={0} members={members} />
    </div>
  );
}
