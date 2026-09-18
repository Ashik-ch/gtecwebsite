import { useState } from "react";
import { GraduationCap, Pause, Play, Sparkle } from "lucide-react";
import { placedStudents } from "./placed-students";
import "./placed-students.css";

const tapeColors = ["#ffd166", "#8ecae6", "#f4a6c6", "#b8e0c2", "#c9b8f4"];

function StudentCard({ student, index }) {
  let photoAlt = "Student photo placeholder";
  if (student.demoPhoto) photoAlt = "Sample portrait for layout preview";
  else if (student.photo) photoAlt = student.name;

  return (
    <li
      className="placed-student-card"
      style={{ "--tape": tapeColors[index % tapeColors.length] }}
    >
      <span className="placed-tape" aria-hidden="true" />
      <div className="placed-photo-frame">
        <img
          src={student.photo || "/images/team-placeholder.svg"}
          alt={photoAlt}
          loading="lazy"
          width="220"
          height="220"
        />
        <span className="placed-seal" aria-hidden="true">
          <Sparkle size={11} />
          Placed
        </span>
      </div>
      <div className="placed-caption">
        <h3>{student.name || "Adithya Chandran"}</h3>
        {(student.demoPhoto || !student.photo) && (
          <span className="placed-photo-note">{student?.demoPhoto}</span>
        )}
        <span className="placed-course-stamp">
          <GraduationCap size={13} aria-hidden="true" />
          {student.course || "Course to be added"}
        </span>
      </div>
    </li>
  );
}

export default function PlacedStudents() {
  const [paused, setPaused] = useState(false);
  if (!placedStudents.length) return null;
  const pending = placedStudents.some(
    (student) =>
      student.demoPhoto || !student.name || !student.course || !student.photo,
  );
  return (
    <section
      className="section placed-students-section"
      aria-labelledby="placed-students-title"
    >
      <div className="container">
        <header className="placed-students-heading reveal">
          <div>
            <span className="eyebrow">PLACED STUDENTS</span>
            <h2 id="placed-students-title">
              New skills.
              <br />
              <span className="blue">New beginnings.</span>
            </h2>
            <p>
              {pending
                ? "Student placement profiles are being prepared. Cards below are placeholders."
                : "Meet our placed students and explore the courses they studied."}
            </p>
          </div>
          <button
            className="button outline placed-scroll-control"
            type="button"
            aria-controls="placed-students-carousel"
            aria-pressed={paused}
            aria-label="Pause automatic scrolling"
            onClick={() => setPaused((value) => !value)}
          >
            {paused ? (
              <Play size={16} aria-hidden="true" />
            ) : (
              <Pause size={16} aria-hidden="true" />
            )}
            {paused ? "Resume scrolling" : "Pause scrolling"}
          </button>
        </header>
      </div>
      <div
        id="placed-students-carousel"
        className="placed-students-viewport"
        data-paused={paused}
        tabIndex={0}
        role="region"
        aria-label="Placed students. Scrolling pauses while focused or hovered."
      >
        <div className="placed-students-track">
          <ul className="placed-students-list">
            {placedStudents.map((student, index) => (
              <StudentCard key={student.id} student={student} index={index} />
            ))}
          </ul>
          <ul
            className="placed-students-list placed-students-copy"
            aria-hidden="true"
          >
            {placedStudents.map((student, index) => (
              <StudentCard key={student.id} student={student} index={index} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
