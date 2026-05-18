import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JobDetails } from "@/components/JobDetails";
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
  const job = await getPublicJob(id);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="py-10 sm:py-14">
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8">
          <JobDetails job={job} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
