import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  JobDetails,
  type JobApplicationState,
} from "@/components/JobDetails";
import { getCurrentDbUser } from "@/lib/current-user";
import { prisma } from "@/lib/prisma";

type JobDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const dynamic = "force-dynamic";

async function getPublicJob(id: string) {
  return prisma.job.findFirst({
    where: {
      id,
      status: "OPEN",
    },
    include: {
      company: {
        select: {
          companyName: true,
          description: true,
          location: true,
          website: true,
        },
      },
    },
  });
}

async function getApplicationState(
  jobId: string,
  user: Awaited<ReturnType<typeof getCurrentDbUser>>,
): Promise<JobApplicationState> {
  if (!user) {
    return {
      kind: "signedOut",
    };
  }

  if (!user.role) {
    return {
      kind: "needsOnboarding",
    };
  }

  if (user.role === "COMPANY") {
    return {
      kind: "company",
    };
  }

  const candidateProfile = await prisma.candidateProfile.findUnique({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      applications: {
        where: {
          jobId,
        },
        select: {
          status: true,
          createdAt: true,
        },
        take: 1,
      },
    },
  });

  if (!candidateProfile) {
    return {
      kind: "missingCandidateProfile",
    };
  }

  const application = candidateProfile.applications[0];

  if (application) {
    return {
      kind: "alreadyApplied",
      status: application.status,
      createdAt: application.createdAt,
    };
  }

  return {
    kind: "canApply",
  };
}

export async function generateMetadata({
  params,
}: JobDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await getPublicJob(id);

  if (!job) {
    return {
      title: "Vaga nao encontrada | JobFlow",
    };
  }

  return {
    title: `${job.title} | JobFlow`,
    description: job.description,
  };
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;
  const [job, user] = await Promise.all([getPublicJob(id), getCurrentDbUser()]);

  if (!job) {
    notFound();
  }

  const applicationState = await getApplicationState(id, user);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <JobDetails job={job} applicationState={applicationState} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
