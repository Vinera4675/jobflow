const technologies = ["Next.js", "TypeScript", "Tailwind CSS"];

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <p className="text-lg font-semibold">JobFlow</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">
            Projeto de portfólio para praticar uma aplicação full stack de vagas
            e candidaturas.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-md border border-white/15 px-3 py-1 text-xs font-semibold text-slate-200"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
