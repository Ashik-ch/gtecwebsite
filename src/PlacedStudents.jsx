import { useState } from "react";
import { GraduationCap, Pause, Play } from "lucide-react";
import { placedStudents } from "./placed-students";
import "./placed-students.css";

function StudentCard({ student }) {
  return (
    <li className="placed-student-card">
      <div className="placed-student-profile">
        <div className="placed-student-photo">
          <img src={student.photo || "/images/team-placeholder.svg"}
            alt={student.demoPhoto ? "Sample portrait for layout preview" : student.photo ? student.name : "Student photo placeholder"}
            loading="lazy" width="80" height="88" />
        </div>
        <div className="placed-student-info">
          <span className="placed-card-label">STUDENT SPOTLIGHT</span>
          <h3>{student.name || "Student name to be added"}</h3>
          {(student.demoPhoto || !student.photo) && <span className="placed-photo-note">{student.demoPhoto ? "Demo photo" : "Photo to be added"}</span>}
        </div>
      </div>
      <div className="placed-student-course">
        <span className="placed-course-icon"><GraduationCap size={19} aria-hidden="true" /></span>
        <div><span className="placed-course-label">COURSE</span><p>{student.course || "Course to be added"}</p></div>
      </div>
    </li>
  );
}

export default function PlacedStudents() {
  const [paused, setPaused] = useState(false);
  if (!placedStudents.length) return null;
  const pending = placedStudents.some(student => student.demoPhoto || !student.name || !student.course || !student.photo);
  return (
    <section className="section placed-students-section" aria-labelledby="placed-students-title">
      <div className="container">
        <header className="placed-students-heading reveal">
          <div><span className="eyebrow">PLACED STUDENTS</span>
            <h2 id="placed-students-title">New skills.<br /><span className="blue">New beginnings.</span></h2>
            <p>{pending ? "Student placement profiles are being prepared. Cards below are placeholders." : "Meet our placed students and explore the courses they studied."}</p>
          </div>
          <button className="button outline placed-scroll-control" type="button"
            aria-controls="placed-students-carousel" aria-pressed={paused}
            aria-label="Pause automatic scrolling" onClick={() => setPaused(value => !value)}>
            {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
            {paused ? "Resume scrolling" : "Pause scrolling"}
          </button>
        </header>
      </div>
      <div id="placed-students-carousel" className="placed-students-viewport" data-paused={paused}
        tabIndex={0} role="region" aria-label="Placed students. Scrolling pauses while focused or hovered.">
        <div className="placed-students-track">
          <ul className="placed-students-list">{placedStudents.map(student => <StudentCard key={student.id} student={student} />)}</ul>
          <ul className="placed-students-list placed-students-copy" aria-hidden="true">{placedStudents.map(student => <StudentCard key={student.id} student={student} />)}</ul>
        </div>
      </div>
    </section>
  );
}
