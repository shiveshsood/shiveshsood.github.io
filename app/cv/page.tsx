import { getCVData } from "@/lib/content";

export default async function CV() {
  const cv = await getCVData();

  return (
    <div className="text-left">
      {/* Experience */}
      <section>
        <h2 className="font-mono text-xs font-medium tracking-widest uppercase text-neutral-400 mb-5">
          Experience
        </h2>
        <div className="flex flex-col divide-y divide-neutral-200">
          {cv.work.map((entry) => (
            <div
              key={entry.company}
              className="flex items-center gap-4 py-3.5 first:pt-0"
            >
              {entry.logo ? (
                <img
                  src={entry.logo}
                  alt={`${entry.company} logo`}
                  width={24}
                  height={24}
                  className="size-6 shrink-0 rounded-sm object-contain"
                />
              ) : (
                <div className="size-6 shrink-0 rounded-sm bg-neutral-150 flex items-center justify-center text-[10px] font-mono font-medium text-neutral-500">
                  {entry.company.charAt(0)}
                </div>
              )}
              <div className="flex flex-1 items-baseline gap-x-4 min-w-0">
                <h3 className="text-sm font-semibold text-neutral-900 shrink-0">
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
                <span className="text-sm text-neutral-500 truncate hidden xs:inline">
                  {entry.title}
                </span>
                <span className="tabular-nums text-sm text-neutral-500 ml-auto shrink-0">
                  {entry.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mt-12">
        <h2 className="font-mono text-xs font-medium tracking-widest uppercase text-neutral-400 mb-5">
          Education
        </h2>
        <div className="flex flex-col divide-y divide-neutral-200">
          {cv.education.map((entry) => (
            <div
              key={entry.school}
              className="flex items-center gap-4 py-3.5 first:pt-0"
            >
              {entry.logo && (
                <img
                  src={entry.logo}
                  alt={`${entry.school} logo`}
                  width={24}
                  height={24}
                  className="size-6 shrink-0 rounded-sm object-contain"
                />
              )}
              <div className="flex flex-1 items-baseline gap-x-4 min-w-0">
                <h3 className="text-sm font-semibold text-neutral-900 shrink-0">
                  {entry.school}
                </h3>
                <span className="text-sm text-neutral-500 truncate hidden xs:inline">
                  {entry.degree}
                </span>
                {entry.date && (
                  <span className="tabular-nums text-sm text-neutral-500 ml-auto shrink-0">
                    {entry.date}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-12">
        <h2 className="font-mono text-xs font-medium tracking-widest uppercase text-neutral-400 mb-5">
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
