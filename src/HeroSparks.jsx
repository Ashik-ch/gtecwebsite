// Twinkling stars for page heroes (Placements, About, Courses, Life, Contact,
// Feedback). The twinkle animation comes from placement-motion.css and runs
// when the hero has the .motion-on class.
const extraSparks = [
  { top: "38%", right: "20%", fontSize: "clamp(30px, 4vw, 48px)", delay: "-1.4s" },
  { top: "12%", right: "30%", fontSize: "clamp(18px, 2.2vw, 26px)", delay: "-0.6s" },
  { top: "62%", right: "9%", fontSize: "clamp(22px, 2.8vw, 34px)", delay: "-2.2s" },
  { top: "70%", right: "34%", fontSize: "clamp(14px, 1.6vw, 20px)", delay: "-2.8s" },
];

// `count` limits how many ✧ stars show (Placements shows all of them).
export default function HeroSparks({ count = extraSparks.length }) {
  return (
    <>
      <span className="spark placement-spark-one" aria-hidden="true">
        ✳
      </span>
      {extraSparks.slice(0, count).map(({ top, right, fontSize, delay }) => (
        <span
          key={`${top}-${right}`}
          className="spark placement-spark-two"
          style={{ top, right, fontSize, animationDelay: delay }}
          aria-hidden="true"
        >
          ✧
        </span>
      ))}
    </>
  );
}
