import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JobDetails } from "@/components/JobDetails";
import { getJobById, jobs } from "@/lib/mock-jobs";

type JobDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return jobs.map((job) => ({
    id: job.id,
  }));
}

export async function generateMetadata({
  params,
}: JobDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const job = getJobById(id);

  if (!job) {
    return {
      title: "Vaga não encontrada | JobFlow",
    };
  }

  return {
    title: `${job.title} | JobFlow`,
    description: job.shortDescription,
  };
}

export default async function JobDetailsPage({ params }: JobDetailsPageProps) {
  const { id } = await params;
  const job = getJobById(id);

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
