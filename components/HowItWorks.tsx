const steps = [
  {
    number: "01",
    title: "Empresas publicam vagas",
    description:
      "Cada empresa cadastra oportunidades com informações claras sobre cargo, formato de trabalho e requisitos.",
  },
  {
    number: "02",
    title: "Candidatos encontram oportunidades",
    description:
      "Os candidatos visualizam vagas relevantes e iniciam candidaturas com um fluxo objetivo.",
  },
  {
    number: "03",
    title: "Status ficam organizados",
    description:
      "Candidaturas podem ser acompanhadas por painéis separados para candidatos e empresas.",
  },
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Como funciona
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Um fluxo simples para sair da vaga publicada até a candidatura.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            A primeira versão visual prepara a experiência principal do produto
            antes de adicionar autenticação, banco de dados e regras de negócio.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.number}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <span className="text-sm font-semibold text-emerald-700">
                {step.number}
              </span>
              <h3 className="mt-5 text-xl font-semibold text-slate-950">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
