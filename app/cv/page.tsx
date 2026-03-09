const workExperience = [
  {
    company: "HBS Foundry",
    location: "Cambridge, MA",
    date: "Jul 2024 – Present",
    title: "Lead AI Product Manager",
    description:
      "Led user research, design and product to take new Agentic AI products from conception to launch; shipped 10+ AI agents and an AI avatar coach achieving 60% repeat usage.",
    url: "https://www.hbs.edu/",
  },
  {
    company: "Atomic",
    location: "Miami, FL",
    date: "Jun 2023 – Sep 2023",
    title: "Summer Associate for New Products",
    description:
      "Built and validated startup concepts across ClimateTech, Generative AI & B2B SaaS at a $700M+ venture studio.",
    url: "https://www.atomic.vc/",
  },
  {
    company: "StayQrious",
    location: "Bangalore, India",
    date: "Jan 2021 – May 2022",
    title: "Product Manager",
    description:
      "First product hire at a YC-backed ed-tech startup; launched 50+ features and a webinar product driving $1M+ ARR.",
    url: "https://www.stayqrious.com/",
  },
  {
    company: "Collins Aerospace",
    location: "Bangalore, India",
    date: "Jul 2019 – Dec 2020",
    title: "Software Engineer",
    description:
      "Developed hardware-accelerated cryptographic libraries achieving 1000x speedup; filed 2 patents on aircraft interior systems.",
    url: "https://www.collinsaerospace.com/",
  },
  {
    company: "Hyperbloom Agritech",
    location: "Bangalore, India",
    date: "Sep 2017 – Jul 2019",
    title: "Founder & Product Lead",
    description:
      "Founded an agri-tech startup incubated at IIM Bangalore developing edge AI-powered hardware for farmers; raised $30K seed funding.",
  },
];

const education = [
  {
    school: "Harvard University",
    date: "May 2024",
    degree: "Master's in Design Engineering",
    focus: "Data Science & AI, Product Management & Strategy, User Research & Design",
  },
  {
    school: "M.S. Ramaiah Institute of Technology",
    degree: "B.E., Electronics & Instrumentation",
  },
];

const skills = [
  "Product Management",
  "Product Strategy",
  "Agentic AI",
  "LLM Evaluation",
  "Python",
  "SQL",
  "AWS",
  "Full-Stack Dev",
  "Data Science",
  "Figma",
  "User Research",
  "GTM Strategy",
];

export default function CV() {
  return (
    <div className="text-left">
      {/* Work Experience */}
      <section>
        <h2 className="font-display text-lg text-neutral-900 mb-6">
          Work Experience
        </h2>
        <div className="flex flex-col gap-4">
          {workExperience.map((entry) => (
            <div key={entry.company}>
              <div className="flex items-center justify-between gap-x-2 text-sm">
                <h3 className="inline-flex items-center gap-x-1.5 font-semibold text-neutral-900 leading-none">
                  {entry.url ? (
                    <a
                      href={entry.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2 transition-colors hover:text-neutral-500"
                    >
                      {entry.company}
                    </a>
                  ) : (
                    entry.company
                  )}
                  <span className="inline-flex items-center rounded-md bg-neutral-150 px-2 py-0.5 font-mono text-xs font-medium text-neutral-700">
                    {entry.location}
                  </span>
                </h3>
                <div className="text-sm tabular-nums text-neutral-500 shrink-0">
                  {entry.date}
                </div>
              </div>
              <h4 className="font-mono text-sm leading-none text-neutral-800 mt-1.5">
                {entry.title}
              </h4>
              <p className="text-xs text-neutral-700 mt-2 leading-relaxed">
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-10">
        <h2 className="font-display text-lg text-neutral-900 mb-6">
          Education
        </h2>
        <div className="flex flex-col gap-4">
          {education.map((entry) => (
            <div key={entry.school}>
              <div className="flex items-center justify-between gap-x-2 text-sm">
                <h3 className="font-semibold text-neutral-900 leading-none">
                  {entry.school}
                </h3>
                {entry.date && (
                  <div className="text-sm tabular-nums text-neutral-500 shrink-0">
                    {entry.date}
                  </div>
                )}
              </div>
              <p className="font-mono text-sm text-neutral-800 mt-1.5">
                {entry.degree}
              </p>
              {entry.focus && (
                <p className="text-xs text-neutral-700 mt-1 leading-relaxed">
                  {entry.focus}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-10">
        <h2 className="font-display text-lg text-neutral-900 mb-6">
          Skills
        </h2>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center rounded-md bg-neutral-150 px-2 py-0.5 font-mono text-xs font-medium text-neutral-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
