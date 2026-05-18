import Link from "next/link";
import {
  employmentTypeLabels,
  jobStatusLabels,
  workModeLabels,
} from "@/lib/job-schema";

type JobCardProps = {
  job: {
    id: string;
    title: string;
    description: string;
    location: string;
    workMode: keyof typeof workModeLabels;
    employmentType: keyof typeof employmentTypeLabels;
    status: keyof typeof jobStatusLabels;
    createdAt: Date;
    company: {
      companyName: string;
    };
  };
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function getExcerpt(description: string) {
  if (description.length <= 150) {
    return description;
  }

  return `${description.slice(0, 147).trim()}...`;
}

export function JobCard({ job }: JobCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
          {workModeLabels[job.workMode]}
        </span>
        <span className="rounded-md bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
          {employmentTypeLabels[job.employmentType]}
        </span>
        <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {jobStatusLabels[job.status]}
        </span>
      </div>

      <div className="mt-5 flex-1">
        <p className="text-sm font-medium text-slate-500">
          {job.company.companyName}
        </p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
          {job.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {getExcerpt(job.description)}
        </p>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>{job.location}</span>
          <time dateTime={job.createdAt.toISOString()}>
            {dateFormatter.format(job.createdAt)}
          </time>
        </div>
        <Link
          href={`/vagas/${job.id}`}
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
        >
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}
