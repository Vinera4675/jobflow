/* eslint-disable @typescript-eslint/no-require-imports */

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

const databaseUrl =
  process.env.PRISMA_USE_DIRECT_URL === "1"
    ? process.env.DIRECT_URL
    : process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL ou DIRECT_URL nao encontrada para rodar o seed.");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: databaseUrl,
  }),
});

const companies = [
  {
    clerkId: "seed_company_orbita",
    name: "Equipe Orbita Labs",
    email: "talentos@orbitalabs.example",
    profile: {
      companyName: "Orbita Labs",
      description:
        "Empresa de produtos digitais focada em plataformas web para times de operações.",
      website: "https://orbitalabs.example",
      location: "Sao Paulo, SP",
    },
  },
  {
    clerkId: "seed_company_nova",
    name: "Equipe Nova People",
    email: "vagas@novapeople.example",
    profile: {
      companyName: "Nova People",
      description:
        "Consultoria que conecta empresas em crescimento a profissionais de tecnologia.",
      website: "https://novapeople.example",
      location: "Curitiba, PR",
    },
  },
];

const candidates = [
  {
    clerkId: "seed_candidate_lia",
    name: "Lia Andrade",
    email: "lia.andrade@example",
    profile: {
      title: "Desenvolvedora Front-end Junior",
      bio: "Profissional em transição para tecnologia, com foco em interfaces acessíveis e organização de componentes.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
      githubUrl: "https://github.com/lia-seed",
      linkedinUrl: "https://linkedin.com/in/lia-seed",
      resumeUrl: "https://example.com/curriculos/lia-andrade",
    },
  },
  {
    clerkId: "seed_candidate_mateus",
    name: "Mateus Costa",
    email: "mateus.costa@example",
    profile: {
      title: "Desenvolvedor Full Stack Junior",
      bio: "Desenvolvedor com interesse em APIs, bancos de dados relacionais e boas práticas de produto.",
      skills: ["Node.js", "PostgreSQL", "Prisma", "React"],
      githubUrl: "https://github.com/mateus-seed",
      linkedinUrl: "https://linkedin.com/in/mateus-seed",
      resumeUrl: "https://example.com/curriculos/mateus-costa",
    },
  },
  {
    clerkId: "seed_candidate_sofia",
    name: "Sofia Mendes",
    email: "sofia.mendes@example",
    profile: {
      title: "Estudante de UX e Front-end",
      bio: "Profissional com base em design de interfaces, prototipagem e desenvolvimento front-end.",
      skills: ["HTML", "CSS", "Figma", "JavaScript"],
      githubUrl: "https://github.com/sofia-seed",
      linkedinUrl: "https://linkedin.com/in/sofia-seed",
      resumeUrl: "https://example.com/curriculos/sofia-mendes",
    },
  },
];

const jobs = [
  {
    companyIndex: 0,
    title: "Desenvolvedor Front-end Junior",
    description:
      "Atue em um produto SaaS criando telas responsivas, componentes reutilizáveis e melhorias de experiência para usuários internos.",
    requirements: [
      "Conhecimento em React e TypeScript",
      "Nocoes de consumo de APIs REST",
      "Experiencia com CSS ou Tailwind CSS",
    ],
    location: "Sao Paulo, SP",
    workMode: "HYBRID",
    employmentType: "JUNIOR",
    salary: "R$ 4.000 - R$ 5.500",
    status: "OPEN",
  },
  {
    companyIndex: 0,
    title: "Estagio em Produto Digital",
    description:
      "Apoie um time multidisciplinar na organização de backlog, testes de interface e acompanhamento de pequenas entregas.",
    requirements: [
      "Estar estudando tecnologia, design ou areas relacionadas",
      "Boa comunicacao escrita",
      "Vontade de aprender sobre produto",
    ],
    location: "Remoto",
    workMode: "REMOTE",
    employmentType: "INTERNSHIP",
    salary: "R$ 1.800",
    status: "OPEN",
  },
  {
    companyIndex: 0,
    title: "Desenvolvedor Full Stack",
    description:
      "Construa funcionalidades de ponta a ponta para produtos web, integrações internas e serviços orientados a dados.",
    requirements: [
      "Experiencia com Node.js",
      "Conhecimento em PostgreSQL",
      "Familiaridade com testes e versionamento Git",
    ],
    location: "Campinas, SP",
    workMode: "ONSITE",
    employmentType: "FULL_TIME",
    salary: "R$ 7.000 - R$ 9.000",
    status: "OPEN",
  },
  {
    companyIndex: 1,
    title: "Analista de Suporte Tecnico Junior",
    description:
      "Ajude clientes a resolver dúvidas de uso, registrar incidentes e documentar soluções recorrentes.",
    requirements: [
      "Organizacao para registrar atendimentos",
      "Conhecimento basico de sistemas web",
      "Empatia no atendimento ao cliente",
    ],
    location: "Curitiba, PR",
    workMode: "HYBRID",
    employmentType: "JUNIOR",
    salary: "R$ 3.000 - R$ 4.200",
    status: "OPEN",
  },
  {
    companyIndex: 1,
    title: "Desenvolvedor Back-end Meio Periodo",
    description:
      "Participe do desenvolvimento de APIs internas, integrações e manutenção de consultas em banco relacional.",
    requirements: [
      "Conhecimento em JavaScript ou TypeScript",
      "Nocoes de SQL",
      "Disponibilidade para meio periodo",
    ],
    location: "Remoto",
    workMode: "REMOTE",
    employmentType: "PART_TIME",
    salary: "R$ 3.500",
    status: "OPEN",
  },
  {
    companyIndex: 1,
    title: "UX Researcher Junior",
    description:
      "Conduza pesquisas com usuários, entrevistas e organização de insights para apoiar decisões de produto.",
    requirements: [
      "Conhecimento em pesquisa qualitativa",
      "Boa sintese de informacoes",
      "Experiencia com ferramentas de prototipagem",
    ],
    location: "Belo Horizonte, MG",
    workMode: "REMOTE",
    employmentType: "JUNIOR",
    salary: "R$ 4.500",
    status: "CLOSED",
  },
];

const applications = [
  {
    jobTitle: "Desenvolvedor Front-end Junior",
    candidateIndex: 0,
    status: "SENT",
    message:
      "Tenho interesse na vaga e venho estudando Next.js e componentizacao para criar interfaces consistentes.",
  },
  {
    jobTitle: "Desenvolvedor Front-end Junior",
    candidateIndex: 1,
    status: "REVIEWING",
    message:
      "Acredito que minha base em APIs e front-end pode ajudar o time a entregar funcionalidades completas.",
  },
  {
    jobTitle: "Estagio em Produto Digital",
    candidateIndex: 2,
    status: "APPROVED",
    message:
      "Tenho perfil de aprendizado rapido e interesse em conectar design, produto e desenvolvimento.",
  },
  {
    jobTitle: "Analista de Suporte Tecnico Junior",
    candidateIndex: 1,
    status: "REJECTED",
    message:
      "Tenho facilidade em explicar problemas tecnicos e documentar solucoes para outros usuarios.",
  },
  {
    jobTitle: "Desenvolvedor Back-end Meio Periodo",
    candidateIndex: 1,
    status: "SENT",
    message:
      "Busco uma oportunidade de meio periodo para aprofundar pratica com back-end e banco de dados.",
  },
  {
    jobTitle: "UX Researcher Junior",
    candidateIndex: 2,
    status: "REVIEWING",
    message:
      "Tenho interesse em pesquisa de produto e experiência com entrevistas e organização de insights.",
  },
];

async function upsertCompany(company) {
  const user = await prisma.user.upsert({
    where: {
      clerkId: company.clerkId,
    },
    update: {
      name: company.name,
      email: company.email,
      role: "COMPANY",
    },
    create: {
      clerkId: company.clerkId,
      name: company.name,
      email: company.email,
      role: "COMPANY",
    },
  });

  const profile = await prisma.companyProfile.upsert({
    where: {
      userId: user.id,
    },
    update: company.profile,
    create: {
      userId: user.id,
      ...company.profile,
    },
  });

  return { user, profile };
}

async function upsertCandidate(candidate) {
  const user = await prisma.user.upsert({
    where: {
      clerkId: candidate.clerkId,
    },
    update: {
      name: candidate.name,
      email: candidate.email,
      role: "CANDIDATE",
    },
    create: {
      clerkId: candidate.clerkId,
      name: candidate.name,
      email: candidate.email,
      role: "CANDIDATE",
    },
  });

  const profile = await prisma.candidateProfile.upsert({
    where: {
      userId: user.id,
    },
    update: candidate.profile,
    create: {
      userId: user.id,
      ...candidate.profile,
    },
  });

  return { user, profile };
}

async function upsertJob(job, companyProfile) {
  const existingJob = await prisma.job.findFirst({
    where: {
      companyId: companyProfile.id,
      title: job.title,
    },
    select: {
      id: true,
    },
  });

  const data = {
    companyId: companyProfile.id,
    title: job.title,
    description: job.description,
    requirements: job.requirements,
    location: job.location,
    workMode: job.workMode,
    employmentType: job.employmentType,
    salary: job.salary,
    status: job.status,
  };

  if (existingJob) {
    return prisma.job.update({
      where: {
        id: existingJob.id,
      },
      data,
    });
  }

  return prisma.job.create({
    data,
  });
}

async function main() {
  const companyRecords = [];
  const candidateRecords = [];
  const jobRecordsByTitle = new Map();

  for (const company of companies) {
    companyRecords.push(await upsertCompany(company));
  }

  for (const candidate of candidates) {
    candidateRecords.push(await upsertCandidate(candidate));
  }

  for (const job of jobs) {
    const companyProfile = companyRecords[job.companyIndex].profile;
    const jobRecord = await upsertJob(job, companyProfile);
    jobRecordsByTitle.set(job.title, jobRecord);
  }

  for (const application of applications) {
    const job = jobRecordsByTitle.get(application.jobTitle);
    const candidateProfile = candidateRecords[application.candidateIndex].profile;

    if (!job || !candidateProfile) {
      throw new Error(`Relacionamento invalido no seed: ${application.jobTitle}`);
    }

    await prisma.application.upsert({
      where: {
        jobId_candidateId: {
          jobId: job.id,
          candidateId: candidateProfile.id,
        },
      },
      update: {
        status: application.status,
        message: application.message,
      },
      create: {
        jobId: job.id,
        candidateId: candidateProfile.id,
        status: application.status,
        message: application.message,
      },
    });
  }

  console.log("Seed concluído com dados de exemplo do JobFlow.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
