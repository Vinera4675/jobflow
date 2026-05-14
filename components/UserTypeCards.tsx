const userTypes = [
  {
    title: "Para candidatos",
    description:
      "Encontre vagas, envie candidaturas e acompanhe cada etapa sem perder o histórico das oportunidades.",
    items: [
      "Perfil com informações profissionais",
      "Lista de vagas com detalhes objetivos",
      "Painel para acompanhar candidaturas",
    ],
    action: "Buscar oportunidades",
  },
  {
    title: "Para empresas",
    description:
      "Publique vagas, receba candidatos e organize o andamento do processo em um painel próprio.",
    items: [
      "Cadastro de vagas por empresa",
      "Visualização de candidatos inscritos",
      "Atualização de status das candidaturas",
    ],
    action: "Cadastrar empresa",
  },
];

export function UserTypeCards() {
  return (
    <section id="perfis" className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-700">
              Perfis do produto
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Uma experiência pensada para os dois lados da contratação.
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              O JobFlow começa com uma home institucional, mas já organiza a
              direção das próximas telas: vagas, candidatura, perfil e painéis.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {userTypes.map((type) => (
              <article
                key={type.title}
                className="rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <h3 className="text-xl font-semibold text-slate-950">
                  {type.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {type.description}
                </p>

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

                <a
                  href="#"
                  className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-800 transition-colors hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                >
                  {type.action}
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
