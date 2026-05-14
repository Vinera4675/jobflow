export type WorkModel = "remoto" | "hibrido" | "presencial";

export type JobType = "estagio" | "junior" | "full-time";

export type JobStatus = "aberta" | "encerrada" | "em_analise";

export type Job = {
  id: string;
  title: string;
  company: string;
  shortDescription: string;
  fullDescription: string;
  requirements: string[];
  location: string;
  workModel: WorkModel;
  type: JobType;
  createdAt: string;
  status: JobStatus;
};

export const workModelLabels: Record<WorkModel, string> = {
  remoto: "Remoto",
  hibrido: "Híbrido",
  presencial: "Presencial",
};

export const jobTypeLabels: Record<JobType, string> = {
  estagio: "Estágio",
  junior: "Júnior",
  "full-time": "Full-time",
};

export const jobStatusLabels: Record<JobStatus, string> = {
  aberta: "Aberta",
  encerrada: "Encerrada",
  em_analise: "Em análise",
};

export const jobs: Job[] = [
  {
    id: "desenvolvedor-front-end-jr",
    title: "Desenvolvedor Front-end Jr.",
    company: "NovaTech",
    shortDescription:
      "Crie interfaces responsivas para uma plataforma SaaS em crescimento.",
    fullDescription:
      "A NovaTech procura uma pessoa desenvolvedora front-end júnior para atuar na evolução de dashboards, fluxos de cadastro e telas internas. A vaga é ideal para quem quer ganhar experiência com produtos digitais, boas práticas de componentes e integração com APIs.",
    requirements: [
      "Conhecimento em HTML, CSS, JavaScript e TypeScript",
      "Experiência inicial com React ou Next.js",
      "Noções de consumo de APIs REST",
      "Cuidado com responsividade e acessibilidade",
    ],
    location: "São Paulo, SP",
    workModel: "remoto",
    type: "junior",
    createdAt: "2026-05-08",
    status: "aberta",
  },
  {
    id: "estagio-full-stack",
    title: "Estágio Full Stack",
    company: "Flow Labs",
    shortDescription:
      "Participe do desenvolvimento de funcionalidades web com acompanhamento técnico.",
    fullDescription:
      "A Flow Labs busca uma pessoa estagiária para apoiar o time de produto no desenvolvimento de novas funcionalidades. A rotina inclui criação de telas, pequenos endpoints, revisão de requisitos e aprendizado constante com pessoas mais experientes.",
    requirements: [
      "Estar cursando tecnologia, engenharia ou áreas relacionadas",
      "Interesse em Next.js, Node.js e bancos relacionais",
      "Organização para documentar aprendizados e tarefas",
      "Vontade de aprender boas práticas de desenvolvimento",
    ],
    location: "Curitiba, PR",
    workModel: "hibrido",
    type: "estagio",
    createdAt: "2026-05-06",
    status: "aberta",
  },
  {
    id: "analista-produto-full-time",
    title: "Analista de Produto",
    company: "PeopleHub",
    shortDescription:
      "Ajude a transformar problemas de usuários em melhorias para o produto.",
    fullDescription:
      "A PeopleHub está formando um time de produto para melhorar a experiência de empresas e candidatos. A pessoa analista vai apoiar descoberta de oportunidades, organizar feedbacks, acompanhar métricas e colaborar com design e engenharia.",
    requirements: [
      "Boa comunicação com áreas de negócio e tecnologia",
      "Capacidade de organizar requisitos e prioridades",
      "Noções de métricas de produto",
      "Interesse por experiência do usuário",
    ],
    location: "Belo Horizonte, MG",
    workModel: "presencial",
    type: "full-time",
    createdAt: "2026-05-03",
    status: "em_analise",
  },
  {
    id: "desenvolvedor-back-end-jr",
    title: "Desenvolvedor Back-end Jr.",
    company: "DataBridge",
    shortDescription:
      "Construa APIs e rotinas de dados para apoiar uma plataforma de recrutamento.",
    fullDescription:
      "A DataBridge precisa de uma pessoa desenvolvedora back-end júnior para trabalhar em APIs, modelagem de dados e integrações. A vaga combina manutenção de funcionalidades existentes com construção gradual de novos módulos.",
    requirements: [
      "Conhecimento em TypeScript ou JavaScript",
      "Noções de banco de dados relacional",
      "Entendimento básico de APIs HTTP",
      "Interesse em testes e qualidade de código",
    ],
    location: "Porto Alegre, RS",
    workModel: "remoto",
    type: "junior",
    createdAt: "2026-04-29",
    status: "aberta",
  },
];

export function getJobById(id: string) {
  return jobs.find((job) => job.id === id);
}
