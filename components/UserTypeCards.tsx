import Link from "next/link";

const userTypes = [
  {
    title: "Para candidatos",
    description:
      "Encontre vagas, envie candidaturas e acompanhe cada etapa sem perder o historico das oportunidades.",
    items: [
      "Perfil com informacoes profissionais",
      "Lista de vagas com detalhes objetivos",
      "Painel para acompanhar candidaturas",
    ],
    action: "Buscar oportunidades",
    href: "/vagas",
  },
  {
    title: "Para empresas",
    description:
      "Publique vagas, receba candidatos e organize o andamento do processo em um painel proprio.",
    items: [
      "Cadastro de vagas por empresa",
      "Visualizacao de candidatos inscritos",
      "Atualizacao de status das candidaturas",
    ],
    action: "Acessar painel da empresa",
    href: "/dashboard",
  },
];

export function UserTypeCards() {
  return (
    <section id="perfis" className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
            Para quem usa
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Uma experiencia pensada para os dois lados da contratacao.
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Candidatos encontram oportunidades com clareza, enquanto empresas
            organizam vagas e acompanham candidatos em um so lugar.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-6 md:grid-cols-2">
          {userTypes.map((type) => (
            <article
              key={type.title}
              className="flex h-full flex-col rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-7"
            >
              <div className="text-center">
                <h3 className="text-xl font-semibold text-slate-950">
                  {type.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {type.description}
                </p>
              </div>

              <ul className="mt-6 space-y-3">
                {type.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-6 text-slate-700"
                  >
                    <span className="mt-2 h-2 w-2 flex-none rounded-full bg-emerald-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-7">
                <Link
                  href={type.href}
                  prefetch={false}
                  className="inline-flex h-11 w-full items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  {type.action}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
