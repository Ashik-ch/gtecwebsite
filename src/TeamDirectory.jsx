import { Clock, ArrowUpRight } from "lucide-react";
import "./team-directory.css";
import FacultyPanels from "./FacultyPanels";

// Add approved portrait paths and faculty details here when available.
const groups = [
  { id: "directors", label: "Leadership", title: "Our directors", description: "The people behind G-TEC Mahe.", members: [
    { name: "Firoz Valliyadath", designation: "Director", photo: "/images/dir1.jpg" },
    { name: "Muhammad Fawaaz", designation: "Director", photo: "/images/dir1jpg.jpg" },
  ] },
  { id: "front-office", label: "Student support", title: "Front office", description: "A friendly first point of contact for your next step.", members: [
    { name: "Safa Naval", designation: "Career Counselor" },
    { name: "Fathimathul Hana", designation: "Admission Counselor" },
  ] },
  { id: "hr-department", label: "People & opportunities", title: "HR department", description: "Meet our human resources and recruitment team.", members: [
    { name: "Fathima Zahiya", designation: "HR Manager" },
    { name: "Aysha Hiba", designation: "Admission & Recruitment Coordinator" },
  ] },
  { id: "faculty", label: "Teaching & learning", title: "Our faculty", description: "Get to know the people who guide your learning.", faculty: true, members: Array.from({ length: 10 }, (_, index) => ({
    id: "faculty-" + (index + 1), name: "Faculty profile " + String(index + 1).padStart(2, "0"),
    designation: "Designation to be added", experience: null, pending: true,
    photo: "/images/f" + ((index % 5) + 1) + ".jpg",
  })) },
];

function Portrait({ member }) {
  return (
    <div className={"team-portrait" + (member.photo ? "" : " is-placeholder")}>
      <img src={member.photo || "/images/team-placeholder.svg"}
        alt={member.photo ? member.name : "Portrait placeholder"}
        loading="lazy" width="480" height="560" />
      {!member.photo && <span className="team-photo-note">Photo to be added</span>}
    </div>
  );
}

export default function TeamDirectory() {
  return (
    <section className="section team-directory" aria-labelledby="team-title">
      <div className="container">
        <header className="team-intro reveal">
          <div><span className="eyebrow">PEOPLE WHO HELP YOU GROW</span>
            <h2 id="team-title">A little guidance.<br /><span className="blue">A world of difference.</span></h2>
          </div>
          <p>Meet our leadership, student support and teaching teams. Here to help you take your next step with confidence.</p>
        </header>
        <nav className="team-navigation" aria-label="Explore our team">
          {groups.map(group => <a href={"#" + group.id} key={group.id}>{group.title}<ArrowUpRight size={15} aria-hidden="true" /></a>)}
        </nav>
        {groups.map(group => (
          <section id={group.id} className="team-group" key={group.id} aria-labelledby={group.id + "-title"}>
            <header className="team-group-heading reveal">
              <div><span className="eyebrow">{group.label}</span><h3 id={group.id + "-title"}>{group.title} <span className="team-count">{String(group.members.length).padStart(2, "0")}</span></h3></div>
              <p>{group.description}</p>
            </header>
            {group.faculty ? <FacultyPanels members={group.members} /> : <div className="team-profile-grid">
              {group.members.map((member, index) => (
                <article className="team-profile reveal" key={member.id || member.name}>
                  <Portrait member={member} />
                  <span className="team-card-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <div className="team-profile-content">
                    {member.pending && <span className="team-pending">Name to be added</span>}
                    <h4>{member.name}</h4><p className="team-designation">{member.designation}</p>
                    {group.faculty && <p className="team-experience"><Clock size={15} aria-hidden="true" /><span>{member.experience || "Experience to be added"}</span></p>}
                  </div>
                </article>
              ))}
            </div>}
          </section>
        ))}
      </div>
    </section>
  );
}
