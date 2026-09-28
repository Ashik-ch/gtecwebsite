import { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { X, Send, ArrowUpRight } from "lucide-react";
import { Mascot } from "./Mascot";
import { courses, site } from "./data";
import { EnquiryContext } from "./EnquiryContext";

const Arrow = () => <ArrowUpRight size={18} aria-hidden="true" />;

const GUIDANCE_COURSE = "I’d like some guidance";
const WELCOME_TEXT = "Hi! Welcome to G-TEC Mahe! What brings you here today?";

const chatCourseInterests = [
  { label: "Digital Marketing", course: "Digital Marketing" },
  { label: "Data Analytics", course: "Skill Developments" },
  { label: "IT & Software", course: "Skill Developments" },
  { label: "Design", course: "Multimedia" },
  { label: "Accounts & SAP", course: "Accounting" },
  { label: "Not Sure", course: "" },
];
const chatCareerGoals = [
  "Get a Job",
  "Change Career",
  "Upskill",
  "Just Exploring",
];
const CHAT_DURATION_TEXT =
  "Course duration, fees and batch schedules vary by programme, so our admissions team can confirm the exact timeline for you. Tap “Enquire Now” and we’ll get the details to you.";

const courseByName = (name) => courses.find((c) => c.name === name);

function chatCourseDetails(interest) {
  if (!interest.course)
    return "No problem — take a look at our full course list (Digital Marketing, Multimedia, Interior Designing, Accounting, MS Office, SAP and Skill Developments) and pick whatever sparks your interest.";
  if (interest.label === "Accounts & SAP") {
    const accounting = courseByName("Accounting");
    const sap = courseByName("SAP");
    return `${accounting.name}: ${accounting.description} ${sap.name}: ${sap.description}`;
  }
  const course = courseByName(interest.course);
  return `${course.name}: ${course.description}`;
}

function chatCourseCareers(interest) {
  if (!interest.course)
    return "Our programmes lead to roles across marketing, design, accounting, IT support and business operations. Choose a course area and we can share specific career paths.";
  if (interest.label === "Accounts & SAP") {
    const accounting = courseByName("Accounting");
    const sap = courseByName("SAP");
    return `${accounting.name} careers: ${accounting.careers.join(", ")}. ${sap.name} careers: ${sap.careers.join(", ")}.`;
  }
  const course = courseByName(interest.course);
  return `${course.name} can lead to roles like ${course.careers.join(", ")}.`;
}

function WhatsappLauncher() {
  return (
    <a
      className="whatsapp-launcher"
      href={site.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with G-TEC Mahe on WhatsApp"
    >
      <svg viewBox="0 0 32 32" width="22" height="22" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.04 3C9.4 3 4 8.4 4 15.02c0 2.12.55 4.19 1.6 6.02L4 29l8.13-1.56a12.03 12.03 0 0 0 3.91.65C22.68 28.09 28 22.69 28 16.07 28 9.4 22.68 3 16.04 3Zm0 22.1c-1.25 0-2.47-.34-3.54-.98l-.25-.15-4.83.93.96-4.7-.17-.27a9.9 9.9 0 0 1-1.55-5.3c0-5.48 4.5-9.94 10-9.94s9.97 4.46 9.97 9.94-4.5 10.47-9.99 10.47Zm5.47-7.44c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.27-.47-2.42-1.5-.9-.8-1.5-1.79-1.67-2.09-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z"
        />
      </svg>
      <span>Chat with us</span>
    </a>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState("welcome");
  const [ctx, setCtx] = useState({});
  const [messages, setMessages] = useState([
    { role: "assistant", text: WELCOME_TEXT },
  ]);
  const [input, setInput] = useState("");
  const end = useRef(null);
  const enquire = useContext(EnquiryContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) end.current?.scrollIntoView({ block: "nearest" });
  }, [messages, open]);

  function pushBot(text) {
    setMessages((m) => [...m, { role: "assistant", text }]);
  }
  function pushUser(text) {
    setMessages((m) => [...m, { role: "user", text }]);
  }
  function goToAdvisor(course) {
    setOpen(false);
    enquire(course);
  }
  function startOver() {
    setStep("welcome");
    setCtx({});
    pushBot(WELCOME_TEXT);
  }

  function ask(value) {
    if (!value.trim()) return;
    const q = value.toLowerCase();
    let answer =
      "I can help you explore courses, location and admissions. For fees, schedules or personal advice, please use “Talk to an advisor” below.";
    if (/course|learn|study/.test(q))
      answer =
        "Explore Digital Marketing, Multimedia, Interior Designing, Accounting, MS Office, SAP and Skill Developments. Browse the courses page to find your direction.";
    if (/fee|duration|batch|time|cost/.test(q))
      answer =
        "Fees, duration and batch timings need to be confirmed by admissions for your selected programme. Tap “Talk to an advisor” to prepare an enquiry.";
    if (/place|job|career/.test(q))
      answer =
        "G-TEC Mahe offers placement assistance. Support and eligibility vary by programme; employment is not guaranteed. Visit Placements for more context.";
    if (/where|location|address/.test(q))
      answer = `You’ll find G-TEC Mahe at ${site.address}. Directions are in the contact section.`;
    setMessages((m) => [
      ...m,
      { role: "user", text: value },
      { role: "assistant", text: answer },
    ]);
    setInput("");
  }

  function getOptions() {
    if (step === "welcome")
      return [
        {
          label: "Find a Course",
          onSelect: () => {
            pushUser("Find a Course");
            pushBot("What are you interested in?");
            setStep("find-course");
          },
        },
        {
          label: "Build My Career",
          onSelect: () => {
            pushUser("Build My Career");
            pushBot("What’s your goal?");
            setStep("career-goal");
          },
        },
        {
          label: "Fees & Batches",
          onSelect: () => {
            pushUser("Fees & Batches");
            pushBot("Which course are you interested in?");
            setStep("fees-course");
          },
        },
        {
          label: "Talk to Us",
          onSelect: () => {
            pushUser("Talk to Us");
            goToAdvisor("");
          },
        },
      ];
    if (step === "find-course")
      return chatCourseInterests.map(({ label, course }) => ({
        label,
        onSelect: () => {
          pushUser(label);
          setCtx({ interest: { label, course } });
          pushBot("Great choice! What would you like to know?");
          setStep("find-course-menu");
        },
      }));
    if (step === "find-course-menu")
      return [
        {
          label: "Course Details",
          onSelect: () => {
            pushUser("Course Details");
            pushBot(chatCourseDetails(ctx.interest));
          },
        },
        {
          label: "Duration",
          onSelect: () => {
            pushUser("Duration");
            pushBot(CHAT_DURATION_TEXT);
          },
        },
        {
          label: "Career Options",
          onSelect: () => {
            pushUser("Career Options");
            pushBot(chatCourseCareers(ctx.interest));
          },
        },
        {
          label: "Enquire Now",
          onSelect: () => {
            pushUser("Enquire Now");
            goToAdvisor(ctx.interest.course || GUIDANCE_COURSE);
          },
        },
      ];
    if (step === "career-goal")
      return chatCareerGoals.map((goal) => ({
        label: goal,
        onSelect: () => {
          pushUser(goal);
          pushBot(
            "Based on your interest, you can explore these courses: " +
              courses.map((c) => c.name).join(", ") +
              ".",
          );
          setStep("career-courses");
        },
      }));
    if (step === "career-courses")
      return [
        {
          label: "View Courses",
          onSelect: () => {
            pushUser("View Courses");
            setOpen(false);
            navigate("/courses");
          },
        },
        {
          label: "Talk to Counsellor",
          onSelect: () => {
            pushUser("Talk to Counsellor");
            goToAdvisor("");
          },
        },
      ];
    if (step === "fees-course")
      return courses.map((c) => ({
        label: c.name,
        onSelect: () => {
          pushUser(c.name);
          setCtx({ feesCourse: c });
          pushBot("Want the latest fee and batch details?");
          setStep("fees-confirm");
        },
      }));
    if (step === "fees-confirm")
      return [
        {
          label: "Get Details",
          onSelect: () => {
            pushUser("Get Details");
            goToAdvisor(ctx.feesCourse.name);
          },
        },
        {
          label: "Talk to Counsellor",
          onSelect: () => {
            pushUser("Talk to Counsellor");
            goToAdvisor(ctx.feesCourse.name);
          },
        },
      ];
    return [];
  }

  const options = getOptions();

  return (
    <>
      {!open && <WhatsappLauncher />}
      <button
        className="chat-launcher"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close course guide" : "Open course guide"}
        aria-expanded={open}
      >
        {open ? <X size={22} /> : <Mascot />}
        <span>{open ? "Close" : "Ask Gio"}</span>
        {!open && <i />}
      </button>
      {open && (
        <aside className="chat-panel" aria-label="Course guide">
          <div className="chat-head">
            <Mascot />
            <div>
              <strong>Gio · Your course companion</strong>
              <small>Automated course information</small>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close guide">
              <X size={18} />
            </button>
          </div>
          <div className="chat-messages" aria-live="polite">
            {messages.map((m, i) => (
              <p key={i} className={m.role}>
                {m.text}
              </p>
            ))}
            <div ref={end} />
          </div>
          <div className="chat-options">
            {options.map((option) => (
              <button key={option.label} onClick={option.onSelect}>
                {option.label}
              </button>
            ))}
          </div>
          {step !== "welcome" && (
            <button className="chat-advisor" onClick={startOver}>
              Start over <Arrow />
            </button>
          )}
          <button className="chat-advisor" onClick={() => goToAdvisor("")}>
            Talk to an advisor <Arrow />
          </button>
          <p className="chat-tagline">
            You’re one step closer to your next skill.
          </p>
          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
          >
            <input
              aria-label="Message the course guide"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your next step…"
              maxLength={500}
            />
            <button aria-label="Send message" disabled={!input.trim()}>
              <Send size={18} />
            </button>
          </form>
        </aside>
      )}
    </>
  );
}
