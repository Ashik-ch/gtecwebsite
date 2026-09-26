import { useState } from "react";
import { Clock } from "lucide-react";
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
            role="button"
            tabIndex={0}
            aria-expanded={expanded}
            aria-controls={member.id + "-details"}
            aria-label={"Experience details for " + member.name}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setActive(index);
            }}
            onClick={(event) => {
              if (event.pointerType !== "mouse")
                setActive(expanded ? null : index);
            }}
            onKeyDown={(event) => {
              if (event.key !== "Enter" && event.key !== " ") return;
              event.preventDefault();
              setActive(expanded ? null : index);
            }}
          >
            <div className="faculty-panel-art">
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
                  {member.experience || "2 Years"} of experience
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
      <p className="faculty-showcase-hint">Meet your mentors</p>
      <FacultyRow offset={0} members={members} />
    </div>
  );
}
