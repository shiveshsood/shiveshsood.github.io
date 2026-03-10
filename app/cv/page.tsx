import { getCVData } from "@/lib/content";

export default async function CV() {
  const cv = await getCVData();

  return (
    <div className="text-left">
      {/* Work Experience */}
      <section>
        <h2 className="font-display text-lg text-neutral-900 mb-6">
          Work Experience
        </h2>
        <div className="flex flex-col gap-4">
          {cv.work.map((entry) => (
            <div key={entry.company}>
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-sm">
                <h3 className="font-semibold text-neutral-900 leading-none">
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
                </h3>
                <span className="inline-flex items-center rounded-md bg-neutral-150 px-2 py-0.5 font-mono text-xs font-medium text-neutral-700">
                  {entry.location}
                </span>
                <div className="text-sm tabular-nums text-neutral-500 ml-auto shrink-0">
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
          {cv.education.map((entry) => (
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
          {cv.skills.map((skill) => (
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
