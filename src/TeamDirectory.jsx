import { ArrowUpRight } from "lucide-react";
import "./team-directory.css";
import FacultyPanels from "./FacultyPanels";

// Add approved portrait paths and faculty details here when available.
const groups = [
  {
    id: "directors",
    label: "Leadership",
    title: "Our directors",
    description: "The people behind G-TEC Mahe.",
    horizontal: true,
    members: [
      {
        name: "Firoz Valliyadath",
        designation: "Director",
        photo: "/images/staff/firoz-valliyadath.jpg",
      },
      {
        name: "Mohammed Fawaaz",
        designation: "Director",
        photo: "/images/staff/mohammed-fawaaz.jpg",
      },
    ],
  },
  {
    id: "front-office",
    label: "Student support",
    title: "Front office",
    description: "A friendly first point of contact for your next step.",
    horizontal: true,
    members: [
      {
        name: "Safa Naval",
        designation: "Career Counselor",
        photo: "/images/staff/safa-naval.jpg",
      },
      {
        name: "Fathimathul Hena",
        designation: "Academic Counselor",
        photo: "/images/staff/fathimathul-hena.jpg",
      },
    ],
  },
  {
    id: "hr-department",
    label: "People & opportunities",
    title: "HR department",
    description: "Meet our human resources and recruitment team.",
    horizontal: true,
    members: [
      {
        name: "Fathima Zahiya",
        designation: "HR Manager",
        photo: "/images/staff/fathima-zahiya.jpg",
      },
      {
        name: "Aysha Hiba",
        designation: "Admission & Recruitment Coordinator",
        photo: "/images/staff/aysha-hiba.jpg",
      },
    ],
  },
  {
    id: "social-media",
    label: "Digital presence",
    title: "Social media team",
    description: "The creative team behind our online community.",
    horizontal: true,
    members: [
      {
        name: "Name to be added",
        designation: "Social Media Team",
        photo: "/images/team-placeholder.svg",
      },
      {
        name: "Name to be added",
        designation: "Social Media Team",
        photo: "/images/team-placeholder.svg",
      },
    ].map((member, index) => ({ id: "social-media-" + (index + 1), ...member })),
  },
  {
    id: "faculty",
    label: "Teaching & learning",
    title: "Our faculty",
    description: "Get to know the people who guide your learning.",
    faculty: true,
    members: [
      {
        name: "Anusree K",
        designation: "Accounts & Software Trainer",
        photo: "/images/staff/anusree-k.jpg",
      },
      {
        name: "Athulya V",
        designation: "Digital Marketing Executive & Faculty",
        photo: "/images/staff/athulya-v.jpg",
      },
      {
        name: "Fathimath Farha",
        designation: "Software Trainer",
        photo: "/images/staff/fathimath-farha.jpg",
      },
      {
        name: "Muhammed Kaif",
        designation: "Social Media Intern",
        photo: "/images/staff/muhammed-kaif.jpg",
      },
      {
        name: "Nihala Fathima",
        designation: "Multimedia Faculty",
        photo: "/images/staff/nihala-fathima.jpg",
      },
      {
        name: "Rasha Fouz",
        designation: "Digital Marketing Executive & Trainer",
        photo: "/images/staff/rasha-fouz.jpg",
      },
      {
        name: "Rayhanath E.P",
        designation: "MS Office Faculty",
        photo: "/images/staff/rayhanath-ep.jpg",
      },
      {
        name: "Sarima G",
        designation: "Accounting Skills Development Trainer",
        photo: "/images/staff/sarima-g.jpg",
      },
      {
        name: "Shazna Sathar",
        designation: "Spoken English & Personality Development Trainer",
        photo: "/images/staff/shazna-sathar.jpg",
      },
      {
        name: "Sidhique C.H",
        designation: "Social Media Head",
        photo: "/images/staff/sidhique-ch.jpg",
      },
    ].map((member, index) => ({
      id: "faculty-" + (index + 1),
      ...member,
    })),
  },
];

function Portrait({ member }) {
  return (
    <div className={"team-portrait" + (member.photo ? "" : " is-placeholder")}>
      <img
        src={member.photo || "/images/team-placeholder.svg"}
        alt={member.photo ? member.name : "Portrait placeholder"}
        loading="lazy"
        width="480"
        height="560"
      />
      {!member.photo && (
        <span className="team-photo-note">Photo to be added</span>
      )}
    </div>
  );
}

const personAccents = ["#1748db", "#a855f7", "#0f9b8e", "#e0663f", "#d1477a"];

function HorizontalGroup({ members, wide, accentOffset = 0 }) {
  return (
    <div
      className={"team-people-grid" + (wide ? " team-people-grid--wide" : "")}
    >
      {members.map((member, index) => (
        <article
          className="team-person-card reveal"
          key={member.id || member.name}
          style={{
            "--accent":
              personAccents[(index + accentOffset) % personAccents.length],
          }}
        >
          <div className="team-person-media">
            {member.photo ? (
              <img
                src={member.photo}
                alt={member.name}
                loading="lazy"
                width="480"
                height="560"
              />
            ) : (
              <span className="team-person-initial" aria-hidden="true">
                {member.name.charAt(0)}
              </span>
            )}
            <span className="team-person-badge" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="team-person-body">
            <span className="team-person-ghost" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h4>{member.name}</h4>
            <p className="team-designation">{member.designation}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function GroupBody({ group }) {
  if (group.faculty) return <FacultyPanels members={group.members} />;
  if (group.horizontal) return <HorizontalGroup members={group.members} />;
  return (
    <div className="team-profile-grid">
      {group.members.map((member, index) => (
        <article className="team-profile reveal" key={member.id || member.name}>
          <Portrait member={member} />
          <span className="team-card-index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="team-profile-content">
            {member.pending && (
              <span className="team-pending">Name to be added</span>
            )}
            <h4>{member.name}</h4>
            <p className="team-designation">{member.designation}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

function GroupHeader({ group }) {
  return (
    <header className="team-group-heading reveal">
      <div>
        <span className="eyebrow">{group.label}</span>
        <h3 id={group.id + "-title"}>
          {group.title}{" "}
          <span className="team-count">
            {String(group.members.length).padStart(2, "0")}
          </span>
        </h3>
      </div>
      <p>{group.description}</p>
    </header>
  );
}

export default function TeamDirectory() {
  const directors = groups.find((group) => group.id === "directors");
  const frontOffice = groups.find((group) => group.id === "front-office");
  const hrDepartment = groups.find((group) => group.id === "hr-department");
  const socialMedia = groups.find((group) => group.id === "social-media");
  const faculty = groups.find((group) => group.id === "faculty");

  return (
    <section className="section team-directory" aria-labelledby="team-title">
      <div className="container">
        <header className="team-intro reveal">
          <div>
            <span className="eyebrow">PEOPLE WHO HELP YOU GROW</span>
            <h2 id="team-title">
              A little guidance.
              <br />
              <span className="blue">A world of difference.</span>
            </h2>
          </div>
          <p>
            Meet our leadership, student support and teaching teams. Here to
            help you take your next step with confidence.
          </p>
        </header>
        <nav className="team-navigation" aria-label="Explore our team">
          {[directors, hrDepartment, frontOffice, socialMedia, faculty].map((group) => (
            <a href={"#" + group.id} key={group.id}>
              {group.title}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <section
          id={directors.id}
          className="team-group"
          aria-labelledby={directors.id + "-title"}
        >
          <GroupHeader group={directors} />
          <GroupBody group={directors} />
        </section>
        <div className="team-group team-group-row">
          {[hrDepartment, frontOffice].map((group, groupIndex) => (
            <section
              key={group.id}
              id={group.id}
              className="team-group-nested"
              aria-labelledby={group.id + "-title"}
            >
              <GroupHeader group={group} />
              <HorizontalGroup
                members={group.members}
                wide
                accentOffset={groupIndex * 2}
              />
            </section>
          ))}
        </div>
        <section
          id={socialMedia.id}
          className="team-group"
          aria-labelledby={socialMedia.id + "-title"}
        >
          <GroupHeader group={socialMedia} />
          <GroupBody group={socialMedia} />
        </section>
        <section
          id={faculty.id}
          className="team-group"
          aria-labelledby={faculty.id + "-title"}
        >
          <GroupHeader group={faculty} />
          <GroupBody group={faculty} />
        </section>
      </div>
    </section>
  );
}
