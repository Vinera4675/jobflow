import Link from "next/link";
import {
  type Job,
  jobStatusLabels,
  jobTypeLabels,
  workModelLabels,
} from "@/lib/mock-jobs";

type JobCardProps = {
  job: Job;
};

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

export function JobCard({ job }: JobCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-100">
          {workModelLabels[job.workModel]}
        </span>
        <span className="rounded-md bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 ring-1 ring-sky-100">
          {jobTypeLabels[job.type]}
        </span>
        <span className="rounded-md bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {jobStatusLabels[job.status]}
        </span>
      </div>

      <div className="mt-5 flex-1">
        <p className="text-sm font-medium text-slate-500">{job.company}</p>
        <h2 className="mt-2 text-xl font-semibold tracking-tight text-slate-950">
          {job.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {job.shortDescription}
        </p>
      </div>

      <div className="mt-6 border-t border-slate-200 pt-5">
        <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>{job.location}</span>
          <time dateTime={job.createdAt}>
            {dateFormatter.format(new Date(`${job.createdAt}T00:00:00`))}
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
